import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

export function RecipeListItemTemplate (props) {
  const {recipe} = props
  const imageSrc = recipe.imageSrc || '/sample.jpg'

  return (
    <div className="recipe-list-item-container w-100 d-flex-row pb-1">
      <div className="recipe-list-item-image position-relative">
        <Link to={`/recipes/${recipe.id}/view`}>
          <img src={imageSrc} className="recipe-list-item-image p-1" alt="recipe cover" />
        </Link>  
      </div>
      
      <div className="flex-grow h-100 d-flex-column m-1">
        <div className="recipe-list-item-name w-100">
          <Link to={`/recipes/${recipe.id}/view`}>{recipe.name}</Link>
        </div>
        
        <div className="d-flex w-100 align-items-center flex-grow mb-1">
          {props.children}
        </div>
      </div>
    </div>
  )
}

RecipeListItemTemplate.propTypes = {
  recipe: PropTypes.object.isRequired,
  children: PropTypes.any
}

export function RecipeListItem ({recipe, children}) {
  return (
    <RecipeListItemTemplate recipe={recipe}>
      <div className="flex-grow">
        <div className="recipe-list-item-info">Prepare: {recipe.preparationTime} mins</div>
        <div className="recipe-list-item-info">Cook : {recipe.cookingTime} mins</div>
      </div>
      {children && <div>{children}</div>}
    </RecipeListItemTemplate>
  )
}

RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  children: PropTypes.any
}