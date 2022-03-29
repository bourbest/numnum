import { forEach, filter, omit, map } from "lodash";
import { transform } from "../sapin";
import {
  saveEntity,
  getAllById,
  getById,
  RECIPE_STORE,
  INGREDIENT_STORE,
} from "./indexedDb";
import { recipeSchema } from "../modules/recipe/recipe-schema";
import { getIngredientsFromText } from "../modules/recipe/parser";

export const getEmptyRecipe = function () {
  return {
    name: "",
    ingredientsText: "",
    steps: "",
    servings: "4",
    preparationTime: "",
    cookingTime: "",
    ingredients: [],
  };
};
export const saveRecipe = async function (recipe) {
  // extract recipe ingredients
  const unmappedIngredients = getIngredientsFromText(recipe.ingredientsText);

  // get known ingredients from db
  const ingredients = await getIngredients();

  // group ingredients by name then try to set the corresponding id to the recipe ingredient
  const ingredientsByName = groupIngredientsByOtherNames(ingredients);
  setIngredientIdForKnownIngredients(unmappedIngredients, ingredientsByName);

  // get the list of ingredient for which we could not find an existing one
  const newIngredients = filter(
    unmappedIngredients,
    (x) => x.ingredientId === undefined
  );

  // save those new ingredients, if any
  const promises = map(newIngredients, (recipeIngredient) =>
    createIngredient(recipeIngredient.ingredientName)
  );

  // set the newly saved ingredient ids to the recipe ingredients
  const savedIngredients = await Promise.all(promises);
  for (let i = 0; i < savedIngredients.length; i++) {
    newIngredients[i].ingredientId = savedIngredients[i].id;
  }

  // remove the unused property before saving
  recipe.ingredients = map(unmappedIngredients, (i) =>
    omit(i, "ingredientName")
  );

  // transform and save
  const transformed = transform(recipe, recipeSchema);
  return saveEntity(transformed, RECIPE_STORE);
};

export const getRecipes = function () {
  return getAllById(RECIPE_STORE);
};

export const getRecipeById = function (id) {
  return getById(RECIPE_STORE, id);
};

export const getIngredients = function () {
  return getAllById(INGREDIENT_STORE);
};

export const groupIngredientsByOtherNames = function (ingredients) {
  const ret = {};
  forEach(ingredients, (ingredient) => {
    forEach(ingredient.otherNames, (name) => (ret[name] = ingredient));
  });
  return ret;
};

export const createIngredient = function (name) {
  const newIngredient = {
    name,
    otherNames: [name.toLowerCase()],
  };
  return saveEntity(newIngredient, INGREDIENT_STORE);
};

export const setIngredientIdForKnownIngredients = function (
  recipeIngredients,
  ingredientsGroupedByName
) {
  forEach(recipeIngredients, (recipeIngredient) => {
    const name = recipeIngredient.ingredientName.toLowerCase();
    const matching = ingredientsGroupedByName[name];
    if (matching) {
      recipeIngredient.ingredientId = matching.id;
    }
  });
};
