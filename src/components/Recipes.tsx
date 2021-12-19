import { Link } from "react-router-dom";

import { getRecipes } from "../db/index";

export const Recipes = () => {
  const recipes = getRecipes();
  return (
    <div className="App">
      <div>
        <h1>Recipes</h1>
        <ul>
          {recipes.map((recipe) => (
            <li>
              <Link className="App-link" to={`/recipe/${recipe.id}`}>
                {recipe.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
