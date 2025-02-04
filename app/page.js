import Collection from "@/content/Home/Collection";
import Herosection from "@/content/Home/HeroSection/Herosection"
import Popular from "@/content/Home/Popular";
import TopRated from "@/content/Home/Season";
import Trending from "@/content/Home/Trending";
import WatchHistory from "@/content/Home/WatchHistory";
import { getTrendingMovies, getTopRatedMovies } from "@/lib/MoviesFunctions";

const Home = async () => {
  const [trendingdata, top_rateddata] = await Promise.all([
    getTrendingMovies(),
    getTopRatedMovies()
  ]);

  return (
    <main className="relative min-h-screen bg-[#0d0d0d] text-white overflow-x-hidden">
      {/* Background Effects Container */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Blood Drip Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="absolute w-[2px] h-[20vh] bg-gradient-to-b from-[#8B0000] to-transparent opacity-30 animate-blood-drip"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Pulsating Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0000] via-[#0d0d0d] to-[#1a0000] opacity-50 animate-pulse" />

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#8B0000_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative w-full mb-24">
          <Herosection data={trendingdata} />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none" />
        </section>

        {/* Main Content Sections */}
        <div className="relative max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Sections Stack */}
          <div className="relative flex flex-col gap-32">
            {/* Trending Section */}
            <section className="w-full">
              <div className="relative z-10 bg-[#0d0d0d] rounded-2xl">
                <Trending 
                  data={trendingdata} 
                  className="bg-[#8B0000]/5 backdrop-blur-sm rounded-2xl p-6 
                  border border-[#8B0000]/20 
                  transition-all duration-300 
                  hover:border-[#8B0000]/50 
                  hover:shadow-lg 
                  hover:shadow-[#8B0000]/30"
                />
              </div>
            </section>

            {/* Popular Section */}
            <section className="w-full">
              <div className="relative z-10 bg-[#0d0d0d] rounded-2xl">
                <Popular 
                  className="bg-[#8B0000]/5 backdrop-blur-sm rounded-2xl p-6 
                  border border-[#8B0000]/20 
                  transition-all duration-300 
                  hover:border-[#8B0000]/50 
                  hover:shadow-lg 
                  hover:shadow-[#8B0000]/30"
                />
              </div>
            </section>

            {/* Top Rated Section */}
            <section className="w-full">
              <div className="relative z-10 bg-[#0d0d0d] rounded-2xl">
                <TopRated 
                  data={top_rateddata} 
                  className="bg-[#8B0000]/5 backdrop-blur-sm rounded-2xl p-6 
                  border border-[#8B0000]/20 
                  transition-all duration-300 
                  hover:border-[#8B0000]/50 
                  hover:shadow-lg 
                  hover:shadow-[#8B0000]/30"
                />
              </div>
            </section>
          </div>

          {/* Section Separators */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-gradient-to-r 
                from-transparent via-[#8B0000]/20 to-transparent"
                style={{ top: `${(i + 1) * 33.33}%` }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-24" />

        {/* Bottom Accent Line */}
        <div className="fixed bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r 
        from-transparent via-[#8B0000]/30 to-transparent" />
      </div>
    </main>
  );
};

export default Home;