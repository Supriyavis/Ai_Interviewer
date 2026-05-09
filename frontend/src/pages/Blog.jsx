import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen px-6 md:px-12 py-20 text-white overflow-hidden bg-[#050510]">

      {/* BACKGROUND */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500 blur-[150px] opacity-30 rounded-full"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>

      <Navbar />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 mt-10">

        {/* LEFT CONTENT */}
        <div className="md:col-span-2">

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            How to Prepare for <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI Interviews in 2026
            </span>
          </h1>

          <p className="text-gray-400 mt-4">
            A complete roadmap to crack your AI interviews with confidence.
          </p>

          {/* AUTHOR */}
          <div className="flex items-center gap-3 mt-6">
            <img
              src="./Professional Pic.png"
              className="w-10 h-10 rounded-full"
              alt=""
            />
            <div>
              <p className="text-sm">By Supriya Vishwakarma</p>
              <p className="text-xs text-gray-400">
                May 1, 2026
              </p>
            </div>
          </div>

          {/* IMAGE */}
         <img
  src="./Ai_Img.jpeg"
  alt="AI Interview"
  className="mt-8 w-full h-[260px] object-cover rounded-2xl 
             border border-gray-800 
             hover:scale-[1.02] transition duration-300"
/>

          {/* TEXT */}
          <p className="text-gray-300 mt-6">
            AI interviews can be challenging, but with the right strategy and
            consistent practice, you can definitely ace them.
          </p>

          {/* POINTS (ONLY 3) */}
          <div className="mt-8 space-y-6">

            {/* 1 */}
            <div className="flex gap-4">
              <div className="w-7 h-7 flex items-center justify-center 
                              rounded-full bg-pink-500 text-white text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold">Understand the Basics</h3>
                <p className="text-gray-400 text-sm">
                  Build strong fundamentals in AI, ML, and core concepts.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex gap-4">
              <div className="w-7 h-7 flex items-center justify-center 
                              rounded-full bg-pink-500 text-white text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold">Mock Interviews</h3>
                <p className="text-gray-400 text-sm">
                  Practice real interview scenarios and improve performance.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex gap-4">
              <div className="w-7 h-7 flex items-center justify-center 
                              rounded-full bg-pink-500 text-white text-sm">
                3
              </div>
              <div>
                <h3 className="font-semibold">Final Thoughts</h3>
                <p className="text-gray-400 text-sm">
                  Stay consistent and confident to crack interviews.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* ON THIS PAGE */}
          <div className="glass p-6 rounded-xl 
                          hover:scale-105 transition border border-gray-800">

            <h3 className="mb-4 font-semibold">ON THIS PAGE</h3>

            <ul className="space-y-3 text-sm">
              <li className="text-pink-400">1. Basics</li>
              <li className="text-pink-400">2. Mock Interviews</li>
              <li className="text-pink-400">3. Final Thoughts</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="p-6 rounded-xl 
                          bg-gradient-to-br from-purple-500/20 to-pink-500/20
                          border border-gray-800
                          hover:scale-105 transition">

            <h3 className="font-semibold mb-2">
              Ace Your AI Interviews
            </h3>

            <p className="text-gray-400 text-sm mb-4">
              Get AI-powered mock interviews and real-time feedback.
            </p>

            <button
              onClick={() => navigate("/start-interview")}
              className="w-full py-2 rounded-lg 
                         bg-gradient-to-r from-purple-500 to-pink-500 
                         hover:scale-105 transition">
              Start Preparing Now →
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}