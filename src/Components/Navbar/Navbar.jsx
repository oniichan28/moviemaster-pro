import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ theme, setTheme }) => {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-base-100 border-b border-base-300 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-extrabold text-2xl">
          <img
            src="https://i.ibb.co.com/CKkRHw70/Untitled-design.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <span>
            Movie<span className="text-primary">Matrix</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6 font-medium">
          <NavLink to="/" end className="hover:text-primary">
            Home
          </NavLink>
          <NavLink to="/all-movies" className="hover:text-primary">
            All Movies
          </NavLink>
          <NavLink to="/movies/my-collection" className="hover:text-primary">
            My Collection
          </NavLink>
          <NavLink to="/movies/add" className="hover:text-primary">
            Add Movie
          </NavLink>

          {user ? (
            <>
              <img
                src={user?.photoURL || "https://i.ibb.co.com/d2mY2mP/user.png"}
                alt="User"
                className="w-8 h-8 rounded-full border border-gray-300"
              />
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-500 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-sm bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-sm bg-gradient-to-l from-blue-500 to-indigo-500 text-white"
              >
                Register
              </Link>
            </>
          )}

          <label className="flex items-center cursor-pointer ml-4">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={(e) => handleTheme(e.target.checked)}
              checked={theme === "night"}
            />
            <span className="ml-2 text-sm font-medium">
              {theme === "night" ? "Dark" : "Light"}
            </span>
          </label>
        </div>

        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-base-100 border-t border-base-300">
          <ul className="p-4 space-y-2 font-medium">
            <li>
              <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/all-movies" onClick={() => setIsMenuOpen(false)}>
                All Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/movies/my-collection"
                onClick={() => setIsMenuOpen(false)}
              >
                My Collection
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies/add" onClick={() => setIsMenuOpen(false)}>
                Add Movie
              </NavLink>
            </li>

            <li className="flex items-center mt-2">
              <input
                type="checkbox"
                className="toggle toggle-primary"
                onChange={(e) => handleTheme(e.target.checked)}
                checked={theme === "night"}
              />
              <span className="ml-2 text-sm font-medium">
                {theme === "night" ? "Dark" : "Light"}
              </span>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
