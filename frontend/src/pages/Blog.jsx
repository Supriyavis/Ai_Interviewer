import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen px-4 md:px-12 py-20 text-white overflow-hidden bg-[#050510]">

      {/* BACKGROUND */}
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500 blur-[100px] md:blur-[150px] opacity-20 md:opacity-30 rounded-full z-0"></div>
      <div className="absolute top-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600 blur-[100px] md:blur-[150px] opacity-10 md:opacity-20 rounded-full z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">

          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            How to Prepare for <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI Interviews in 2026
            </span>
          </h1>

          <p className="text-gray-400 mt-4 px-1">
            A complete roadmap to crack your AI interviews with confidence.
          </p>

          {/* AUTHOR */}
          <div className="flex items-center gap-3 mt-6">
            <img
              src="./Professional Pic.png"
              className="w-10 h-10 rounded-full object-cover border border-gray-700"
              alt="Supriya Vishwakarma"
            />
            <div>
              <p className="text-sm font-medium">By Supriya Vishwakarma</p>
              <p className="text-xs text-gray-400">
                May 1, 2026
              </p>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative mt-8 group">
            <img
              src="./Ai_Img.jpeg"
              alt="AI Interview"
              className="w-full h-[200px] md:h-[350px] object-cover rounded-2xl 
                         border border-gray-800 
                         transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>

          {/* TEXT */}
          <p className="text-gray-300 mt-6 leading-relaxed">
            AI interviews can be challenging, but with the right strategy and
            consistent practice, you can definitely ace them. The key is to blend technical depth with clear communication.
          </p>

          {/* POINTS */}
          <div className="mt-8 space-y-6">

            {/* 1 */}
            <div className="flex gap-4 group">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-pink-500 text-white text-sm font-bold shadow-lg shadow-pink-500/20 group-hover:scale-110 transition">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">Understand the Basics</h3>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  Build strong fundamentals in AI, ML, and core concepts. Focus on algorithm intuition and problem-solving patterns.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex gap-4 group">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-pink-500 text-white text-sm font-bold shadow-lg shadow-pink-500/20 group-hover:scale-110 transition">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">Mock Interviews</h3>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  Practice real interview scenarios and improve performance. Use AI tools to get instant feedback on your tone and clarity.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex gap-4 group">
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center 
                              rounded-full bg-pink-500 text-white text-sm font-bold shadow-lg shadow-pink-500/20 group-hover:scale-110 transition">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">Final Thoughts</h3>
                <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                  Stay consistent and confident. Preparation is the bridge between goals and accomplishment.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ON THIS PAGE */}
          <div className="glass p-6 rounded-xl border border-gray-800 bg-white/5 backdrop-blur-sm shadow-xl">
            <h3 className="mb-4 font-bold text-sm uppercase tracking-wider text-gray-300">ON THIS PAGE</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                1. Basics
              </li>
              <li className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                2. Mock Interviews
              </li>
              <li className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                3. Final Thoughts
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="p-8 rounded-2xl 
                          bg-gradient-to-br from-purple-500/10 to-pink-500/10
                          border border-gray-800 bg-white/5 backdrop-blur-sm
                          shadow-2xl">

            <h3 className="font-bold text-xl mb-3">
              Ace Your AI Interviews
            </h3>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Get AI-powered mock interviews and real-time feedback designed to help you land your dream job.
            </p>

            <button
              onClick={() => navigate("/start-interview")}
              className="w-full py-3 rounded-xl font-bold
                         bg-gradient-to-r from-purple-500 to-pink-500 
                         hover:scale-105 transition shadow-lg shadow-pink-500/20 active:scale-95"
            >
              Start Preparing Now →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}