import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { getAuth, signOut } from "firebase/auth";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ theme, setTheme }) => {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await new Promise((r) => setTimeout(r, 1200));
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/all-movies", label: "All Movies" },
    { path: "/movies/my-collection", label: "My Collection" },
    { path: "/movies/add", label: "Add Movie" },
    { path: "/watchlist", label: "Watchlist" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-base-100/70 border-b border-base-300 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.8, rotate: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="lg:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>

          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-xl sm:text-2xl"
          >
            <img
              src="https://i.ibb.co.com/CKkRHw70/Untitled-design.png"
              alt="Logo"
              className="w-9 h-9 sm:w-10 sm:h-10"
            />
            <span>
              Movie<span className="text-primary">Matrix</span>
            </span>
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative transition-all hover:text-primary ${
                  isActive ? "text-primary font-semibold" : ""
                }`
              }
            >
              {link.label}
              <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"></span>
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 relative">
          {user ? (
            <div
              className="relative flex items-center gap-3"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <img
                src={user?.photoURL || "https://i.ibb.co.com/d2mY2mP/user.png"}
                alt="User"
                className="w-9 h-9 rounded-full border border-gray-400 cursor-pointer hover:ring-2 hover:ring-primary transition"
              />

              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-11 right-0 bg-base-200 shadow-lg rounded-lg p-3 w-40"
                  >
                    <p className="text-center font-semibold mb-2">
                      {user.displayName || "User"}
                    </p>
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className={`btn btn-sm w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white ${
                        loggingOut ? "opacity-70" : ""
                      }`}
                    >
                      {loggingOut ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="btn btn-sm bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-sm bg-gradient-to-l from-purple-500 to-fuchsia-500 text-white font-semibold"
              >
                Register
              </Link>
            </div>
          )}

          <label className="flex items-center cursor-pointer ml-2">
            <input
              type="checkbox"
              className="toggle toggle-primary"
              onChange={(e) => handleTheme(e.target.checked)}
              checked={theme === "night"}
            />
            <span className="ml-2 text-sm font-semibold hidden sm:inline">
              {theme === "night" ? "Dark" : "Light"}
            </span>
          </label>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-base-100/95 border-t border-base-300 shadow-md"
          >
            <ul className="p-4 space-y-3 font-medium">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block transition-all ${
                        isActive ? "text-primary font-semibold" : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className={`btn btn-sm w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white ${
                      loggingOut ? "opacity-70" : ""
                    }`}
                  >
                    {loggingOut ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn btn-sm w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="btn btn-sm w-full bg-gradient-to-l from-purple-500 to-fuchsia-500 text-white"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
