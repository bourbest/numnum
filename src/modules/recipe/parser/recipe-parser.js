import {find, indexOf, trim} from 'lodash'
import {QTY_TYPE_NONE, QTY_TYPE_UNITS} from '../units'

export const getQuantityTokenFromLine = function (line) {
  // check for a number written like 123,543
  let matches = line.match(/(\d+)[,.](\d+)/)

  if (matches) {
    return {
      integer: parseFloat(matches[1], 10),
      numerator: parseFloat(matches[2], 10),
      denominator: 10 ** matches[2].length,
      literal: matches[0]
    }
  }

  // check for number written like so 2 3/4
  matches = line.match(/^\s*(((\d+\s+)?\d+\s*\/\s*)?\d+)/)

  if (!matches) return null

  const ret = {
    literal: matches[1]
  }

  if (matches[2] === undefined) {
    ret.integer = parseFloat(matches[1], 10)
  } else if (matches[3] === undefined) {
    ret.integer = 0
    const denominator = matches[1].substring(matches[2].length)
    ret.denominator = parseFloat(denominator, 10)
    ret.numerator = parseFloat(matches[2])
  } else {
    ret.integer = parseFloat(matches[3], 10)
    const denominator = matches[1].substring(matches[2].length)
    ret.denominator = parseFloat(denominator, 10)
    ret.numerator = parseFloat(matches[2].substring(matches[3].length))
  }
  
  return ret
}

// expects line to be trimmed
export const getUnitTokenFromLine = function (line, unitsById) {
  let matches = null
  const unit = find(unitsById, unit => {
    for(let i = 0; i < unit.patterns.length; i++) {
      matches = line.match(unit.patterns[i])
      if (matches) {
        return true
      }
    }
    return false
  })

  if (!unit) return null

  return {
    unit: unit,
    literal: matches[0]
  }
}

export const getMesurement = function (quantityToken, unitToken) {
  const mesurement = {}
  let fraction = (quantityToken.denominator && quantityToken.numerator)
    ? quantityToken.numerator / quantityToken.denominator
    : 0.0

  if (!quantityToken && !unitToken) {
    mesurement.qtyTypeId = QTY_TYPE_NONE
  } else if (quantityToken && !unitToken) {
    mesurement.qtyTypeId = QTY_TYPE_UNITS
    mesurement.quantity = 1.0 * quantityToken.integer + fraction
  }
  else {
    mesurement.qtyTypeId = unitToken.unit.qtyTypeId
    mesurement.quantity = (fraction + quantityToken.integer) * unitToken.unit.value
  }

  return mesurement
}

// expects ingredientText to be trimed
const removeFirstDeterminantFromLineIfAny = function (ingredientText, languageDeterminants) {
  let ret = ingredientText
  let words = ingredientText.split(' ')
  words = words[0].toLowerCase().split('\'')
  const firstWord = words.length === 1 ? words[0] : words[0] + '\''

  if (indexOf(languageDeterminants, firstWord) >= 0) {
    ret = trim(ret.substring(firstWord.length))
  }
  return ret
}

const removeLeadingParenthesisIfAny = function (ingredientText) {
  let ret = ingredientText
  let matches = ingredientText.match(/^\s*(\(.+\)\s*)/)

  if (matches) {
    ret = trim(ret.substring(matches[0].length))
  }

  return ret
}

const extractIngredientNameFromText = function (ingredientText) {
  
  let ret = trim(ingredientText.split(',')[0])
  // regex to remove trailing in parenthesis text
  const matches = ret.match(/.+(\(.+\))\s*$/)
  if (matches) {
    ret = trim(ret.slice(0, -matches[1].length))
  }
  return ret
}

export const getIngredientFromLine = function (line, unitsById, languageDeterminants)
{
  let workingText = trim(line)
  const quantityToken = getQuantityTokenFromLine(workingText)
  
  workingText = quantityToken
    ? trim(workingText.substring(quantityToken.literal.length))
    : workingText

  const unitToken = getUnitTokenFromLine(workingText, unitsById)
  workingText = unitToken
    ? trim(workingText.substring(unitToken.literal.length))
    : workingText

  const mesurement = getMesurement(quantityToken, unitToken)

  workingText = removeLeadingParenthesisIfAny(workingText)
  workingText = removeFirstDeterminantFromLineIfAny(workingText, languageDeterminants)
  const ingredientName = extractIngredientNameFromText(workingText)

  return {
    ...mesurement,
    ingredientName
  }
}


