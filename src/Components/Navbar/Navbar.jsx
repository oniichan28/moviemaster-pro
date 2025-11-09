
import { useState } from "react";
import { Link, NavLink } from "react-router-dom"; 

function Navbar() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.querySelector("html").setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  const navLinks = (
    <>
      <li><NavLink to="/" end>Home</NavLink></li>
      <li><NavLink to="/movies">All Movies</NavLink></li>
      <li><NavLink to="/movies/my-collection">My Collection</NavLink></li>
      <li><NavLink to="/movies/add">Add Movie</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-base-content"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold items-center justify-center text-center">
        <img className="w-10 h-10" src="https://i.ibb.co.com/CKkRHw70/Untitled-design.png" alt="Logo" /> Movie<span className="text-primary"> Matrix</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end gap-2">
        <button onClick={toggleTheme} className="btn btn-sm btn-outline">
          {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
        <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
      </div>
    </div>
  );
}

export default Navbar;
