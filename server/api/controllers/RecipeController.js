import {RecipeRepository} from '../repository'
import {makeFindAllHandler, makeFindById, makeHandlePost, makeHandlePut} from './StandardController'
import {entityFromBody, restrictToOwner} from '../middlewares'
import {recipeSchema} from '../../../src/modules/recipe/recipe-schema'

const registerIngredientsController = (router) => {
  router.use('/recipe', [
    entityFromBody(recipeSchema),
    restrictToOwner
  ])
  router.route('/recipe')
    .get(makeFindAllHandler(RecipeRepository))
    .post([
      makeHandlePost(RecipeRepository)
    ])

  router.route('/recipe/:id')
    .get(makeFindById(RecipeRepository))
    .put([
      makeHandlePut(RecipeRepository)
    ])
}

export default registerIngredientsController