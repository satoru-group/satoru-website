import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef, useState } from "react";

const HomeServicesSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [floatY, setFloatY] = useState(0);
  const lastYRef = useRef(0);

  useEffect(() => {
    // Scroll-only float for heading/lead
    let ticking = false;
    const onScrollFloat = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastYRef.current;
        lastYRef.current = y;
        const offset = Math.max(-6, Math.min(0, -delta * 0.6));
        setFloatY(offset);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScrollFloat, { passive: true });
    onScrollFloat();
    const handleScroll = () => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      
      // Calculate when services section should be visible
      const servicesSection = document.getElementById('services-extra');
      if (servicesSection) {
        const rect = servicesSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show when section is 50% in viewport
        if (rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5) {
          setIsVisible(true);
          setIsExiting(false);
          
          // Animate cards one by one when section becomes visible
          if (visibleCards.length === 0) {
            setTimeout(() => setVisibleCards([0]), 200);
            setTimeout(() => setVisibleCards([0, 1]), 400);
            setTimeout(() => setVisibleCards([0, 1, 2]), 600);
          }
        } else if (rect.top < -windowHeight * 0.3) {
          // Start exit animation when section is 30% above viewport
          setIsExiting(true);
          setVisibleCards([]);
        } else if (rect.top > windowHeight) {
          // Reset when section is below viewport
          setIsVisible(false);
          setIsExiting(false);
          setVisibleCards([]);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', onScrollFloat);
    };
  }, []);

  const getSectionStyle = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isVisible && !isExiting) {
      // Initial state - hidden off-screen to the right
      return {
        transform: 'translate3d(100%, 0, 0)',
        opacity: 0,
        transition: prefersReducedMotion ? 'none' : 'all 0.9s cubic-bezier(0.23, 1, 0.32, 1)',
        filter: 'blur(5px)',
        willChange: 'transform, opacity, filter',
      };
    } else if (isVisible && !isExiting) {
      // Visible state - slide in from right
      return {
        transform: 'translate3d(0, 0, 0)',
        opacity: 1,
        transition: prefersReducedMotion ? 'none' : 'all 0.9s cubic-bezier(0.23, 1, 0.32, 1)',
        filter: 'blur(0px)',
        willChange: 'transform, opacity',
      };
    } else if (isExiting) {
      // Exiting state - slide out to the left
      return {
        transform: 'translate3d(-100%, 0, 0)',
        opacity: 0,
        transition: prefersReducedMotion ? 'none' : 'all 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        filter: 'blur(3px)',
        willChange: 'transform, opacity, filter',
      };
    }
    
    return {};
  };

  const getCardStyle = (index: number) => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCardVisible = visibleCards.includes(index);
    const delay = index * 200;
    
    if (!isCardVisible) {
      return {
        transform: 'translate3d(30px, 50px, 0) scale(0.9)',
        opacity: 0,
        transition: prefersReducedMotion ? 'none' : `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
        filter: 'blur(3px)',
        willChange: 'transform, opacity, filter',
      };
    }
    
    return {
      transform: 'translate3d(0, 0, 0) scale(1)',
      opacity: 1,
      transition: prefersReducedMotion ? 'none' : `all 0.9s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      filter: 'blur(0px)',
      willChange: 'transform, opacity',
    };
  };

  const services = [
    {
      title: "Operations Optimization",
      description: "Streamline workflows and improve operational efficiency with our proven methodologies.",
      features: ["Process mapping", "Workflow automation", "Resource allocation"],
      icon: "⚡",
      color: "bg-blue-500/10 text-blue-600 border-blue-200"
    },
    {
      title: "IT Systems Management",
      description: "Optimize your technology infrastructure for maximum performance and security.",
      features: ["System integration", "Technology assessment", "IT strategy development"],
      icon: "💻",
      color: "bg-green-500/10 text-green-600 border-green-200"
    },
    {
      title: "Fractional Leadership",
      description: "Expert guidance without the full-time cost. Get C-level expertise on demand.",
      features: ["Fractional COO", "Fractional CTO", "Strategic planning"],
      icon: "🎯",
      color: "bg-purple-500/10 text-purple-600 border-purple-200"
    }
  ];

  return (
    <section 
      id="services-extra"
      className="min-h-[100svh] md:min-h-screen flex flex-col justify-center bg-background section-padding pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 relative overflow-hidden"
      style={getSectionStyle()}
    >
      <div className="w-full max-w-6xl mx-auto md:scale-[.96] lg:scale-[.94]">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Our Services
          </Badge>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-3 sm:mb-5"
              style={{ transform: `translateY(${floatY}px)`, transition: 'transform 180ms ease-out' }}>
            Our Services
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
             style={{ transform: `translateY(${floatY}px)`, transition: 'transform 180ms ease-out' }}>
            We act as an extension of your team, providing fractional operations and IT leadership 
            to support growth, scalability, and long-term success.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8 lg:mb-10">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group hover:shadow-xl transition-all duration-500 border-2 border-primary/10 hover:border-primary/30 bg-card/50 backdrop-blur-sm hover:bg-card/80"
              style={getCardStyle(index)}
            >
              <CardHeader className="pb-2 sm:pb-3">
                <div className="flex items-center gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                  <div className="text-2xl sm:text-3xl">{service.icon}</div>
                  <div>
                    <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </CardTitle>
                  </div>
                </div>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 sm:space-y-2.5 mb-3 sm:mb-5">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-xs sm:text-sm px-3 py-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-5 sm:p-8 border border-primary/10">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2.5 sm:mb-3.5 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mb-5 sm:mb-6 max-w-xl mx-auto">
              Let's discuss how our fractional leadership and operational expertise 
              can accelerate your growth and streamline your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3.5 justify-center">
              <Button size="sm" className="text-xs sm:text-sm px-5 py-2.5">
                Get Started Today
              </Button>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm px-5 py-2.5">
                Schedule Consultation
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated decorative layer for a more comprehensive, modern feel */}
      <div className="absolute inset-0 pointer-events-none z-[1] select-none">
        {/* Gradient orbs */}
        <div className="hidden sm:block absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl animate-float-subtle" />
        <div className="hidden lg:block absolute top-1/3 -right-14 w-52 h-52 rounded-full bg-gradient-to-tr from-accent/25 to-primary/15 blur-3xl animate-float-dynamic" />
        <div className="absolute bottom-10 left-1/4 w-28 h-28 rounded-full bg-gradient-to-tr from-primary/15 to-background/0 blur-2xl animate-ai-pulse" />

        {/* Tiny stars/particles */}
        <div className="absolute inset-0 opacity-60">
          <span className="absolute top-[18%] left-[12%] w-1 h-1 bg-primary rounded-full animate-ping"/>
          <span className="absolute top-[32%] left-[80%] w-1 h-1 bg-accent rounded-full animate-pulse" style={{animationDuration:'3.5s'}}/>
          <span className="absolute top-[56%] left-[35%] w-1 h-1 bg-primary rounded-full animate-ping" style={{animationDuration:'2.5s'}}/>
          <span className="absolute top-[72%] left-[68%] w-1 h-1 bg-accent rounded-full animate-pulse" style={{animationDuration:'4s'}}/>
          <span className="absolute top-[44%] left-[52%] w-1 h-1 bg-primary rounded-full animate-ping" style={{animationDuration:'3s'}}/>
        </div>

        {/* Subtle diagonal beams */}
        <div className="hidden md:block absolute inset-0 opacity-[0.08]">
          <div className="absolute -left-24 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent rotate-[20deg]" />
          <div className="absolute left-1/3 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-accent to-transparent rotate-[20deg]" />
          <div className="absolute left-2/3 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent rotate-[20deg]" />
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;
