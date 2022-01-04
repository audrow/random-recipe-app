/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import * as React from 'react'

import { BrowserRouter, Route, Routes, useSearchParams, useNavigate, Link } from 'react-router-dom'
import seedrandom from 'seedrandom'
import { Recipe } from './pages/Recipe'
import { Recipes } from './pages/Recipes'
import { PickRandom } from './pages/PickRandom'
import { About } from './pages/About'
// import './App.css'

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Picker />} />
        <Route path='/random' element={<Random />} />
          {/* <Route index element={<PickRandom />} /> */}
          {/* <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Not Found</h1>} /> */}
        {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
      </Routes>
    </BrowserRouter>
  )
}

const ingredients: string[] = [
  'pasta',
  'sauce',
  'tomato',
  'cheese',
  'onion',
  'garlic',
  'basil',
  'oregano',
  'parmesan',
  'mozzarella',
  'pesto',
  'apple',
  'pear',
  'banana',
  'orange',
  'lemon',
  'pineapple',
  'mango',
  'watermelon',
  'coconut',
  'coconut milk'
]

const recipes: string[] = [
  'pasta',
  'pizza',
  'soup',
  'salad',
  'cake',
  'pie',
  'sandwich',
  'burger',
  'steak',
  'chicken'
]

function getIngredients () {
  return ingredients
}

function getRecipes () {
  return recipes
}

function Picker () {
  const ingredients = getIngredients()

  const [pickedIngredients, setPickedIngredients] = React.useState<string[]>([])
  const [searchText, setSearchText] = React.useState<string>('')
  const [filteredIngredients, setFilteredIngredients] = React.useState<string[]>([])
  const [isEnableAddButton, setIsEnableAddButton] = React.useState<Boolean>()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchIngredients = searchParams.get('ingredients')

  React.useEffect(() => {
    if (searchIngredients) {
      setPickedIngredients(searchIngredients.split('-'))
    }
  }, [searchIngredients])

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formIngredient = formData.get('ingredient') as string
    if (filteredIngredients.length === 1) {
      setPickedIngredients([...pickedIngredients, filteredIngredients[0]])
    } else if (
      !formIngredient ||
      pickedIngredients.includes(formIngredient) ||
      !ingredients.includes(formIngredient)
    ) {
      return
    } else {
      setPickedIngredients([...pickedIngredients, formIngredient])
    }
    setSearchText('')
  }

  function onClickIngredient (ingredient: string) {
    setPickedIngredients([...pickedIngredients, ingredient])
  }

  function handleRemove (ingredient: string) {
    setPickedIngredients(pickedIngredients.filter(i => i !== ingredient))
  }

  React.useEffect(() => {
    if (pickedIngredients.length > 0) {
      setSearchParams({ ingredients: pickedIngredients.join('-') }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }, [pickedIngredients])

  React.useEffect(() => {
    setFilteredIngredients(ingredients.filter(ingredient => {
      if (pickedIngredients.includes(ingredient)) {
        return false
      } else if (!searchText) {
        return true
      } else {
        return ingredient.toLowerCase().startsWith(searchText.toLowerCase())
      }
    }))
    setIsEnableAddButton(
      (filteredIngredients.length === 1) ||
      ingredients.map(i => i.toLowerCase()).includes(searchText.toLowerCase())
    )
    console.log()
  }, [searchText, pickedIngredients])

  return (
    <div>
      <h2>Picked items</h2>
      <ul>
        {pickedIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            {' '}
            <button onClick={() => handleRemove(ingredient)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2>Pick here</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={searchText}
          onChange={event => setSearchText(event.target.value)}
          type='text'
          placeholder='lemon'
          name='ingredient'
        />
        <button disabled={!isEnableAddButton} type='submit'>Add</button>
        <br/>
        <br/>
        {filteredIngredients.map(ingredient => (
          <button
            onClick={() => onClickIngredient(ingredient)}
            key={ingredient}>
            {ingredient}
          </button>
        ))}
        {filteredIngredients.length === 0 && <p>No results</p>}
      </form>
      <br/>
      <Link to={{ pathname: '/random', search: searchParams.toString() }}>
        <button disabled={pickedIngredients.length < 1}>Wrangle Some Recipes!</button>
      </Link>
    </div>
  )
}

function Random ({ recipesToPick = 3 }: { recipesToPick?: number }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchIngredients = searchParams.get('ingredients')
  let seed = searchParams.get('seed') as string
  const [pickedIngredients, setPickedIngredients] = React.useState<string[]>([])
  const [pickedRecipes, setPickedRecipes] = React.useState<string[]>([])
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
    const recipes = getRecipes()

    const random = seedrandom(randomSeed)
    const shuffledRecipes = [...recipes].sort(() => random() - 0.5)
    let pickedRecipes: string[] = []
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
            {recipe}
          </li>
        ))}
      </ul>
      <button onClick={resetSeed}>Pick again</button>
    </div>
  )
}
