import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function StartInterview() {
  const [domain, setDomain] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const domains = [
    { name: "Frontend Development", desc: "HTML, CSS, React, Vue, UI/UX", icon: "🎨" },
    { name: "Backend Development", desc: "Node.js, Python, Java, APIs", icon: "⚙️" },
    { name: "Full Stack Development", desc: "MERN, MEAN, Next.js", icon: "🌐" },
    { name: "React Developer", desc: "React.js, Hooks, Redux, Next.js", icon: "⚛️" },
    { name: "Data Analytics", desc: "Excel, SQL, Tableau, Power BI", icon: "📈" },
    { name: "Data Science", desc: "Python, Statistics, Pandas, NumPy", icon: "📊" },
    { name: "Machine Learning", desc: "Algorithms, TensorFlow, Scikit-learn", icon: "🧠" },
    { name: "AI / Deep Learning", desc: "Neural Networks, NLP, Computer Vision", icon: "🤖" },
    { name: "DBMS / SQL", desc: "Queries, Normalization, Transactions", icon: "🗄️" },
    { name: "App Development", desc: "Flutter, React Native, iOS, Android", icon: "📱" },
    { name: "DevOps Engineering", desc: "Docker, Kubernetes, AWS, CI/CD", icon: "🚀" },
    { name: "Cybersecurity", desc: "Pen Testing, Network Security, Crypto", icon: "🛡️" },
    { name: "Cloud Computing", desc: "AWS, Azure, GCP, Serverless", icon: "☁️" },
    { name: "UI/UX Design", desc: "Figma, Adobe XD, User Research", icon: "🎨" },
    { name: "Software Testing / QA", desc: "Selenium, Jest, Unit Testing", icon: "🧪" },
    { name: "Blockchain Development", desc: "Solidity, Ethereum, Smart Contracts", icon: "🔗" },
    { name: "Data Engineering", desc: "Spark, Hadoop, ETL Pipelines", icon: "🏗️" },
    { name: "Game Development", desc: "Unity, C#, Unreal Engine, C++", icon: "🎮" },
    { name: "Embedded Systems", desc: "C, Arduino, Raspberry Pi, IoT", icon: "🔌" },
    { name: "Product Management", desc: "Roadmaps, Agile, User Stories", icon: "📋" },
  ];

  const visibleDomains = showAll ? domains : domains.slice(0, 9);

  return (
    <div className="relative w-full min-h-screen px-6 md:px-10 py-20 text-white overflow-hidden bg-[#050510]">

      {/* BACKGROUND */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500 blur-[150px] opacity-30 rounded-full"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>

      <Navbar />

      <div className="max-w-7xl mx-auto mt-10 text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Start Your{" "}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            AI Interview
          </span>
        </h1>

        <p className="text-gray-400 mb-12">
          Choose your domain and begin your personalized interview practice
        </p>

        {/* DOMAIN GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {visibleDomains.map((item, index) => (
            <div
              key={index}
              onClick={() => setDomain(item.name)}
              className={`relative p-6 rounded-2xl border cursor-pointer transition duration-300
                ${
                  domain === item.name
                    ? "border-green-400 shadow-[0_0_25px_rgba(34,197,94,0.5)]"
                    : "border-gray-800 hover:border-pink-400"
                }
                hover:scale-105`}
            >

              {/* ✅ GREEN TICK */}
              {domain === item.name && (
                <div className="absolute top-3 right-3 text-green-400 text-xl">
                  ✔
                </div>
              )}

              <div className="flex items-start gap-4">

                {/* ICON */}
                <div className="w-14 h-14 flex items-center justify-center 
                                rounded-full 
                                bg-gradient-to-r from-purple-500/20 to-pink-500/20 
                                text-2xl">
                  {item.icon}
                </div>

                <div className="text-left">
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {item.desc}
                  </p>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* SHOW MORE BUTTON */}
        {!showAll && domains.length > 9 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-8 text-pink-400 hover:text-pink-300 font-semibold transition"
          >
            Show More Domains ▾
          </button>
        )}

        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="mt-8 text-pink-400 hover:text-pink-300 font-semibold transition"
          >
            Show Less ▴
          </button>
        )}

        {/* BUTTON */}
        <div className="mt-12">
          <button
            onClick={() => {
              if (!domain) {
                alert("Please select a domain");
                return;
              }

              navigate("/interview", {
                state: { domain },
              });
            }}
            className="px-10 py-4 rounded-xl text-lg 
                       bg-gradient-to-r from-purple-500 to-pink-500 
                       hover:scale-105 
                       hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]
                       transition duration-300">
            Start Interview 🚀
          </button>
        </div>

      </div>
    </div>
  );
}