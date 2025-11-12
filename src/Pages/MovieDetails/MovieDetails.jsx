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
      } catch (error) {
        console.error("❌ Error fetching movie details:", error);
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

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/movies/${id}`);
      toast.success(`Deleted "${movie.title}" successfully!`);
    } catch (error) {
      toast.error("Failed to delete movie!");
    }
  };

  const handleEdit = () => {
    toast(`Edit mode for "${movie.title}"`, { icon: "✏️" });
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-16 transition-all duration-300">
      <Toaster position="top-center" reverseOrder={false} />

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-[520px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent dark:from-black/80" />
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight transition-colors duration-300">
            {movie.title}
          </h1>

          <div className="flex flex-wrap gap-3 text-sm">
            <span className="px-3 py-1 rounded-full border border-primary/50 bg-primary/10 text-base-content/90">
              {movie.genre}
            </span>
            <span className="px-3 py-1 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-base-content/90">
              ⭐ {movie.rating}
            </span>
            <span className="px-3 py-1 rounded-full border border-green-500/50 bg-green-500/10 text-base-content/90">
              {movie.releaseYear}
            </span>
            <span className="px-3 py-1 rounded-full border border-purple-500/50 bg-purple-500/10 text-base-content/90">
              {movie.language}
            </span>
          </div>

          <div className="text-base-content/90 leading-relaxed text-lg space-y-1">
            <p>
              <span className="font-semibold">Director:</span> {movie.director}
            </p>
            <p>
              <span className="font-semibold">Cast:</span> {movie.cast}
            </p>
            <p>
              <span className="font-semibold">Country:</span> {movie.country}
            </p>
            <p>
              <span className="font-semibold">Duration:</span> {movie.duration} mins
            </p>
          </div>

          {user?.email === movie.addedBy && (
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleEdit}
                className="bg-primary hover:brightness-110 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
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
        className="max-w-5xl mx-auto mt-20 px-6"
      >
        <h2 className="text-3xl font-bold text-base-content mb-4 border-b border-base-300 pb-2">
          Plot Summary
        </h2>
        <p className="text-base-content/80 leading-relaxed text-lg tracking-wide">
          {movie.plotSummary}
        </p>
      </motion.div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center text-base-content/70 text-sm mt-16 border-t border-base-300 pt-6"
      >
        © {new Date().getFullYear()} MovieMaster Pro 🎥 — Explore. Rate. Enjoy.
      </motion.footer>
    </div>
  );
};

export default MovieDetails;
