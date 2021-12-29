import { getIngredients, getRecipeIdsForIngredient } from "../db/index";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export const PickRandom = () => {
  const ingredients = getIngredients();
  const navigate = useNavigate();
  const tabs = ["Main Course", "Appetizer", "Dessert", "All Recipes"]
  const selectedTabIndex = 0
  const selectedTabStyle ="bg-lblue text-white px-5 py-2 rounded-t-2xl w-1/4 border-navy border-x-3 border-t-3"
  const unselectedTabStyle ="bg-lgreen px-5 py-2 rounded-t-2xl w-1/4 border-navy border-3"
  const selectedTab = tabs [selectedTabIndex]
  return (
    <Layout>
      <div className="mx-20">
        <div className="flex justify-between text-xl">
          {tabs.map((tab) =>(
            <button className={tab===selectedTab?selectedTabStyle:unselectedTabStyle}> {tab} </button>
          ))}
        </div>
        <div className="bg-lblue px-5 py-2 rounded-b-2xl border-navy border-x-3 border-b-3">
          <h2>I have...</h2>
          {ingredients.map((ingredient) => (
            <button className="bg-white border-navy border-2 hover:border-2 hover:border-pink active:bg-lt-pink px-2 rounded-md m-1"
              onClick={() => navigate(`/recipe/${randomRecipeId(ingredient)}`)}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
      <button className="bg-pink border-3 border-navy rounded-xl px-5 py-2 text-white text-xl m-8">Wrangle some recipes!</button>
      </div>
    </Layout>
  );
};

function randomRecipeId(ingredient: string) {
  const recipeIds = getRecipeIdsForIngredient(ingredient);
  return recipeIds[Math.floor(Math.random() * recipeIds.length)];
}
