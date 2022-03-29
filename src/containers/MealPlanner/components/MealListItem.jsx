import React from 'react'
import PropTypes from 'prop-types'
import {RecipeListItemTemplate, Icon} from '../../components'
import { translate } from '../../../locales/translate'

export default function Meal ({recipe, meal, onRemoveMeal, onEditMeal}) {
  const text = meal.useLeftovers
    ? translate('useLeftovers')
    : translate('viewRecipe.servings', {count: meal.servings})

  return (
    <RecipeListItemTemplate recipe={recipe}>
      <div className="flex-grow">
        <div className="recipe-list-item-info">{text}</div>
      </div>
      <div>
        <Icon name="minus" className="large-icon p-2" data-id={meal.id} onClick={onRemoveMeal} />
        <Icon name="calendar" className="large-icon p-2" data-id={meal.id} onClick={onEditMeal} />
      </div>
    </RecipeListItemTemplate>
  )
}

Meal.propTypes = {
  recipe: PropTypes.object.isRequired,
  meal: PropTypes.object.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onEditMeal: PropTypes.func.isRequired
}