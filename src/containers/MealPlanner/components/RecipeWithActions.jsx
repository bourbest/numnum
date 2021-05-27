import React from 'react'
import PropTypes from 'prop-types'
import {RecipeListItem, RecipeTile} from '../../components'

export default function RecipeWithActions (props) {
  const RecipeTag = props.displayMode === 'large'
    ? RecipeTile
    : RecipeListItem
  const iconOnImage = props.isSelected ? 'food-1' : null
  const iconOnImageClass = iconOnImage ? 'planned-pill' : null
  const actions = props.isSelected
    ? [props.actions.delete, props.actions.plan]
    : [props.actions.add, props.actions.plan]

  return (<RecipeTag
    id={props.recipe.id}
    recipe={props.recipe}
    actions={actions}
    iconOnImage={iconOnImage}
    iconOnImageClass={iconOnImageClass}
  />)
}

RecipeWithActions.propTypes = {
  displayMode: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  actions: PropTypes.object
}