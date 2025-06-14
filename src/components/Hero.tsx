import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  
  useEffect(() => {
    // Create timeline for entrance animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Split text for more granular animation
    const splitHeadline = new SplitText(headlineRef.current, { type: "words,chars" });
    const chars = splitHeadline.chars;
    
    // Hero section entrance
    tl.fromTo(sectionRef.current,
      { backgroundColor: "rgba(254,250,224,0)" },
      { backgroundColor: "rgba(254,250,224,0.95)", duration: 1.5 }
    )
    .fromTo(chars,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.03, duration: 0.8 },
      "-=1"
    )
    .fromTo(subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.2"
    );
    
    // Create parallax effect for background
    gsap.to(".hero-bg-element", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    return () => {
      // Clean up animations
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const scrollToAbout = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: "#about",
      ease: "power3.inOut"
    });
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Add decorative elements for parallax effect */}
      <div className="hero-bg-element absolute right-10 top-20 w-64 h-64 rounded-full bg-tiger/10 blur-3xl"></div>
      <div className="hero-bg-element absolute left-10 bottom-20 w-96 h-96 rounded-full bg-dark-moss/10 blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block overflow-hidden">
            <span className="text-sm md:text-base uppercase tracking-wider text-dark-moss font-semibold">
              Saleh Al-Jaberi
            </span>
            <div className="h-1 w-24 bg-tiger mx-auto mt-2"></div>
          </div>
          
          <h1 
            ref={headlineRef}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            From Sales Strategies to Scalable Code—I Build Products That Look Good & Work Well.
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-pakistan/80 mt-6 mb-10"
          >
            Computer Engineering Student & Export Sales Manager. 
            Full Stack Developer & UX Designer in Türkiye.
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <a 
              href="#projects" 
              className="bg-pakistan text-cornsilk px-6 py-3 rounded-md hover:bg-dark-moss transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              View My Projects
            </a>
            <a 
              href="#about" 
              className="border border-pakistan text-pakistan px-6 py-3 rounded-md hover:bg-pakistan hover:text-cornsilk transition-all duration-300 transform hover:translate-y-[-2px]"
            >
              Learn More About Me
            </a>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <ArrowDown className="text-pakistan animate-bounce" size={32} />
      </div>
    </section>
  );
};

export default Hero;