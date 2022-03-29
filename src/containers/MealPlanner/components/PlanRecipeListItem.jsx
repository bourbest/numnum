import React from 'react'
import PropTypes from 'prop-types'
import {RecipeListItem, Icon} from '../../components'

export default function PlanRecipeListItem ({recipe, onAddMealWithoutDate, onPlanMeal}) {

  return (
    <RecipeListItem recipe={recipe}>
      <Icon name="plus" className="large-icon p-2" data-id={recipe.id} onClick={onAddMealWithoutDate} />
      <Icon name="calendar" className="large-icon p-2" data-id={recipe.id} onClick={onPlanMeal} />
    </RecipeListItem>
  )
}

PlanRecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  onAddMealWithoutDate: PropTypes.func.isRequired,
  onPlanMeal: PropTypes.func.isRequired
}