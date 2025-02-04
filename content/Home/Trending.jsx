"use client"
import TrendingCard from "@/components/Cards/TrendingCard/TrendingCard"
import { Fragment, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaFire } from "react-icons/fa6"

const Trending = ({ data }) => {
  const { results = [] } = data || {};
  const [activeCategory, setActiveCategory] = useState('all');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const categories = [
    { key: 'all', label: 'All Trends' },
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' }
  ];

  const filteredResults = activeCategory === 'all' 
    ? results.slice(0, 20)
    : results.filter(item => item.media_type === activeCategory).slice(0, 16);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-6 px-4 sm:px-6 lg:px-8"
    >
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Title with Animation */}
          <motion.h1 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="flex items-center gap-3 text-3xl sm:text-4xl font-bold"
          >
            <FaFire className="text-[#8B0000] animate-pulse" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Trending Now
            </span>
          </motion.h1>

          {/* Enhanced Category Selector */}
          <div className="flex bg-[#1a0000] rounded-xl p-1.5 border border-[#8B0000]/20 shadow-inner shadow-[#8B0000]/5">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium
                  transition-all duration-300 relative
                  ${activeCategory === category.key 
                    ? 'text-white' 
                    : 'text-gray-400 hover:text-white'}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === category.key && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-[#8B0000] rounded-lg"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Animated Underline */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-px bg-gradient-to-r from-[#8B0000] via-[#8B0000]/50 to-transparent mt-4"
        />
      </div>

      {/* Enhanced Grid Layout with Smaller Cards */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4"
        >
          {filteredResults.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative group"
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Optimized Card Wrapper */}
              <div className="relative rounded-lg overflow-hidden
                transform transition-all duration-300 
                hover:scale-[1.02] hover:shadow-xl hover:shadow-[#8B0000]/20
                hover:z-10"
              >
                <TrendingCard info={item} />

                {/* Enhanced Hover Overlay */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-gradient-to-t 
                  from-black/90 via-black/50 to-transparent
                  flex flex-col justify-end p-3
                  transform translate-y-0"
                >
                  {/* Rank Badge */}
                  <div className="absolute top-2 right-2 bg-[#8B0000]/80 
                    backdrop-blur-sm px-2 py-1 rounded-md text-sm font-medium
                    text-white shadow-lg shadow-[#8B0000]/20 border border-[#8B0000]/50"
                  >
                    #{index + 1}
                  </div>

                  {/* Info Container */}
                  <div className="space-y-1">
                    <div className="text-xs font-medium text-gray-300 uppercase">
                      {item.media_type}
                    </div>
                    <div className="text-sm font-bold text-white line-clamp-2">
                      {item.title || item.name}
                    </div>
                  </div>
                </motion.div>

                {/* Blood Corner Effect */}
                <div className="absolute top-0 right-0 w-12 h-12">
                  <div className="absolute top-0 right-0 w-full h-full
                    bg-gradient-to-bl from-[#8B0000]/30 to-transparent
                    transform rotate-45 translate-x-6 -translate-y-6"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Accent */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px
        bg-gradient-to-r from-transparent via-[#8B0000]/30 to-transparent"
      />
    </motion.div>
  );
};

export default Trending;