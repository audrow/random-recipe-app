import * as React from 'react'

import { getRecipes } from "../db/index";
import Layout from "../components/Layout";
import Recipe from '../components/Recipe';

const Recipes = () => {
  const recipes = getRecipes();
  return (
    <Layout>
      <div>
        <h1>Recipes</h1>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <Recipe recipe={recipe} />
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Recipes;