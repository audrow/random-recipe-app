import * as React from 'react'
import { Link, Outlet } from 'react-router-dom'

const linkStyle = 'underline'

export default function Nav ({isShowFindRecipeButton} : {isShowFindRecipeButton?: boolean}) {
  return (
    <nav className='text-center text-navy text-xl'>
      <ul>
        {!!isShowFindRecipeButton &&
        <li>
          <Link className={linkStyle} to="/">
            <button className="bg-pink border-3 border-navy rounded-xl px-5 py-2 text-white text-xl text-center">Find me recipes!</button>
          </Link>
        </li>}
        <li>
          <Link className={linkStyle} to="/recipes">View all recipes</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  )
}
