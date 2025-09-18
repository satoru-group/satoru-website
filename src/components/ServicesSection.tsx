import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { ChevronsRight } from "lucide-react";

interface CoreServicesSectionProps {
  showArrow?: boolean;
}

const CoreServicesSection = ({ showArrow = false }: CoreServicesSectionProps) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [floatY, setFloatY] = useState(0);
  const lastYRef = useRef(0);

  useEffect(() => {
    // Scroll-only float effect for heading/lead
    let tickingFloat = false;
    const onScrollFloat = () => {
      if (tickingFloat) return;
      tickingFloat = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastYRef.current;
        lastYRef.current = y;
        const offset = Math.max(-6, Math.min(0, -delta * 0.6));
        setFloatY(offset);
        tickingFloat = false;
      });
    };
    window.addEventListener("scroll", onScrollFloat, { passive: true });
    onScrollFloat();
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        // Calculate discrete scroll steps within the services section  
        const servicesScrollStart = 2 * window.innerHeight; // Services is section 2
        const relativeScroll = Math.max(0, window.scrollY - servicesScrollStart);
        
        // Larger step size for more gradual card reveals
        const isMobile = window.innerWidth < 768;
        const stepSize = isMobile ? window.innerHeight / 3 : window.innerHeight / 2; // Larger steps
        const currentStep = Math.floor(relativeScroll / stepSize);

        // Show cards one by one with more gradual timing
        const newVisibleCards: number[] = [];
        
        // Add minimum scroll distance to prevent immediate appearance
        const minScrollDistance = window.innerHeight * 0.3; // 30% of viewport height
        
        if (relativeScroll >= minScrollDistance && currentStep >= 1) {
          newVisibleCards.push(0); // First card appears after minimum scroll + 1 step
        }
        if (relativeScroll >= minScrollDistance * 2 && currentStep >= 2) {
          newVisibleCards.push(1); // Second card appears after more scroll
        }
        if (relativeScroll >= minScrollDistance * 3 && currentStep >= 3) {
          newVisibleCards.push(2); // Third card appears after even more scroll
        }
        
        setVisibleCards(newVisibleCards);
        setShowButton(currentStep >= 4 && relativeScroll >= minScrollDistance * 4); // Button appears after all cards
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", onScrollFloat);
    };
  }, []);

  const getCardStyle = (cardIndex: number) => {
    const isVisible = visibleCards.includes(cardIndex);
    const isMobile = window.innerWidth < 768;
    
    if (!isVisible) {
      // Responsive entrance animations - simpler on mobile
      let entranceTransform = '';
      if (cardIndex === 0) {
        entranceTransform = isMobile 
          ? 'translateY(60px) scale(0.95)' 
          : 'translateY(80px) scale(0.9)'; // First card slides up
      } else if (cardIndex === 1) {
        entranceTransform = isMobile 
          ? 'translateX(60px) scale(0.9)' 
          : 'translateX(100px) rotateY(20deg) scale(0.85)'; // Second card slides from right
      } else {
        entranceTransform = isMobile 
          ? 'translateX(-60px) scale(0.9)' 
          : 'translateX(-100px) rotateY(-20deg) scale(0.85)'; // Third card slides from left
      }
      
      return {
        opacity: 0,
        transform: entranceTransform,
        filter: isMobile ? 'blur(3px)' : 'blur(6px)',
        transition: isMobile ? 'all 1s ease-out' : 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      };
    }

    // Responsive floating animation - reduced on mobile
    const floatDelay = cardIndex * 0.3;
    const floatIntensity = isMobile ? 1.5 : 3;
    const floatY = Math.sin((Date.now() * 0.001) + floatDelay) * floatIntensity;
    const floatX = isMobile ? 0 : Math.cos((Date.now() * 0.0008) + floatDelay) * 1;
    
    return {
      opacity: 1,
      transform: `translateX(${floatX}px) translateY(${floatY}px) rotateY(0deg) scale(1)`,
      filter: 'blur(0px)',
      transition: isMobile ? 'all 1s ease-out' : 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };

  const getButtonStyle = () => {
    const isMobile = window.innerWidth < 768;
    const floatIntensity = isMobile ? 2 : 4;
    const floatY = Math.sin(Date.now() * 0.002) * floatIntensity;
    
    return {
      opacity: showButton ? 1 : 0,
      transform: showButton 
        ? `translateY(${floatY}px) scale(1)` 
        : `translateY(${isMobile ? 30 : 40}px) scale(0.8)`,
      filter: showButton ? 'blur(0px)' : 'blur(4px)',
      transition: isMobile ? 'all 1s ease-out' : 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };
  return (
    <section id="services-core" ref={sectionRef} className="w-full bg-background min-h-[100svh] md:min-h-screen flex flex-col justify-center section-padding pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 overflow-hidden">
      {/* Animated background objects for visibility */}
      <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
        <div className="hidden sm:block absolute -top-12 -left-12 w-40 h-40 rounded-full bg-gradient-to-tr from-primary/25 to-accent/20 blur-3xl animate-float-subtle" />
        <div className="hidden lg:block absolute top-1/3 -right-16 w-52 h-52 rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl animate-float-dynamic" />
        <div className="absolute bottom-12 left-1/3 w-28 h-28 rounded-full bg-gradient-to-tr from-primary/20 to-background/0 blur-2xl animate-ai-pulse" />
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M20 0v40M0 20h40M10 10h20v20H10z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#circuit)" />
        </svg>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6 relative z-10 md:scale-[.98] lg:scale-[.96]">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-3 sm:mb-5"
            style={{ transform: `translateY(${floatY}px)`, transition: 'transform 180ms ease-out' }}>
          How We Help Your Business
        </h2>
        
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto mb-4 sm:mb-6"
           style={{ transform: `translateY(${floatY}px)`, transition: 'transform 180ms ease-out' }}>
          We act as an extension of your team, providing fractional operations and IT leadership to support growth, scalability, and long-term success.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full">
          <div 
            className="card-standard border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={getCardStyle(0)}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-foreground">Operations Optimization</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              Streamline workflows and improve operational efficiency
            </p>
            <ul className="text-left text-sm sm:text-base text-muted-foreground mb-2.5 sm:mb-3 space-y-1.5">
              <li>• Process mapping and improvement</li>
              <li>• Workflow automation</li>
              <li>• Resource allocation</li>
            </ul>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto px-3 py-2">
              Learn more
            </Button>
          </div>
          
          <div 
            className="card-standard border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={getCardStyle(1)}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-foreground">IT Systems Management</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              Optimize your technology infrastructure
            </p>
            <ul className="text-left text-sm sm:text-base text-muted-foreground mb-2.5 sm:mb-3 space-y-1.5">
              <li>• System integration</li>
              <li>• Technology stack assessment</li>
              <li>• IT strategy development</li>
            </ul>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
              Learn more
            </Button>
          </div>
          
          <div 
            className="card-standard md:col-span-2 lg:col-span-1 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={getCardStyle(2)}
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 text-foreground">Fractional Leadership</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3 sm:mb-4">
              Expert guidance without the full-time cost
            </p>
            <ul className="text-left text-sm sm:text-base text-muted-foreground mb-2.5 sm:mb-3 space-y-1.5">
              <li>• Fractional COO services</li>
              <li>• Fractional CTO services</li>
              <li>• Strategic planning</li>
            </ul>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
              Learn more
            </Button>
          </div>
        </div>
        
        <div style={getButtonStyle()} className="mt-1.5 sm:mt-2">
          <Button variant="default" size="sm" className="text-xs sm:text-sm px-4 sm:px-5 py-2 border-2 border-primary/30 hover:border-primary/60 shadow-lg hover:shadow-xl transition-all duration-300">
            Get Started
          </Button>
        </div>
        
        {/* Floating tech elements with enhanced animations */}
        <div className="absolute inset-0 pointer-events-none hidden md:block">
          <div className="absolute top-1/5 right-1/4 w-3 h-3 bg-primary rounded-full animate-pulse opacity-30" 
               style={{
                 animationDuration: '3s',
                 transform: `translateY(${Math.sin(Date.now() * 0.001) * 10}px)`,
               }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-accent rounded-full animate-ping opacity-40" 
               style={{
                 animationDelay: '0.5s',
                 transform: `translateX(${Math.cos(Date.now() * 0.0015) * 15}px)`,
               }}></div>
          <div className="absolute top-1/3 left-1/5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse opacity-50" 
               style={{
                 animationDelay: '1.5s', 
                 transform: `translate(${Math.sin(Date.now() * 0.0008) * 8}px, ${Math.cos(Date.now() * 0.0012) * 12}px)`,
               }}></div>
        </div>
      </div>
      
      {/* Scroll Right Arrow */}
      {showArrow && (
        <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 animate-bounce">
          <ChevronsRight className="w-6 h-6 sm:w-8 sm:h-8 text-primary" strokeWidth={3} />
        </div>
      )}
    </section>
  );
};

export default CoreServicesSection;