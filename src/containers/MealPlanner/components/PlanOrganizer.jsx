import PropTypes from 'prop-types'
import {groupBy, forEach, sortBy} from 'lodash'
import Meal from './Meal'
import {translate} from '../../../locales/translate'

function getMealsGroupedByMoment (meals, momentsById) {
  const mealsByMomentId = groupBy(meals, 'mealMomentId')
  const ret = []
  forEach(mealsByMomentId, (meals, momentId) => {
    const moment = momentId !== 'null' ? momentsById[momentId] : null
    ret.push({
      label: moment ? moment.label : translate('planOrganizer.noMoment'),
      meals,
      sortIdx: moment ? moment.order : '-1'
    })
  })

  return sortBy(ret, 'sortIdx')
}

function getMealsGroupedByDay (meals, momentsById) {
  const mealsByDate = groupBy(meals, 'mealDate')
  const ret = []
  forEach(mealsByDate, (meals, date) => {
    ret.push({
      label: date !== 'null' ? date : translate('planOrganizer.noDate'),
      moments: getMealsGroupedByMoment(meals, momentsById),
      sortName: date !== 'null' ? date : '0'
    })
  })

  return sortBy(ret, 'sortName')
}

export const PlanOrganizer = (props) => {
  const ret = []
  const {mealMomentsById, recipesById} = props
  const mealsByDay = getMealsGroupedByDay(props.meals, mealMomentsById)

  for (let i = 0; i < mealsByDay.length; i++) {
    const day = mealsByDay[i]
    ret.push(<h3 key={day.sortName}>{day.label}</h3>)
    for (let j = 0; j < day.moments.length; j++) {
      const moment = day.moments[j]
      ret.push(<h3 key={moment.sortIdx}>{moment.label}</h3>)
      for (let k = 0; k < moment.meals.length; k++) {
        const meal = moment.meals[k]
        ret.push(<Meal meal={meal}
          displayMode={props.displayMode}
          recipe={recipesById[meal.recipeId]}
          onEditMeal={props.onEditMeal}
          onRemoveMeal={props.onRemoveMeal}
          key={meal.id}  />
        )
      }
    }
  }
  
  return ret;
}

PlanOrganizer.propTypes = {
  meals: PropTypes.array.isRequired,
  mealMomentsById: PropTypes.object.isRequired,
  recipesById: PropTypes.object.isRequired,
  displayMode: PropTypes.string.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onEditMeal: PropTypes.func.isRequired
}