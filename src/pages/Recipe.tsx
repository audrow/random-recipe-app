import { useParams } from "react-router-dom";
import { getRecipeById } from "../db/index";
import Layout from "../components/Layout";

export const Recipe = () => {
  const params = useParams();
  const recipe = getRecipeById(parseInt(params.id!));
  if (!recipe) {
    return <h1>Not Found</h1>;
  }
  const ingredients = recipe.ingredients.join(", ");
  return (
    <Layout>
      <h1>{recipe!.name}</h1>
        <p>{ingredients}</p>
        <a href={recipe.url}>URL</a>
    </Layout>
  );
};
