import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen px-8 py-24 text-white overflow-hidden bg-[#050510]">

      {/* BACKGROUND GLOW */}
      {/* 🌸 PINK (BOTTOM LEFT) */}
<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500 blur-[150px] opacity-30 rounded-full"></div>
{/* 🔵 PURPLE-BLUE TONE (TOP RIGHT) */}
<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>
      <Navbar />

      <div className="max-w-7xl mx-auto text-center mt-16">

        {/* HERO */}
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Crack Interviews with <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI Powered Practice
          </span>
          
        </h1>

        <p className="text-gray-400 mb-10 max-w-xl mx-auto">
          Practice real-time AI interviews and boost your confidence.
        </p>
      

        <div className="flex justify-center gap-4 mb-20">
          <Link
            to="/start-interview"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition"
          >
            Start Interview
          </Link>

          <Link
            to="/blog"
            className="px-6 py-3 rounded-xl border border-gray-700 hover:border-pink-400 hover:scale-105 transition"
          >
            Explore Blog
          </Link>
        </div>

       

       {/* FEATURES */}
<div className="mt-24 px-6">
  <div className="flex justify-center">
    
    <div className="grid grid-cols-5 gap-10 w-full max-w-7xl">

      {/* ITEM 1 */}
      <div className="flex items-center gap-3 px-6 py-5
                      rounded-xl border border-gray-700
                      transition duration-300 
                      hover:scale-105 hover:border-pink-400 
                      hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">

        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                        rounded-full bg-purple-500/20 text-purple-400">
          🤖
        </div>

        <div>
          <h3 className="text-sm font-semibold">AI Interviews</h3>
          <p className="text-gray-400 text-xs">
            Smart AI questions
          </p>
        </div>
      </div>

      {/* ITEM 2 */}
      <div className="flex items-center gap-3 px-4 py-4
                      rounded-xl border border-gray-700
                      transition duration-300 
                      hover:scale-105 hover:border-pink-400 
                      hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">

        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                        rounded-full bg-pink-500/20 text-pink-400">
          ⚡
        </div>

        <div>
          <h3 className="text-sm font-semibold">Feedback</h3>
          <p className="text-gray-400 text-xs">
            Instant improvement tips
          </p>
        </div>
      </div>

      {/* ITEM 3 */}
      <div className="flex items-center gap-3 px-4 py-4
                      rounded-xl border border-gray-700
                      transition duration-300 
                      hover:scale-105 hover:border-pink-400 
                      hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">

        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                        rounded-full bg-purple-400/20 text-purple-300">
          📊
        </div>

        <div>
          <h3 className="text-sm font-semibold">Progress</h3>
          <p className="text-gray-400 text-xs">
            Track your growth
          </p>
        </div>
      </div>

      {/* ITEM 4 */}
      <div className="flex items-center gap-3 px-4 py-4
                      rounded-xl border border-gray-700
                      transition duration-300 
                      hover:scale-105 hover:border-pink-400 
                      hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">

        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                        rounded-full bg-blue-500/20 text-blue-400">
          🎯
        </div>

        <div>
          <h3 className="text-sm font-semibold">Practice</h3>
          <p className="text-gray-400 text-xs">
            Domain based prep
          </p>
        </div>
      </div>

      {/* ITEM 5 */}
      <div className="flex items-center gap-3 px-4 py-4
                      rounded-xl border border-gray-700
                      transition duration-300 
                      hover:scale-105 hover:border-pink-400 
                      hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]">

        <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center 
                        rounded-full bg-green-500/20 text-green-400">
          🚀
        </div>

        <div>
          <h3 className="text-sm font-semibold">Confidence</h3>
          <p className="text-gray-400 text-xs">
            Boost your skills
          </p>
        </div>
      </div>

    </div>

  </div>
</div>

        </div>

      </div>
  );
}