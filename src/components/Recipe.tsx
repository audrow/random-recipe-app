import * as React from 'react'
import type { RecipeSchema } from '../db/index'

const Recipe = ({ recipe }: { recipe: RecipeSchema }) => {
  return (
    <div className="  text-navy bg-white border-navy border-3 rounded-xl m-2 px-2 py-1 max-w-lg w-56">
      <p className='py-1 text-left'>{recipe.name}</p>
      <img className="border-1 border-navy border-2 rounded-md object-cover object-center aspect-square w-full" src={recipe.photo} alt={recipe.name} width='100px'/>
      {/* <p>
        {recipe.ingredients.join(', ')} 
      </p> */}
      <div className="flex justify-between py-1"> <span> Prep Time: </span><span>{recipe.prepTime}mins.</span></div>
       <div className="flex justify-between"> <span> Cook Time: </span><span>{recipe.cookTime}mins.</span></div>
      <p className='py-1'>
        <a href={recipe.url}>Link</a>
      </p>
    </div>
  )
}

export default Recipe;