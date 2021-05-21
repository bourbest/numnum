import i18next from 'i18next'
import {isObject} from 'lodash'

// instance is this pointer of React Controler that should have a props.locale
export const createTranslate = (defaultPrefix) => {
  return (messageKey, _prefix, _params = {}) => {
    const params = isObject(_prefix) ? _prefix : _params
    const prefix = isObject(_prefix) ? null : _prefix
    let key = messageKey

    if (prefix) {
      key = prefix + '.' + key
    } else if (defaultPrefix) {
      key = defaultPrefix + '.' + key
    }
    return i18next.t(key, params)
  }
}

export const translate = (key, param) => {
  return i18next.t(key, param)
}

export const translateError = (error) => {
  let errMsg = ''
  if (isObject(error)) {
    const params = {...error.params}
    if (params.otherFieldLabel) {
      params.otherFieldLabel = i18next.t(params.otherFieldLabel, params)
    }
    errMsg = i18next.t(error.error, params)
  } else {
    errMsg = error.indexOf(' ') >= 0 ? error : i18next.t(error)
  }
  return errMsg
}
