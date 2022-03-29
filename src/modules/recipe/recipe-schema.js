import {
  string,
  required,
  number,
  Schema,
  isGt,
  isInteger,
  isPositive,
  validate
} from "../../sapin";

export const recipeSchema = new Schema({
  id: string,
  name: string(required),
  servings: number([isGt(0), isInteger, required]),
  preparationTime: number([isPositive, isInteger, required]),
  cookingTime: number([isPositive, isInteger]),
  ingredientsText: string(required),
  steps: string,
});

export const validateRecipe = function (recipe) {
  return validate(recipe, recipeSchema);
};
