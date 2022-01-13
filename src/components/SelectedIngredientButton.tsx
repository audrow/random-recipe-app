
import * as React from 'react'
import {CloseCircle} from '@emotion-icons/ionicons-solid/CloseCircle'

type SelectedIngredientButtonProps = {
  ingredient: string
  onClick: (ingredient: string) => void
}

const SelectedIngredientButton = ({ ingredient, onClick }:SelectedIngredientButtonProps) => {
  return (
    <div>
        <CloseCircle className='w-1/12'/>
    <button className='flex flex-row'
      onClick={() => onClick(ingredient)}>
      <div
        className='bg-white px-2 rounded-md border-2 m-1 border-pink text-navy'
      >
        {ingredient}
      </div>
      <div className='bg-white rounded'>
      </div>
      
    </button>
    </div>)
}

export default SelectedIngredientButton;