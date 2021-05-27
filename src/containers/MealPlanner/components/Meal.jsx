import React from 'react'
import PropTypes from 'prop-types'
import {RecipeListItem, RecipeTile} from '../../components'
import { translate } from '../../../locales/translate'

export default function Meal (props) {
  const RecipeTag = props.displayMode === 'large'
    ? RecipeTile
    : RecipeListItem
  
    const actions = [
      {icon: 'minus', onClick: props.onRemoveMeal},
      {icon: 'calendar', onClick: props.onEditMeal}
    ]

  const otherInfo = [
    {label: translate('recipeForm.servings'), value: props.meal.servings}
  ]
  return (<RecipeTag
    id={props.meal.id}
    recipe={props.recipe}
    actions={actions}
    otherInfo={otherInfo}
  />)
}

Meal.propTypes = {
  recipe: PropTypes.object.isRequired,
  meal: PropTypes.object.isRequired,
  displayMode: PropTypes.string.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onEditMeal: PropTypes.func.isRequired
}