import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'

import {Form, FieldWrapper} from '../../components/Form'
import { NavBar, FullPageTab, FullPageTabs, Instruction } from '../../components'
import {FullPageTextArea} from './FullPageTextArea'
import {translate} from '../../../locales/translate'


export default function RecipeForm (props) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)

  return (
    <Fragment>
      <NavBar onBack={props.onCancel} onSave={props.onSave} saveDisabled={props.errors != null} />
      <Form onChange={props.onChange} errors={props.errors} values={props.recipe} >
      <FullPageTabs activeTabIndex={activeTabIndex} onTabChanged={setActiveTabIndex}>
        <FullPageTab label={translate('recipeForm.info')} icon="food">
          <div className="container mt-2">
            <FieldWrapper type="text" name="name" label="recipeForm.name" className="form-control" />
            <FieldWrapper type="text" label="recipeForm.servings" inputMode="numeric" pattern="[0-9]" className="form-control" name="servings" min="1" />

            <div className="row"  >
              <div className="col">
                <FieldWrapper type="text" label="recipeForm.prepTime" inputMode="numeric" pattern="[0-9]" className="form-control" name="preparationTime" min="0" />
              </div>

              <div className="col">
                <FieldWrapper type="text" label="recipeForm.cookTime" inputMode="numeric" pattern="[0-9]" className="form-control" name="cookingTime" min="0" />
              </div>
            </div>
          </div>
        </FullPageTab>
        <FullPageTab label={translate('recipeForm.ingredients')} icon="food-1">
          <div className="h-100 d-flex-column w-100">
            <Instruction>
              {translate('recipeForm.ingredientExplained')}
              <br/>
              <em>{translate('recipeForm.ingredientExample')}</em>
            </Instruction>
            <FullPageTextArea name="ingredientsText" />
          </div>
        </FullPageTab>
        <FullPageTab label={translate('recipeForm.steps')} icon="clipboard">
          <div className="h-100 d-flex-column w-100">
            <Instruction>
              {translate('recipeForm.stepsExplained')}
            </Instruction>
            <FullPageTextArea name="steps" />
          </div>
        </FullPageTab>
      </FullPageTabs>
      </Form>
    </Fragment>
  )
}

RecipeForm.propTypes = {
  recipe: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}