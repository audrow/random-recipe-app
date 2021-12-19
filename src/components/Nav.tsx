import { Link, Outlet } from "react-router-dom";

export const Nav = () => {
  return (
    <nav className="App-header">
      <ul>
        <li>
          <Link className="App-link" to="/">Pick a Random Ingredient!</Link>
        </li>
        <li>
          <Link className="App-link" to="/recipes">View All Recipes</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  );
};
