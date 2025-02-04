"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const TrendingCard = ({ info }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/watch/${info?.id}?media_type=${info?.media_type || 'movie'}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="relative aspect-[2/3] rounded-lg overflow-hidden
        bg-[#1a0000] border border-[#8B0000]/10 
        transition-all duration-300
        group cursor-pointer
        hover:border-[#8B0000]/30
        hover:shadow-lg hover:shadow-[#8B0000]/20"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${info?.poster_path}`}
        alt={info?.title || info?.name}
        fill
        className="object-cover transition-transform duration-300
        group-hover:scale-105"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />

      {/* Interactive Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t 
        from-black/60 to-transparent opacity-0 
        group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Enhanced Rating Badge */}
      <div className="absolute top-2 left-2 px-2 py-1 
        bg-black/70 backdrop-blur-sm rounded-md
        text-xs font-medium text-white/90
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
        flex items-center gap-1"
      >
        <span className="text-[#8B0000]">★</span>
        {info?.vote_average?.toFixed(1)}
      </div>

      {/* Click Feedback Effect */}
      <div className="absolute inset-0 bg-[#8B0000]/20 opacity-0 
        transition-opacity duration-150 pointer-events-none
        group-active:opacity-100"
      />
    </div>
  )
}

export default TrendingCard;