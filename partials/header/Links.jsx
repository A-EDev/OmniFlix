"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { IoHomeSharp, IoCompassSharp, IoTrendingUp } from "react-icons/io5"

const Links = ({ isMobile, setIsModelOpened }) => {
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

  const handleClick = () => {
    if (setIsModelOpened) {
      setIsModelOpened(false);
    }
  };

  if (isMobile) {
    return (
      <div className="p-3 space-y-2">
        {links.map((link, index) => {
          const isActive = pathname === link.href || pathname.includes(link.href);
          return (
            <Link key={link.name} href={link.href} onClick={handleClick}>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  ${isActive 
                    ? 'bg-[#8B0000] text-white' 
                    : 'hover:bg-[#8B0000]/10 text-gray-400 hover:text-white'}
                  transition-colors duration-300
                `}
              >
                <link.icon className="text-xl" />
                <span className="font-medium">{link.name}</span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-2">
      {links.map((link) => {
        const isActive = pathname === link.href || pathname.includes(link.href);
        return (
          <Link key={link.name} href={link.href}>
            <motion.div
              className="relative px-4 py-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`
                flex items-center gap-2 
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                transition-colors duration-300
              `}>
                <link.icon className={isActive ? 'text-[#8B0000]' : ''} />
                <span className="font-medium">{link.name}</span>
              </div>
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 rounded-xl bg-[#8B0000]/10 -z-10
                  border border-[#8B0000]/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};

export default Links;