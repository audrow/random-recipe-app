type RecipeSchema = {
  id: number;
  name: string;
  ingredients: string[];
  url: string;
};

const recipes: RecipeSchema[] = [
  {
    id: 1,
    name: "Eggs Benedict",
    ingredients: [
      "eggs",
      "butter",
      "flour",
      "salt",
      "pepper",
      "oil",
      "vanilla",
    ],
    url: "https://www.bbcgoodfood.com/recipes/eggs-benedict",
  },
  {
    id: 2,
    name: "Cocoa Puffs",
    ingredients: [
      "cocoa",
      "butter",
      "flour",
      "salt",
      "pepper",
      "oil",
      "vanilla",
    ],
    url: "https://www.bbcgoodfood.com/recipes/cocoa-puffs",
  },
  {
    id: 3,
    name: "Chocolate Chip Cookies",
    ingredients: [
      "chocolate",
      "butter",
      "flour",
      "salt",
      "pepper",
      "oil",
      "vanilla",
    ],
    url: "https://www.bbcgoodfood.com/recipes/chocolate-chip-cookies",
  },
  {
    id: 4,
    name: "Cinnamon Rolls",
    ingredients: [
      "cinnamon",
      "butter",
      "flour",
      "salt",
      "pepper",
      "oil",
      "vanilla",
    ],
    url: "https://www.bbcgoodfood.com/recipes/cinnamon-rolls",
  },
];

export function getRecipes() {
  return recipes;
}

export function getIngredientsToRecipeIds() {
  const ingredientsToRecipeId: { [ingredient: string]: number[] } = {};

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (!(ingredient in ingredientsToRecipeId)) {
        ingredientsToRecipeId[ingredient] = [];
      }
      ingredientsToRecipeId[ingredient].push(recipe.id);
    }
  }

  return ingredientsToRecipeId;
}

export function getIngredients() {
  return Object.keys(getIngredientsToRecipeIds());
}

export function getRecipeIdsForIngredient(ingredient: string) {
  return getIngredientsToRecipeIds()[ingredient];
}

export function getRecipeById(id: number) {
  for (const recipe of recipes) {
    if (recipe.id === id) {
      return recipe;
    }
  }
  return null;
}
