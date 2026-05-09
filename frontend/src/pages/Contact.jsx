import { useState } from "react";
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
      className="relative w-full min-h-screen px-4 md:px-8 py-24 text-white overflow-hidden bg-[#050510]"
    >
      {/* BACKGROUND */}
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pink-500 blur-[100px] md:blur-[150px] opacity-20 md:opacity-30 rounded-full z-0"></div>
      <div className="absolute top-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-600 blur-[100px] md:blur-[150px] opacity-10 md:opacity-20 rounded-full z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* HEADING */}
        <h1 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Contact Me
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <div className="glass flex items-center gap-4 p-6 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm hover:scale-[1.02] transition duration-300">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xl shadow-lg shadow-blue-500/10">
                <FaEnvelope />
              </div>
              <div>
                <p className="font-bold text-gray-200">Email</p>
                <p className="text-gray-400 text-sm break-all">
                  supriyavishwakarma974@gmail.com
                </p>
              </div>
            </div>

            <div className="glass flex items-center gap-4 p-6 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm hover:scale-[1.02] transition duration-300">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xl shadow-lg shadow-purple-500/10">
                <FaUser />
              </div>
              <div>
                <p className="font-bold text-gray-200">Role</p>
                <p className="text-gray-400 text-sm">
                  MERN Stack Developer
                </p>
              </div>
            </div>

            <div className="glass flex items-center gap-4 p-6 rounded-2xl border border-gray-800 bg-white/5 backdrop-blur-sm hover:scale-[1.02] transition duration-300">
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full bg-pink-500/20 text-pink-400 text-xl shadow-lg shadow-pink-500/10">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="font-bold text-gray-200">Location</p>
                <p className="text-gray-400 text-sm">
                  India
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT FORM */}
          <div className="glass p-8 md:p-10 rounded-3xl border border-gray-800 bg-white/5 backdrop-blur-md
                          shadow-2xl hover:shadow-pink-500/10 transition duration-500">

            <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center lg:text-left">
              Send Message
            </h2>

            <div className="space-y-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none
                           hover:border-pink-400 transition"
              />

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none
                           hover:border-pink-400 transition"
              />

              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                className="w-full p-4 rounded-xl bg-gray-900/50 border border-gray-700 
                           focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none
                           hover:border-pink-400 transition resize-none"
              />

              <button
                onClick={handleSubmit}
                className="w-full py-4 rounded-xl font-bold text-lg
                           bg-gradient-to-r from-purple-500 to-pink-500 
                           hover:scale-[1.02] 
                           hover:shadow-[0_0_30px_rgba(236,72,153,0.4)]
                           active:scale-95 transition duration-300 shadow-lg"
              >
                Send Message 🚀
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

  );
}