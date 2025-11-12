import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const AllMovies = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/movies");
        setMovies(res.data);
      } catch (error) {
        console.error("❌ Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-16 transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-primary">
          🎬 All Movies
        </h2>
        <p className="text-base-content opacity-70 text-lg max-w-2xl mx-auto">
          Discover your favorite movies, explore ratings, genres, and more — all in one cinematic hub.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-28 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {movies.map((movie) => (
          <motion.div
            key={movie._id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative bg-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-base-300 transition-all"
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-80 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-1">{movie.title}</h3>
              <p className="text-sm opacity-70">
                ⭐ {movie.rating} • {movie.genre} • {movie.releaseYear}
              </p>
              <Link
                to={`/movies/${movie._id}`}
                className="mt-3 inline-block text-sm bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-center text-base-content opacity-70 text-sm mt-16"
      >
        © {new Date().getFullYear()} MovieMatrix 🎥 — Crafted with Passion.
      </motion.footer>
    </div>
  );
};

export default AllMovies;
