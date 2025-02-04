"use client"
import Image from "next/image"
import Link from "next/link"

const TrendingCard = ({ info }) => {
  return (
    <Link href={`/watch/${info?.id}?media_type=${info?.media_type}`}>
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden
        bg-[#1a0000] border border-[#8B0000]/10 
        transition-all duration-300
        group cursor-pointer"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${info?.poster_path}`}
          alt={info?.title || info?.name}
          fill
          className="object-cover transition-transform duration-300
          group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t 
          from-black/60 to-transparent opacity-0 
          group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Rating Badge */}
        <div className="absolute top-2 left-2 px-2 py-1 
          bg-black/70 backdrop-blur-sm rounded-md
          text-xs font-medium text-white/90
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300"
        >
          {info?.vote_average?.toFixed(1)}
        </div>
      </div>
    </Link>
  )
}

export default TrendingCard