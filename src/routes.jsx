import React from "react"
import {
  Switch,
  Route
} from 'react-router-dom'

import LoginPage from './containers/MyAccount/LoginPage'
import HomePage from './containers/Home/HomePage'
import BrowseRecipesPage from './containers/Recipes/BrowseRecipesPage'
import CreateRecipePage from './containers/Recipes/CreateRecipePage'
import EditRecipePage from './containers/Recipes/EditRecipePage'
import ViewRecipePage from './containers/Recipes/ViewRecipePage'

import CreatePlanPage from './containers/MealPlanner/CreatePlanPage'
import EditPlanPage from './containers/MealPlanner/EditPlanPage'

import CreateAccountPage from './containers/MyAccount/CreateAccountPage'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/recipes" component={BrowseRecipesPage} />
      <Route exact path="/recipes/create-recipe" component={CreateRecipePage} />
      <Route exact path="/recipes/:recipeId/view" component={ViewRecipePage} />
      <Route exact path="/recipes/:recipeId/edit" component={EditRecipePage} />
      <Route exact path="/recipes/new" component={CreateRecipePage} />
      <Route exact path="/plan-meals" component={EditPlanPage} />
      <Route exact path="/plan-meals/new" component={CreatePlanPage} />
      <Route exact path="/create-account" component={CreateAccountPage} />
      <Route>
        Not found
      </Route>
    </Switch>
  )
}
