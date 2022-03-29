import React from 'react'
import ReactDOM from 'react-dom'
import './resources/custom.scss'
import createI18n from './locales/i18n'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ApiClient from './services/base/api-client'
import {initializeServices} from './services'
const lng = 'en'

const i18n = createI18n(lng)
initializeServices(new ApiClient())
i18n.loadNamespaces(['languages'], function () {
  i18n.on('initialized', function () {
    ReactDOM.render(<App />, document.getElementById('root'))
  })
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
