
import * as React from 'react'
import {CloseCircle} from '@emotion-icons/ionicons-solid/CloseCircle'

type SelectedIngredientButtonProps = {
  ingredient: string
  onClick: (ingredient: string) => void
}

const SelectedIngredientButton = ({ ingredient, onClick }:SelectedIngredientButtonProps) => {
  return (
    <button className='flex flex-row'
      onClick={() => onClick(ingredient)}>
      <div
        className='bg-white px-2 rounded-md border-2 m-1 border-pink text-navy hover:bg-lt-pink'
      >
        {ingredient}
      </div>
        {/* <CloseCircle/> */}
      <div className='bg-pink rounded-full border-pink border-2 px-1.5 text-white text-sm '>x
      </div>
    </button>)
}

export default SelectedIngredientButton;