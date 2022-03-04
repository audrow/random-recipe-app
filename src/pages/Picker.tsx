import * as React from 'react'

import { useSearchParams, Link } from 'react-router-dom'
import { getRecipes, getAllIngredients, getRecipesWithIngredients } from '../db/index'
import type { CourseAll } from '../db/index'
import Layout from '../components/Layout'
import CourseTab from '../components/CourseTab'
import IngredientButton from '../components/IngredientButton'
import SelectedIngredientButton from '../components/SelectedIngredientButton'


function Picker () {

  const validCourses: CourseAll[] = ['main', 'appetizer', 'dessert', 'all']

  const [searchParams, setSearchParams] = useSearchParams()
  const searchIngredients = searchParams.get('ingredients')
  const searchCourse = searchParams.get('course')

  const [pickedIngredients, setPickedIngredients] = React.useState<string[]>([])
  const [pickedCourse, setPickedCourse] = React.useState<CourseAll>(validCourses[0])
  const [searchText, setSearchText] = React.useState<string>('')
  const [searchErrorMessage, setSearchErrorMessage] = React.useState<string>()
  const [filteredIngredients, setFilteredIngredients] = React.useState<string[]>(getAllIngredients(getRecipes(pickedCourse)))
  const [isEnableAddButton, setIsEnableAddButton] = React.useState<Boolean>()

  function handleSubmit () {
    const searchSubmission = searchText.toLowerCase()
    if (filteredIngredients.length === 1) {
      setPickedIngredients([...pickedIngredients, filteredIngredients[0]])
    } else if (
      !searchSubmission ||
      pickedIngredients.includes(searchSubmission) ||
      !filteredIngredients.includes(searchSubmission)
    ) {
      return
    } else {
      setPickedIngredients([...pickedIngredients, searchSubmission])
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
    setSearchErrorMessage(getSearchTextErrorMessage())
  }, [filteredIngredients, searchText])

  function getSearchTextErrorMessage() {
    if (filteredIngredients.length !== 0) {
      return
    } else if (searchText.length > 0) {
      return 'No matches found :('
    } else {
      return 'No ingredients left to pick :('
    }
  }

  return (
    <Layout isHideNav={true}>
      <div className='flex flex-col items-center'>
        <div className='w-11/12 md:w-2/3 xl:w-1/2'>
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
            <h2 className='text-lg ml-1'>I have...</h2>
            <div className='flex flex-row flex-wrap'>
              {pickedIngredients.sort().map((ingredient) => (
                <SelectedIngredientButton
                  key={ingredient}
                  ingredient={ingredient}
                  onClick={handleRemove} />
              ))}
            </div>
            <div className='md:flex md:flex-row mt-2'>
              <input className='border-3 border-navy rounded-lg md:rounded-l-lg pl-3 h-10 md:w-2/3'
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
                type='text'
                placeholder='type your ingredients here'
                name='ingredient'
                onKeyPress={event => {if (event.key === 'Enter') handleSubmit()}}
              />
              <button className='bg-lrgreen h-10 border-navy border-3 rounded-lg md:rounded-none md:border-y-3 md:w-1/6' disabled={!isEnableAddButton} onClick={handleSubmit}>Add</button>
              <button className='bg-lt-pink h-10 rounded-lg md:rounded-r-lg border-navy border-3 md:w-1/6' type='button' disabled={searchText.length < 1} onClick={() => setSearchText('')}>Clear</button>
            </div>
            <div className='mb-2 mt-3 flex flex-wrap justify-center'>
                {filteredIngredients.map(ingredient => (
                  <IngredientButton
                    key={ingredient}
                    ingredient={ingredient} onClick={onClickIngredient} />
                ))}
            </div>
            <p>{searchErrorMessage}</p>
          </div>
        </div>
        <br />
        <div className='flex justify-center w-full'>
          <Link to={{ pathname: '/random', search: searchParams.toString() }}>
            <button className="bg-pink border-3 border-navy rounded-xl px-5 py-2 text-white text-xl text-center disabled:bg-gray-400 disabled:border-gray-500 transition ease-in-out duration-300" disabled={pickedIngredients.length < 1}>Wrangle Some Recipes!</button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Picker