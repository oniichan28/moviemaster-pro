import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Error loading movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!movie)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Movie not found.
      </p>
    );

  const handleDelete = () => {
    toast.success(`Deleted "${movie.title}" successfully!`);
  };

  const handleEdit = () => {
    toast(`Edit mode for "${movie.title}"`, { icon: "✏️" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Toaster position="top-center" />

      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl scale-110"
        style={{
          backgroundImage: `url(${movie.posterUrl})`,
          filter: "blur(25px) brightness(40%)",
        }}
      ></div>

      <div className="relative z-10 text-white py-20 px-6 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-black/50 backdrop-blur-md p-8 rounded-3xl shadow-2xl"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-[520px] object-cover rounded-2xl"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 leading-tight">
              {movie.title}{" "}
              <span className="text-gray-300 text-2xl">
                ({movie.releaseYear})
              </span>
            </h1>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500">
                ⭐ {movie.rating}
              </span>
              <span className="bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500">
                {movie.genre}
              </span>
              <span className="bg-green-500/20 px-3 py-1 rounded-full border border-green-500">
                {movie.language}
              </span>
              <span className="bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500">
                {movie.country}
              </span>
            </div>

            <div className="text-gray-200 leading-relaxed text-lg">
              <p>
                <span className="font-semibold text-gray-100">Director:</span>{" "}
                {movie.director}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Cast:</span>{" "}
                {movie.cast}
              </p>
              <p>
                <span className="font-semibold text-gray-100">Duration:</span>{" "}
                {movie.duration} mins
              </p>
            </div>

            {user?.email === movie.addedBy && (
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto mt-20 px-6 bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-white mb-4 border-b border-white/20 pb-2">
            Plot Summary
          </h2>
          <p className="text-gray-200 leading-relaxed text-lg tracking-wide">
            {movie.plotSummary}
          </p>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center text-gray-400 text-sm mt-16"
        >
          © {new Date().getFullYear()} MovieMatrix 🎥 — Explore. Rate. Enjoy.
        </motion.footer>
      </div>
    </div>
  );
};

export default MovieDetails;
