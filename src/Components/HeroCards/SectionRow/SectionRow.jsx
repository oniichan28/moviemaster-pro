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
              className="relative bg-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group cursor-pointer"
            >
              <Link to={`/movies/${movie._id}`}>
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-72 object-cover rounded-2xl group-hover:brightness-75 transition-all"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex flex-col justify-end p-4">
                  <h4 className="text-lg font-semibold text-white">
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
