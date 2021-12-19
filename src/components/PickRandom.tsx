import { getIngredients, getRecipeIdsForIngredient } from "../db/index";
import { useNavigate } from "react-router-dom";

export const PickRandom = () => {
  const ingredients = getIngredients();
  const navigate = useNavigate();
  return (
    <div className="App">
      <div>
        <h2>Get a recipe that uses one of the following ingredients!</h2>
        {ingredients.map((ingredient) => (
          <button
            className="App-button"
            onClick={() => navigate(`/recipe/${randomRecipeId(ingredient)}`)}
          >
            {ingredient}
          </button>
        ))}
      </div>
    </div>
  );
};

function randomRecipeId(ingredient: string) {
  const recipeIds = getRecipeIdsForIngredient(ingredient);
  return recipeIds[Math.floor(Math.random() * recipeIds.length)];
}
