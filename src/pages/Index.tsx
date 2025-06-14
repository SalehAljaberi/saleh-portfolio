
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ModeToggle from "../components/ModeToggle";
import SalesMode from "../components/SalesMode";
import TechnicalMode from "../components/TechnicalMode";
import Contact from "../components/Contact";
import SocialLinks from "../components/SocialLinks";
import { ArrowUp } from "lucide-react";

const Index = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [currentMode, setCurrentMode] = useState<"sales" | "technical">("sales");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-cornsilk text-foreground">
      <Navbar />
      <main>
        <Hero />
        
        {/* Mode Toggle Section */}
        <section className="section-padding bg-white dark:bg-pakistan">
          <div className="container-custom">
            <ModeToggle 
              currentMode={currentMode} 
              onModeChange={setCurrentMode}
            />
          </div>
        </section>

        {/* Dynamic Mode Content */}
        <section className="section-padding bg-cornsilk dark:bg-pakistan/95">
          <div className="container-custom">
            {currentMode === "sales" ? <SalesMode /> : <TechnicalMode />}
          </div>
        </section>

        <Contact />
      </main>

      <footer className="bg-pakistan text-cornsilk py-8">
        <div className="container-custom text-center">
          <p className="mb-2">© {new Date().getFullYear()} Saleh Al-Jaberi. All rights reserved.</p>
          <p className="text-sm text-cornsilk/70">
            From Sales Strategies to Scalable Code
          </p>
        </div>
      </footer>

      <SocialLinks vertical={true} />

      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-dark-moss text-cornsilk p-3 rounded-full shadow-lg z-40 hover:bg-pakistan transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Index;
