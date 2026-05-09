import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import MainPage from "./pages/MainPage";
import Interview from "./pages/Interview";
import Result from "./pages/Result";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

// ✅ ADD THIS
import StartInterview from "./pages/StartInterview";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<MainPage />} />
        {/* ✅ NEW ROUTE */}
        <Route path="/start-interview" element={<StartInterview />} />
        <Route path="/interview" element={<Interview />} />
          <Route path="/blog" element={<Blog />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/contact" element={<Contact />} />
        <Route path="/result" element={<Result />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}