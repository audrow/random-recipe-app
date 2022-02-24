import * as React from 'react'

import { getRecipes } from "../db/index";
import Layout from "../components/Layout";
import Recipe from '../components/Recipe';

const Recipes = () => {
  const recipes = getRecipes();
  return (
    <Layout isShowFindRecipeButton={true}>
      <div className='pb-5'>
        <h1 className='text-center text-navy text-xl'>All Recipes</h1>
        <div className='flex justify-center'>
          <div className="flex flex-wrap justify-center max-w-3xl">
          {recipes.map((recipe) => (
            <Recipe recipe={recipe} key={recipe.id}/>
          ))}
          </div>
         </div>
      </div>
    </Layout>
  );
};

export default Recipes;