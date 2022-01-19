type Course = 'main' | 'dessert' | 'appetizer';
export type CourseAll = Course | 'all';
export type RecipeSchema = {
  id: number;
  name: string;
  course: Course;
  ingredients: string[];
  photo: string;
  url: string;
  cookTime: number;
  prepTime: number;
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
    url: 'https://www.bbcgoodfood.com/recipes/eggs-benedict',
    cookTime: 25,
    prepTime: 10,

  },
  {
    id: 2,
    name: 'Cocoa Puffs',
    course: 'dessert',
    ingredients: [
      'cocoa',
      'coconut',
      'coconut oil',
      'butter',
      'flour',
      'salt',
      'pepper',
      'oil',
      'vanilla'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/cocoa-puffs',
    cookTime: 25,
    prepTime: 10,
  },
  {
    id: 3,
    name: 'Chocolate Chip Cookies',
    course: 'dessert',
    ingredients: [
      'chocolate',
      'coconut oil',
      'butter',
      'flour',
      'salt',
      'pepper',
      'vanilla'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/chocolate-chip-cookies',
    cookTime: 25,
    prepTime: 10,
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
    url: 'https://www.bbcgoodfood.com/recipes/cinnamon-rolls',
    cookTime: 25,
    prepTime: 10,
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
    photo: 'https://omnivorescookbook.com/wp-content/uploads/2021/12/211214_An-Easy-Chinese-Greens-Recipe_1.jpg',
    url: 'https://www.bbcgoodfood.com/recipes/salad',
    cookTime: 25,
    prepTime: 10,
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
    photo: 'https://www.omahasteaks.com/gifs/990x594/fmbc8az.jpg',
    url: 'https://www.bbcgoodfood.com/recipes/steak',
    cookTime: 25,
    prepTime: 10,
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
