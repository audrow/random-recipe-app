type Course = 'main' | 'dessert' | 'appetizer';
export type CourseAll = Course | 'all';
export type RecipeSchema = {
  id: number;
  name: string;
  course: Course;
  ingredients: string[];
  photo: string;
  url: string;
};

const recipes: RecipeSchema[] = [
  {
    id: 1,
    name: 'Eggs Benedict',
    course: 'main',
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
    course: 'dessert',
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
    course: 'dessert',
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
    course: 'dessert',
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
  },
  {
    id: 5,
    name: 'Salad',
    course: 'appetizer',
    ingredients: [
      'lettuce',
      'spinach',
      'tomato',
      'onion',
      'olive oil',
      'salt',
      'pepper'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/salad'
  },
  {
    id: 6,
    name: 'Steak',
    course: 'main',
    ingredients: [
      'steak',
      'butter',
      'salt',
      'pepper',
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/steak'
  },
]

export function getRecipes (course: CourseAll = 'all', recipes_ = recipes): RecipeSchema[] {
  return recipes_.filter(recipe => recipe.course === course || course === 'all');
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
  return output.sort()
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
