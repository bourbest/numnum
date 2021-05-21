import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { translate, translateError } from '../../locales/translate'

const FormContext = createContext(null)
const FormProvider = FormContext.Provider

export function useFormContext() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

export const useFormStateManagement = function (initialValues, validate) {
  const [isDirty, setDirty] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [errors, setErrors] = useState(null)
  const [values, setFormValues] = useState(initialValues)

  const handleChange = (event) => {
    const newValues = {...values}
    newValues[event.currentTarget.name] = event.currentTarget.value
    setFormValues(newValues)
    setDirty(true)
    if (validate) {
      const errors = validate(newValues)
      setErrors(errors)
      setHasError(errors !== null)
    }
  }

  return {
    isDirty,
    values,
    hasError,
    errors,
    handleChange,
    setFormValues
  }
}

export const Form = ({values, errors, onChange, showErrors, children}) => {
  const [visited, setVisited] = useState({})

  const handleBlur = function (event) {
    const name = event.target.name;
    if (!visited[name]) {
      const newVisited = {...visited}
      newVisited[name] = true
      setVisited(newVisited)
    }
  }

  return (
    <FormProvider value={{ values, visited, errors, showErrors, handleChange: onChange, handleBlur }}>
      {children}
    </FormProvider>
  )
}

Form.propTypes = {
  values: PropTypes.object.isRequired,
  errors: PropTypes.object,
  showErrors: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired
}

export const Field = ({name, type, ...otherProps}) => {
  const { values, handleChange, handleBlur } = useFormContext()

  const value = values && values[name]
  const InputTag = type

  return typeof(type) === 'string'
    ? <input type={type} name={name} onChange={handleChange} onBlur={handleBlur} {...otherProps} value={value} />
    : <InputTag name={name} onChange={handleChange} {...otherProps} value={value} />
};

Field.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired
}

export const FieldWrapper = ({label, name, errorOnTop, ...otherProps}) => {
  const { errors, showErrors, visited } = useFormContext()
  const error = errors && errors[name]
  const showError = error && (showErrors || visited[name] === true) 

  return (
    <div className="form-group">
      <label>{translate(label)}</label>
      {errorOnTop && showError && <FieldError error={error} />}
      <Field name={name} {...otherProps} />
      {!errorOnTop && showError && <FieldError error={error} />}
    </div>
  )
}

FieldWrapper.propTypes = {
  type: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorOnTop: PropTypes.bool
}

export function FieldError (props) {
  if (!props.error) return null

  return (
    <div className="text-danger">
      <small>{translateError(props.error)}</small>
    </div>
  )
}

FieldError.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
}