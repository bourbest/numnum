import { call, put, select, takeLatest } from 'redux-saga/effects'
import { ActionCreators as AppActions } from '../app/actions'
import { getService } from '../app/selectors'
import {handleError} from '../common/commonHandlers'

import {
  Actions,
  ActionCreators as AuthActionCreators
} from './actions'

function * authSaga (action) {
  const FORM_NAME = 'auth'
  const svc = yield select(getService, 'auth')
  let errorAction = null
  switch (action.type) {
    case Actions.LOG_IN:
      try {
        yield put(AppActions.startSubmit(FORM_NAME))
        const ret = yield call(svc.login, action.username, action.password, action.keepLoggedIn)
  
        if (ret && ret.user) {
          yield put(AppActions.setCsrfToken(ret.csrfToken))
          yield put(AuthActionCreators.setUser(ret.user))
        } else {

        }
        if (action.cb) {
          yield call(action.cb)
        }
      } catch (error) {
        errorAction = handleError(FORM_NAME, error)
      } finally {
        yield put(AppActions.stopSubmit(FORM_NAME))
      }
      break

    case Actions.LOG_OUT:
      try {
        yield call(svc.logout)
      } catch (error) {
        console.log('logout error', error)
      } finally {
        yield put(AuthActionCreators.setUser({}))
      }
      break

    default:
      throw new Error('Unsupported trigger action in auth saga', action)
  }

  if (errorAction) {
    yield put(errorAction)
  }
}

export default takeLatest([
  Actions.LOG_IN,
  Actions.LOG_OUT
], authSaga)
