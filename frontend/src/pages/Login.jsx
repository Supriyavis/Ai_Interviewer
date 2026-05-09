import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_BASE_URL } from "../apiConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        alert(data.message || "Login successful 🎉");
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }

    } catch (error) {
      console.error(error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-24 overflow-hidden bg-[#050510] text-white">

      {/* ✅ NAVBAR */}
      <Navbar />

      {/* 🌈 BACKGROUND BLOBS */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500 blur-[150px] opacity-30 rounded-full"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-blue-500 blur-[120px] opacity-20 rounded-full"></div>

      {/* 🧊 CARD */}
      <div
        className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 
                   p-12 rounded-3xl w-full max-w-lg text-center
                   transition duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(236,72,153,0.4)]"
      >
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
          Welcome Back 👋
        </h2>

        <p className="text-gray-300 mb-8">
          Login to continue your journey
        </p>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-xl bg-white/10 text-white border border-white/20 
                     focus:ring-2 focus:ring-pink-500 hover:border-pink-400 transition"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-5 rounded-xl bg-white/10 text-white border border-white/20 
                     focus:ring-2 focus:ring-pink-500 hover:border-pink-400 transition"
        />

        {/* BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl text-lg font-semibold
                     bg-gradient-to-r from-pink-500 to-blue-500
                     hover:scale-105 hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]
                     active:scale-95 transition duration-200
                     disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login 🚀"}
        </button>
      </div>
    </div>
  );
}