import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEnvelope, FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { API_BASE_URL } from "../apiConfig";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      alert(data.message);

      // ✅ clear form
      setName("");
      setEmail("");
      setMessage("");

    } catch (error) {
      console.error(error);
      alert("Error sending message ❌");
    }
  };

  return (
    <div
      id="contact"
      className="relative w-full min-h-screen px-8 py-24 text-white overflow-hidden bg-[#050510]"
    >
      {/* BACKGROUND */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500 blur-[150px] opacity-30 rounded-full"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600 blur-[150px] opacity-20 rounded-full"></div>

      <Navbar />

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <h1 className="text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Contact Me
          </span>
        </h1>

        <div className="grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <div className="glass flex items-center gap-4 p-6 rounded-xl hover:scale-105 transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-400 text-sm">
                  supriyavishwakarma974@gmail.com
                </p>
              </div>
            </div>

            <div className="glass flex items-center gap-4 p-6 rounded-xl hover:scale-105 transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                <FaUser />
              </div>
              <div>
                <p className="font-semibold">Role</p>
                <p className="text-gray-400 text-sm">
                  MERN Stack Developer
                </p>
              </div>
            </div>

            <div className="glass flex items-center gap-4 p-6 rounded-xl hover:scale-105 transition">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-400">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="font-semibold">Location</p>
                <p className="text-gray-400 text-sm">
                  India
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="glass p-10 rounded-2xl border border-gray-800 
                          hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition">

            <h2 className="text-2xl font-semibold mb-6">
              Send Message
            </h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="w-full mb-4 p-3 rounded bg-transparent border border-gray-700 
                         focus:ring-2 focus:ring-purple-500 
                         hover:border-pink-400 transition"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full mb-4 p-3 rounded bg-transparent border border-gray-700 
                         focus:ring-2 focus:ring-purple-500 
                         hover:border-pink-400 transition"
            />

            <textarea
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your Message"
              className="w-full mb-4 p-3 rounded bg-transparent border border-gray-700 
                         focus:ring-2 focus:ring-purple-500 
                         hover:border-pink-400 transition"
            />

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl 
                         bg-gradient-to-r from-purple-500 to-pink-500 
                         hover:scale-105 
                         hover:shadow-[0_0_25px_rgba(236,72,153,0.5)]
                         transition duration-300">
              Send Message 🚀
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}