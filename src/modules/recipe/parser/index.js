import {getIngredientFromLine} from './recipe-parser'

export const getIngredientsFromText = function (text) {
  const lines = text.split("\n")
  return lines.map(getIngredientFromLine)
}
