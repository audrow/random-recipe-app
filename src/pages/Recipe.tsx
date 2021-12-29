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
  const card = (
      <div className=" bg-white border-navy border-3 rounded-xl m-1 px-2 py-1">
        <h1>{recipe!.name}</h1>
        <img className="border-1 border-navy rounded-md m-2"></img>
        <p>{ingredients}</p>
        <p>Prep Time</p>
        <p>Cook Time</p>
        <a href={recipe.url}>URL</a>
      </div>
  )
  return (
    <Layout>
     <div className="flex mx-28">
     {card}
      {card}
      {card}
      </div>
      <div className="flex justify-center">
      <Link>
      <button className="bg-pink border-3 border-navy rounded-xl px-5 py-2 text-white text-xl m-8">Wrangle more recipes!</button>
      </Link>
      </div>
    </Layout>
  );
};
