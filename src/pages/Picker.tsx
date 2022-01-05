// todo(mishmishmish) Update the look of this page
// todo(mishmishmish) Use the layout here

import * as React from 'react'

import { useSearchParams, Link } from 'react-router-dom'
import { getRecipes, getAllIngredients, getRecipesWithIngredients } from '../db/index'

function Picker () {

  const [possibleIngredients, setPossibleIngredients] = React.useState<string[]>(getAllIngredients(getRecipes()))
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
      !possibleIngredients.includes(formIngredient)
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
    const remainingRecipes = getRecipesWithIngredients(pickedIngredients)
    setPossibleIngredients(getAllIngredients(remainingRecipes))
  }, [pickedIngredients])

  React.useEffect(() => {
    setFilteredIngredients(possibleIngredients.filter(ingredient => {
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
      possibleIngredients.map(i => i.toLowerCase()).includes(searchText.toLowerCase())
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

export default Picker