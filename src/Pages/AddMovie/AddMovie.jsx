import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddMovie = ({ onMovieAdded }) => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({
    title: "",
    genre: "",
    director: "",
    cast: "",
    releaseYear: "",
    rating: "",
    duration: "",
    language: "",
    country: "",
    plotSummary: "",
    posterUrl: "",
    addedBy: "admin@example.com",
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/movies", movie);
      toast.success("🎬 Movie added successfully!");
      setMovie({
        title: "",
        genre: "",
        director: "",
        cast: "",
        releaseYear: "",
        rating: "",
        duration: "",
        language: "",
        country: "",
        plotSummary: "",
        posterUrl: "",
      });
      setLoading(false);
      onMovieAdded?.(res.data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to add movie");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-20 px-6 md:px-16">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-base-200 rounded-3xl shadow-lg p-10 border border-base-300"
      >
        <h2 className="text-4xl font-extrabold text-center mb-10 text-primary">
          🎥 Add a New Movie
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
            placeholder="Movie Title"
            className="input input-bordered w-full rounded-xl"
            required
          />
          <input
            type="text"
            name="genre"
            value={movie.genre}
            onChange={handleChange}
            placeholder="Genre (e.g. Action, Sci-Fi)"
            className="input input-bordered w-full rounded-xl"
            required
          />
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChange}
            placeholder="Director"
            className="input input-bordered w-full rounded-xl"
          />
          <input
            type="text"
            name="cast"
            value={movie.cast}
            onChange={handleChange}
            placeholder="Cast (comma separated)"
            className="input input-bordered w-full rounded-xl"
          />
          <input
            type="number"
            name="releaseYear"
            value={movie.releaseYear}
            onChange={handleChange}
            placeholder="Release Year"
            className="input input-bordered w-full rounded-xl"
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            value={movie.rating}
            onChange={handleChange}
            placeholder="Rating (0 - 10)"
            className="input input-bordered w-full rounded-xl"
          />
          <input
            type="number"
            name="duration"
            value={movie.duration}
            onChange={handleChange}
            placeholder="Duration (mins)"
            className="input input-bordered w-full rounded-xl"
          />
          <input
            type="text"
            name="language"
            value={movie.language}
            onChange={handleChange}
            placeholder="Language"
            className="input input-bordered w-full rounded-xl"
          />
          <input
            type="text"
            name="country"
            value={movie.country}
            onChange={handleChange}
            placeholder="Country"
            className="input input-bordered w-full rounded-xl"
          />
          <input
            type="url"
            name="posterUrl"
            value={movie.posterUrl}
            onChange={handleChange}
            placeholder="Poster Image URL"
            className="input input-bordered w-full rounded-xl md:col-span-2"
            required
          />
          <textarea
            name="plotSummary"
            value={movie.plotSummary}
            onChange={handleChange}
            placeholder="Plot Summary"
            rows={4}
            className="textarea textarea-bordered w-full rounded-xl md:col-span-2"
            required
          ></textarea>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="btn btn-primary md:col-span-2 rounded-xl text-lg font-semibold mt-4"
          >
            {loading ? "Adding..." : "Add Movie 🎬"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddMovie;
