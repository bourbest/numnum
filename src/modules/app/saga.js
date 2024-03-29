import { takeEvery } from 'redux-saga/effects'
// import {toastr} from 'react-redux-toastr'
// import i18next from 'i18next'

import { Actions } from './actions'

function * appSaga (action) {
  switch (action.type) {
    case Actions.NOTIFY:
      /*
      const title = i18next.t(action.title, lng)
      const message = i18next.t(action.message, {...action.params, lng})
      if (action.isError) {
        toastr.error(title, message)
      } else {
        toastr.success(title, message)
      }
      */
      break

    default:
      throw new Error('Unsupported trigger action in app saga', action)
  }
}

export default takeEvery(Actions.NOTIFY, appSaga)
