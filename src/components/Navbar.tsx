// src/components/Navbar.tsx
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { scrollToElement } from "@/lib/scrollUtils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Highlight active section based on scroll position
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Determine which section is currently in view
  const updateActiveSection = useCallback(() => {
    const sections = ["home", "about", "projects", "contact"];
    const scrollPosition = window.scrollY + 100; // Add offset for header
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sections[i]);
        break;
      }
    }
  }, []);
  
  // Check for active section when page loads and when content changes
  useEffect(() => {
    updateActiveSection();
    
    // Re-check after images and other content loads
    window.addEventListener('load', updateActiveSection);
    
    return () => {
      window.removeEventListener('load', updateActiveSection);
    };
  }, [updateActiveSection]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    // Calculate header height for offset
    const header = document.querySelector('header');
    const offset = header ? header.offsetHeight + 20 : 0;
    
    scrollToElement(sectionId, {
      offset,
      onComplete: () => {
        setIsMenuOpen(false);
        setActiveSection(sectionId);
      }
    });
  };

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-cornsilk/90 dark:bg-pakistan/90 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex justify-between items-center">
        <div className="text-2xl font-bold gradient-text">Saleh Al-Jaberi</div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["home", "about", "projects", "contact"].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`capitalize hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tiger focus-visible:ring-opacity-75 focus-visible:rounded-md focus-visible:px-2 focus-visible:py-1 ${
                activeSection === section ? "text-secondary font-medium" : ""
              }`}
            >
              {section}
            </button>
          ))}
          <ThemeToggle />
        </nav>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-tiger focus-visible:ring-opacity-75 focus-visible:rounded-md focus-visible:p-1"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav
            id="mobile-menu"
            className="absolute top-full left-0 right-0 bg-cornsilk/95 dark:bg-pakistan/95 backdrop-blur-md p-4 shadow-md md:hidden animate-fade-in"
            role="menu"
          >
            <div className="flex flex-col space-y-4">
              {["home", "about", "projects", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize py-2 hover:text-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-tiger focus-visible:ring-opacity-75 focus-visible:rounded-md ${
                    activeSection === section ? "text-secondary font-medium" : ""
                  }`}
                  role="menuitem"
                >
                  {section}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;