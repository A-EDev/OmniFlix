"use client"
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { IoStar } from "react-icons/io5";
import axios from 'axios';

const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#8B0000]/20 rounded-full"
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);  // Add this line
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [movieDetails, setMovieDetails] = useState({});
  const videoRef = useRef(null);
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
    <div className="relative h-[100vh] w-full overflow-hidden bg-[#0d0d0d]">
      <ParticleEffect />
      
      <div className="relative h-full w-full flex flex-col lg:flex-row">
        {/* Left Content Section */}
        <motion.div 
          className="relative z-20 w-full lg:w-[50%] h-full flex items-center px-4 sm:px-6 lg:px-12 
          pt-[15vh] lg:pt-0 transition-all duration-300"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full max-w-2xl mx-auto lg:mx-0 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-3 sm:space-y-4 lg:space-y-6"
              >
                {/* Movie Title */}
                <motion.h1 
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold 
                  text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 
                  to-white/50 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] leading-tight"
                >
                  {movies[activeIndex]?.title}
                </motion.h1>

                {/* Enhanced Movie Info Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                  {/* Rating Badge */}
                  <motion.div className="flex flex-col items-center justify-center p-2 rounded-lg
                    backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 
                    transition-all duration-300 hover:scale-105 hover:border-white/20">
                    <IoStar className="text-base sm:text-lg text-[#8B0000]" />
                    <span className="text-sm sm:text-base font-bold">{movies[activeIndex]?.vote_average?.toFixed(1)}</span>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider">Rating</span>
                  </motion.div>

                  {/* Year Badge */}
                  <motion.div className="flex flex-col items-center justify-center p-2 rounded-lg
                    backdrop-blur-md bg-white/5 border border-white/10">
                    <span className="text-sm sm:text-base font-bold">
                      {new Date(movies[activeIndex]?.release_date).getFullYear()}
                    </span>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider">Year</span>
                  </motion.div>

                  {/* Runtime Badge */}
                  <motion.div className="flex flex-col items-center justify-center p-2 rounded-lg
                    backdrop-blur-md bg-white/5 border border-white/10">
                    <span className="text-sm sm:text-base font-bold">{formatRuntime(movieDetails?.runtime)}</span>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider">Duration</span>
                  </motion.div>

                  {/* Language Badge */}
                  <motion.div className="flex flex-col items-center justify-center p-2 rounded-lg
                    backdrop-blur-md bg-white/5 border border-white/10">
                    <span className="text-sm sm:text-base font-bold">
                      {movieDetails?.original_language?.toUpperCase()}
                    </span>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider">Language</span>
                  </motion.div>

                  {/* Release Date Badge */}
                  <motion.div className="flex flex-col items-center justify-center p-2 rounded-lg
                    backdrop-blur-md bg-white/5 border border-white/10">
                    <span className="text-sm sm:text-base font-bold">
                      {new Date(movies[activeIndex]?.release_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider">Release</span>
                  </motion.div>

                  {/* Status Badge */}
                  <motion.div className="flex flex-col items-center justify-center p-2 rounded-lg
                    backdrop-blur-md bg-white/5 border border-white/10">
                    <span className="text-sm sm:text-base font-bold text-green-400">
                      {movieDetails?.status || 'Released'}
                    </span>
                    <span className="text-[8px] sm:text-[10px] uppercase tracking-wider">Status</span>
                  </motion.div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-1.5">
                  {movieDetails?.genres?.map((genre) => (
                    <span key={genre.id}
                      className="px-2 py-1 text-[10px] sm:text-xs rounded-md
                      bg-[#8B0000]/20 border border-[#8B0000]/30 text-white/90"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Movie Description */}
                <motion.p 
                  className="text-xs sm:text-sm text-white/80 line-clamp-2 sm:line-clamp-3
                  backdrop-blur-sm bg-black/20 p-3 sm:p-4 rounded-xl border border-white/10"
                >
                  {movies[activeIndex]?.overview}
                </motion.p>

                {/* Action Buttons */}
                <div className="flex items-center gap-4">
                  <Link href={`/watch/${movies[activeIndex]?.id}?media_type=movie`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl
                        bg-gradient-to-r from-[#8B0000] to-[#420000]
                        text-white font-medium text-base sm:text-lg hover:shadow-lg hover:shadow-[#8B0000]/30
                        transition-all duration-300 border border-[#8B0000]/50
                        hover:border-[#8B0000] relative overflow-hidden"
                    >
                      <FaPlay className="text-sm sm:text-xl" />
                      <span>Watch Now</span>
                    </motion.button>
                  </Link>
                  
                  {/* More Action Buttons */}
                  {/* ...existing buttons code... */}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Content Section - Enhanced Video/Image Display */}
        <motion.div 
          className="absolute lg:relative inset-0 lg:w-[50%] h-full transition-transform duration-500"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative h-full w-full transform hover:scale-105 transition-all duration-500">
            <AnimatePresence initial={false}>
              <motion.div
                key={activeIndex}
                className="relative h-full w-full"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7 }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${movies[activeIndex]?.backdrop_path}`}
                  alt={movies[activeIndex]?.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent 
                  via-[#0d0d0d]/50 to-[#0d0d0d] pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30
        flex items-center gap-2 sm:gap-4 p-2 sm:px-6 sm:py-4 backdrop-blur-md bg-black/30 
        rounded-xl sm:rounded-2xl border border-white/10">
        {movies.map((movie, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`relative overflow-hidden rounded-lg border-2 transition-all duration-300
              ${index === activeIndex ? 
                'border-[#8B0000] shadow-lg shadow-[#8B0000]/30' : 
                'border-transparent'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
              alt={movie.title}
              width={60}
              height={35}
              className="rounded-lg sm:w-[100px] sm:h-[60px]"
            />
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#8B0000] via-[#ff0000] to-[#8B0000]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;