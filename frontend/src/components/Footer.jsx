import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBolt,
  FaDatabase,
  FaFileAlt,
} from "react-icons/fa";

import {
  MdHome,
  MdPlayArrow,
  MdArticle,
  MdHelp,
  MdContactMail,
  MdTipsAndUpdates,
  MdDescription,
  MdCode,
} from "react-icons/md";

export default function Footer() {
  return (
    <div className="bg-[#050510] text-white w-full px-4 md:px-10 py-16 border-t border-gray-800">

      {/* FULL WIDTH GRID */}
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* LEFT SECTION */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-white">PrepWise</span>{" "}
            <span className="text-blue-400">AI</span>
          </h2>

          <p className="text-gray-400 text-sm mb-5">
            Practice smart interviews with AI and boost your confidence.
          </p>

          {/* FEATURES */}
          <div className="space-y-3 text-sm">

            <div className="flex items-center gap-3 text-gray-300 hover:translate-x-1 transition">
              <FaBolt className="text-pink-400" />
              Real-time AI feedback
            </div>

            <div className="flex items-center gap-3 text-gray-300 hover:translate-x-1 transition">
              <FaDatabase className="text-purple-400" />
              Domain-based questions
            </div>

            <div className="flex items-center gap-3 text-gray-300 hover:translate-x-1 transition">
              <FaFileAlt className="text-blue-400" />
              Resume-based interviews
            </div>

          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-200">

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdHome className="text-pink-400" />
              Home
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdPlayArrow className="text-purple-400" />
              Start Interview
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdArticle className="text-pink-400" />
              Blog
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdHelp className="text-purple-400" />
              FAQ
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdContactMail className="text-pink-400" />
              Contact
            </li>

          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-white">
            Resources
          </h3>

          <ul className="space-y-3 text-gray-200">

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdTipsAndUpdates className="text-purple-400" />
              Interview Tips
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdDescription className="text-pink-400" />
              Resume Builder
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdCode className="text-purple-400" />
              Coding Questions
            </li>

            <li className="flex items-center gap-3 hover:translate-x-1 hover:text-white transition">
              <MdArticle className="text-pink-400" />
              Blog
            </li>

          </ul>
        </div>

        {/* CONNECT */}

<div>
  <h3 className="font-semibold text-lg mb-4 text-white">
    Connect With Me
  </h3>

  <div className="flex gap-4 mb-5">

    {/* GITHUB */}
    <a
      href="https://github.com/Supriyavis"
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-800 hover:scale-110 transition"
    >
      <FaGithub />
    </a>

    {/* LINKEDIN */}
    <a
      href="https://www.linkedin.com/in/supriya-vishwakarma/"
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 flex items-center justify-center rounded-full bg-blue-600 hover:scale-110 transition"
    >
      <FaLinkedin />
    </a>

    {/* EMAIL */}
    <a
      href="mailto:supriyavishwakarma974@gmail.com"
      className="w-11 h-11 flex items-center justify-center rounded-full bg-pink-500 hover:scale-110 transition"
    >
      <FaEnvelope />
    </a>

  </div>

  <div className="glass p-4 rounded-xl hover:scale-[1.02] transition">
    <p className="font-semibold">
      <span className="text-blue-400">Keep</span>{" "}
      <span className="text-white">Improving 🚀</span>
    </p>

    <p className="text-gray-400 text-sm mt-1">
      Practice daily and crack your dream job.
    </p>
  </div>
</div>

      </div>

      {/* BOTTOM */}
      <div className="mt-12 text-gray-500 text-sm text-left">
        © 2026 PrepWise AI | Made with ❤️ by Supriya
      </div>

    </div>
  );
}