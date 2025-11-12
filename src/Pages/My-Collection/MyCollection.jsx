import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const MyCollection = () => {
  const { user } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    const fetchUserMovies = async () => {
      try {
        const res = await axios.get(
          `https://moviemaster-pro-server-private.vercel.app/movies/user/${user.email}`
        );
        setMovies(res.data);
      } catch {
        toast.error("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    fetchUserMovies();
  }, [user]);

  const openDeleteModal = (id, title) => {
    setDeleteId(id);
    setDeleteTitle(title);
    document.getElementById("delete_modal").showModal();
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://moviemaster-pro-server-private.vercel.app/movies/${deleteId}`
      );
      setMovies((prev) => prev.filter((m) => m._id !== deleteId));
      toast.success(`"${deleteTitle}" deleted successfully!`);
    } catch {
      toast.error("Failed to delete movie.");
    } finally {
      document.getElementById("delete_modal").close();
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 text-base-content min-h-screen py-20 transition-all duration-300">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-primary">
          🎬 My Collection
        </h2>
        <p className="text-base-content/80 text-lg max-w-2xl mx-auto">
          Manage all the movies you’ve added — edit or remove them easily.
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </motion.div>

      {movies.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-60 text-gray-500 text-lg">
          😢 You haven’t added any movies yet.
          <Link
            to="/movies/add"
            className="btn btn-primary mt-4 text-white font-semibold"
          >
            Add a Movie
          </Link>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {movies.map((movie) => (
            <motion.div
              key={movie._id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group bg-gradient-to-br from-gray-200/40 via-gray-100/30 to-gray-200/50 dark:from-gray-800/50 dark:via-gray-700/40 dark:to-gray-800/60 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all"
            >
              <Link to={`/movies/${movie._id}`}>
                <div className="w-full h-72 flex items-center justify-center bg-base-200">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
              <div className="p-4 text-center space-y-2">
                <h4 className="text-lg font-semibold">{movie.title}</h4>
                <p className="text-sm text-gray-500">
                  ⭐ {movie.rating} • {movie.genre}
                </p>
                <div className="flex justify-center gap-3 mt-2">
                  <Link
                    to={`/movies/update/${movie._id}`}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => openDeleteModal(movie._id, movie.title)}
                    className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default MyCollection;
