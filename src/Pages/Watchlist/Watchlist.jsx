import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthProvider";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    axios.get(`http://localhost:3000/watchlist/${user.email}`).then((res) => {
      setWatchlist(res.data);
    });
  }, [user]);

  const handleRemove = async (id) => {
    await axios.delete(`http://localhost:3000/watchlist/${user.email}/${id}`);
    setWatchlist(watchlist.filter((item) => item._id !== id));
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen p-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-primary">🎥 My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="text-center text-gray-500">No movies in your watchlist yet!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {watchlist.map((m) => (
            <div
              key={m._id}
              className="bg-base-200 rounded-xl shadow-md overflow-hidden relative group"
            >
              <img src={m.posterUrl} alt={m.title} className="w-full h-72 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <button
                  onClick={() => handleRemove(m._id)}
                  className="btn btn-error btn-sm mt-3 opacity-0 group-hover:opacity-100 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
