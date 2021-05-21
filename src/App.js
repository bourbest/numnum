import React, {useState, useEffect, Fragment} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import Routes from './routes'
import {setupDatabase} from './data/indexedDb'

export default function App() {
  const [isReady, setReady] = useState(false)
  const {dbError, setDbError} = useState(null)

  useEffect( () => {
    try {
      setupDatabase().then(db => {
        setReady(true)
      })
    } catch (err) {
      setDbError(err)
    }
  }, [setDbError])

  return (
    <Fragment>
      <Router className="h-100 router">
        {isReady && <Routes className="h-100 routes" />}
      </Router>
      {!isReady && !dbError && <div>Loading...</div>}
      {dbError && <div>{dbError}</div>}
    </Fragment>
  )
}