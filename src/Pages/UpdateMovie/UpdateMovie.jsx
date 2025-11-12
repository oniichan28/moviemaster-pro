import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://moviemaster-pro-server.vercel.app/movies/${id}`
        );
        setMovie(res.data);
      } catch (err) {
        toast.error("Failed to load movie details.");
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/movies/${id}`, movie);
      toast.success("✅ Movie updated successfully!");
      setTimeout(() => navigate("/movies/my-collection"), 1000);
    } catch (err) {
      toast.error("❌ Update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (!movie)
    return (
      <p className="text-center text-gray-500 mt-20">
        Loading movie details...
      </p>
    );

  return (
    <div className="min-h-screen bg-base-100 text-base-content py-20 px-6 md:px-16">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-base-200 rounded-3xl shadow-lg p-10 border border-base-300"
      >
        <h2 className="text-4xl font-extrabold text-center mb-10 text-primary">
          ✏️ Update Movie
        </h2>

        <form
          onSubmit={handleUpdate}
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
            placeholder="Genre"
            className="input input-bordered w-full rounded-xl"
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
            placeholder="Cast"
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
            placeholder="Rating"
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
            placeholder="Poster URL"
            className="input input-bordered w-full rounded-xl md:col-span-2"
          />
          <textarea
            name="plotSummary"
            value={movie.plotSummary}
            onChange={handleChange}
            placeholder="Plot Summary"
            rows={4}
            className="textarea textarea-bordered w-full rounded-xl md:col-span-2"
          ></textarea>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="btn btn-primary md:col-span-2 rounded-xl text-lg font-semibold mt-4"
          >
            {loading ? "Updating..." : "Update Movie ✏️"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateMovie;
