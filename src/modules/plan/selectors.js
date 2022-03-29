import { forEach } from "lodash";
import { QTY_TYPE_NONE } from "../recipe/units";
export const computeIngredientList = function (
  meals,
  recipesById,
  ingredientsById
) {
  const ingredients = {};
  forEach(meals, (meal) => {
    const recipe = recipesById[meal.recipeId];
    const ratio = meals.servings / recipe.servings;
    forEach(recipe.ingredients, (recipeIngredient) => {
      const id = `${recipeIngredient.ingredientId}-${recipeIngredient.qtyTypeId}`;
      const quantity =
        recipeIngredient.qtyTypeId !== QTY_TYPE_NONE
          ? computeQuantityWithRatio(ingredients[id].quantity, ratio)
          : null;

      if (ingredients[id] === undefined) {
        const ingredient = ingredientsById[recipeIngredient.ingredientId];
        ingredients[id] = {
          ...recipeIngredient,
          id,
          quantity,
          name: ingredient.name,
        };
      } else if (recipeIngredient.qtyTypeId !== QTY_TYPE_NONE) {
        ingredients[id].quantity += quantity;
      }
    });
  });
  return ingredients;
};

export const computeQuantityWithRatio = function (quantity, ratio) {
  return Math.ceil(quantity * ratio);
};
