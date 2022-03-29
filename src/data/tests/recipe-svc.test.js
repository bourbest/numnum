import {
  groupIngredientsByOtherNames,
  setIngredientIdForKnownIngredients,
} from "../recipe-svc";

describe("recipe-svc", function () {
  describe("groupIngredientsByOtherNames", function () {
    it("should return a dictionary keyed by ingredient.otherName", function () {
      const ingredients = [
        { id: 1, name: "test", otherNames: ["test", "tests"] },
        { id: 2, name: "poivron", otherNames: ["poivrons", "poivron"] },
      ];

      const res = groupIngredientsByOtherNames(ingredients);
      expect(res.test).toEqual(ingredients[0]);
      expect(res.tests).toEqual(ingredients[0]);
      expect(res.poivron).toEqual(ingredients[1]);
      expect(res.poivrons).toEqual(ingredients[1]);
    });
  });
  describe("setIngredientIdForKnownIngredients", function () {
    it("should set id of matching ingredient even when case does not match", function () {
      const ingredientsByName = {
        poivrons: { id: 1, name: "test", otherNames: ["test", "tests"] },
      };
      const recipeIngredients = [{ ingredientName: "POIVRONS" }];

      setIngredientIdForKnownIngredients(recipeIngredients, ingredientsByName);
      expect(recipeIngredients[0].ingredientId).toEqual(
        ingredientsByName.poivrons.id
      );
    });
  });
});
