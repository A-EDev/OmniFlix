"use client"
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaInfoCircle, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { IoStar, IoTime } from "react-icons/io5";
import axios from 'axios';
import styles from "./HeroSection.module.css";

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
          className={`relative z-20 w-full lg:w-[50%] h-full flex items-center px-8 lg:px-16 ${styles.smoothTransform}`}
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
                className="space-y-8"
              >
                {/* Movie Title */}
                <motion.h1 
                  className={`text-6xl lg:text-8xl font-bold text-transparent bg-clip-text 
                  bg-gradient-to-r from-white via-white/80 to-white/50 ${styles.glowText}`}
                >
                  {movies[activeIndex]?.title}
                </motion.h1>

                {/* Enhanced Movie Info Grid */}
                <div className="grid grid-cols-4 gap-4">
                  {/* Rating Card */}
                  <motion.div className={styles.infoCard}>
                    <IoStar className="text-2xl text-[#8B0000]" />
                    <span className="text-xl font-bold">{movies[activeIndex]?.vote_average?.toFixed(1)}</span>
                    <span className="text-xs uppercase tracking-wider">Rating</span>
                  </motion.div>
                  
                  {/* Similar info cards for Year, Duration, Language */}
                  {/* ...existing info cards code... */}
                </div>

                {/* Movie Description */}
                <motion.p 
                  className="text-lg text-white/80 line-clamp-4 
                  backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10"
                >
                  {movies[activeIndex]?.overview}
                </motion.p>

                {/* Action Buttons */}
                <div className="flex items-center gap-6">
                  <Link href={`/watch/${movies[activeIndex]?.id}?media_type=movie`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={styles.watchButton}
                    >
                      <FaPlay className="text-xl" />
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
          className={`absolute lg:relative inset-0 lg:w-[50%] h-full ${styles.smoothTransform}`}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className={`${styles.mediaContainer} ${styles.smoothImageBlending}`}>
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
                <div className={styles.gradientOverlay} />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className={styles.navigation}>
        {movies.map((movie, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`${styles.navButton} ${index === activeIndex ? styles.navButtonActive : ''}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.backdrop_path}`}
              alt={movie.title}
              width={100}
              height={60}
              className="rounded-lg"
            />
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div className={styles.progressBar}>
        <motion.div
          className={styles.progressBarFill}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </div>
  );
};

export default HeroSection;