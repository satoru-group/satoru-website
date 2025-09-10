import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import AboutUsSection from "@/components/AboutUsSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";

const ScrollingSections = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events for better performance with smooth animations
      requestAnimationFrame(() => {
        const newScrollY = window.scrollY;
        setScrollY(newScrollY);
        
        // Determine active section for arrow visibility
        const viewportHeight = window.innerHeight;
        const currentScrollSection = Math.floor(newScrollY / viewportHeight);
        
        // Show arrow for the current active section (even during transitions)
        setActiveSection(currentScrollSection);
      });
    };

    // Add smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const getTransformStyle = (sectionIndex: number) => {
    const viewportHeight = window.innerHeight;
    const currentScrollSection = Math.floor(scrollY / viewportHeight);
    const scrollProgress = (scrollY % viewportHeight) / viewportHeight;
    
    // Modern easing function
    const modernEasing = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    
    // Special handling for Services section (index 2)
    if (sectionIndex === 2) {
      const servicesScrollStart = 2 * viewportHeight;
      const relativeScroll = scrollY - servicesScrollStart;
      
      // Create 12 discrete steps for card animations (don't move section)
      const stepSize = viewportHeight / 12; // 12 steps: enter + 3 cards (each with extra scroll) + button + 4 extra steps
      const currentStep = Math.floor(relativeScroll / stepSize);
      
      if (relativeScroll < 0) {
        // Haven't reached services yet - add subtle parallax
        const parallaxOffset = Math.min(relativeScroll * 0.1, 0);
        return {
          transform: `translateY(${parallaxOffset}px)`,
          opacity: 1,
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      }
      
      if (currentStep < 11) {
        // Stay fixed in services section with floating effect
        const floatProgress = modernEasing(scrollProgress);
        const floatY = Math.sin(floatProgress * Math.PI * 2) * 2;
        return {
          transform: `translateY(${floatY}px)`,
          opacity: 1,
          transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      } else {
        // All cards shown + extra steps completed
        const contactScrollTrigger = 2 * viewportHeight + (11 * stepSize);
        if (scrollY >= contactScrollTrigger) {
          // Hide services section with smooth exit
          return {
            transform: `translateY(-100vh) scale(0.95)`,
            opacity: 0,
            transition: "all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          };
        } else {
          // Stay in services section
          return {
            transform: 'translateY(0px)',
            opacity: 1,
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          };
        }
      }
    }
    
    // Special handling for Contact section (index 3) - slide from right with main viewport guarantee
    if (sectionIndex === 3) {
      const servicesCompleteScroll = 2 * window.innerHeight + (11 * (window.innerHeight / 12));
      
      if (scrollY < servicesCompleteScroll) {
        // Contact section hidden off-screen to the right
        return {
          transform: 'translateX(100%)',
          opacity: 0,
          transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        };
      } else {
        // Contact section slides in and locks to main viewport
        const scrollBeyondTrigger = scrollY - servicesCompleteScroll;
        
        if (scrollBeyondTrigger < 50) {
          // Quick slide in over 50px of scroll
          const slideProgress = scrollBeyondTrigger / 50;
          const translateX = Math.max((1 - slideProgress) * 100, 0);
          
          return {
            transform: `translateX(${translateX}%)`,
            opacity: 1,
            transition: "transform 0.4s ease-out",
          };
        } else {
          // Locked in main viewport - completely visible
          return {
            transform: 'translateX(0%)',
            opacity: 1,
            transition: "transform 0.2s ease-out",
          };
        }
      }
    }
    
    // Enhanced handling for other sections with parallax effects
    if (sectionIndex < currentScrollSection) {
      return {
        transform: `translateY(-${viewportHeight}px) scale(0.95)`,
        opacity: 0,
        transition: "all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      };
    }
    
    if (sectionIndex === currentScrollSection) {
      const sectionScrollStart = sectionIndex * viewportHeight;
      const relativeScroll = scrollY - sectionScrollStart;
      const progress = modernEasing(Math.min(relativeScroll / viewportHeight, 1));
      
      // Add parallax and scaling effects
      const translateY = -relativeScroll;
      const scale = 1 - (progress * 0.05);
      const opacity = 1 - (progress * 0.1);
      
      return {
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity: Math.max(opacity, 0.9),
        transition: "opacity 0.3s ease-out",
      };
    }
    
    // Sections below current - subtle anticipation animation
    const anticipationScale = sectionIndex === currentScrollSection + 1 ? 1.02 : 1;
    return {
      transform: `translateY(0px) scale(${anticipationScale})`,
      opacity: 1,
      transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };
  };

  return (
    <>
      {/* Create scrollable height for 4 sections */}
      <div className="h-[400vh]"></div>
      
      {/* Fixed container for sections */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden ai-bg neural-bg">
        {/* AI Background Animation Layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
          {/* Neural Network Connections */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 800">
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0"/>
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0"/>
              </linearGradient>
            </defs>
            
            {/* Animated connection lines */}
            <g className="animate-pulse" style={{animationDuration: '4s'}}>
              <line x1="100" y1="150" x2="300" y2="200" stroke="url(#connectionGradient)" strokeWidth="1"/>
              <line x1="200" y1="300" x2="500" y2="180" stroke="url(#connectionGradient)" strokeWidth="1"/>
              <line x1="400" y1="400" x2="700" y2="250" stroke="url(#connectionGradient)" strokeWidth="1"/>
              <line x1="600" y1="500" x2="900" y2="300" stroke="url(#connectionGradient)" strokeWidth="1"/>
              <line x1="800" y1="600" x2="1100" y2="350" stroke="url(#connectionGradient)" strokeWidth="1"/>
            </g>
            
            {/* Floating nodes */}
            <g>
              <circle cx="150" cy="180" r="3" fill="hsl(var(--primary))" opacity="0.4" className="animate-float-subtle"/>
              <circle cx="350" cy="220" r="2" fill="hsl(var(--accent))" opacity="0.5" className="animate-float-dynamic"/>
              <circle cx="550" cy="280" r="2.5" fill="hsl(var(--primary))" opacity="0.3" className="animate-ai-pulse"/>
              <circle cx="750" cy="320" r="2" fill="hsl(var(--accent))" opacity="0.4" className="animate-float-subtle"/>
              <circle cx="950" cy="380" r="3" fill="hsl(var(--primary))" opacity="0.5" className="animate-float-dynamic"/>
            </g>
          </svg>
          
          {/* Data Stream Particles */}
          <div className="absolute inset-0">
            <div 
              className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-ping"
              style={{
                left: '20%',
                top: '25%',
                animationDuration: '3s',
                animationDelay: '0s'
              }}
            ></div>
            <div 
              className="absolute w-1.5 h-1.5 bg-accent rounded-full opacity-25 animate-pulse"
              style={{
                left: '70%',
                top: '40%',
                animationDuration: '4s',
                animationDelay: '1s'
              }}
            ></div>
            <div 
              className="absolute w-1 h-1 bg-primary rounded-full opacity-35 animate-ping"
              style={{
                left: '45%',
                top: '60%',
                animationDuration: '2.5s',
                animationDelay: '2s'
              }}
            ></div>
            <div 
              className="absolute w-2 h-2 bg-accent rounded-full opacity-20 animate-pulse"
              style={{
                left: '85%',
                top: '20%',
                animationDuration: '3.5s',
                animationDelay: '0.5s'
              }}
            ></div>
            <div 
              className="absolute w-1 h-1 bg-primary rounded-full opacity-40 animate-ping"
              style={{
                left: '15%',
                top: '70%',
                animationDuration: '4.5s',
                animationDelay: '1.5s'
              }}
            ></div>
          </div>
          
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px),
                linear-gradient(180deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '100px 100px',
              animation: 'drift 30s linear infinite'
            }}
          ></div>
        </div>
        
        {/* Contact Section - Highest z-index, guaranteed main viewport positioning */}
        <div 
          className="absolute inset-0 w-full h-full z-50 ai-bg"
          style={getTransformStyle(3)}
        >
          <ContactSection />
        </div>
        
        {/* Hero Section */}
        <div 
          className="absolute inset-0 w-full h-full z-40 ai-bg"
          style={getTransformStyle(0)}
        >
          <Hero showArrow={activeSection === 0} />
        </div>
        
        {/* About Us Section */}
        <div 
          className="absolute inset-0 w-full h-full z-30 ai-bg"
          style={getTransformStyle(1)}
        >
          <AboutUsSection showArrow={activeSection === 1} />
        </div>
        
        {/* Services Section */}
        <div 
          className="absolute inset-0 w-full h-full z-20 ai-bg"
          style={getTransformStyle(2)}
        >
          <ServicesSection showArrow={activeSection === 2} />
        </div>
      </div>
    </>
  );
};

export default ScrollingSections;