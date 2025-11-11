import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import HeroCarousel from "../../Components/HeroCarousel/HeroCarousel";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import SectionRow from "../../Components/HeroCards/SectionRow/SectionRow";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="bg-base-100 text-base-content min-h-screen transition-all duration-300">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <HeroCarousel />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <SectionRow title="Premiere of the Week" limit={5} startIndex={0} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12"
        >
          <SectionRow title="New on Stream" limit={6} startIndex={5} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12"
        >
          <SectionRow title="Upcoming Releases" limit={6} startIndex={11} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-12"
        >
          <SectionRow title="Top Rated Movies" limit={6} startIndex={17} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-12 pb-16"
        >
          <SectionRow title="Popular Collections" limit={6} startIndex={23} />
        </motion.section>
      </div>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-center text-base-content text-sm py-8 border-t border-base-300"
      >
        © {new Date().getFullYear()} MovieMatrix 🎥 — Your ultimate movie experience.
      </motion.footer>
    </div>
  );
};

export default Home;
