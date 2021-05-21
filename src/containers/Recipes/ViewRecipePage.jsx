import React, {useState, useEffect, Fragment}  from 'react'
import {useHistory} from 'react-router-dom'
import {useIntUrlParam} from '../locationHooks'
import {FullPageTabs, FullPageTab, NavBar, IconButtonWithLabel } from '../components'
import {getRecipes} from '../../data/recipe-svc'
import {translate} from '../../locales/translate'

export default function ViewRecipePage (props) {
  const [recipesById, setRecipes] = useState(null)
  const history = useHistory()
  useEffect( () => {
    getRecipes().then(setRecipes)
  }, [])
  const [activeTabIndex, setActiveTabIndex] = useIntUrlParam('tab', 0)

  const recipeId = props.match.params.recipeId
  
  if (!recipesById) return (<div>Loading...</div>)

  const recipe = recipesById[recipeId]
  const imageSrc = recipe.imageSrc || '/sample.jpg'
  const handleEdit = () => history.push(`/recipes/${recipeId}/edit`);
  const todo = () => alert('TODO')
  return (
    <Fragment>
      <NavBar onBack={() => history.goBack()} onEdit={handleEdit} />
      <FullPageTabs activeTabIndex={activeTabIndex} onTabChanged={setActiveTabIndex}>
        <FullPageTab label={translate('recipeForm.info')} icon="food">
          <img src={imageSrc} className="recipe-cover-image" alt="recipe cover" />
          <div>
            <h1 className="text-center pl-2 pr-2">{recipe.name}</h1>
            <div className="d-flex justify-content-center">
              <IconButtonWithLabel iconName="edit" label={translate('common.edit')} className="m-2" onClick={handleEdit} />
              <IconButtonWithLabel iconName="trash-empty" label={translate('common.delete')} className="m-2" onClick={todo} />
              <IconButtonWithLabel iconName="share" label={translate('common.share')} className="m-2" onClick={todo} />
              <IconButtonWithLabel iconName="heart" label={translate('common.love')} className="m-2" onClick={todo} />
            </div>  
            <div className="container bg-dark p-1 font-weight-bold">
              <div className="row">
                <div className="col-md-4 col-6 text-center p-2">
                  {translate('viewRecipe.prepare')}&nbsp;
                  {translate('viewRecipe.minute', {count: recipe.preparationTime})}
                </div>
                <div className="col-md-4 col-6 text-center p-2">
                  {translate('viewRecipe.cook')}&nbsp;
                  {translate('viewRecipe.minute', {count: recipe.cookingTime})}
                </div>
                <div className="col-md-4 col-12 text-center p-2">
                  {translate('viewRecipe.servings', {count: recipe.servings})}
                </div>
              </div>
            </div>
          </div>
        </FullPageTab>
        <FullPageTab label={translate('recipeForm.ingredients')} icon="food-1">
          <div className="row mb-2 mt-2">
            <ul className="list-group list-flush list-darker-on-even w-100">
              {recipe.ingredientsText.split('\n').map( (ingredient, idx) => {
                return (<li className="list-group-item" key={idx}>{ingredient}</li>)
              })}
            </ul>
          </div>
        </FullPageTab>
        <FullPageTab label={translate('recipeForm.steps')} icon="clipboard">
          <div className="row mb-2 mt-2">
            <ul className="list-group list-flush list-darker-on-even w-100">
              {recipe.steps.split('\n').map( (step, idx) => {
                return (<li className="list-group-item d-flex align-items-center" key={idx}>
                    <div className="step-index">{idx+1}</div>
                    <div className="step-description">{step}</div>
                  </li>
                  )
              })}
            </ul>
          </div>
        </FullPageTab>
      </FullPageTabs>
    </Fragment>
  )
}