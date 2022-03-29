import RestService from './base/rest-service'
const url = 'accounts'

export default class AccountService extends RestService {
  constructor (serviceConfig) {
    super(url, serviceConfig)
    this.changePassword = this.changePassword.bind(this)
  }

  changePassword (payload) {
    return this.serviceConfig.apiClient.post('my-account/change-password', payload)
  }
}

