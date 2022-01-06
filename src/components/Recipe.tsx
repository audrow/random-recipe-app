import * as React from 'react'
import type { RecipeSchema } from '../db/index'

const Recipe = ({ recipe }: { recipe: RecipeSchema }) => {
  return (
    <div>
      <img src={recipe.photo} alt={recipe.name} width='100px'/>
      <p>{recipe.name}</p>
      <p>
        {recipe.ingredients.join(', ')}
      </p>
      <p>
        <a href={recipe.url}>Link</a>
      </p>
    </div>
  )
}

export default Recipe;