import React from "react"
import {useHistory} from 'react-router-dom'

import {useFormStateManagement} from '../components/Form'
import RecipeForm from './components/RecipeForm'
import {validateRecipe} from '../../modules/recipe/recipe-schema'
import {saveRecipe, getEmptyRecipe} from '../../data/recipe-svc'

export default function CreateRecipePage (props) {
  const {values, errors, hasError, handleChange } = useFormStateManagement(getEmptyRecipe(), validateRecipe)
  const history = useHistory()

  const handleSave = () => {
    if (!hasError) {
      saveRecipe(values).then(recipe => {
        history.replace(`/recipes/${recipe.id}/view`)
      })
    }
  }

  return (
    <RecipeForm recipe={values}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      onCancel={history.goBack}
    />
  )
}
 