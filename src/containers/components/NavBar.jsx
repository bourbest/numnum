import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from './controls'

const NavButton = function (props) {
  const otherClasses = props.disabled ? "text-muted" : ""
  return (
    <span onClick={props.onClick} className={'p-2 pointer ' + otherClasses}>
      {props.textBefore || ''}
      <Icon name={props.icon} />
      {props.textAfter || ''}
    </span> 
  )
}

export default function NavBar (props) {
  const {onBack, onBrowseDisplayToggle, onSave, onFilter, browseDisplayIcon, onEdit} = props
  const fixed = props.fixed === true ? 'sticky-top' : ''
  return (
    <div className={`top-nav-bar pt-2 ${fixed}`}>
      <div className="w-25">
        {onBack && !onSave &&
          <NavButton onClick={onBack} icon="left-open" />
        }

        {onBack && onSave &&
          <NavButton onClick={onBack} icon="cancel" textAfter="Cancel" />
        }

        {browseDisplayIcon && 
          <NavButton onClick={onBrowseDisplayToggle} icon={browseDisplayIcon} />
        }
      </div>

      <div className="w-50 text-center">
        <span className="p-2">Num num</span>
      </div>

      <div className="w-25 text-right">
        {onSave &&
          <NavButton onClick={onSave} icon="ok" textBefore="Save" disabled={props.saveDisabled} />
        }

        {onFilter &&
          <NavButton onClick={onFilter} icon="filter" />
        }

        {onEdit &&
          <NavButton onClick={onEdit} icon="edit" />
        }
      </div>    
    </div>
  );
}

NavBar.propTypes = {
  onBack: PropTypes.func,
  onBrowseDisplayToggle: PropTypes.func,
  browseDisplayIcon: PropTypes.string,
  onSave: PropTypes.func,
  saveDisabled: PropTypes.bool,
  onFilter: PropTypes.func,
  onEdit: PropTypes.func,
  fixed: PropTypes.bool
}
