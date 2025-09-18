import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import AboutUsSection from "@/components/AboutUsSection";
import CoreServicesSection from "@/components/ServicesSection";
import HomeServicesSection from "@/components/HomeServicesSection";

const ScrollingSections = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll events for better performance with smooth animations
      requestAnimationFrame(() => {
        const newScrollY = window.scrollY;
        setScrollY(newScrollY);
        
        // Determine active section for arrow visibility - slower progression
        const viewportHeight = window.innerHeight;
        const scrollPerSection = viewportHeight * 3; // 3 scrolls per section
        const currentScrollSection = Math.floor(newScrollY / scrollPerSection);
        
        // Ensure smooth transitions between sections
        const sectionProgress = (newScrollY % scrollPerSection) / scrollPerSection;
        
        // Show arrow for the current active section (even during transitions)
        setActiveSection(currentScrollSection);
      });
    };

    // Add ultra-smooth scroll behavior to the document
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.style.scrollPaddingTop = '0px';
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const getTransformStyle = (sectionIndex: number) => {
    const viewportHeight = window.innerHeight;
    const scrollPerSection = viewportHeight * 3; // 3 scrolls per section consistently
    const currentScrollSection = Math.floor(scrollY / scrollPerSection);
    const scrollProgress = (scrollY % scrollPerSection) / scrollPerSection;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Ultra-smooth modern easing functions
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const easeInOutBack = (t: number) => {
      const c1 = 1.70158;
      const c2 = c1 * 1.525;
      return t < 0.5
        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    };
    
    // Special handling for Services section (index 2)
    if (sectionIndex === 2) {
      const servicesScrollStart = 2 * scrollPerSection;
      const relativeScroll = scrollY - servicesScrollStart;
      
      // Create discrete steps for card animations within the 3-scroll section
      const stepSize = scrollPerSection / 9; // 9 steps within the 3-scroll section
      const currentStep = Math.floor(relativeScroll / stepSize);
      
      if (relativeScroll < 0) {
        // Haven't reached services yet - add ultra-smooth parallax
        const parallaxOffset = Math.min(relativeScroll * 0.15, 0);
        const scale = 1 + Math.abs(relativeScroll) * 0.0001;
        return {
          transform: `translate3d(0, ${parallaxOffset}px, 0) scale(${scale})`,
          opacity: 1,
          transition: prefersReducedMotion ? "none" : "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
          filter: "blur(0px)",
          willChange: 'transform, opacity',
        };
      }
      
      if (currentStep < 8) {
        // Stay fixed in services section with ultra-smooth floating effect
        const floatProgress = easeInOutCubic(scrollProgress);
        const floatY = prefersReducedMotion ? 0 : Math.sin(floatProgress * Math.PI * 2) * 3;
        const floatX = prefersReducedMotion ? 0 : Math.cos(floatProgress * Math.PI * 1.5) * 1;
        const scale = 1 + Math.sin(floatProgress * Math.PI) * 0.005;
        return {
          transform: `translate3d(${floatX}px, ${floatY}px, 0) scale(${scale})`,
          opacity: 1,
          transition: prefersReducedMotion ? "none" : "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
          filter: "blur(0px)",
          willChange: 'transform, opacity',
        };
      } else {
        // All cards shown + extra steps completed
        const contactScrollTrigger = 2 * scrollPerSection + (8 * stepSize);
        if (scrollY >= contactScrollTrigger) {
          // Hide services section with ultra-smooth exit
          const exitProgress = Math.min((scrollY - contactScrollTrigger) / (viewportHeight * 0.5), 1);
          const exitEasing = easeOutQuart(exitProgress);
          return {
            transform: `translate3d(0, -${exitEasing * 100}vh, 0) scale(${1 - exitEasing * 0.06}) ${prefersReducedMotion ? '' : `rotateX(${exitEasing * 3}deg)`}`.trim(),
            opacity: 1 - exitEasing,
            transition: prefersReducedMotion ? "none" : "all 1.0s cubic-bezier(0.23, 1, 0.32, 1)",
            filter: `blur(${prefersReducedMotion ? 0 : exitEasing * 1.2}px)`,
            willChange: 'transform, opacity, filter',
          };
        } else {
          // Stay in services section with enhanced floating
          const floatY = 0;
          const floatX = 0;
          return {
            transform: `translate3d(${floatX}px, ${floatY}px, 0)`,
            opacity: 1,
            transition: prefersReducedMotion ? "none" : "transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
            filter: "blur(0px)",
            willChange: 'transform',
          };
        }
      }
    }
    
    // Special handling for Contact section (index 3) - slide from right with main viewport guarantee
    if (sectionIndex === 3) {
      const servicesCompleteScroll = 2 * scrollPerSection + (8 * (scrollPerSection / 9));
      
      if (scrollY < servicesCompleteScroll) {
        // Contact section hidden off-screen to the right with anticipation
        const anticipationProgress = Math.min((servicesCompleteScroll - scrollY) / (viewportHeight * 0.3), 1);
        const anticipationScale = 1 + anticipationProgress * 0.02;
        return {
          transform: `translate3d(100%, 0, 0) scale(${anticipationScale})`,
          opacity: 0,
          transition: prefersReducedMotion ? "none" : "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
          filter: prefersReducedMotion ? 'none' : "blur(3px)",
          willChange: 'transform, opacity, filter',
        };
      } else {
        // Contact section slides in with ultra-smooth animation
        const scrollBeyondTrigger = scrollY - servicesCompleteScroll;
        
        if (scrollBeyondTrigger < 100) {
          // Ultra-smooth slide in over 100px of scroll
          const slideProgress = scrollBeyondTrigger / 100;
          const slideEasing = easeInOutBack(slideProgress);
          const translateX = (1 - slideEasing) * 100;
          const scale = 0.95 + slideEasing * 0.05;
          const rotation = (1 - slideEasing) * 2;
          
          return {
            transform: `translate3d(${translateX}%, 0, 0) scale(${scale}) ${prefersReducedMotion ? '' : `rotateY(${rotation}deg)`}`.trim(),
            opacity: slideEasing,
            transition: prefersReducedMotion ? "none" : "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
            filter: prefersReducedMotion ? 'none' : `blur(${(1 - slideEasing) * 2}px)`,
            willChange: 'transform, opacity, filter',
          };
        } else {
          // Locked in main viewport with subtle floating
          const floatY = 0;
          const floatX = 0;
          return {
            transform: `translate3d(0, 0, 0) scale(1)`,
            opacity: 1,
            transition: prefersReducedMotion ? "none" : "transform 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
            filter: "blur(0px)",
            willChange: 'transform',
          };
        }
      }
    }
    
    // Sections above current: move out and hide completely
    if (sectionIndex < currentScrollSection) {
      const exitProgress = Math.min((currentScrollSection - sectionIndex) / 2, 1);
      const exitEasing = easeOutQuart(exitProgress);
      return {
        transform: `translate3d(0, -${exitEasing * viewportHeight}px, 0) scale(${1 - exitEasing * 0.06}) ${prefersReducedMotion ? '' : `rotateX(${exitEasing * 2}deg)`}`.trim(),
        opacity: 0,
        transition: prefersReducedMotion ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        filter: 'none',
        willChange: 'transform',
        pointerEvents: 'none' as const,
      };
    }
    
    if (sectionIndex === currentScrollSection) {
      const sectionScrollStart = sectionIndex * scrollPerSection;
      const relativeScroll = scrollY - sectionScrollStart;
      const progress = easeInOutCubic(Math.min(relativeScroll / scrollPerSection, 1));
      
      // Keep About Us (index 1) fully visible longer before transitioning
      if (sectionIndex === 1) {
        const lateStart = Math.max(0, (progress - 0.8) / 0.2); // 0 until 80%, then 0->1
        const translateY = -relativeScroll * 0.15; // gentler parallax
        const scale = 1 - (lateStart * 0.02);
        const opacity = 1 - (lateStart * 0.6);
        return {
          transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
          opacity: Math.max(opacity, 1 - lateStart * 0.6),
          transition: prefersReducedMotion ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
          filter: "none",
          willChange: 'transform, opacity',
        };
      }

      // Default current section behavior (consistent pacing)
      const translateY = -relativeScroll * 0.25; // slightly gentler to avoid early reveal
      const scale = 1 - (progress * 0.015); // Subtle scaling
      const opacity = 1 - (progress * 0.02); // Minimal opacity change
      const rotation = progress * 0.5; // Subtle rotation
      const floatY = Math.sin(progress * Math.PI * 2) * 2;
      
      return {
        transform: `translate3d(0, ${translateY + floatY}px, 0) scale(${scale}) ${prefersReducedMotion ? '' : `rotateZ(${rotation}deg)`}`.trim(),
        opacity: Math.max(opacity, 0.98),
        transition: prefersReducedMotion ? "none" : "all 0.9s cubic-bezier(0.23, 1, 0.32, 1)",
        filter: "blur(0px)",
        willChange: 'transform, opacity',
      };
    }
    
    // Sections below current: keep off-screen and hidden until active
    const anticipationProgress = Math.min((sectionIndex - currentScrollSection) / 2, 1);
    const anticipationEasing = easeInOutCubic(anticipationProgress);
    return {
      transform: `translate3d(0, ${Math.max(10, anticipationEasing * 50)}px, 0) scale(${1 - anticipationEasing * 0.02})`,
      opacity: 0,
      transition: prefersReducedMotion ? "none" : "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      filter: 'none',
      willChange: 'transform',
      pointerEvents: 'none' as const,
    };
  };

  return (
    <>
      {/* Create scrollable height for 4 sections with 3 scrolls per section */}
      <div className="h-[1200vh]"></div>
      
      {/* Fixed container for sections (solid background to avoid gaps) */}
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-background z-0">
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
        
        {/* Contact Section is rendered on the home page below Services to control order */}
        
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
        
        {/* Services Section (cards reveal) */}
        <div 
          className="absolute inset-0 w-full h-full z-20 ai-bg"
          style={getTransformStyle(2)}
        >
          <CoreServicesSection showArrow={activeSection === 2} />
        </div>

        {/* Home Services Section (new 4th section to keep pacing consistent) */}
        <div 
          className="absolute inset-0 w-full h-full z-10 ai-bg"
          style={getTransformStyle(3)}
        >
          <HomeServicesSection />
        </div>
      </div>
    </>
  );
};

export default ScrollingSections;