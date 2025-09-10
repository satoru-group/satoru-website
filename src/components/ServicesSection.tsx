import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { ChevronsRight } from "lucide-react";

interface ServicesSectionProps {
  showArrow?: boolean;
}

const ServicesSection = ({ showArrow = false }: ServicesSectionProps) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInView) {
        // Calculate discrete scroll steps within the services section  
        const servicesScrollStart = 2 * window.innerHeight; // Services is section 2
        const relativeScroll = Math.max(0, window.scrollY - servicesScrollStart);
        const stepSize = window.innerHeight / 12; // 12 steps: enter + 3 cards (each with extra scroll) + button + 4 extra
        const currentStep = Math.floor(relativeScroll / stepSize);

        // Show cards based on discrete steps with extra scroll for each card
        const newVisibleCards: number[] = [];
        if (currentStep >= 1) newVisibleCards.push(0); // First card at step 1
        if (currentStep >= 3) newVisibleCards.push(1); // Second card at step 3 (after extra scroll)
        if (currentStep >= 5) newVisibleCards.push(2); // Third card at step 5 (after extra scroll)
        
        setVisibleCards(newVisibleCards);
        setShowButton(currentStep >= 7); // Button at step 7, then 4 more scroll steps before contact
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCardStyle = (cardIndex: number) => {
    const isVisible = visibleCards.includes(cardIndex);
    
    if (!isVisible) {
      return {
        opacity: 0,
        transform: cardIndex === 1 
          ? 'translateX(120px) rotateY(15deg) scale(0.8)' 
          : 'translateY(50px) scale(0.8)',
        filter: 'blur(4px)',
        transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      };
    }

    // Add floating animation when visible
    const floatDelay = cardIndex * 0.5;
    const floatY = Math.sin((Date.now() * 0.001) + floatDelay) * 2;
    
    return {
      opacity: 1,
      transform: `translateX(0px) translateY(${floatY}px) rotateY(0deg) scale(1)`,
      filter: 'blur(0px)',
      transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };

  const getButtonStyle = () => {
    const floatY = Math.sin(Date.now() * 0.002) * 4;
    
    return {
      opacity: showButton ? 1 : 0,
      transform: showButton 
        ? `translateY(${floatY}px) scale(1)` 
        : 'translateY(40px) scale(0.8)',
      filter: showButton ? 'blur(0px)' : 'blur(4px)',
      transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };
  };
  return (
    <section ref={sectionRef} className="w-full min-h-[100svh] bg-background flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-10 sm:pb-12">
      {/* Tech circuit background pattern */}
      <div className="absolute inset-0 opacity-10">
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
      
      <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-12 relative z-10 px-4 sm:px-6 lg:px-12">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6 sm:mb-8">
          How We Help Your Business
        </h2>
        
        <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
          We act as an extension of your team, providing fractional operations and IT leadership to support growth, scalability, and long-term success.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div 
            className="bg-card/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-border/50"
            style={getCardStyle(0)}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Operations Optimization</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              Streamline workflows and improve operational efficiency
            </p>
            <ul className="text-left text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 space-y-2">
              <li>• Process mapping and improvement</li>
              <li>• Workflow automation</li>
              <li>• Resource allocation</li>
            </ul>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
              Learn more
            </Button>
          </div>
          
          <div 
            className="bg-card/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-border/50"
            style={getCardStyle(1)}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">IT Systems Management</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              Optimize your technology infrastructure
            </p>
            <ul className="text-left text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 space-y-2">
              <li>• System integration</li>
              <li>• Technology stack assessment</li>
              <li>• IT strategy development</li>
            </ul>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
              Learn more
            </Button>
          </div>
          
          <div 
            className="bg-card/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg border border-border/50 lg:col-span-1"
            style={getCardStyle(2)}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-foreground">Fractional Leadership</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              Expert guidance without the full-time cost
            </p>
            <ul className="text-left text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 space-y-2">
              <li>• Fractional COO services</li>
              <li>• Fractional CTO services</li>
              <li>• Strategic planning</li>
            </ul>
            <Button variant="outline" size="sm" className="text-xs sm:text-sm w-full sm:w-auto">
              Learn more
            </Button>
          </div>
        </div>
        
        <div style={getButtonStyle()}>
          <Button variant="default" size="lg" className="text-sm sm:text-base px-6 sm:px-8">
            Get Started
          </Button>
        </div>
        
        {/* Floating tech elements with enhanced animations */}
        <div className="absolute inset-0 pointer-events-none">
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

export default ServicesSection;