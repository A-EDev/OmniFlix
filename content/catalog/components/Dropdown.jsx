"use client"

import clsx from "clsx"
import { useState } from "react"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { motion, AnimatePresence } from "framer-motion"

const Dropdown = ({ data, checkBoxItem, setCheckBoxItem }) => {
  const dropdownItems = ["All", ...data]
  const [isOpened, setIsOpened] = useState(false)

  // Animation variants
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: -10 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300
      }
    },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(139, 0, 0, 0.2)"
    }
  }

  return (
    <div className="relative w-full group">
      {/* Dropdown Trigger */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#0d0d0d] 
        border border-[#8B0000]/40 
        text-white 
        px-4 py-3 
        w-full 
        rounded-xl 
        cursor-pointer 
        flex 
        justify-between 
        items-center 
        transition-all 
        duration-300 
        hover:border-[#8B0000] 
        hover:shadow-[0_0_10px_rgba(139,0,0,0.3)]
        focus:outline-none 
        focus:ring-2 
        focus:ring-[#8B0000]"
        onClick={() => setIsOpened(prev => !prev)}
        tabIndex={0}
      >
        <div className="text-[16px] font-['poppins'] flex items-center">
          {checkBoxItem === "" ? dropdownItems[0] : checkBoxItem}
          {checkBoxItem !== "" && (
            <span className="ml-2 bg-[#8B0000] text-white text-xs px-2 py-1 rounded-full">
              Selected
            </span>
          )}
        </div>
        <motion.div
          animate={{ rotate: isOpened ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpened ? (
            <IoIosArrowUp className="text-[#8B0000]" />
          ) : (
            <IoIosArrowDown className="text-[#8B0000]/70" />
          )}
        </motion.div>
      </motion.div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpened && (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute z-20 w-full mt-2 
            bg-[#0d0d0d] 
            border border-[#8B0000]/30 
            rounded-xl 
            overflow-hidden 
            shadow-2xl 
            shadow-[#8B0000]/30"
          >
            {dropdownItems?.map((item, index) => (
              <motion.div
                key={item}
                variants={itemVariants}
                whileHover="hover"
                className={clsx(
                  "px-4 py-3 cursor-pointer transition-all duration-300 text-[15px] font-['poppins']",
                  {
                    "bg-[#8B0000]/20 text-[#FF4500]": (checkBoxItem === "" ? "All" : checkBoxItem) === item,
                    "hover:bg-[#8B0000]/10 text-white": true
                  }
                )}
                onClick={() => {
                  setCheckBoxItem(item === "All" ? "" : item)
                  setIsOpened(false)
                }}
              >
                <div className="flex justify-between items-center">
                  {item}
                  {(checkBoxItem === "" ? "All" : checkBoxItem) === item && (
                    <span className="text-[#8B0000] font-bold">✓</span>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Dropdown