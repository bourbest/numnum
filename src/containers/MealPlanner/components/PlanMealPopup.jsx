import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {sortBy} from 'lodash'
import {Icon, Calendar, RecipeListItem, Checkbox} from '../../components'
import {useIncrementField, useUpdateField, useFieldToggler} from '../../formHooks'
import {translate} from '../../../locales/translate'

export default function PlanMealPopup ({recipe, meal, mealMomentsById, onCancel, visible, onMealChanged, onSaveMeal, onSaveAndPlanLeftovers}) {
  const classes = visible ? 'visible' : ''
  const sortedMoments = sortBy(mealMomentsById, 'order')
  const handleFieldIncremented = useIncrementField(meal, onMealChanged)
  const handleFieldUpdated = useUpdateField(meal, onMealChanged)
  const handleFieldToggled = useFieldToggler(meal, onMealChanged)

  return (
    <div className={`roll-up-tab ${classes} dark2`} >
      {visible && 
      <Fragment>
        <h3 className="w-100 text-center">{translate('planMealPopup.title')}</h3>
        {recipe !== null && <RecipeListItem recipe={recipe} />}
        <div className="p-2 mt-1">
          <div className="d-flex justify-content-center pb-2">
            {visible && <Calendar
              name="mealDate"
              value={meal.mealDate}
              onChange={handleFieldUpdated}
            />
            }
          </div>
          <div className="mt-2">
            <label>{translate('planMealPopup.selectMoment')}</label>
            <div>
              {sortedMoments.map (moment => {
                const classNames = moment.id === meal.mealMomentId
                  ? "btn btn-primary m-2"
                  : "btn btn-outline-primary m-2"
                return (
                <button type="button" className={classNames} value={moment.id} key={moment.id} name="mealMomentId" onClick={handleFieldUpdated}>
                  {moment.label}
                </button>)
              })}
            </div>
          </div>
          <div className="w-100">
            <span>{translate('recipeForm.servings')}</span>
            <div className="d-flex justify-content-center w-100 mt-2">
              <div className="d-flex align-items-center justify-content-space-between">
                <button className="btn btn-secondary" value="-1" name="servings" onClick={handleFieldIncremented} disabled={meal.servings === 1 || meal.useLeftovers}><Icon name="minus" /></button>
                <label className={"ml-4 mr-4 " + (meal.useLeftovers ? "text-muted" : "")}>{meal.servings}</label>
                <button className="btn btn-secondary" value="1" name="servings" onClick={handleFieldIncremented} disabled={meal.useLeftovers}><Icon name="plus" /></button>
              </div>
              <Checkbox onChange={handleFieldToggled} name="useLeftovers" value={meal.useLeftovers} label="Use leftovers" />
            </div>
          </div>

          <div className="mt-3 d-flex-column">
            <button className="btn btn-primary mb-1" type="button" onClick={onSaveMeal}>
              {meal.id === undefined ? translate('planMealPopup.addToPlanning') : translate('planMealPopup.updatePlanning')}
            </button>
            <button className="btn btn-light mb-1" type="button" onClick={onCancel}>{translate('common.cancel')}</button>
          </div>
        </div>
      </Fragment>}
    </div>
  )
}

PlanMealPopup.propTypes = {
  recipe: PropTypes.object,
  meal: PropTypes.object,
  mealMomentsById: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  onMealChanged: PropTypes.func.isRequired,
  onSaveMeal: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}