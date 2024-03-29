import React, {useState, useEffect, Fragment} from "react"
import {useHistory} from 'react-router-dom'
import {useDebounce, useFilter} from '../hooks'
import {useIntUrlParam, useUrlParam} from '../locationHooks'
import {getRecipes} from '../../data/recipe-svc'
import {map, isEmpty} from 'lodash'
import {RecipeListItem, NavBar, FullPageTab, FullPageTabs, SearchBox, ModuleCard} from '../components'
import CreationMethods from './create-recipe-methods'
import {translate} from '../../locales/translate'

export default function BrowseRecipesPage (props) {
  //const [filterValue, setFilter] = useState('')
  const [filterValue, setFilter] = useUrlParam('filterValue', '')
  const [recipes, setRecipes] = useState({})
  const history = useHistory()
  const [activeTabIndex, setActiveTabIndex] = useIntUrlParam('tab', 0)

  // initial load of recipes
  useEffect( function () {
    getRecipes().then(setRecipes)
  }, [])

  // filter and sort recipes by label
  const debouncedFilter = useDebounce(filterValue, 300)
  const filteredRecipes = useFilter(recipes, debouncedFilter)

  return (
    <Fragment>
      <NavBar onBack={() => history.goBack()} />
      <FullPageTabs activeTabIndex={activeTabIndex} onTabChanged={setActiveTabIndex}>
        <FullPageTab icon="search" label={translate('browseRecipe.all')}>
          <div className="container p-2">
            <SearchBox value={filterValue} onChange={setFilter} placeholder={translate('browseRecipe.searchPlaceholder')} />
          </div>
          
          {isEmpty(recipes) &&
            <div className="container p-2 d-flex flex-grow justify-content-center align-items-center">
              {translate('browseRecipe.noRecipe')}
            </div>
          }
          <div className="recipe-list">
            {map(filteredRecipes, recipe => (
              <div className="recipe-list-item" key={recipe.id}>
                <RecipeListItem recipe={recipe} id={recipe.id} />
              </div>  
            ))}
          </div>
        
        </FullPageTab>
        <FullPageTab icon="heart" label="Loved (todo)">
            test
        </FullPageTab>
        <FullPageTab icon="clock" label="Planned (todo)">
          test
        </FullPageTab>
        <FullPageTab icon="plus" label={translate('browseRecipe.add')}>
          <div className="container">
            <div className="row">
              {CreationMethods.map(method => (
                <div className="col-lg-6 mt-2 mb-2" key={method.name}>
                  <ModuleCard module={method} />
                </div>
              ))}
            </div>
          </div>
        </FullPageTab>
      </FullPageTabs>
    </Fragment>
  )
}