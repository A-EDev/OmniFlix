"use client"
import Image from "next/image";
import Link from "next/link";
import { IoStar } from "react-icons/io5";
import { motion } from "framer-motion";

const TrendingCard = ({ info }) => {
  const href = `/watch/${info?.id}?media_type=${info?.media_type || 'movie'}`;

  return (
    <Link href={href} className="block w-full">
      <motion.div 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative aspect-[2/3] rounded-lg overflow-hidden
          bg-[#1a0000] 
          transition-all duration-300
          group cursor-pointer
          border border-[#8B0000]/20
          hover:border-[#8B0000]
          hover:shadow-xl hover:shadow-[#8B0000]/20"
      >
        {/* Main Image */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${info?.poster_path}`}
          alt={info?.title || info?.name}
          fill
          priority
          className="object-cover transition-transform duration-500
            group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t 
          from-black via-transparent to-transparent 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300"
        />

        {/* Top Rating Badge */}
        <div className="absolute top-2 left-2 
          flex items-center gap-1 px-2 py-1
          bg-black/70 backdrop-blur-sm rounded-md
          opacity-0 group-hover:opacity-100
          transition-all duration-300 transform
          translate-y-2 group-hover:translate-y-0"
        >
          <IoStar className="text-[#8B0000]" />
          <span className="text-white font-medium text-sm">
            {info?.vote_average?.toFixed(1)}
          </span>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-0 
          p-3 bg-gradient-to-t from-black/90 to-transparent
          transform translate-y-full group-hover:translate-y-0
          transition-transform duration-300"
        >
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#8B0000]">
                {info?.media_type?.toUpperCase()}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(info?.release_date || info?.first_air_date).getFullYear()}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white line-clamp-2">
              {info?.title || info?.name}
            </h3>
          </div>
        </div>

        {/* Blood Corner Effect */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 
          group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute top-0 right-0 w-full h-full
            bg-gradient-to-bl from-[#8B0000]/50 to-transparent
            transform rotate-45 translate-x-8 -translate-y-8"
          />
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20
          bg-[#8B0000] blur-2xl transition-opacity duration-300" 
        />

        {/* Active State Feedback */}
        <div className="absolute inset-0 bg-[#8B0000]/20 opacity-0 
          group-active:opacity-100 transition-opacity duration-150" 
        />
      </motion.div>
    </Link>
  );
};

export default TrendingCard;