
import {saveEntity, getAllById, getById, RECIPE_STORE} from './indexedDb'
import {transform} from '../sapin'
import {recipeSchema} from '../modules/recipe/recipe-schema'
import {getIngredientsFromText} from '../modules/recipe/parser'

export const getEmptyRecipe = function () {
  return {
    name: '',
    ingredients: '',
    steps: '',
    servings: '4',
    preparationTime: '',
    cookingTime:''
  }
}
export const saveRecipe = function (recipe) {
  const transformed = transform(recipe, recipeSchema)
  transformed.ingredients = getIngredientsFromText(transformed.ingredientsText)
  return saveEntity(transformed, RECIPE_STORE)
}

export const getRecipes = function () {
  return getAllById(RECIPE_STORE)
}

export const getRecipeById = function (id) {
  return getById(RECIPE_STORE, id)
}
