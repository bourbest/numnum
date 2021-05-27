import React, {useEffect} from "react"
import {useHistory} from 'react-router-dom'
import {useFormStateManagement} from '../components/Form'
import {getRecipeById, saveRecipe, getEmptyRecipe} from '../../data/recipe-svc'
import {validateRecipe} from '../../modules/recipe/recipe-schema'
import RecipeForm from './components/RecipeForm'

export default function EditRecipesPage (props) {
  const recipeId = props.match.params.recipeId
  const {values, errors, hasError, handleChange, setFormValues } = useFormStateManagement(getEmptyRecipe(), validateRecipe)
  const history = useHistory()

  const handleSave = () => {
    if (!hasError) {
      saveRecipe(values).then(recipe => {
        saveRecipe(recipe).then(() => history.goBack())
      })
    }
  }

  // initial load of recipes
  useEffect( function () {
    getRecipeById(recipeId).then(setFormValues)
  }, [recipeId, setFormValues])
  

  return (
    <RecipeForm recipe={values}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={history.goBack}
    />
  )
}