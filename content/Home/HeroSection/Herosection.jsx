"use client"
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaInfoCircle, FaClock } from "react-icons/fa";
import { IoStar, IoTime } from "react-icons/io5";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import axios from 'axios';

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
  const [movieDetails, setMovieDetails] = useState({});
  const movies = data?.results?.slice(0, 5) || [];

  // Fetch movie details including runtime
  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movies[activeIndex]?.id) {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movies[activeIndex].id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
          );
          setMovieDetails(response.data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        }
      }
    };
    fetchMovieDetails();
  }, [activeIndex, movies]);

  // Convert minutes to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

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

      {/* Split Screen Layout */}
      <div className="relative h-full w-full flex flex-col lg:flex-row">
        {/* Left Content Section */}
        <div className="relative z-10 w-full lg:w-[60%] h-full flex items-center 
        px-4 sm:px-6 lg:px-12 pt-20 lg:pt-0">
          <div className="w-full max-w-2xl mx-auto lg:mx-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="space-y-4 sm:space-y-6"
              >
                {/* Enhanced Meta Information Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Rating Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="col-span-1 flex items-center justify-center bg-[#8B0000]/20 
                    backdrop-blur-sm rounded-xl px-4 py-3 border border-[#8B0000]/30"
                  >
                    <div className="text-center">
                      <IoStar className="text-[#8B0000] text-xl mx-auto mb-1" />
                      <span className="text-white/90 font-medium block">
                        {movies[activeIndex]?.vote_average?.toFixed(1)}
                      </span>
                      <span className="text-xs text-white/50">Rating</span>
                    </div>
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="col-span-1 flex items-center justify-center bg-black/30 
                    backdrop-blur-sm rounded-xl px-4 py-3"
                  >
                    <div className="text-center">
                      <span className="text-white/90 font-medium block">
                        {new Date(movies[activeIndex]?.release_date).getFullYear()}
                      </span>
                      <span className="text-xs text-white/50">Year</span>
                    </div>
                  </motion.div>

                  {/* Runtime Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-1 flex items-center justify-center bg-black/30 
                    backdrop-blur-sm rounded-xl px-4 py-3"
                  >
                    <div className="text-center">
                      <FaClock className="text-[#8B0000] text-xl mx-auto mb-1" />
                      <span className="text-white/90 font-medium block">
                        {formatRuntime(movieDetails?.runtime)}
                      </span>
                      <span className="text-xs text-white/50">Duration</span>
                    </div>
                  </motion.div>

                  {/* Language Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="col-span-1 flex items-center justify-center bg-black/30 
                    backdrop-blur-sm rounded-xl px-4 py-3"
                  >
                    <div className="text-center">
                      <span className="text-white/90 font-medium block">
                        {movieDetails?.original_language?.toUpperCase()}
                      </span>
                      <span className="text-xs text-white/50">Language</span>
                    </div>
                  </motion.div>
                </div>

                {/* Title with Enhanced Animation */}
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white 
                  tracking-tighter leading-none"
                >
                  {movies[activeIndex]?.title}
                </motion.h1>

                {/* Enhanced Genre Display */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2"
                >
                  {movieDetails?.genres?.map((genre) => (
                    <span 
                      key={genre.id}
                      className="px-4 py-2 rounded-lg text-sm 
                      bg-[#8B0000]/20 border border-[#8B0000]/30 
                      text-white/90 backdrop-blur-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </motion.div>

                {/* Overview with Enhanced Typography */}
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg text-gray-300 leading-relaxed
                  line-clamp-4 sm:line-clamp-3"
                >
                  {movies[activeIndex]?.overview}
                </motion.p>

                {/* Enhanced CTA Buttons */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-4"
                >
                  <Link href={`/watch/${movies[activeIndex]?.id}?media_type=movie`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative overflow-hidden bg-[#8B0000] 
                      text-white px-8 py-4 rounded-xl flex items-center gap-3 
                      font-medium shadow-lg shadow-[#8B0000]/30"
                    >
                      <FaPlay className="group-hover:animate-pulse" />
                      <span>Watch Now</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent 
                      via-white/10 to-transparent -translate-x-[200%] 
                      group-hover:translate-x-[200%] transition-transform duration-700" />
                    </motion.button>
                  </Link>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl border-2 border-[#8B0000]/50 
                    hover:border-[#8B0000] text-white hover:bg-[#8B0000]/10 
                    backdrop-blur-sm"
                  >
                    <FaInfoCircle className="text-xl" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="absolute lg:relative inset-0 lg:w-[40%] h-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7 }}
              className="relative h-full w-full"
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${movies[activeIndex]?.backdrop_path}`}
                alt={movies[activeIndex]?.title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r 
              from-[#0d0d0d] via-transparent to-transparent lg:bg-gradient-to-l" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20
      flex items-center gap-4 px-4">
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