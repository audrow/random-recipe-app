import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  getIngredients,
  getIngredientsToRecipeIds,
  getRecipeById,
  getRecipeIdsForIngredient,
} from "./db/index";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/recipe" element={<h1>Recipe</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}


const Home = () => {
  const ingredients = getIngredients();
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
        <div>
          <h1>Ingredients available</h1>
          {ingredients.map((ingredient) => (
            <button
              onClick={() => console.log(getRecipeIdsForIngredient(ingredient))}
            >
              {ingredient}
            </button>
          ))}
        </div>
      </header>
    </div>
  );
};

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/recipe">Recipe</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
