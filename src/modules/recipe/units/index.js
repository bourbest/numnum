import {keyBy, forEach, isObject, concat} from 'lodash'
export const QTY_TYPE_WEIGHT = 'w'
export const QTY_TYPE_VOLUME = 'v'
export const QTY_TYPE_UNITS = 'u'
export const QTY_TYPE_NONE = '?'

export const QTY_TBPS_ID = 'tbps'
export const QTY_CUP_ID = 'cup'
export const QTY_TSP_ID = 'tsp'
export const QTY_ML_ID = 'ml'
export const QTY_LITER_ID = 'liter'
export const QTY_GRAMS_ID = 'grams'
export const QTY_KILO_ID = 'kg'
export const QTY_POUND_ID = 'pound'

// should probably be moved somewhere else
export const FRENCH_UNIT_LABELS_BY_ID = {
  [QTY_TBPS_ID]: 'c. à soupe',
  [QTY_CUP_ID]: 'tasse',
  [QTY_TSP_ID]: 'c. à thé',
  [QTY_ML_ID]: 'ml',
  [QTY_LITER_ID]: 'litre',
  [QTY_GRAMS_ID]: 'gramme',
  [QTY_KILO_ID]: 'kilo',
  [QTY_POUND_ID]: 'livre'
}

export const FRENCH_UNIT_PATTERNS_BY_ID = {
  [QTY_TBPS_ID]: [/^(c\.\s+[aà]\s+(?:soupe|table))\s+/],
  [QTY_CUP_ID]: [/^(t|tasse[s]?)\s+/],
  [QTY_TSP_ID]: [/^(c\.\s+[aà]\s+th[eé]|c\.t\.)\s+/],
  [QTY_ML_ID]: [/^(ml)\s+/],
  [QTY_LITER_ID]: [/^(l|litre[s]?)\s+/],
  [QTY_GRAMS_ID]: [/^(g|gramme[s]?)\s+/],
  [QTY_KILO_ID]: [/^(kg[s]?|kilo[s]?)\s+/],
  [QTY_POUND_ID]: [/^(lb[s]?|livre[s]?)\s+/]
}

export const ENGLISH_UNIT_PATTERNS_BY_ID = {
  [QTY_TBPS_ID]: [/^(?:tbsp|c\.s[.]?)\s+/],
  [QTY_CUP_ID]: [/^(c|cup[s]?)\s+/],
  [QTY_TSP_ID]: [/^(tsp|c\.t\.)\s+/],
  [QTY_ML_ID]: [/^(ml)\s+/],
  [QTY_LITER_ID]: [/^(l|liter[s]?)\s+/],
  [QTY_GRAMS_ID]: [/^(g|gram[s]?)\s+/],
  [QTY_KILO_ID]: [/^(kg[s]?|kilo[s]?)\s+/],
  [QTY_POUND_ID]: [/^(pound[s]?)\s+/]
}

export const loadUnitLabels = function (unitsById, labelsById) {
  forEach(labelsById, (label, key) => {
    if (isObject(unitsById[key])) {
      unitsById[key].label = label
    } else {
      throw new Error(`Unknown unit id ${key}`)
    }
  })
}

export const loadUnitPatterns = function (unitsById, patternsById) {
  forEach(patternsById, (patterns, key) => {
    if (isObject(unitsById[key])) {
      unitsById[key].patterns = concat(unitsById[key].patterns, patterns)
    } else {
      throw new Error(`Unknown unit id ${key}`)
    }
  })
}

export const initializeUnits  = function (labelsById = FRENCH_UNIT_LABELS_BY_ID, patternsById = FRENCH_UNIT_PATTERNS_BY_ID) {
  const units = [
    {id: QTY_TBPS_ID, value: 15.0, qtyTypeId: QTY_TYPE_VOLUME, patterns: []},
    {id: QTY_CUP_ID, value: 250.0, qtyTypeId: QTY_TYPE_VOLUME, patterns: []},
    {id: QTY_TSP_ID, value: 5.0, qtyTypeId: QTY_TYPE_VOLUME, patterns: []},
    {id: QTY_ML_ID, value: 1.0, qtyTypeId: QTY_TYPE_VOLUME, patterns: []},
    {id: QTY_LITER_ID, value: 1000, qtyTypeId: QTY_TYPE_VOLUME, patterns: []},
    {id: QTY_GRAMS_ID, value: 1.0, qtyTypeId: QTY_TYPE_WEIGHT, patterns: []},
    {id: QTY_KILO_ID, value: 1000.0, qtyTypeId: QTY_TYPE_WEIGHT, patterns: []},
    {id: QTY_POUND_ID, value: 454.0, qtyTypeId: QTY_TYPE_WEIGHT, patterns: []} 
  ]

  const unitsById = keyBy(units, 'id')

  loadUnitLabels(unitsById, labelsById)
  loadUnitPatterns(unitsById, patternsById)
  return unitsById
}