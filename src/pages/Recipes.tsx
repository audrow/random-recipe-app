import { Link } from "react-router-dom";

import { getRecipes } from "../db/index";
import Layout from "../components/Layout";

export const Recipes = () => {
  const recipes = getRecipes();
  return (
    <Layout>
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
    </Layout>
  );
};
