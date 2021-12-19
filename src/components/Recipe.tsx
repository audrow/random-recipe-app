import { useParams } from "react-router-dom";
import { getRecipeById } from "../db/index";

export const Recipe = () => {
  const params = useParams();
  const recipe = getRecipeById(parseInt(params.id!));
  if (!recipe) {
    return <h1>Not Found</h1>;
  }
  const ingredients = recipe.ingredients.join(", ");
  return (
    <div className="App">
      <div>
        <h1>{recipe!.name}</h1>
        <p>{ingredients}</p>
        <a className="App-link" href={recipe.url}>URL</a>
      </div>
    </div>
  );
};
