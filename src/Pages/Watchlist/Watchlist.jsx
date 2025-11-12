import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTitle, setDeleteTitle] = useState("");

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`http://localhost:3000/watchlist/${user.email}`)
      .then((res) => setWatchlist(res.data))
      .catch(() => setWatchlist([]));
  }, [user]);

  const openDeleteModal = (id, title) => {
    setDeleteId(id);
    setDeleteTitle(title);
    document.getElementById("delete_modal").showModal();
  };

  const confirmRemove = async () => {
    try {
      await axios.delete(`http://localhost:3000/watchlist/${user.email}/${deleteId}`);
      setWatchlist(watchlist.filter((item) => item._id !== deleteId));
      toast.success(`Removed "${deleteTitle}" from watchlist!`);
    } catch (err) {
      toast.error("Failed to remove movie.");
    } finally {
      document.getElementById("delete_modal").close();
    }
  };

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
          🎬 My Watchlist
        </h2>
        <p className="text-base-content/80 text-lg max-w-2xl mx-auto">
          All your saved movies — ready to watch anytime you want!
        </p>
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
        </div>
      </motion.div>

      {watchlist.length === 0 ? (
        <div className="flex justify-center items-center h-60 text-gray-500 text-lg">
          😢 No movies in your watchlist yet!
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8"
        >
          {watchlist.map((movie) => (
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
                    onError={(e) =>
                      (e.target.src =
                        "https://dummyimage.com/400x600/000/fff&text=No+Image")
                    }
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl flex flex-col justify-end p-4">
                  <h4 className="text-lg font-semibold text-white truncate">
                    {movie.title}
                  </h4>
                  <p className="text-sm text-gray-300 mt-1">
                    ⭐ {movie.rating} • {movie.genre}
                  </p>
                  <div className="mt-2 flex justify-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        openDeleteModal(movie._id, movie.title);
                      }}
                      className="btn btn-error btn-sm rounded-full text-white px-4 py-1 opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-center text-base-content/70 text-sm mt-20"
      >
        © {new Date().getFullYear()} MovieMatrix 🎥 — Crafted with Passion.
      </motion.footer>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-base-200 text-center">
          <h3 className="text-lg font-bold text-red-500 mb-3">⚠️ Confirm Removal</h3>
          <p className="text-base-content/80 mb-6">
            Are you sure you want to remove{" "}
            <span className="font-semibold">{deleteTitle}</span> from your watchlist?
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={confirmRemove} className="btn btn-error text-white">
              Yes, Remove
            </button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Watchlist;
