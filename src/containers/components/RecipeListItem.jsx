import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Icon} from './controls'

export default function RecipeListItem (props) {
  const {recipe, iconOnImage, iconOnImageClass, otherInfo, actions} = props
  const imageSrc = recipe.imageSrc || '/sample.jpg'

  return (
    <div className="recipe-list-item-container w-100 d-flex-row pb-1">
      <div className="recipe-list-item-image position-relative">
        <Link to={`/recipes/${recipe.id}/view`}>
          <img src={imageSrc} className="recipe-list-item-image p-1" alt="recipe cover" />
        </Link>  
        {iconOnImage && <Icon name={iconOnImage} className={"large-icon p-1 " + iconOnImageClass} />}
      </div>
      
      <div className="flex-grow h-100 d-flex-column m-1">
        <div className="recipe-list-item-name w-100">
          <Link to={`/recipes/${recipe.id}/view`}>{recipe.name}</Link>
        </div>
        
        <div className="d-flex w-100 align-items-center flex-grow mb-1">
          <div className="flex-grow">
            <div className="recipe-list-item-info">Prepare: {recipe.preparationTime} mins</div>
            <div className="recipe-list-item-info">Cook : {recipe.cookingTime} mins</div>
            {otherInfo && otherInfo.map( info => (
              <div className="recipe-list-item-info" key={info.label}>{info.value}</div>
            ))}
          </div>
          <div>
            {actions && actions.map( action => (
              <Icon name={action.icon} className="large-icon p-2" data-id={recipe.id} onClick={action.onClick} key={action.icon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  iconOnImage: PropTypes.string,
  iconOnImageClass: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  otherInfo: PropTypes.arrayOf(PropTypes.object)  
}