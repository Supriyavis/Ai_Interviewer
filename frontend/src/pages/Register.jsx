import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMoreDomains, setShowMoreDomains] = useState(false);
  const navigate = useNavigate();

  const allDomains = [
    "Frontend", "Backend", "Full Stack", "MERN Stack", "Data Science",
    "AI & DS", "Machine Learning", "Data Analytics", "Mobile App Dev",
    "DevOps", "Cybersecurity", "Cloud Computing", "UI/UX Design",
    "Software Testing", "Blockchain", "Data Engineering", "Game Dev",
    "Embedded Systems", "Product Management"
  ];

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          domain,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(data.message || "Registered Successfully 🎉");
        navigate("/");
      } else if (res.ok && !data.user) {
        alert("Registered successfully, but please log in manually.");
        navigate("/login");
      } else {
        alert(data.message || "Error registering user");
      }

    } catch (error) {
      console.error(error);
      alert("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden bg-[#050510] text-white">

      {/* 🌈 BACKGROUND BLOBS */}
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500 blur-[100px] md:blur-[150px] opacity-20 md:opacity-30 rounded-full z-0"></div>
      <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600 blur-[100px] md:blur-[150px] opacity-10 md:opacity-20 rounded-full z-0"></div>

      {/* 🧊 CARD */}
      <div
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 
                   p-8 md:p-12 rounded-3xl w-full max-w-2xl text-center
                   transition duration-300 hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
          Create Account 🚀
        </h2>

        <p className="text-gray-400 mb-8">
          Start your AI interview preparation today
        </p>

        <div className="space-y-4">
          {/* NAME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                         focus:ring-2 focus:ring-pink-500 outline-none hover:border-pink-400 transition"
            />
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                         focus:ring-2 focus:ring-pink-500 outline-none hover:border-pink-400 transition"
            />
          </div>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                       focus:ring-2 focus:ring-pink-500 outline-none hover:border-pink-400 transition"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                       focus:ring-2 focus:ring-pink-500 outline-none hover:border-pink-400 transition"
          />

          {/* DOMAIN */}
          <div className="text-left">
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                         focus:ring-2 focus:ring-pink-500 outline-none hover:border-pink-400 transition text-gray-300"
            >
              <option value="" disabled className="bg-gray-900">Select Domain</option>
              {(!showMoreDomains ? allDomains.slice(0, 6) : allDomains).map((d) => (
                <option key={d} value={d} className="bg-gray-900 text-white">{d}</option>
              ))}
            </select>
            
            {!showMoreDomains && (
              <button 
                type="button"
                onClick={() => setShowMoreDomains(true)}
                className="mt-3 text-xs text-pink-400 hover:text-pink-300 transition font-medium"
              >
                Can't find your domain? Show more options
              </button>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-4 mt-6 rounded-xl text-lg font-bold
                       bg-gradient-to-r from-pink-500 to-blue-500
                       hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]
                       active:scale-95 transition duration-200
                       disabled:opacity-50 shadow-lg"
          >
            {loading ? "Registering..." : "Register 🎯"}
          </button>
        </div>
        
        <p className="mt-6 text-gray-400 text-sm">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="text-pink-400 hover:underline">Login here</button>
        </p>
      </div>
    </div>
  );
}