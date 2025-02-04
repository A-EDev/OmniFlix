"use client"
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaInfoCircle } from "react-icons/fa";
import { IoStar, IoBookmark, IoShareSocial } from "react-icons/io5";

const Herosection = ({ data }) => {
  const { results = [] } = data || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const backgroundRef = useRef(null);
  
  // Auto-rotation effect
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredResults.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [isHovered, results.length]);

  // Filter high-quality content
  const filteredResults = results.filter(
    movie => movie.vote_average > 7 && 
    movie.backdrop_path &&
    new Date(movie.release_date).getFullYear() >= new Date().getFullYear() - 2
  );

  const currentMovie = filteredResults[currentIndex];

  // Parallax and blood effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (backgroundRef.current) {
        const x = (e.clientX - window.innerWidth / 2) / 30;
        const y = (e.clientY - window.innerHeight / 2) / 30;
        backgroundRef.current.style.transform = `translate(${-x}px, ${-y}px) scale(1.1)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!currentMovie) return null;

  return (
    <div 
      className="relative w-full overflow-hidden min-h-[95vh] flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background with Blood Overlay */}
      <AnimatePresence mode='wait'>
        <motion.div 
          key={currentIndex}
          ref={backgroundRef}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={`https://image.tmdb.org/t/p/original${currentMovie?.backdrop_path}`}
            alt="banner"
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0d]/95 via-[#0d0d0d]/80 to-[#8B0000]/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
          
          {/* Blood Drip Effect */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#8B0000]/30">
            <div className="absolute top-0 left-1/4 w-[2px] h-20 bg-gradient-to-b from-[#8B0000] to-transparent animate-blood-drip" />
            <div className="absolute top-0 left-2/4 w-[2px] h-20 bg-gradient-to-b from-[#8B0000] to-transparent animate-blood-drip" style={{ animationDelay: '2s' }} />
            <div className="absolute top-0 left-3/4 w-[2px] h-20 bg-gradient-to-b from-[#8B0000] to-transparent animate-blood-drip" style={{ animationDelay: '4s' }} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Content Grid */}
      <div className="relative z-10 max-w-[96rem] mx-auto px-8 grid grid-cols-12 gap-8 items-center">
        {/* Poster with Premium Effects */}
        <motion.div 
          className="col-span-4 hidden md:block"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${currentMovie?.poster_path}`}
                alt={currentMovie?.title || currentMovie?.name}
                width={400}
                height={600}
                className="rounded-xl shadow-[0_0_30px_rgba(139,0,0,0.3)] object-cover"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B0000]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </motion.div>

            {/* Interactive Stats Bar */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-lg p-4"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <IoStar className="text-[#8B0000] text-xl" />
                  <span className="text-white font-medium">{currentMovie?.vote_average?.toFixed(1)}</span>
                </div>
                <div className="flex space-x-4">
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <IoBookmark className="text-white hover:text-[#8B0000] cursor-pointer transition-colors" />
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.2 }}>
                    <IoShareSocial className="text-white hover:text-[#8B0000] cursor-pointer transition-colors" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content with Enhanced Typography */}
        <motion.div 
          className="col-span-12 md:col-span-8 text-white"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            {/* Title and Tags */}
            <motion.div layout>
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-[#8B0000] px-4 py-1 rounded-full text-sm font-medium">
                  #{currentIndex + 1} Trending
                </span>
                <span className="text-[#8B0000] font-medium">
                  {currentMovie?.genre_ids?.includes(28) ? "Action" : "Drama"}
                </span>
              </div>

              <h1 className="text-6xl font-bold mb-4 text-white tracking-tight leading-tight">
                {currentMovie?.title || currentMovie?.name}
              </h1>
            </motion.div>

            {/* Movie Details */}
            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <span>{new Date(currentMovie?.release_date).getFullYear()}</span>
              <span>•</span>
              <span className="text-[#8B0000]">
                {currentMovie?.original_language?.toUpperCase()}
              </span>
              <span>•</span>
              <span>{currentMovie?.vote_average} Rating</span>
            </div>

            {/* Overview with Gradient */}
            <p className="text-gray-300 text-lg leading-relaxed line-clamp-3 max-w-[700px]">
              {currentMovie?.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Link href={`/watch/${currentMovie?.id}?media_type=${currentMovie?.media_type}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-[#8B0000] hover:bg-[#6B0000] text-white px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-[#8B0000]/30"
                >
                  <FaPlay className="mr-2" />
                  <span className="font-medium">Watch Now</span>
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center border-2 border-[#8B0000]/50 hover:border-[#8B0000] text-white px-8 py-4 rounded-full transition-all duration-300"
              >
                <FaInfoCircle className="mr-2" />
                <span className="font-medium">More Info</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#8B0000]/20">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="h-full bg-[#8B0000]"
        />
      </div>
    </div>
  );
};

export default Herosection;