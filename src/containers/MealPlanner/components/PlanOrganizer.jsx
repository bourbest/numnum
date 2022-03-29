import PropTypes from "prop-types";
import { groupBy, forEach, sortBy } from "lodash";
import MealListItem from "./MealListItem";
import { translate } from "../../../locales/translate";
import { getDayNameWithDate } from "../../../data/string_utils";

function getMealsGroupedByMoment(meals, momentsById) {
  const mealsByMomentId = groupBy(meals, "mealMomentId");
  const ret = [];
  forEach(mealsByMomentId, (meals, momentId) => {
    const moment = momentId !== "null" ? momentsById[momentId] : null;
    ret.push({
      id: moment ? moment.id : "null",
      label: moment ? moment.label : translate("planOrganizer.noMoment"),
      meals,
      sortIdx: moment ? moment.order : "-1",
    });
  });

  return sortBy(ret, "sortIdx");
}

function getMealsGroupedByDay(meals, momentsById) {
  const mealsByDate = groupBy(meals, "mealDate");
  const ret = [];
  forEach(mealsByDate, (meals, date) => {
    ret.push({
      label:
        date !== "null"
          ? getDayNameWithDate(date)
          : translate("planOrganizer.noDate"),
      moments: getMealsGroupedByMoment(meals, momentsById),
      sortName: date !== "null" ? date : "0",
    });
  });

  return sortBy(ret, "sortName");
}

export default function PlanOrganizer(props) {
  const ret = [];
  const { mealMomentsById, recipesById } = props;
  const mealsByDay = getMealsGroupedByDay(props.meals, mealMomentsById);

  for (let i = 0; i < mealsByDay.length; i++) {
    const day = mealsByDay[i];
    ret.push(
      <h3 key={day.sortName} className="text-center">
        {day.label}
      </h3>
    );
    for (let j = 0; j < day.moments.length; j++) {
      const moment = day.moments[j];
      ret.push(<h3 key={day.sortName + moment.id}>{moment.label}</h3>);
      for (let k = 0; k < moment.meals.length; k++) {
        const meal = moment.meals[k];
        ret.push(
          <MealListItem
            meal={meal}
            recipe={recipesById[meal.recipeId]}
            onEditMeal={props.onEditMeal}
            onRemoveMeal={props.onRemoveMeal}
            key={meal.id}
          />
        );
      }
    }
  }

  return ret;
}

PlanOrganizer.propTypes = {
  meals: PropTypes.array.isRequired,
  mealMomentsById: PropTypes.object.isRequired,
  recipesById: PropTypes.object.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onEditMeal: PropTypes.func.isRequired,
};
