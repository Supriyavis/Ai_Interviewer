import Home from "./Home";
import StartInterview from "./StartInterview";
import Blog from "./Blog";
import FAQ from "./FAQ";
import Contact from "./Contact";
import Footer from "../components/Footer";

export default function MainPage() {
  return (
    <div className="bg-[#0d0d0d] text-white w-full">

      {/* IMPORTANT: Push content below fixed navbar */}
      <div className="pt-20">

        {/* HOME SECTION */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center"
        >
          <Home />
        </section>

        {/* START INTERVIEW SECTION */}
        <section
          id="start"
          className="min-h-screen flex items-center justify-center"
        >
          <StartInterview />
        </section>

        {/* BLOG SECTION */}
        <section
          id="blog"
          className="min-h-screen flex items-center justify-center"
        >
          <Blog />
        </section>

        {/* FAQ SECTION */}
        <section
          id="faq"
          className="min-h-screen flex items-center justify-center"
        >
          <FAQ />
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <Contact />
        </section>

        {/* FOOTER */}
        <Footer />

      </div>
    </div>
  );
}