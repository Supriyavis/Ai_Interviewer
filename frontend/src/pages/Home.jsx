import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen px-4 md:px-8 py-24 text-white overflow-hidden bg-[#050510]">

      {/* BACKGROUND GLOW */}
      {/* 🌸 PINK (BOTTOM LEFT) */}
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500 blur-[100px] md:blur-[150px] opacity-20 md:opacity-30 rounded-full z-0"></div>
      {/* 🔵 PURPLE-BLUE TONE (TOP RIGHT) */}
      <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600 blur-[100px] md:blur-[150px] opacity-10 md:opacity-20 rounded-full z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto text-center mt-10 md:mt-16">

        {/* HERO */}
        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Crack Interviews with <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI Powered Practice
          </span>
        </h1>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto px-4">
          Practice real-time AI interviews and boost your confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20 px-6">
          <Link
            to="/start-interview"
            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition shadow-lg shadow-purple-500/20"
          >
            Start Interview
          </Link>

          <Link
            to="/blog"
            className="px-8 py-3 rounded-xl border border-gray-700 hover:border-pink-400 hover:scale-105 transition"
          >
            Explore Blog
          </Link>
        </div>

        {/* FEATURES */}
        <div className="mt-24 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8 w-full max-w-7xl mx-auto">

            {/* ITEM 1 */}
            <div className="flex items-center gap-4 px-6 py-5
                            rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm
                            transition duration-300 
                            hover:scale-105 hover:border-pink-500/50 
                            hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">

              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-purple-500/20 text-purple-400 text-xl">
                🤖
              </div>

              <div className="text-left">
                <h3 className="text-base font-semibold">AI Interviews</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Smart AI questions
                </p>
              </div>
            </div>

            {/* ITEM 2 */}
            <div className="flex items-center gap-4 px-6 py-5
                            rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm
                            transition duration-300 
                            hover:scale-105 hover:border-pink-500/50 
                            hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">

              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-pink-500/20 text-pink-400 text-xl">
                ⚡
              </div>

              <div className="text-left">
                <h3 className="text-base font-semibold">Feedback</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Instant tips
                </p>
              </div>
            </div>

            {/* ITEM 3 */}
            <div className="flex items-center gap-4 px-6 py-5
                            rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm
                            transition duration-300 
                            hover:scale-105 hover:border-pink-500/50 
                            hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">

              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-purple-400/20 text-purple-300 text-xl">
                📊
              </div>

              <div className="text-left">
                <h3 className="text-base font-semibold">Progress</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Track growth
                </p>
              </div>
            </div>

            {/* ITEM 4 */}
            <div className="flex items-center gap-4 px-6 py-5
                            rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm
                            transition duration-300 
                            hover:scale-105 hover:border-pink-500/50 
                            hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">

              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-blue-500/20 text-blue-400 text-xl">
                🎯
              </div>

              <div className="text-left">
                <h3 className="text-base font-semibold">Practice</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Domain prep
                </p>
              </div>
            </div>

            {/* ITEM 5 */}
            <div className="flex items-center gap-4 px-6 py-5
                            rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm
                            transition duration-300 
                            hover:scale-105 hover:border-pink-500/50 
                            hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">

              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-green-500/20 text-green-400 text-xl">
                🚀
              </div>

              <div className="text-left">
                <h3 className="text-base font-semibold">Confidence</h3>
                <p className="text-gray-400 text-xs mt-1">
                  Boost skills
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}