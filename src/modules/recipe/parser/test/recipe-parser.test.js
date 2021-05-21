import { forEach } from 'lodash'
import {
  initializeUnits,
  loadUnitPatterns,
  FRENCH_UNIT_PATTERNS_BY_ID,
  ENGLISH_UNIT_PATTERNS_BY_ID,
  FRENCH_UNIT_LABELS_BY_ID,
  QTY_TYPE_VOLUME,
  QTY_TYPE_UNITS
} from '../../units'

import {
  getQuantityTokenFromLine,
  getUnitTokenFromLine,
  getIngredientFromLine
} from '../recipe-parser'

describe('getUnitTokenFromLine', () => {
  it('finds the unit when in line', () => {
    const testValues = ['c.s.', 'c. à soupe', 'tbsp', 'c.  à  table',
      'tasse', 'tasses', 'cups', 'cups', 't',
      'c. à thé', 'c. a the', 'tsp', 'c.t.',
      'ml', 'l', 'litre', 'litres', 'liter', 'liters',
      'g', 'gramme', 'grammes', 'grams', 'gram',
      'kg', 'kilo', 'kilos', 'kgs',
      'lb', 'lbs', 'livre', 'livres', 'pound', 'pounds']

    const unitsById = initializeUnits(FRENCH_UNIT_LABELS_BY_ID, FRENCH_UNIT_PATTERNS_BY_ID)
    loadUnitPatterns(unitsById, ENGLISH_UNIT_PATTERNS_BY_ID)

    forEach(testValues, testValue => {
      const testLine = testValue + ' vanille'
      const ret = getUnitTokenFromLine(testLine, unitsById)

      // assert
      expect(ret.literal).toEqual(testValue + ' ')
    })
  })

  it('returns null when no unit found', () => {
    const unitsById = initializeUnits(FRENCH_UNIT_LABELS_BY_ID, FRENCH_UNIT_PATTERNS_BY_ID)
    const testLine = '1 pomme'
    const ret = getUnitTokenFromLine(testLine, unitsById)

    // assert
    expect(ret).toEqual(null)
  })
})

describe('getQuantityTokenFromLine', () => {
  it('splits "1 2/3 tasse d\'huile d\'olive" correctly', () => {
    const testValue = '1 2/3 tasse'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret.literal).toEqual('1 2/3')
    expect(ret.integer).toEqual(1)
    expect(ret.numerator).toEqual(2)
    expect(ret.denominator).toEqual(3)
  })

  it('splits "1 2 / 3 tasse d\'huile d\'olive" correctly', () => {
    const testValue = '1 2 / 3 tasse'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret.literal).toEqual('1 2 / 3')
    expect(ret.integer).toEqual(1)
    expect(ret.numerator).toEqual(2)
    expect(ret.denominator).toEqual(3)
  })

  it('splits "1.5 tasse d\'huile d\'olive" correctly', () => {
    const testValue = '1.5 tasse'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret.literal).toEqual('1.5')
    expect(ret.integer).toEqual(1)
    expect(ret.numerator).toEqual(5)
    expect(ret.denominator).toEqual(10)
  })

  it('splits "1,5 tasse d\'huile d\'olive" correctly', () => {
    const testValue = '1,50 tasse'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret.literal).toEqual('1,50')
    expect(ret.integer).toEqual(1)
    expect(ret.numerator).toEqual(50)
    expect(ret.denominator).toEqual(100)
  })

  it('splits "1 big apple" correctly', () => {
    const testValue = '1 big apple'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret.literal).toEqual('1')
    expect(ret.integer).toEqual(1)
    expect(ret.numerator).toBeUndefined()
    expect(ret.denominator).toBeUndefined()
  })

  it('returns null when no quantity to parse', () => {
    const testValue = 'big apple'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret).toEqual(null)
  })

  it('not bothered by leading spaces', () => {
    const testValue = '   1 2 / 3 tasse'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret.literal).toEqual('1 2 / 3')
    expect(ret.integer).toEqual(1)
    expect(ret.numerator).toEqual(2)
    expect(ret.denominator).toEqual(3)
  })

  it('returns null when not at start', () => {
    const testValue = 'boite de 796 ml de tomates'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret).toEqual(null)
  })

  it('parse 2/3 ok', () => {
    const testValue = '2/3 tasse'
    const ret = getQuantityTokenFromLine(testValue)

    // assert
    expect(ret.integer).toEqual(0)
    expect(ret.numerator).toEqual(2)
    expect(ret.denominator).toEqual(3)
  })
})

describe('getIngredientFromLine', () => {
  const unitsById = initializeUnits(FRENCH_UNIT_LABELS_BY_ID, FRENCH_UNIT_PATTERNS_BY_ID)
  const determinants = ['de', 'd\'']

  it('splits "1 1/2 tasse d\'huile d\'olive" correctly', () => {
    const testValue = '1 1/2 tasse d\'huile d\'olive'
    const ret = getIngredientFromLine(testValue, unitsById, determinants)

    expect(ret.ingredientName).toEqual('huile d\'olive')
    expect(ret.qtyTypeId).toEqual(QTY_TYPE_VOLUME)
    expect(ret.quantity).toEqual(375)
  })

  it('keeps inline parenthesis', () => {
    const testValue = '1 canne de 375ml (43oz) de tomates en dés'
    const ret = getIngredientFromLine(testValue, unitsById, determinants)

    expect(ret.ingredientName).toEqual('canne de 375ml (43oz) de tomates en dés')
    expect(ret.qtyTypeId).toEqual(QTY_TYPE_UNITS)
    expect(ret.quantity).toEqual(1)
  })

  it('removes leading parenthesis from name', () => {
    const testValue = '1 c.t. (5 ml) de cumin'
    const ret = getIngredientFromLine(testValue, unitsById, determinants)

    expect(ret.ingredientName).toEqual('cumin')
    expect(ret.qtyTypeId).toEqual(QTY_TYPE_VOLUME)
    expect(ret.quantity).toEqual(5)
  })

  it('removes whatever comes after the coma', () => {
    const testValue = '1 c.t. (5 ml) de cumin , bien dérougi'
    const ret = getIngredientFromLine(testValue, unitsById, determinants)

    expect(ret.ingredientName).toEqual('cumin')
    expect(ret.qtyTypeId).toEqual(QTY_TYPE_VOLUME)
    expect(ret.quantity).toEqual(5)
  })

  it('removes final parenthesis', () => {
    const testValue = '1 c.t. de cumin (bien dérougi)'
    const ret = getIngredientFromLine(testValue, unitsById, determinants)

    expect(ret.ingredientName).toEqual('cumin')
    expect(ret.qtyTypeId).toEqual(QTY_TYPE_VOLUME)
    expect(ret.quantity).toEqual(5)
  })
})