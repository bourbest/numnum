import React from "react"
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Icon} from './controls'

export default function RecipeTile (props) {
  const {recipe, iconOnImage, iconOnImageClass, actions} = props
  const imageSrc = recipe.imageSrc || '/sample.jpg'
  return (
    <div className="w-100">
      <div className="recipe-tile-image position-relative">
        <Link to={`/recipes/${recipe.id}/view`}>
          <img src={imageSrc} className="recipe-tile-image" alt="recipe cover" />
        </Link>
        {iconOnImage && <Icon name={iconOnImage} className={"large-icon p-1 " + iconOnImageClass} />}
      </div>
      
      <div className="m-1">
        <div className="tile-title">
          <Link to={`/recipes/${recipe.id}/view`}>{recipe.name}</Link>
        </div>
        <div className="d-flex align-content-end justify-content-end mt-2">
          {actions && actions.map( action => (
              <Icon name={action.icon} className="large-icon p-2" data-id={recipe.id} onClick={action.onClick} key={action.icon} />
          ))}
        </div>
      </div>
    </div>
  )
}

RecipeTile.propTypes = {
  recipe: PropTypes.object.isRequired,
  iconOnImage: PropTypes.string,
  iconOnImageClass: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  otherInfo: PropTypes.arrayOf(PropTypes.object) 
}