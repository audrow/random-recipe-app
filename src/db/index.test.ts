/* eslint-disable no-undef */

import { getRecipes, getRecipesWithIngredients, getAllIngredients} from './index'
import type { RecipeSchema } from './index'

const recipes: RecipeSchema[] = [
  {
    id: 1,
    name: 'Eggs Benedict',
    course: 'main',
    ingredients: [
      'butter',
      'eggs',
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/eggs-benedict'
  },
  {
    id: 2,
    name: 'Cocoa Puffs',
    course: 'appetizer',
    ingredients: [
      'butter',
      'chocolate',
      'crack'
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/cocoa-puffs'
  },
  {
    id: 3,
    name: 'Chocolate Chip Cookies',
    course: 'dessert',
    ingredients: [
      'butter',
      'eggs',
      'chocolate',
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/chocolate-chip-cookies'
  },
]

test('get recipes', () => {
  const recipesPassedIn = getRecipes(undefined, recipes)
  expect(recipesPassedIn).toBeInstanceOf(Array)
  expect(recipesPassedIn).toHaveLength(recipes.length)
  expect(recipesPassedIn).toEqual(recipes)
})

test('get recipes with courses', () => {
  expect(getRecipes('main', recipes)).toHaveLength(1)
  expect(getRecipes('dessert', recipes)).toHaveLength(1)
  expect(getRecipes('appetizer', recipes)).toHaveLength(1)
  expect(getRecipes('all', recipes)).toHaveLength(3)
})

test('get all recipes with empty ingredients', () => {
  expect( getRecipesWithIngredients([], recipes)).toHaveLength(3)
})

test('get several recipes with a single ingredient', () => {
  expect( getRecipesWithIngredients(['butter'], recipes)).toHaveLength(3)
  expect( getRecipesWithIngredients(['eggs'], recipes)).toHaveLength(2)
  expect( getRecipesWithIngredients(['chocolate'], recipes)).toHaveLength(2)
  expect( getRecipesWithIngredients(['crack'], recipes)).toHaveLength(1)
  expect( getRecipesWithIngredients(['chapstick'], recipes)).toHaveLength(0)
})

test('get several recipes with multiple ingredients', () => {
  expect( getRecipesWithIngredients(['butter', 'chocolate'], recipes)).toHaveLength(2)
  expect( getRecipesWithIngredients(['butter', 'eggs'], recipes)).toHaveLength(2)
  expect( getRecipesWithIngredients(['butter', 'crack'], recipes)).toHaveLength(1)
  expect( getRecipesWithIngredients(['legos', 'chapstick'], recipes)).toHaveLength(0)

  expect( getRecipesWithIngredients(['butter', 'eggs', 'chocolate'], recipes)).toHaveLength(1)
  expect( getRecipesWithIngredients(['butter', 'chocolate', 'crack'], recipes)).toHaveLength(1)
  expect( getRecipesWithIngredients(['butter', 'chocolate', 'legos'], recipes)).toHaveLength(0)
  expect( getRecipesWithIngredients(['butter', 'chocolate', 'chapstic', 'legos'], recipes)).toHaveLength(0)
})

test('get all ingredients', () => {
  const ingredients = getAllIngredients(recipes)
  expect(ingredients).toBeInstanceOf(Array)
  expect(ingredients).toHaveLength(4)
  expect(ingredients).toContain('butter')
  expect(ingredients).toContain('eggs')
  expect(ingredients).toContain('chocolate')
  expect(ingredients).toContain('crack')
})