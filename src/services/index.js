// import RestService from '../../lib/services/rest-service'
import AuthService from './authentication-service'
import AccountService from './account-service'


const _serviceConfig = {}

export const initializeServices = function (apiClient) {
  _serviceConfig.apiClient = apiClient
}

export const authSvc = new AuthService(_serviceConfig)
export const accountSvc = new AccountService(_serviceConfig)
