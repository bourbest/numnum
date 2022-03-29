const url = 'authenticate'

export default class AuthService {
  constructor (serviceConfig) {
    this.serviceConfig = serviceConfig

    this.resume = this.resume.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  resume () {
    return this.serviceConfig.apiClient.get(url)
  }

  login (username, password) {
    const payload = {username, password}
    return this.serviceConfig.apiClient.post(url, payload)
  }

  logout () {
    return this.serviceConfig.apiClient.delete(url, '')
  }

}

