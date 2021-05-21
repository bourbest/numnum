import { combineReducers } from 'redux'

import auth from './authentication/reducer'
import app from './app/reducer'

export default combineReducers({
  auth,
  app,
})
