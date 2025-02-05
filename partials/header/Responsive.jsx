"use client"
import { LuAlignLeft } from "react-icons/lu";
import Links from "./Links";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Responsive = () => {
  const [isModelOpened, setIsModelOpened] = useState(false)
  
  return (
    <div className="relative z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModelOpened(!isModelOpened)}
        className="flex items-center justify-center p-2 rounded-xl
        text-white/80 hover:text-white min-[990px]:hidden
        hover:bg-[#8B0000]/10 border border-transparent
        hover:border-[#8B0000]/20 transition-all duration-300"
      >
        <LuAlignLeft className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {isModelOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="absolute top-14 left-0 w-64 bg-[#0d0d0d]/95 
            backdrop-blur-xl rounded-2xl border border-[#8B0000]/20
            shadow-xl shadow-black/20 overflow-hidden"
          >
            <Links isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Responsive