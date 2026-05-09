import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaRobot, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // ✅ ALL ROUTES FIXED
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Start Interview", path: "/start-interview" },
    { name: "Blog", path: "/blog" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/5 border-b border-gray-800 text-white">

      <div className="flex items-center justify-between px-4 md:px-10 py-4">

        {/* 🔹 LOGO */}
        <div className="flex items-center gap-2">
          <FaRobot className="text-pink-400 text-xl" />
          <h1 className="text-xl font-bold">
            <span className="text-white">PrepWise</span>{" "}
            <span className="text-blue-400">AI</span>
          </h1>
        </div>

        {/* 🔹 DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">

          {navLinks.map((link, index) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={index}
                to={link.path}
                className={`text-sm transition-all duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent font-semibold"
                      : "text-gray-200 hover:text-white hover:font-semibold"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* AUTH SECTION */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center font-bold text-sm">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-200">
                  {user?.firstName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="text-gray-400 hover:text-pink-400 transition flex items-center gap-1 text-sm"
                title="Logout"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <>
              {/* LOGIN */}
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-gray-600 
                           hover:border-pink-400 hover:scale-105 transition"
              >
                Login
              </Link>

              {/* REGISTER */}
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg 
                           bg-gradient-to-r from-purple-500 to-pink-500 
                           hover:scale-105 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]
                           transition font-semibold"
              >
                Register
              </Link>
            </>
          )}

        </div>

        {/* 🔹 MOBILE ICON */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* 🔹 MOBILE MENU */}
      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-[#050510] border-t border-gray-800">

          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={() => setOpen(false)}
              className="text-gray-200 hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <div className="flex flex-col gap-4 mt-2 border-t border-gray-800 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center font-bold text-lg">
                  {user?.firstName?.charAt(0).toUpperCase()}
                </div>
                <span className="text-lg font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-pink-400 font-semibold"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg text-center"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}