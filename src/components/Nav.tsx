import { Link, Outlet } from "react-router-dom";

const linkStyle = "underline"
const listStyle = "p-2"

export const Nav = () => {
  return (
    <nav>
      <ul>
        <li className={listStyle}>
          <Link className={linkStyle} to="/">Pick a Random Ingredient!</Link>
        </li>
        <li className={listStyle}>
          <Link className={linkStyle} to="/recipes">View All Recipes</Link>
        </li>
      </ul>
      <Outlet />
    </nav>
  );
};
