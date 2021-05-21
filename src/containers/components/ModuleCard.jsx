import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Icon} from './controls'
import {createTranslate} from '../../locales/translate'

export default function ModuleCard (props) {
  const module = props.module
  const translate = createTranslate(module.name)
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{translate('title')}</h5>
        <p className="card-text">{translate('desc')}</p>
        <div className="d-flex justify-content-end w-100">
          {module.actions.map(action => (
            <Link to={action.target} className="btn btn-primary ml-2" key={action.name}>
              {action.icon && <Icon name={action.icon} className="large-icon mr-2" />}
              {translate(action.name)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

ModuleCard.propTypes = {
  module: PropTypes.object.isRequired
}