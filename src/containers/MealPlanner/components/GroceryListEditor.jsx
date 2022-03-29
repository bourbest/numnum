import PropTypes from "prop-types";
import { map } from "lodash";
import { computeIngredientList } from "../../../modules/plan/selectors";

export default function GroceryListEditor({
  recipesById,
  meals,
  ingredientsById,
}) {
  const ingredients = computeIngredientList(
    meals,
    recipesById,
    ingredientsById
  );

  return map(ingredients, (ingredient) => {
    return (
      <div key={ingredient.id}>
        {ingredient.quantity ?? ""} {ingredient.name}
      </div>
    );
  });
}

GroceryListEditor.propTypes = {
  recipesById: PropTypes.object.isRequired,
  meals: PropTypes.array.isRequired,
  ingredientsById: PropTypes.object.isRequired,
};
