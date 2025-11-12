import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const FilterMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [ratingRange, setRatingRange] = useState([0, 10]);

  const genres = ["Action", "Drama", "Sci-Fi", "Fantasy", "Thriller", "Comedy", "Animation"];

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const fetchFiltered = async () => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        genres: selectedGenres.join(","),
        minRating: ratingRange[0],
        maxRating: ratingRange[1],
      }).toString();
      const res = await axios.get(`http://localhost:3000/movies/filter?${query}`);
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiltered();
  }, []);

  return (
    <div className="bg-base-100 text-base-content min-h-screen p-10">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-primary">🎯 Filter Movies</h2>

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`px-4 py-2 rounded-full border ${
              selectedGenres.includes(genre)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-transparent border-gray-400"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className="text-center mb-8">
        <label className="mr-3 font-semibold">Rating Range:</label>
        <input
          type="number"
          value={ratingRange[0]}
          min="0"
          max="10"
          step="0.1"
          onChange={(e) => setRatingRange([parseFloat(e.target.value), ratingRange[1]])}
          className="input input-bordered w-20 text-center mr-2"
        />
        <span className="mx-2">to</span>
        <input
          type="number"
          value={ratingRange[1]}
          min="0"
          max="10"
          step="0.1"
          onChange={(e) => setRatingRange([ratingRange[0], parseFloat(e.target.value)])}
          className="input input-bordered w-20 text-center ml-2"
        />
        <button
          onClick={fetchFiltered}
          className="btn btn-primary ml-4 px-6 font-semibold"
        >
          Apply
        </button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((m) => (
            <div
              key={m._id}
              className="bg-base-200 rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <img src={m.posterUrl} alt={m.title} className="w-full h-72 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{m.title}</h3>
                <p className="text-sm opacity-70">
                  ⭐ {m.rating} • {m.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterMovies;
