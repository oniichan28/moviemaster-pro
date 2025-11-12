import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
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
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/movies/${id}`);
        setMovie(res.data);

        if (user?.email) {
          const watchlistRes = await axios.get(`http://localhost:3000/watchlist/${user.email}`);
          const found = watchlistRes.data.find((m) => m._id === res.data._id);
          setIsInWatchlist(!!found);
        }
      } catch (err) {
        console.error("Error loading movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id, user?.email]);

  const handleWatchlist = async () => {
    if (!user) {
      toast.error("Please log in to manage your watchlist");
      setTimeout(() => {
        navigate("/login", { state: { from: location.pathname } });
      }, 1000);
      return;
    }

    setProcessing(true);
    try {
      if (isInWatchlist) {
        const res = await axios.get(`http://localhost:3000/watchlist/${user.email}`);
        const item = res.data.find((m) => m._id === movie._id);
        if (item) {
          await axios.delete(`http://localhost:3000/watchlist/${user.email}/${item._id}`);
          setIsInWatchlist(false);
          toast.success(`Removed "${movie.title}" from Watchlist ❌`);
        }
      } else {
        await axios.post("http://localhost:3000/watchlist", {
          userEmail: user.email,
          movieId: movie._id,
        });
        setIsInWatchlist(true);
        toast.success(`Added "${movie.title}" to Watchlist ❤️`);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!movie)
    return (
      <p className="text-center text-red-500 mt-10 font-semibold">
        Movie not found.
      </p>
    );

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

            <div className="flex flex-wrap gap-4 pt-4">
              {user?.email === movie.addedBy && (
                <>
                  <Link
                    to={`/movies/update/${movie._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>
                      document.getElementById("delete_modal").showModal()
                    }
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition"
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                onClick={handleWatchlist}
                disabled={processing}
                className={`${
                  isInWatchlist
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                } text-white font-semibold px-6 py-2 rounded-lg shadow transition`}
              >
                {processing
                  ? "Processing..."
                  : isInWatchlist
                  ? "Remove from Watchlist ❌"
                  : "Add to Watchlist ❤️"}
              </button>
            </div>
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

      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-base-200 text-center">
          <h3 className="text-lg font-bold text-red-500 mb-3">⚠️ Confirm Delete</h3>
          <p className="text-base-content/80 mb-6">
            Are you sure you want to delete{" "}
            <span className="font-semibold">{movie.title}</span>?
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn btn-error text-white">Yes, Delete</button>
            <form method="dialog">
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default MovieDetails;
