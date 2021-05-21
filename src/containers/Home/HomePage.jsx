import React, {Fragment} from "react"
import {ModuleList} from '../../data/module-list'
import {NavBar, ModuleCard} from '../components'

export default function HomePage() {
  return (
    <Fragment>
      <NavBar fixed />
      <div className="container">
        <div className="row">
          {ModuleList.map(module => (
            <div className="col-lg-6 mt-2 mb-2" key={module.name}>
              <ModuleCard module={module} />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  )
}