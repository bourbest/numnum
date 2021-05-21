import { createActions } from '../common/actions'
const prefix = 'AUTH/'

const actions = [
  'LOG_IN',
  'SET_USER',
  'LOG_OUT'
]

export const Actions = createActions(prefix, actions)

export const ActionCreators = {
  loginUser: (username, password, keepLoggedIn, cb) => ({ type: Actions.LOG_IN, username, password, keepLoggedIn, cb }),
  setUser: (user) => ({ type: Actions.SET_USER, user }),
  logoutUser: () => ({ type: Actions.LOG_OUT })
}
