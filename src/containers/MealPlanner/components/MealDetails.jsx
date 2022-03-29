import React from 'react'
import PropTypes from 'prop-types'
import {map} from 'lodash'
import {Icon} from '../../components/controls'
import { translate } from '../../../locales/translate'
import {getDayNameWithDate} from '../../../data/string_utils'

function Details (props) {
  const {meal, momentsById, onRemoveMeal, onEditMeal} = props
  const dateLabel = meal.mealDate ? getDayNameWithDate(meal.mealDate) : translate('noDate')
  const momentLabel = meal.mealMomentId ? ', ' + momentsById[meal.mealMomentId].label : ''
  const leftoverLabel = meal.useLeftovers ? ' (' + translate('leftovers') + ')' : ''
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center pr-1">
    {dateLabel}{momentLabel}{leftoverLabel}
    <span>
      <Icon name="minus" className="large-icon p-2" onClick={onRemoveMeal} data-id={meal.id} />
      <Icon name="calendar" className="large-icon p-2" onClick={onEditMeal} data-id={meal.id} />
    </span>
  </li>
  )
}

export default function MealDetails ({momentsById, onRemoveMeal, onEditMeal, meals}) {
  return (
    <ul className="list-group">
      {map(meals, meal => (
        <Details meal={meal} key={meal.id}
          momentsById={momentsById}
          onRemoveMeal={onRemoveMeal}
          onEditMeal={onEditMeal}
        />
      ))}
    </ul>
  )
}

MealDetails.propTypes = {
  meals: PropTypes.array.isRequired,
  momentsById: PropTypes.object.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onEditMeal: PropTypes.func.isRequired
}