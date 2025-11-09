import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../Provider/AuthProvider";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Signed in successfully!");
      navigate(from, { replace: true });
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        toast(
          (t) => (
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-red-600">Incorrect Email / Password....</p>
              <p className="text-sm text-gray-600">If You Don’t have an Account.</p>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                  navigate("/signup");
                }}
                className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Go to Signup
              </button>
            </div>
          ),
          { duration: 5000 }
        );
      } else {
        toast.error("Unable to sign in. Please try again later.");
      }
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

  const handleForgotPassword = () => {
    navigate("/forgot-password", { state: { email: formData.email } });
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="md:w-1/2 w-full h-full"
      >
        <img
          src="https://i.ibb.co.com/xK08pDCW/download-11.jpg"
          alt="Movie Camera"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 w-full h-full flex flex-col justify-center items-center bg-[#B40025]"
      >
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-[90%] max-w-md bg-[#FFE86C] p-8 rounded-2xl shadow-2xl border-4 border-[#FFD700]"
        >
          <h1 className="text-4xl font-extrabold text-[#B40025] mb-2 text-center">
            Welcome Back 🎬
          </h1>
          <p className="text-[#7A0017] text-center mb-6 font-medium">
            Log in to continue your journey
          </p>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-[#A3001F] py-2.5 rounded-lg bg-[#FFD94C] shadow-sm transition hover:bg-[#FFE76C] mb-4 text-[#7A0017] font-semibold"
          >
            <FcGoogle size={22} /> Continue with Google
          </motion.button>

          <div className="flex items-center justify-center text-[#7A0017] my-5">
            <span className="border-b border-[#7A0017] w-1/4"></span>
            <span className="mx-2 text-sm">or</span>
            <span className="border-b border-[#7A0017] w-1/4"></span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border border-[#A3001F] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B40025] bg-[#FFF8D0]"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full border border-[#A3001F] rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#B40025] bg-[#FFF8D0]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#7A0017]"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[#B40025] hover:underline text-sm font-semibold"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              className="w-full bg-[#B40025] text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-[#99001F] transition"
            >
              Log In
            </motion.button>
          </form>

          <p className="text-center text-[#7A0017] mt-5 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#B40025] font-semibold hover:underline">
              Create Account
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signin;
