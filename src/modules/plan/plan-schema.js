import {string, isOfTypeDate, required, arrayOf, number, isInteger, isGt, Schema, validate, boolean } from '../../sapin'

export const mealSchema = new Schema({
  id: string,
  recipeId: string(required),
  mealDate: string(isOfTypeDate),
  mealMoment: string,
  useLeftovers: boolean(required),
  servings: number([isInteger, isGt(0), required])
})

export const planSchema = new Schema({
  id: string,
  meals: arrayOf(mealSchema)
})

export const validatePlan = function (plan) {
  return validate(plan, planSchema)
}
