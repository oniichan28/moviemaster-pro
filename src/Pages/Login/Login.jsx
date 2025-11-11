import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation, useOutletContext } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useOutletContext(); // 🌗 Theme from MainLayout
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const googleProvider = new GoogleAuthProvider();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Signed in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Invalid Email or Password!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed in with Google!");
      navigate(from, { replace: true });
    } catch {
      toast.error("Google sign-in failed. Try again later.");
    }
  };

  const handleTheme = (checked) => {
    setTheme(checked ? "night" : "winter");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password", { state: { email: formData.email } });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-100 text-base-content transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 w-full flex items-center justify-center"
      >
        <img
          src="https://i.ibb.co.com/SDPh1d7z/Retro-cinema-icon-tripod-banner-cinematography-obsolete.jpg"
          alt="Cinema Camera"
          className="w-full h-screen object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 flex flex-col justify-center p-10"
      >
        <div className="flex justify-end mb-4">
          <label className="flex items-center cursor-pointer">
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

        <motion.div className="w-full max-w-md mx-auto bg-base-200 p-8 rounded-2xl shadow-xl">
          <h1 className="text-4xl font-bold mb-2 text-center">Welcome Back</h1>
          <p className="opacity-70 text-center mb-6">
            Log in to continue your journey 🎬
          </p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-base-300 py-2.5 rounded-lg bg-base-100 shadow-sm transition hover:bg-base-300 mb-4"
          >
            <FcGoogle size={22} /> Continue with Google
          </motion.button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border border-base-300 bg-base-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-base-300 bg-base-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 opacity-70"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-primary hover:underline text-sm"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Log In
            </motion.button>
          </form>

          <p className="text-center opacity-70 mt-5 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signin;
