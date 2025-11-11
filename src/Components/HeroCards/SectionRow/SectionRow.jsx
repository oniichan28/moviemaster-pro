import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SectionRow = ({ title, limit, startIndex }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("/movies.json")
      .then(res => res.json())
      .then(data => setMovies(data.slice(startIndex, startIndex + limit)));
  }, [limit, startIndex]);

  return (
    <div className="py-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-900">{title}</h3>
        <Link to="/all-movies" className="text-sm text-blue-600 hover:underline">
          See All →
        </Link>
      </div>
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="flex-shrink-0 w-52 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            <img src={movie.posterUrl} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-3 text-center">
              <h4 className="text-sm font-semibold text-gray-800 truncate">{movie.title}</h4>
              <p className="text-xs text-gray-500 mt-1">⭐ {movie.rating}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionRow;
