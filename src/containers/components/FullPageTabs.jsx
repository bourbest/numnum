import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from './controls'

export function FullPageTab (props) {
  return props.children
}

FullPageTab.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.string
}

export function FullPageTabs (props) {
  const activeTabIndex = props.activeTabIndex
  const tabs = []
  const tabNavItems = []

  for (let idx = 0; idx < props.children.length; idx++) {
    const TabContent = props.children[idx]
    const active = idx === activeTabIndex
     ? "active"
     : idx < activeTabIndex ? "hidden-left" : "hidden-right"

    const tabProps = TabContent.props
    const tabNavItem = (
      <li className={`nav-item clickable ${active}`} key={tabProps.icon} onClick={() => props.onTabChanged(idx)}>
        <span className="nav-link" tabIndex="-1">
          <div className="row justify-content-center"><Icon name={tabProps.icon} /></div>
          <div className="row justify-content-center"><small>{tabProps.label}</small></div>
        </span>
      </li>
    )
    tabNavItems.push(tabNavItem)
    
    const tab = (
      <div className={`full-page-tab d-flex flex-column ${active}`} key={tabProps.icon}>
        {TabContent}
      </div>
    )
    tabs.push(tab)
  }
  
  return (
    <div className="full-page-with-tabs">
      <div className="full-page-tabs">
        {tabs}
      </div>
      <div className="full-page-tab-navigation">
        <ul className="nav nav-fill p-0 m-0">
          {tabNavItems}
        </ul>
      </div>
    </div>
  )
}

FullPageTabs.propTypes = {
  activeTabIndex: PropTypes.number.isRequired,
  onTabChanged: PropTypes.func.isRequired
}