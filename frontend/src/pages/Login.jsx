import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden bg-[#050510] text-white">

      {/* 🌈 BACKGROUND BLOBS */}
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500 blur-[100px] md:blur-[150px] opacity-20 md:opacity-30 rounded-full z-0"></div>
      <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600 blur-[100px] md:blur-[150px] opacity-10 md:opacity-20 rounded-full z-0"></div>

      {/* 🧊 CARD */}
      <div
        className="relative z-10 backdrop-blur-xl bg-white/5 border border-white/10 
                   p-8 md:p-12 rounded-3xl w-full max-w-lg text-center
                   transition duration-300 hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-blue-400 text-transparent bg-clip-text">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 mb-8">
          Login to continue your journey
        </p>

        <div className="space-y-4">
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

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-xl text-lg font-bold
                       bg-gradient-to-r from-pink-500 to-blue-500
                       hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(236,72,153,0.4)]
                       active:scale-95 transition duration-200
                       disabled:opacity-50 mt-4"
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>
        </div>
        
        <p className="mt-6 text-gray-400 text-sm">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="text-pink-400 hover:underline">Register here</button>
        </p>
      </div>
    </div>
  );
}