import React, { useState, useEffect } from "react";

const FilterMovies = ({ onFilter, autoApply = true }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [ratingRange, setRatingRange] = useState([0, 10]);

  const genres = [
    "Action",
    "Drama",
    "Comedy",
    "Thriller",
    "Fantasy",
    "Sci-Fi",
    "Animation",
  ];
  useEffect(() => {
    if (autoApply) {
      const delayDebounce = setTimeout(() => {
        onFilter({ searchTerm, selectedGenre, ratingRange });
      }, 400);
      return () => clearTimeout(delayDebounce);
    }
  }, [searchTerm, selectedGenre, ratingRange, autoApply, onFilter]);

  const handleApply = () => {
    onFilter({ searchTerm, selectedGenre, ratingRange });
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedGenre("");
    setRatingRange([0, 10]);
    onFilter({ searchTerm: "", selectedGenre: "", ratingRange: [0, 10] });
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 mb-12 px-6">
      <input
        type="text"
        placeholder="🔍 Search movies..."
        className="input input-bordered w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        className="select select-bordered w-40"
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">⭐</span>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={ratingRange[0]}
          onChange={(e) =>
            setRatingRange([parseFloat(e.target.value), ratingRange[1]])
          }
          className="input input-bordered w-20 text-center"
        />
        <span>to</span>
        <input
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={ratingRange[1]}
          onChange={(e) =>
            setRatingRange([ratingRange[0], parseFloat(e.target.value)])
          }
          className="input input-bordered w-20 text-center"
        />
      </div>

      {!autoApply && (
        <button onClick={handleApply} className="btn btn-primary px-6">
          Apply
        </button>
      )}
      <button onClick={handleClear} className="btn btn-outline">
        Clear
      </button>
    </div>
  );
};

export default FilterMovies;
