
import * as React from 'react'

type IngredientButtonProps = {
  ingredient: string
  onClick: (ingredient: string) => void
}

const IngredientButton = ({ ingredient, onClick }:IngredientButtonProps) => {
  return (
    <button
    className='bg-white px-2 rounded-md border-navy border-2 m-1 hover:border-pink active:bg-lt-pink px-2 m-1 rounded-md text-navy'
      onClick={() => onClick(ingredient)}>
      {ingredient}
    </button>)
}

export default IngredientButton;