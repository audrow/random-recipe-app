// todo(mishmishmish) Update the look of this page

import * as React from 'react'

import { useSearchParams, Link } from 'react-router-dom'
import { getRecipes, getAllIngredients, getRecipesWithIngredients } from '../db/index'
import type { CourseAll } from '../db/index'
import Layout from '../components/Layout'
import CourseTab from '../components/CourseTab'

function Picker () {

  const validCourses: CourseAll[] = ['main', 'appetizer', 'dessert', 'all']

  const [searchParams, setSearchParams] = useSearchParams()
  const searchIngredients = searchParams.get('ingredients')
  const searchCourse = searchParams.get('course')

  const [pickedIngredients, setPickedIngredients] = React.useState<string[]>([])
  const [pickedCourse, setPickedCourse] = React.useState<CourseAll>(validCourses[0])
  const [searchText, setSearchText] = React.useState<string>('')
  const [filteredIngredients, setFilteredIngredients] = React.useState<string[]>(getAllIngredients(getRecipes(pickedCourse)))
  const [isEnableAddButton, setIsEnableAddButton] = React.useState<Boolean>()

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formIngredient = formData.get('ingredient') as string
    if (filteredIngredients.length === 1) {
      setPickedIngredients([...pickedIngredients, filteredIngredients[0]])
    } else if (
      !formIngredient ||
      pickedIngredients.includes(formIngredient) ||
      !filteredIngredients.includes(formIngredient)
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
    if (searchIngredients) {
      setPickedIngredients(searchIngredients.split('-'))
    }
  }, [searchIngredients])

  React.useEffect(() => {
    if (searchCourse && validCourses.includes(searchCourse as CourseAll)) {
      setPickedCourse(searchCourse as CourseAll)
    }
  }, [searchCourse])

  React.useEffect(() => {
    setPickedIngredients([])
  }, [pickedCourse])

  React.useEffect(() => {
    if (pickedIngredients.length > 0) {
      setSearchParams({ course: pickedCourse, ingredients: pickedIngredients.join('-') }, { replace: true })
    } else {
      setSearchParams({course: pickedCourse}, { replace: true })
    }
    const remainingRecipes = getRecipesWithIngredients(pickedIngredients, getRecipes(pickedCourse))
    setFilteredIngredients(getAllIngredients(remainingRecipes))
  }, [pickedIngredients])

  React.useEffect(() => {
    const remainingRecipes = getRecipesWithIngredients(pickedIngredients, getRecipes(pickedCourse))
    const ingredients = getAllIngredients(remainingRecipes)
    setFilteredIngredients(ingredients.filter(ingredient => {
      if (pickedIngredients.includes(ingredient)) {
        return false
      } else if (!searchText) {
        return true
      } else {
        return ingredient.toLowerCase().startsWith(searchText.toLowerCase())
      }
    }))
  }, [searchText, pickedIngredients])

  React.useEffect(() => {
    setIsEnableAddButton(
      (filteredIngredients.length === 1) ||
      filteredIngredients.map(i => i.toLowerCase()).includes(searchText.toLowerCase())
    )
  }, [filteredIngredients, searchText])

  return (
    <Layout>
      <h2>Pick here</h2>
      <form className='mx-20' onSubmit={handleSubmit}>
        <div className='flex justify-between text-xl'>
          {validCourses.map(course => (
            <CourseTab
              isSelected={pickedCourse === course}
              name={course}
              onClick={async () => setPickedCourse(course)}
              key={course}
            />
          ))}
        </div>
        <div className='bg-lblue px-5 py-2 rounded-b-2xl border-navy border-x-3 border-b-3'>
          <h2>Picked items</h2>
          <ul>
            {pickedIngredients.sort().map((ingredient, index) => (
              <li key={index}>
                {ingredient}
                {' '}
                <button onClick={() => handleRemove(ingredient)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div hidden={pickedIngredients.length === 0}>
            <button  type='button' onClick={() => setPickedIngredients([])}>Remove all</button>
          </div>
          <br />
          <input
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
            type='text'
            placeholder='what do you have?'
            name='ingredient'
          />
          <button disabled={!isEnableAddButton} type='submit'>Add</button>
          <button type='button' disabled={searchText.length < 1} onClick={() => setSearchText('')}>Clear</button>
          <br />
          <br />
          {filteredIngredients.map(ingredient => (
            <button
              onClick={() => onClickIngredient(ingredient)}
              key={ingredient}>
              {ingredient}
            </button>
          ))}
          {filteredIngredients.length === 0 && <p>No results</p>}
        </div>
      </form>
      <br/>
      <Link to={{ pathname: '/random', search: searchParams.toString() }}>
        <button disabled={pickedIngredients.length < 1}>Wrangle Some Recipes!</button>
      </Link>
    </Layout>
  )
}

export default Picker