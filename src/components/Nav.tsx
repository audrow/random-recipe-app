import * as React from 'react'
import { Link, Outlet } from 'react-router-dom'

const linkStyle = 'underline'

const Nav = () => {
  return (
    <nav className='text-center text-navy text-xl'>
      <ul>
        <li>
          <Link className={linkStyle} to="/">
            <button className="bg-pink border-3 border-navy rounded-xl px-5 py-2 text-white text-xl text-center">Find Me Recipes!</button>
          </Link>
        </li>
        <br/>
        <li>
          <Link className={linkStyle} to="/recipes">View All Recipes</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  )
}

export default Nav;