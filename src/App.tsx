import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Recipe } from "./pages/Recipe";
import { Recipes } from "./pages/Recipes";
import { PickRandom } from "./pages/PickRandom";
import { About } from "./pages/About";
import "./App.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<PickRandom />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
