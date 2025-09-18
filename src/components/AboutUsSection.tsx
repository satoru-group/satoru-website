import { Button } from "@/components/ui/button";
import { ChevronsDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

interface AboutUsSectionProps {
  showArrow?: boolean;
}

const AboutUsSection = ({ showArrow = false }: AboutUsSectionProps) => {
  const navigate = useNavigate();
  const [floatY, setFloatY] = useState(0);
  const lastYRef = useRef(0);

  useEffect(() => {
    let timeoutId = 0 as unknown as number;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastYRef.current;
      lastYRef.current = y;
      // Subtle upward nudge while scrolling (only -6px to 0px)
      const offset = Math.max(-6, Math.min(0, -delta * 0.6));
      setFloatY(offset);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setFloatY(0), 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleLearnMoreClick = () => {
    // Scroll to top of the page before navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/about');
  };

  return (
    <section className="w-full bg-background min-h-[100svh] flex flex-col justify-center items-center section-padding pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 overflow-hidden">
      {/* Animated background objects for visibility */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
        <div className="hidden sm:block absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-primary/25 to-accent/20 blur-3xl animate-float-subtle" />
        <div className="hidden lg:block absolute top-1/3 -right-14 w-52 h-52 rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl animate-float-dynamic" />
        <div className="absolute bottom-10 left-1/4 w-28 h-28 rounded-full bg-gradient-to-tr from-primary/20 to-background/0 blur-2xl animate-ai-pulse" />
        <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container-standard text-center space-y-5 sm:space-y-7 relative z-10 w-full">        
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4 sm:mb-6"
            style={{ transform: `translateY(${floatY}px)`, transition: 'transform 180ms ease-out' }}>
          Who We Are?
        </h2>
        
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-5 sm:mb-7"
           style={{ transform: `translateY(${floatY}px)`, transition: 'transform 180ms ease-out' }}>
          Satoru Consulting is an operations and IT consulting firm that helps small and mid-sized businesses streamline workflows, optimize systems, and drive efficiency. We act as an extension of our clients' teams, providing fractional operations and IT leadership to support growth, scalability, and long-term success.
        </p>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs sm:text-sm px-5 sm:px-6"
          onClick={handleLearnMoreClick}
        >
          Learn More
        </Button>
        
        {/* Floating particles with enhanced modern animations */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping opacity-40"
               style={{
                 animationDuration: '4s',
                 transform: `translate(${Math.sin(Date.now() * 0.0008) * 20}px, ${Math.cos(Date.now() * 0.001) * 15}px)`,
               }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent rounded-full animate-pulse opacity-60"
               style={{
                 animationDuration: '3s',
                 transform: `translateY(${Math.sin(Date.now() * 0.0012) * 12}px)`,
               }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary rounded-full animate-ping opacity-30" 
               style={{
                 animationDelay: '1s',
                 transform: `translate(${Math.cos(Date.now() * 0.0006) * 18}px, ${Math.sin(Date.now() * 0.0009) * 10}px)`,
               }}></div>
        </div>
      </div>
      
      {/* Scroll Down Arrow */}
      {showArrow && (
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronsDown className="w-6 h-6 sm:w-8 sm:h-8 text-primary" strokeWidth={3} />
        </div>
      )}
    </section>
  );
};

export default AboutUsSection;