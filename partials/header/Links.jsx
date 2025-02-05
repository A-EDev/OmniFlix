"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { IoHomeSharp, IoCompassSharp, IoTrendingUp } from "react-icons/io5"

const Links = ({ isMobile }) => {
  const pathname = usePathname()

  const links = [
    {
      name: "Home",
      href: "/",
      icon: IoHomeSharp,
    },
    {
      name: "Filter",
      href: "/catalog",
      icon: IoCompassSharp,
    },
    {
      name: "Trending",
      href: "/catalog?sort=TRENDING_DESC",
      icon: IoTrendingUp,
    }
  ];

  // Mobile Navigation
  if (isMobile) {
    return (
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2 w-full p-2"
      >
        {links.map((link, index) => {
          const isActive = 
            (pathname === "/" && link.href === "/") ||
            (pathname !== "/" && pathname.includes(link.href));

          return (
            <motion.div
              key={link.name}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={link.href}>
                <motion.div
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-300
                    ${isActive 
                      ? 'bg-[#8B0000]/20 border-[#8B0000] text-white shadow-lg shadow-[#8B0000]/10' 
                      : 'text-gray-400 border-transparent hover:text-white hover:bg-[#8B0000]/10'}
                    border-2 backdrop-blur-sm
                  `}
                >
                  <link.icon className={`text-xl ${isActive ? 'text-[#8B0000]' : ''}`} />
                  <span className="font-medium">{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-[#8B0000]"
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Desktop Navigation
  return (
    <nav className="hidden md:flex items-center gap-1">
      {links.map((link) => {
        const isActive = 
          (pathname === "/" && link.href === "/") ||
          (pathname !== "/" && pathname.includes(link.href));

        return (
          <Link key={link.name} href={link.href}>
            <motion.div
              className="relative px-4 py-2"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`
                flex items-center gap-2 relative z-10
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                transition-colors duration-300
              `}>
                <link.icon className={`text-lg ${isActive ? 'text-[#8B0000]' : ''}`} />
                <span className="font-medium">{link.name}</span>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicatorDesktop"
                  className="absolute inset-0 bg-[#8B0000]/20 rounded-xl border border-[#8B0000]/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              {/* Hover Effect */}
              <div className="
                absolute inset-0 rounded-xl opacity-0 hover:opacity-100
                bg-gradient-to-r from-[#8B0000]/10 to-transparent
                transition-opacity duration-300
              " />
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};

export default Links;