import { useState } from "react";
import Navbar from "../components/Navbar";

export default function FAQ() {
  const [open, setOpen] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    { q: "How does AI interview work?", a: "AI asks and evaluates your answers instantly." },
    { q: "Is this platform free?", a: "Yes, core features are completely free." },
    { q: "Can I track progress?", a: "Yes, your performance is tracked automatically." },
    { q: "Is it beginner friendly?", a: "Yes, perfect for freshers and students." },
    { q: "Which domains are available?", a: "Frontend, Backend, AI, and more." },
    { q: "Does it give real experience?", a: "Yes, it simulates real interview scenarios." },
    { q: "Do I need coding knowledge?", a: "Basic knowledge helps but beginners can also practice." },
    { q: "Can I retry interviews?", a: "Yes, you can take multiple interviews anytime." },
    { q: "Can I use it on mobile?", a: "Yes, the platform is fully responsive and works on all devices." },
    { q: "Is my data secure?", a: "Yes, we prioritize your privacy and data security." },
    { q: "Can I get feedback on my answers?", a: "Absolutely, our AI provides detailed feedback for each question." },
    { q: "Are there mock tests for specific companies?", a: "We offer domain-specific tests that align with industry standards." },
    { q: "How many questions are asked per interview?", a: "Interviews typically consist of 5 to 10 questions depending on the domain." },
    { q: "Can I skip questions?", a: "Yes, you can skip and move to the next question if needed." }
  ];

  const visibleFaqs = showAll ? faqs : faqs.slice(0, 8);

  return (
    <div className="relative w-full min-h-screen px-8 py-24 text-white overflow-hidden bg-[#050510]">

      {/* 🔁 REVERSED GLOW */}
<div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500 blur-[150px] opacity-30 rounded-full"></div>
{/* 🔵 PURPLE-BLUE TONE (TOP RIGHT) */}
<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>
      <Navbar />

      <div className="max-w-4xl mx-auto mt-10">

        <h1 className="text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {visibleFaqs.map((item, i) => (
            <div
              key={i}
              onClick={() => setOpen(open === i ? null : i)}
              className="glass p-6 rounded-xl cursor-pointer 
                         transition duration-300 
                         hover:scale-105 
                         hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] 
                         hover:border-pink-400 border border-gray-800"
            >
              <h3 className="text-lg font-semibold mb-2">
                {item.q}
              </h3>

              <p className={`text-gray-400 text-sm transition-all duration-300 
                ${open === i ? "opacity-100 mt-2 h-auto" : "opacity-0 h-0 overflow-hidden"}`}>
                {item.a}
              </p>
            </div>
          ))}
        </div>

        {/* SEE MORE BUTTON */}
        <div className="text-center mt-10">
          {!showAll && faqs.length > 8 && (
            <button
              onClick={() => setShowAll(true)}
              className="text-pink-400 hover:text-pink-300 font-semibold transition flex items-center gap-2 mx-auto"
            >
              See More FAQs ▾
            </button>
          )}

          {showAll && (
            <button
              onClick={() => setShowAll(false)}
              className="text-pink-400 hover:text-pink-300 font-semibold transition flex items-center gap-2 mx-auto"
            >
              See Less ▴
            </button>
          )}
        </div>
      </div>
    </div>
  );
}