import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Pagination,
  Navigation,
  EffectFade,
} from "swiper/modules";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const HeroCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/movies")
      .then((res) => setMovies(res.data.slice(0, 6)))
      .catch((err) => console.error("❌ Error fetching movies:", err));
  }, []);

  if (!movies.length) {
    return (
      <div className="h-[80vh] flex items-center justify-center text-base-content">
        Loading movies...
      </div>
    );
  }

  return (
    <div className="relative w-screen left-1/2 right-1/2 -translate-x-1/2 overflow-hidden shadow-2xl">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation
        loop
        speed={1000}
        className="h-[85vh] md:h-[90vh] lg:h-[95vh]"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              {/* 🎬 Background wrapper */}
              <div
                className="relative w-full h-full group flex items-center justify-center"
                style={{
                  background: `radial-gradient(circle at center, rgba(20,20,20,0.95) 0%, rgba(0,0,0,0.9) 100%)`,
                }}
              >
                {/* 🎥 Movie poster */}
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="max-h-[95vh] w-auto object-contain transition-all duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      "https://dummyimage.com/1920x1080/000/fff&text=No+Image";
                  }}
                />

                {/* 🎨 Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

                {/* 🎬 Movie Details */}
                <div className="absolute bottom-[10%] left-[8%] text-white max-w-2xl z-10 drop-shadow-lg">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight"
                  >
                    {movie.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-gray-200 mb-5 text-sm md:text-lg max-w-2xl"
                  >
                    {movie.plotSummary?.slice(0, 180)}...
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 text-sm md:text-base"
                  >
                    <span className="bg-yellow-500 text-black font-semibold px-4 py-1 rounded-full shadow-md">
                      ⭐ {movie.rating}
                    </span>
                    <span className="px-4 py-1 bg-white/25 rounded-full backdrop-blur-md shadow">
                      {movie.genre}
                    </span>
                    <span className="px-4 py-1 bg-white/25 rounded-full backdrop-blur-md shadow">
                      {movie.releaseYear}
                    </span>
                  </motion.div>

                  <Link
                    to={`/movies/${movie._id}`}
                    className="inline-block mt-8 bg-primary hover:bg-primary/80 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all text-lg"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
