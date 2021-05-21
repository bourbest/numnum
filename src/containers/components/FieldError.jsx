import React from 'react'
import PropTypes from 'prop-types'
import {translateError} from '../../locales/translate'

export default function FieldError (props) {
  if (!props.errors || !props.errors[props.name]) return null

  return (
    <div className="text-danger">
      <small>{translateError(props.errors[props.name])}</small>
    </div>
  )
}

FieldError.propTypes = {
  errors: PropTypes.object,
  name: PropTypes.string.isRequired
}
