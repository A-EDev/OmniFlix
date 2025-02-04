"use client"
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaInfoCircle, FaClock } from "react-icons/fa";
import { IoStar, IoTime } from "react-icons/io5";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

const BloodBubble = ({ delay }) => (
  <motion.div
    initial={{ y: 100, opacity: 0 }}
    animate={{ 
      y: [-20, -100],
      opacity: [0, 1, 0],
    }}
    transition={{ 
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    className="absolute w-2 h-2 rounded-full bg-[#8B0000]/20"
    style={{ 
      left: `${Math.random() * 100}%`,
      filter: 'blur(1px)'
    }}
  />
);

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

  const getGenres = (genreIds) => {
    const genreMap = {
      28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy",
      80: "Crime", 18: "Drama", 27: "Horror", 53: "Thriller"
    };
    return genreIds?.map(id => genreMap[id]).filter(Boolean).slice(0, 3) || [];
  };

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-[#0d0d0d]">
      {/* Floating Blood Bubbles */}
      {[...Array(15)].map((_, i) => (
        <BloodBubble key={i} delay={i * 0.3} />
      ))}

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
            className="object-cover object-center brightness-[0.7]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
          
          {/* Blood Veins Effect - Optimized for mobile */}
          <div className="absolute inset-0 hidden md:block">
            <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-[url('/blood-texture.png')] opacity-10"
            />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-[#8B0000] via-transparent to-[#8B0000] opacity-30" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Content Section with Better Responsive Layout */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="relative w-full lg:max-w-2xl space-y-4 sm:space-y-6 lg:space-y-8 
              px-2 sm:px-0"
            >
              {/* Meta Information Row - Responsive */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Rating Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-2 bg-[#8B0000]/20 backdrop-blur-sm 
                  rounded-full px-3 py-1.5 sm:px-4 sm:py-2 border border-[#8B0000]/30"
                >
                  <IoStar className="text-[#8B0000] text-sm sm:text-base" />
                  <span className="text-white/90 font-medium text-sm sm:text-base">
                    {movies[activeIndex]?.vote_average?.toFixed(1)}
                  </span>
                </motion.div>

                {/* Release Year - Responsive */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/30 
                  backdrop-blur-sm text-white/80 text-sm sm:text-base"
                >
                  {new Date(movies[activeIndex]?.release_date).getFullYear()}
                </motion.div>

                {/* Runtime Pill - Hide on smallest screens */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="hidden sm:flex items-center space-x-2 px-3 py-1.5 sm:px-4 sm:py-2 
                  rounded-full bg-black/30 backdrop-blur-sm text-white/80"
                >
                  <FaClock className="text-[#8B0000] text-sm sm:text-base" />
                  <span className="text-sm sm:text-base">120 min</span>
                </motion.div>
              </div>

              {/* Title - Responsive Typography */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white 
                tracking-tighter leading-tight drop-shadow-[0_0_15px_rgba(139,0,0,0.3)]
                max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]"
              >
                {movies[activeIndex]?.title}
              </motion.h1>

              {/* Genres - Responsive Wrapping */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-2"
              >
                {getGenres(movies[activeIndex]?.genre_ids).map((genre) => (
                  <span 
                    key={genre}
                    className="px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm 
                    bg-[#8B0000]/20 border border-[#8B0000]/30 text-white/90 backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </motion.div>

              {/* Overview - Responsive Text */}
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-base sm:text-lg text-gray-300 line-clamp-3
                max-w-[90vw] sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw]"
              >
                {movies[activeIndex]?.overview}
              </motion.p>

              {/* CTA Buttons - Responsive Layout */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-center gap-4 sm:gap-6"
              >
                <Link href={`/watch/${movies[activeIndex]?.id}?media_type=movie`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative overflow-hidden bg-[#8B0000] hover:bg-[#650000] 
                    text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center gap-2 sm:gap-3 
                    font-medium transition-colors duration-300 shadow-lg shadow-[#8B0000]/30
                    text-sm sm:text-base"
                  >
                    <FaPlay className="text-sm sm:text-base group-hover:animate-pulse" />
                    <span>Watch Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                    via-white/10 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] 
                    transition-transform duration-700" />
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 sm:p-4 rounded-full border-2 border-[#8B0000]/50 
                  hover:border-[#8B0000] text-white transition-colors duration-300
                  hover:bg-[#8B0000]/10 backdrop-blur-sm"
                >
                  <FaInfoCircle className="text-lg sm:text-xl" />
                </motion.button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation - Enhanced Mobile Support */}
      <div className="absolute bottom-16 sm:bottom-10 left-1/2 -translate-x-1/2 
      flex items-center gap-2 sm:gap-4 px-4">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-12 sm:w-16 h-1 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-[#8B0000]' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Side Navigation Arrows - Hide on small screens */}
      <div className="hidden sm:block">
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
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/10">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="h-full bg-gradient-to-r from-[#8B0000] via-[#ff0000] to-[#8B0000]"
        />
      </div>
    </div>
  );
};

export default Herosection;