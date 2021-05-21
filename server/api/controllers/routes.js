import AccountsController from './AccountsController'
import AuthenticationController from './AuthenticationController'

export default function registerRoutes (router) {
  router.route('/accounts')
    .post(AccountsController.createAccount)

  router.route('/authenticate')
    .post(AuthenticationController.login)
    .delete(AuthenticationController.logout)
}