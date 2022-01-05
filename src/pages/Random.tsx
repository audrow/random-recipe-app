// todo(mishmishmish) Update the look of this page

import * as React from 'react'

import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import seedrandom from 'seedrandom'
import { getRecipesWithIngredients } from '../db/index'
import type { RecipeSchema } from '../db/index'

function Random ({ recipesToPick = 3 }: { recipesToPick?: number }) {

  const [searchParams, setSearchParams] = useSearchParams()
  const searchIngredients = searchParams.get('ingredients')
  let seed = searchParams.get('seed') as string
  const [pickedIngredients, setPickedIngredients] = React.useState<string[]>([])
  const [pickedRecipes, setPickedRecipes] = React.useState<RecipeSchema[]>([])
  const navigate = useNavigate()

  if (!seed) {
    seed = new Date().getTime().toString()
  }

  function resetSeed () {
    setSearchParams({ ingredients: pickedIngredients.join('-') }, { replace: true })
  }

  React.useEffect(() => {
    if (searchIngredients) {
      setPickedIngredients(searchIngredients.split('-'))
    } else {
      navigate('/')
    }
  }, [searchIngredients])

  React.useEffect(() => {
    pickRandomRecipes(seed)
    setSearchParams({ ingredients: pickedIngredients.join('-'), seed }, { replace: true })
  }, [pickedIngredients, seed])

  function handleRemove (ingredient: string) {
    setPickedIngredients(pickedIngredients.filter(i => i !== ingredient))
  }

  function pickRandomRecipes (randomSeed: string) {
    const recipes = getRecipesWithIngredients(pickedIngredients)

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
    <div>
      <Link to="/">
        <button>Home</button>
      </Link>
      <h2>Random Recipes</h2>
      <h3>Ingredients:</h3>
      { pickedIngredients.map(ingredient => (
        <button key={ingredient} onClick={() => handleRemove(ingredient)}>{ingredient}</button>
      ))}
      <h3>Recipes</h3>
      <ul>
        {pickedRecipes.map((recipe, index) => (
          <li key={index}>
            <p>{recipe.name}</p>
            <p>
              {recipe.ingredients.join(', ')}
            </p>
            <p>
              <a href={recipe.url}>Link</a>
            </p>
          </li>
        ))}
      </ul>
      <button onClick={resetSeed}>Pick again</button>
    </div>
  )
}

export default Random