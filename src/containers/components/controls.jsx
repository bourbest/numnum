import React from 'react'
import PropTypes from 'prop-types'

export const Icon = ({name, className, ...otherProps}) => (
  <i className={`icon-${name} ${className}`} {...otherProps} />
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}


export const IconButtonWithLabel = ({iconName, label, onClick, className}) => (
  <span className={`button-icon clickable text-center ${className}`} onClick={onClick}>
    <span className="w-100 large-icon">
      <Icon name={iconName} className="large-icon" />
    </span>
    <span className="w-100 text-uppercase">
      {label}
    </span>
  </span>
)

IconButtonWithLabel.propTypes = {
  iconName: PropTypes.string.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
}

export const Instruction = ({children}) => (
  <p className="dark-grey-background p-2 m-0 w-100">{children}</p>
)

export const Checkbox = ({name, onChange, value, label, className}) => (
  <button onClick={onChange} name={name} className="checkbox d-flex align-items-center" value={value ? false : true}>
    <span className="check">
      <Icon name={value ? 'check' : 'check-empty'} />
    </span>
    <span className="flex-grow">
      {label && <span className={className}>{label}</span>}
    </span>
  </button>
)

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired
}
  