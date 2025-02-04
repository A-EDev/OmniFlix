"use client"
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

const Herosection = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const movies = data?.results?.slice(0, 5) || [];

  const nextSlide = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % movies.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [movies.length, isAnimating]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (!movies.length) return null;

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0d0d0d]">
      {/* Background Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${movies[activeIndex]?.backdrop_path}`}
            alt={movies[activeIndex]?.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          
          {/* Blood Veins Effect */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl space-y-8"
            >
              {/* Rating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center bg-[#8B0000]/20 backdrop-blur-sm rounded-full px-4 py-2 border border-[#8B0000]/30"
              >
                <IoStar className="text-[#8B0000] mr-2" />
                <span className="text-white/90">
                  {movies[activeIndex]?.vote_average?.toFixed(1)} Rating
                </span>
              </motion.div>

              {/* Title */}
              <h1 className="text-7xl font-bold text-white tracking-tighter leading-tight">
                {movies[activeIndex]?.title}
              </h1>

              {/* Overview */}
              <p className="text-lg text-gray-300 line-clamp-3">
                {movies[activeIndex]?.overview}
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-6">
                <Link href={`/watch/${movies[activeIndex]?.id}?media_type=movie`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#8B0000] hover:bg-[#650000] text-white px-8 py-4 rounded-full 
                    flex items-center gap-3 font-medium transition-colors duration-300
                    shadow-lg shadow-[#8B0000]/30"
                  >
                    <FaPlay />
                    Watch Now
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-16 h-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-[#8B0000]' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Side Navigation Arrows */}
      <button
        onClick={() => setActiveIndex((prev) => (prev - 1 + movies.length) % movies.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white
        transition-colors p-2 rounded-full bg-black/20 backdrop-blur-sm"
      >
        <RiArrowLeftLine size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white
        transition-colors p-2 rounded-full bg-black/20 backdrop-blur-sm"
      >
        <RiArrowRightLine size={24} />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="h-full bg-[#8B0000]"
        />
      </div>
    </div>
  );
};

export default Herosection;