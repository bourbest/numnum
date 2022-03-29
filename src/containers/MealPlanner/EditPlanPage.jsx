import { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDebounce, useFilter } from "../hooks";
import { useUrlParam, useIntUrlParam, useEntityInUrl } from "../locationHooks";
import { map, isEmpty, filter, groupBy, find } from "lodash";
import { translate } from "../../locales/translate";
import shortid from "shortid";

import { getIngredients, getRecipes } from "../../data/recipe-svc";
import { getPlan, createDefaultMealForRecipe } from "../../data/plan-svc";
import { getMealMoments } from "../../data/user-profile-svc";
import { mealSchema } from "../../modules/plan/plan-schema";

import {
  PlanMealPopup,
  PlanOrganizer,
  MealDetails,
  PlanRecipeListItem,
  GroceryListEditor,
} from "./components/";
import {
  NavBar,
  FullPageTabs,
  FullPageTab,
  SearchBox,
  FilterRecipesPopup,
} from "../components";

export default function EditPlanPage() {
  const [recipesById, setRecipes] = useState(null);
  const [mealMomentsById, setMealMoments] = useState(null);
  const [ingredientsById, setIngredients] = useState(null);
  const [plan, setPlan] = useState(null);
  const history = useHistory();

  const [editedMeal, showPlanMealPopup] = useEntityInUrl(mealSchema);
  const [activeTabIndex, setActiveTabIndex] = useIntUrlParam("tab", 0);
  const [filterValue, setFilter] = useUrlParam("filterValue", "");

  const isLoading = !plan || !recipesById || !mealMomentsById;

  // initial load of recipes
  useEffect(function () {
    getRecipes().then(setRecipes);
  }, []);
  useEffect(function () {
    getPlan().then(setPlan);
  }, []);
  useEffect(function () {
    getMealMoments().then(setMealMoments);
  }, []);
  useEffect(function () {
    getIngredients().then(setIngredients);
  }, []);

  // filter and sort recipes by label
  const debouncedFilter = useDebounce(filterValue, 300);
  const filteredRecipes = useFilter(recipesById, debouncedFilter);
  const [otherFiltersValues, setOtherFiltersValues] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  const mealsByRecipeId = plan ? groupBy(plan.meals, "recipeId") : {};

  const addMealWithoutDate = function (event) {
    const newPlan = { ...plan };
    const recipeId = event.target.dataset.id;
    const newMeal = createDefaultMealForRecipe(recipesById[recipeId]);
    newPlan.meals = [...newPlan.meals, newMeal];
    setPlan(newPlan);
  };

  const handleMealRemoved = function (event) {
    const newPlan = { ...plan };
    const mealId = event.target.dataset.id;
    newPlan.meals = filter(newPlan.meals, (meal) => meal.id !== mealId);
    setPlan(newPlan);
  };

  const saveMeal = function () {
    const newPlan = { ...plan };
    if (editedMeal.id !== undefined) {
      newPlan.meals = filter(newPlan.meals, (m) => m.id !== editedMeal.id);
    } else {
      editedMeal.id = shortid.generate();
    }
    newPlan.meals = [...newPlan.meals, editedMeal];
    setPlan(newPlan);
  };
  const handleMealSaved = function () {
    saveMeal();
    history.goBack();
  };

  const handlePlanRecipe = function (event) {
    const recipeId = event.target.dataset.id;
    let targetMeal = find(plan.meals, (meal) => meal.recipeId === recipeId);
    if (!targetMeal) {
      targetMeal = createDefaultMealForRecipe(recipesById[recipeId]);
      targetMeal.id = null; // not for saving yet
    }
    showPlanMealPopup(targetMeal, false);
  };

  const handleEditMeal = function (event) {
    const mealId = event.target.dataset.id;
    let targetMeal = find(plan.meals, (meal) => meal.id === mealId);
    showPlanMealPopup(targetMeal, false);
  };

  const handleCancel = function () {
    history.goBack();
  };

  return (
    <Fragment>
      <NavBar onBack={handleCancel} />
      {!isLoading && (
        <PlanMealPopup
          recipe={editedMeal ? recipesById[editedMeal.recipeId] : null}
          visible={editedMeal !== null}
          meal={editedMeal}
          mealMomentsById={mealMomentsById}
          onMealChanged={showPlanMealPopup}
          onCancel={handleCancel}
          onSaveMeal={handleMealSaved}
        />
      )}

      <FilterRecipesPopup
        actualFilterValues={otherFiltersValues}
        visible={showFilters}
        onCancel={() => setShowFilters(false)}
        onFiltersChanged={() => setShowFilters(false)}
      />

      {isLoading && <div>{translate("common.loading")}</div>}
      {!isLoading && (
        <FullPageTabs
          activeTabIndex={activeTabIndex}
          onTabChanged={setActiveTabIndex}
        >
          <FullPageTab icon="search" label={translate("planMeals.select")}>
            <div className="container p-2">
              <SearchBox
                value={filterValue}
                onChange={setFilter}
                placeholder={translate("browseRecipe.searchPlaceholder")}
              />
              <button onClick={() => setShowFilters(true)}>
                {translate("more")}
              </button>
            </div>

            {isEmpty(recipesById) && (
              <div className="container p-2 d-flex flex-grow justify-content-center align-items-center">
                {translate("planMeals.noRecipe")}
              </div>
            )}
            {!isEmpty(recipesById) && filteredRecipes.length === 0 && (
              <div className="container p-2 d-flex flex-grow justify-content-center align-items-center">
                {translate("planMeals.noMatch")}
              </div>
            )}
            {filteredRecipes.length && (
              <div className="recipe-list">
                {map(filteredRecipes, (recipe) => (
                  <div className="recipe-list-item" key={recipe.id}>
                    <PlanRecipeListItem
                      recipe={recipe}
                      onAddMealWithoutDate={addMealWithoutDate}
                      onPlanMeal={handlePlanRecipe}
                    />
                    {mealsByRecipeId[recipe.id] && (
                      <MealDetails
                        meals={mealsByRecipeId[recipe.id]}
                        momentsById={mealMomentsById}
                        onRemoveMeal={handleMealRemoved}
                        onEditMeal={handleEditMeal}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </FullPageTab>
          <FullPageTab icon="calendar" label={translate("common.organize")}>
            <PlanOrganizer
              recipesById={recipesById}
              mealMomentsById={mealMomentsById}
              meals={plan.meals}
              onEditMeal={handleEditMeal}
              onRemoveMeal={handleMealRemoved}
            />
          </FullPageTab>
          <FullPageTab icon="clipboard" label={translate("planMeals.list")}>
            <GroceryListEditor
              meals={plan.meals}
              recipesById={recipesById}
              ingredientsById={ingredientsById}
            />
          </FullPageTab>
        </FullPageTabs>
      )}
    </Fragment>
  );
}
