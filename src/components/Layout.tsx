import * as React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

export default function Layout({ children, isHideNav, isHideAboutButton }: { children: any, isHideNav?: boolean, isHideAboutButton?: boolean }) {
  return (
    <div className="bg-yellow min-h-screen">
      <div>
          <h1 className=" font-baloo text-3xl text-center pt-10 text-navy">Random Recipe Wrangler!</h1>
        <div className='flex justify-center'>
          <div className='flex justify-end align-middle w-2/3'>
            <Link to="/about">
              <button className="icon font-lobster text-white text-xl bg-pink border-3 border-navy 
                rounded-full w-8 h-8 align-text-top mb-3">i</button>
            </Link>
          </div>
        </div>
        {children}
        {!isHideNav && <Nav />}
      </div>
    </div>
  )
}
