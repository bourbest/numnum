import shortid from 'shortid'
import {saveEntity, getById, PLAN_STORE} from './indexedDb'
import {transform} from '../sapin'
import {planSchema} from '../modules/plan/plan-schema'

export const getEmptyPlan = function () {
  return {
    id: 'uniquePlan',
    meals: [],
    startDay: new Date(),
    duration: 7,
    createdOn: new Date()
  }
}

export const createDefaultMealForRecipe = function (recipe) {
  return {
    id: shortid.generate(),
    recipeId: recipe.id,
    servings: recipe.servings,
    mealDate: null,
    mealMoment: null,
    useLeftovers: false
  }
}
export const savePlan = function (plan) {
  const transformed = transform(plan, planSchema)
  return saveEntity(transformed, PLAN_STORE)
}

export const getPlan = function () {
  return getById(PLAN_STORE, 'uniquePlan')
}
