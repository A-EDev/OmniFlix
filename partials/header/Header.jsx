"use client"
import { nightTokyo } from "@/utils/fonts"
import { motion } from "framer-motion"
import Link from "next/link"
import Links from "./Links"
import Search from "./Search"
import Responsive from "./Responsive"

const Header = () => {
  return (
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full flex justify-center fixed top-0 left-0 right-0 z-10 px-4 sm:px-6 pt-4 sm:pt-6"
    >
      <div className="relative w-full max-w-[90rem]">
        {/* Blood Drip Effect */}
        <div className="absolute -top-4 sm:-top-6 left-0 right-0 h-6  pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-24 bg-gradient-to-b from-[#8B0000] to-transparent
              opacity-20 animate-blood-drip"
              style={{
                left: `${20 + i * 20}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        {/* Main Header Container */}
        <motion.div 
          layout
          className="w-full rounded-xl sm:rounded-2xl bg-[#0d0d0d]/95 backdrop-blur-xl
          border border-[#8B0000]/20
          shadow-lg shadow-black/20
          transition-all duration-300
          hover:border-[#8B0000]/30
          hover:shadow-[#8B0000]/20"
        >
          <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 gap-3 sm:gap-6">
            {/* Left Section */}
            <div className="flex items-center gap-3 sm:gap-8">
              <Responsive />

              {/* Logo */}
              <Link href="/" className="group relative">
                <motion.span 
                  className={`${nightTokyo.className} text-xl sm:text-2xl font-bold
                  text-transparent bg-clip-text bg-gradient-to-r 
                  from-[#8B0000] to-[#FF4500]
                  drop-shadow-[0_2px_4px_rgba(139,0,0,0.3)]
                  transition-all duration-300
                  group-hover:from-[#FF4500] group-hover:to-[#8B0000]`}
                >
                  OmniFlix
                  <span className="absolute -top-1 -right-6 sm:-right-8 text-[10px] sm:text-xs 
                    bg-[#8B0000] text-white px-1.5 sm:px-2 py-0.5 rounded-full
                    shadow-lg shadow-[#8B0000]/20 animate-pulse"
                  >
                    Beta
                  </span>
                </motion.span>
              </Link>

              {/* Navigation Links */}
              <div className="hidden md:block">
                <Links />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center">
              <div className="w-[180px] sm:w-[280px]">
                <Search />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Accent Lines */}
        <div className="absolute -bottom-px left-[10%] right-[10%] h-[1px]
          bg-gradient-to-r from-transparent via-[#8B0000]/30 to-transparent" />
      </div>
    </motion.div>
  )
}

export default Header