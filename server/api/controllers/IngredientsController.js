import {IngredientRepository} from '../repository'
import {makeFindAllHandler, makeFindById, makeHandlePost, makeHandlePut} from './StandardController'
import {entityFromBody, restrictToOwner} from '../middlewares'
import {ingredientSchema} from '../../../src/modules/ingredient/ingredient-schema'

const registerIngredientsController = (router) => {
  router.use('/ingredients', [
    entityFromBody(ingredientSchema),
    restrictToOwner
  ])
  router.route('/ingredients')
    .get(makeFindAllHandler(IngredientRepository))
    .post([
      makeHandlePost(IngredientRepository)
    ])

  router.route('/ingredients/:id')
    .get(makeFindById(IngredientRepository))
    .put([
      makeHandlePut(IngredientRepository)
    ])
}

export default registerIngredientsController