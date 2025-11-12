import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import { motion } from "framer-motion";

const SectionRow = ({ title, limit, startIndex }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((res) => setMovies(res.data.slice(startIndex, startIndex + limit)))
      .catch((err) => console.error("❌ Error fetching movies:", err));
  }, [limit, startIndex]);

  return (
    <div className="py-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-base-content">{title}</h3>
        <Link
          to="/all-movies"
          className="text-sm text-primary hover:underline font-semibold"
        >
          See All →
        </Link>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        className="pb-6"
      >
        {movies.map((movie, i) => (
          <SwiperSlide key={movie._id || i}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative group bg-gradient-to-br from-gray-200/40 via-gray-100/30 to-gray-200/50 
              dark:from-gray-800/50 dark:via-gray-700/40 dark:to-gray-800/60 
              rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer"
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                rounded-2xl flex flex-col justify-end p-4 backdrop-blur-[1px]">
                  <h4 className="text-lg font-semibold text-white truncate">
                    {movie.title}
                  </h4>
                  <p className="text-sm text-gray-300 mt-1">
                    ⭐ {movie.rating} • {movie.genre}
                  </p>
                </div>
              </Link>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionRow;
