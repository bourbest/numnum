import React, {Fragment} from 'react'
import PropTypes from 'prop-types'

import {FieldError, useFormContext} from '../../components/Form'

export const FullPageTextArea = function ({name}) {
  const { values, handleChange, handleBlur, errors, showErrors, visited } = useFormContext()
  const error = errors && errors[name]
  const showError = error && (showErrors || visited[name] === true) 

  return (
    <Fragment>
      {showError && <FieldError error={error} /> }
      <textarea className="w-100 m-0 flex-grow" name={name}
        value={values[name]} onChange={handleChange} onBlur={handleBlur} />
    </Fragment>
  )
}

FullPageTextArea.propTypes = {
  name: PropTypes.string.isRequired
}
