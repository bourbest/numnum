import AccountsController from './AccountsController'
import AuthenticationController from './AuthenticationController'
import registerIngredientsController from './IngredientsController'

export default function registerRoutes (router) {
  router.route('/accounts')
    .post(AccountsController.createAccount)

  router.route('/authenticate')
    .post(AuthenticationController.login)
    .delete(AuthenticationController.logout)

  registerIngredientsController(router);
}