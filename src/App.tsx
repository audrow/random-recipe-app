import * as React from 'react'

import { BrowserRouter, Route, Routes, useSearchParams, useNavigate, Link } from 'react-router-dom'
import Picker from './pages/Picker'
import Random from './pages/Random'
import About from './pages/About'
// import './App.css' // TODO(mishmishmish) Enable this

export default function App () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Picker />} />
        <Route path='/random' element={<Random />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
