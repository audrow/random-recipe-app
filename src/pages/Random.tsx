// todo(mishmishmish) Update the look of this page

import * as React from 'react'

import { useSearchParams, useNavigate } from 'react-router-dom'
import seedrandom from 'seedrandom'
import { getRecipes, getRecipesWithIngredients } from '../db/index'
import type { RecipeSchema, CourseAll } from '../db/index'

import Recipe from '../components/Recipe'
import Layout from '../components/Layout'
import SelectedIngredientButton from '../components/SelectedIngredientButton'

function Random ({ recipesToPick = 3 }: { recipesToPick?: number }) {

  const [searchParams, setSearchParams] = useSearchParams()
  const searchIngredients = searchParams.get('ingredients')
  let searchCourse = searchParams.get('course') as CourseAll
  if (!searchCourse) {
    searchCourse = 'all'
  }
  const courseString = {
    all: 'everything',
    main: 'main dishes',
    appetizer: 'appetizers',
    dessert: 'desserts'
  }
  let searchSeed = searchParams.get('seed') as string
  if (!searchSeed) {
    searchSeed = new Date().getTime().toString()
  }

  const [pickedIngredients, setPickedIngredients] = React.useState<string[]>([])
  const [pickedRecipes, setPickedRecipes] = React.useState<RecipeSchema[]>([])
  const [matchingRecipes, setMatchingRecipes] = React.useState<number>(0)
  const navigate = useNavigate()


  function resetSeed () {
    setSearchParams({course: searchCourse, ingredients: pickedIngredients.join('-') }, { replace: true })
  }

  React.useEffect(() => {
    if (searchIngredients) {
      setPickedIngredients(searchIngredients.split('-'))
    } else {
      navigate('/')
    }
  }, [searchIngredients])

  React.useEffect(() => {
    pickRandomRecipes(searchSeed)
    setSearchParams({ course: searchCourse, ingredients: pickedIngredients.join('-'), seed: searchSeed }, { replace: true })
  }, [pickedIngredients, searchSeed, searchCourse])

  function handleRemove (ingredient: string) {
    setPickedIngredients(pickedIngredients.filter(i => i !== ingredient))
  }

  function pickRandomRecipes (randomSeed: string) {
    const recipes = getRecipesWithIngredients(pickedIngredients, getRecipes(searchCourse))

    setMatchingRecipes(recipes.length)

    const random = seedrandom(randomSeed)
    const shuffledRecipes = [...recipes].sort(() => random() - 0.5)
    let pickedRecipes: RecipeSchema[] = []
    if (shuffledRecipes.length < recipesToPick) {
      pickedRecipes = shuffledRecipes
    } else {
      pickedRecipes = shuffledRecipes.slice(0, recipesToPick)
    }

    setPickedRecipes(pickedRecipes)
  }

  return (
    <Layout>
      <div className='text-center text-navy'>
        <h2>Showing you {Math.min(recipesToPick, matchingRecipes)} recipe{
          Math.min(recipesToPick, matchingRecipes) > 1 ? 's' : ''
        } from {courseString[searchCourse]}</h2>
        <h3>Ingredients:</h3>
        {pickedIngredients.map(ingredient => (
          <button key={ingredient} onClick={() => handleRemove(ingredient)}>{ingredient}</button>
        ))}
        <h3>Recipes</h3>
        <ul className="flex justify-center space-x-2">
          {pickedRecipes.map((recipe, index) => (
            <li key={index}>
              <Recipe recipe={recipe} />
            </li>
          ))}
        </ul>
        {matchingRecipes > recipesToPick ?
          <button onClick={resetSeed} disabled={matchingRecipes < recipesToPick}>Pick again</button>
          :
          <p>Not enough recipes to choose randomly</p>
        }
      </div>
    </Layout>
  )
}

export default Random