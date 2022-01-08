import * as React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

export default function Layout ({ children }:any) {
  return (
        <div className="bg-yellow min-h-screen">
            <div>
                <h1 className="font-baloo text-3xl text-center p-5 text-navy">Random Recipe Wrangler!</h1>
            </div>
           <Link to="/about">
                <button className="icon font-lobster text-white text-xl bg-pink border-3 border-navy rounded-full w-8 h-8 align-text-top absolute top-5 right-20">i</button>
            </Link>
           <Nav/>
            {children}
        </div>
  )
}
