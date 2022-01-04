/* eslint-disable no-undef */

import { getRecipes, getRecipesWithIngredients } from './index'
import type { RecipeSchema } from './index'

const recipes: RecipeSchema[] = [
  {
    id: 1,
    name: 'Eggs Benedict',
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
    ingredients: [
      'butter',
      'eggs',
      'chocolate',
    ],
    photo: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/smoked-salmon-scramble-croissants-9fc35c6.jpg?quality=90&webp=true&resize=440,400',
    url: 'https://www.bbcgoodfood.com/recipes/chocolate-chip-cookies'
  },
]

test('getRecipes() returns an array of recipes', () => {
  expect(getRecipes()).toBeInstanceOf(Array)
  expect(getRecipes().length).toBeGreaterThan(0)

  const recipesPassedIn = getRecipes(recipes)
  expect(recipesPassedIn).toBeInstanceOf(Array)
  expect(recipesPassedIn).toHaveLength(recipes.length)
  expect(recipesPassedIn).toEqual(recipes)
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