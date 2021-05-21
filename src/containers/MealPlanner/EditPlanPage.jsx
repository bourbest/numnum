import React, {useState, useEffect, Fragment} from "react"
import {useHistory} from 'react-router-dom'
import {useDebounce, useFilter} from '../hooks'
import {useUrlParam, useIntUrlParam, useDisplayMode, useEntityInUrl} from '../locationHooks'
import {map, isEmpty, filter, groupBy, find} from 'lodash'
import {translate} from '../../locales/translate'
import shortid from 'shortid'

import {getRecipes} from '../../data/recipe-svc'
import {getPlan, createDefaultMealForRecipe} from '../../data/plan-svc'
import {getMealMoments} from '../../data/user-profile-svc'
import {mealSchema} from '../../modules/plan/plan-schema'

import RecipeWithActions from './components/RecipeWithActions'
import PlanMealPopup from './components/PlanMealPopup'
import {NavBar, FullPageTabs, FullPageTab, SearchBox} from '../components'

export default function EditPlanPage () {
  const [recipesById, setRecipes] = useState(null)
  const [plan, setPlan] = useState(null)
  const history = useHistory()
  const displayMode = useDisplayMode()
 
  const [mealMoments, setMealMoments] = useState(null)
  const [meal, showPlanMealPopup] = useEntityInUrl(mealSchema)
  const [activeTabIndex, setActiveTabIndex] = useIntUrlParam('tab', 0)
  const [filterValue, setFilter] = useUrlParam('filterValue', '')
  
  const isLoading = !plan || !recipesById || !mealMoments

  // initial load of recipes
  useEffect( function () { getRecipes().then(setRecipes) }, [])
  useEffect( function() { getPlan().then(setPlan) }, [])
  useEffect( function () { getMealMoments().then(setMealMoments) }, [] )

  // filter and sort recipes by label
  const debouncedFilter = useDebounce(filterValue, 300)
  const filteredRecipes = useFilter(recipesById, debouncedFilter)

  const mealsByRecipeId = plan ? groupBy(plan.meals, 'recipeId') : {}

  const handleAddRemoveMeal = function (event) {
    const newPlan = {...plan}
    const recipeId = event.target.dataset.id
    if (mealsByRecipeId[recipeId]) {
      newPlan.meals = filter(newPlan.meals, meal => meal.recipeId !== recipeId)
    } else {
      const newMeal = createDefaultMealForRecipe (recipesById[recipeId])
      newPlan.meals = [...newPlan.meals, newMeal]
    }
    setPlan(newPlan)
  }

  const handleRecipePlanned = function () {
    const newPlan = {...plan}
    if (meal.id !== undefined) {
      newPlan.meals = filter(newPlan.meals, m => m.id !== meal.id)
    } else {
      meal.id = shortid.generate()
    }
    newPlan.meals = [...newPlan.meals, meal]
    setPlan(newPlan)
    showPlanMealPopup(null)
  }

  const handlePlanRecipe = function (event) {
    const recipeId = event.target.dataset.id
    let editedMeal = find(plan.meals, meal => meal.recipeId === recipeId)
    if (!editedMeal) {
      editedMeal = createDefaultMealForRecipe (recipesById[recipeId])
      editedMeal.id = null // not for saving yet
    }
    showPlanMealPopup(editedMeal)
  }

  const actions = {
    delete: {icon: 'minus', onClick: handleAddRemoveMeal},
    add: {icon: 'plus', onClick: handleAddRemoveMeal},
    plan: {icon: 'calendar', onClick: handlePlanRecipe}
  }

  const onCancel = function () {
    history.goBack()
  }

  return (
    <Fragment>
      <NavBar
        onBack={() => history.goBack()}
        browseDisplayIcon={activeTabIndex === 0 ? displayMode.toggleIcon : null}
        onBrowseDisplayToggle={displayMode.toggle}
      />
      {!isLoading &&
      <PlanMealPopup
        recipe={meal ? recipesById[meal.recipeId] : null}
        visible={meal !== null}
        meal={meal}
        mealMoments={mealMoments}
        onMealChanged={showPlanMealPopup}
        onCancel={onCancel}
        onSaveMeal={handleRecipePlanned}
      />}

      {isLoading && <div>{translate('common.loading')}</div>}
      {!isLoading &&
      <FullPageTabs activeTabIndex={activeTabIndex} onTabChanged={setActiveTabIndex}>
        <FullPageTab icon="search" label={translate('planMeals.select')}>
          <div className="container p-2">
            <SearchBox value={filterValue} onChange={setFilter} placeholder={translate('browseRecipe.searchPlaceholder')} />
          </div>
          
          {isEmpty(recipesById) &&
            <div className="container p-2 d-flex flex-grow justify-content-center align-items-center">
              {translate('planMeals.noRecipe')}
            </div>
          }
          {!isEmpty(recipesById) && filteredRecipes.length === 0 &&
            <div className="container p-2 d-flex flex-grow justify-content-center align-items-center">
              {translate('planMeals.noMatch')}
            </div>
          }
          {filteredRecipes.length &&
          <div className={displayMode.listClass}>
            {map(filteredRecipes, recipe => (
              <div className="recipe-list-item" key={recipe.id}>
                <RecipeWithActions
                  displayMode={displayMode.value}
                  recipe={recipe}
                  isSelected={mealsByRecipeId[recipe.id] !== undefined}
                  actions={actions}
                />
              </div>  
            ))}
          </div>}
        
        </FullPageTab>
        <FullPageTab icon="filter" label={translate('common.filter')}>
            TODO
        </FullPageTab>
        <FullPageTab icon="clipboard" label={translate('common.organize')}>
          TODO
        </FullPageTab>
      </FullPageTabs>
      }
    </Fragment>
  )
}