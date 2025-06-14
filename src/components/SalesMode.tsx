// src/components/SalesMode.tsx - Enhanced version
import { useEffect, useRef } from "react";
import { TrendingUp, Users, Globe, Target, BarChart3, Award } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "./ui/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const SalesMode = () => {
  const achievementsRef = useRef(null);
  const heroRef = useRef(null);
  
  const achievements = [
    { value: 40, suffix: "%", label: "Brand Awareness Growth", icon: TrendingUp },
    { value: 200, suffix: "+", label: "Distributor Network", icon: Users },
    { value: 15, label: "MENA Countries", icon: Globe },
    { value: 25, suffix: "%", label: "Revenue Increase", icon: BarChart3 },
  ];

  const caseStudies = [
    {
      title: "PROLEDA Export Expansion",
      description: "Led comprehensive export strategy resulting in 40% brand awareness increase across MENA region",
      metrics: ["5 New Distributor Partnerships", "300+ Cold Calls", "25% Sales Growth"],
      impact: "Established sustainable growth pipeline in 6 months"
    },
    {
      title: "CRM Implementation & Optimization",
      description: "Designed and implemented customer relationship management system for B2B operations",
      metrics: ["85% Lead Conversion Rate", "200+ Active Distributors", "30% Process Efficiency"],
      impact: "Streamlined sales process and improved customer retention"
    },
    {
      title: "MENA Market Penetration",
      description: "Developed market entry strategies for Middle East and North Africa expansion",
      metrics: ["15 Target Countries", "120+ Qualified Leads", "60% Market Share Growth"],
      impact: "Successfully penetrated new markets with localized approach"
    }
  ];

  useEffect(() => {
    // Hero section animation
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
      }
    });
    
    heroTl.fromTo(".hero-icon", 
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" }
    );
    
    heroTl.fromTo(".hero-title", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.3"
    );
    
    heroTl.fromTo(".hero-description", 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
      "-=0.5"
    );
    
    // Achievement cards parallax effect
    gsap.to(".achievement-cards", {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: achievementsRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Hover effects for case study cards
    const caseStudyCards = document.querySelectorAll('.case-study-card');
    caseStudyCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
          y: -10, 
          boxShadow: "0 15px 30px rgba(0,0,0,0.1)", 
          duration: 0.3,
          ease: "power2.out" 
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
          y: 0, 
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)", 
          duration: 0.5,
          ease: "power2.out" 
        });
      });
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section ref={heroRef} className="text-center py-12 overflow-hidden">
        <div className="inline-flex items-center space-x-2 mb-4">
          <TrendingUp className="text-teal-600 hero-icon" size={32} />
          <h2 className="text-4xl font-bold gradient-text hero-title">Sales & Business Development</h2>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto hero-description">
          Driving B2B growth across MENA markets with data-driven strategies, 
          CRM optimization, and strategic partnership development.
        </p>
      </section>

      {/* Key Achievements */}
      <ScrollReveal animation="fade" threshold={0.2}>
        <section ref={achievementsRef} className="mode-gradient rounded-xl p-8 text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5 blur-xl"></div>
          
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center space-x-2">
            <Award size={24} />
            <span>Key Achievements</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 achievement-cards">
            {achievements.map((achievement, index) => (
              <ScrollReveal 
                key={index} 
                animation="slide-up" 
                delay={index * 0.1} 
                duration={0.7}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <achievement.icon className="text-white mx-auto mb-3" size={24} />
                  <AnimatedCounter 
                    value={achievement.value}
                    suffix={achievement.suffix}
                  />
                  <p className="text-sm text-white/90 mt-2">{achievement.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Case Studies */}
      <section>
        <ScrollReveal animation="fade">
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center space-x-2">
            <Target className="text-teal-600" size={24} />
            <span>Case Studies</span>
          </h3>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {caseStudies.map((study, index) => (
            <ScrollReveal 
              key={index} 
              animation="slide-up" 
              delay={index * 0.15}
              duration={0.7}
            >
              <div className="bg-card rounded-xl p-6 shadow-sm case-study-card">
                <h4 className="text-lg font-semibold mb-3 text-teal-700 dark:text-teal-300">
                  {study.title}
                </h4>
                <p className="text-muted-foreground mb-4 text-sm">
                  {study.description}
                </p>
                <div className="space-y-2 mb-4">
                  {study.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-sm">{metric}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <p className="text-sm font-medium text-teal-600 dark:text-teal-400">
                    Impact: {study.impact}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Skills & Expertise */}
      <ScrollReveal animation="fade" threshold={0.1}>
        <section className="bg-card rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500"></div>
          
          <h3 className="text-2xl font-bold text-center mb-8">Sales & Business Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Export & International Sales",
                items: [
                  "MENA Market Development",
                  "Distributor Network Management",
                  "Cross-Cultural Negotiations",
                  "International Trade Compliance"
                ]
              },
              {
                title: "CRM & Process Optimization",
                items: [
                  "CRM Implementation & Training",
                  "Sales Process Automation",
                  "Lead Qualification Systems",
                  "Performance Analytics"
                ]
              },
              {
                title: "Business Development",
                items: [
                  "Strategic Partnership Development",
                  "Market Entry Strategies",
                  "Competitive Analysis",
                  "Revenue Growth Planning"
                ]
              }
            ].map((category, index) => (
              <ScrollReveal 
                key={index} 
                animation="slide-up" 
                delay={index * 0.1}
                once={true}
              >
                <div className="space-y-4">
                  <h4 className="font-semibold text-teal-700 dark:text-teal-300">{category.title}</h4>
                  <ul className="space-y-2 text-sm">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="mr-2">•</span> 
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default SalesMode;