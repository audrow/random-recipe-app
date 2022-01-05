export type RecipeSchema = {
  id: number;
  name: string;
  ingredients: string[];
  photo: string;
  url: string;
};

const recipes: RecipeSchema[] = [
  {
    id: 1,
    name: 'Eggs Benedict',
    ingredients: [
      'eggs',
      'butter',
      'flour',
      'salt',
      'pepper',
      'oil',
      'vanilla'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/eggs-benedict'
  },
  {
    id: 2,
    name: 'Cocoa Puffs',
    ingredients: [
      'cocoa',
      'butter',
      'flour',
      'salt',
      'pepper',
      'oil',
      'vanilla'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/cocoa-puffs'
  },
  {
    id: 3,
    name: 'Chocolate Chip Cookies',
    ingredients: [
      'chocolate',
      'butter',
      'flour',
      'salt',
      'pepper',
      'oil',
      'vanilla'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/chocolate-chip-cookies'
  },
  {
    id: 4,
    name: 'Cinnamon Rolls',
    ingredients: [
      'cinnamon',
      'butter',
      'flour',
      'salt',
      'pepper',
      'oil',
      'vanilla'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/cinnamon-rolls'
  }
]

export function getRecipes (recipes_ = recipes): RecipeSchema[] {
  return recipes_
}

export function getAllIngredients(recipes = getRecipes()) {
  const output: string[] = []
  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (!(output.includes(ingredient))) {
        output.push(ingredient)
      }
    }
  }
  return output
}

export function getRecipesWithIngredients(ingredients: string[], recipes = getRecipes()): RecipeSchema[] {
  return recipes.filter(recipe => {
    for (const ingredient of ingredients) {
      if (!(recipe.ingredients.includes(ingredient))) {
        return false
      }
    }
    return true
  })
}

export function getRecipeById (id: number, recipes = getRecipes()): RecipeSchema | undefined {
  for (const recipe of recipes) {
    if (recipe.id === id) {
      return recipe
    }
  }
  return undefined
}
