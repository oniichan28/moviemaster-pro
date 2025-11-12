import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const AddMovie = () => {
  const { user } = useContext(AuthContext);
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
  });

  const handleChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please log in before adding a movie!");
      return;
    }

    setLoading(true);
    try {
      const newMovie = {
        ...movie,
        addedBy: user.email,
        createdAt: new Date(),
      };

      await axios.post(
        "https://moviemaster-pro-server-private.vercel.app/movies",
        newMovie
      );
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
    } catch {
      toast.error("❌ Failed to add movie");
    } finally {
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
          {[
            "title",
            "genre",
            "director",
            "cast",
            "releaseYear",
            "rating",
            "duration",
            "language",
            "country",
            "posterUrl",
          ].map((field) => (
            <input
              key={field}
              type={
                field === "releaseYear" || field === "duration"
                  ? "number"
                  : field === "rating"
                  ? "number"
                  : field === "posterUrl"
                  ? "url"
                  : "text"
              }
              step={field === "rating" ? "0.1" : undefined}
              name={field}
              value={movie[field]}
              onChange={handleChange}
              placeholder={
                field === "posterUrl"
                  ? "Poster URL"
                  : field.charAt(0).toUpperCase() + field.slice(1)
              }
              className={`input input-bordered w-full rounded-xl ${
                field === "posterUrl" ? "md:col-span-2" : ""
              }`}
            />
          ))}
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
            {loading ? "Adding..." : "Add Movie 🎬"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddMovie;
