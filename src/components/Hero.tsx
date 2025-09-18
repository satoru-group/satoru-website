import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero/Satoru-Hero.jpg";
import decorBrush from "@/assets/decor/Satoru image.png";
import { ChevronsDown } from "lucide-react";

interface HeroProps {
  showArrow?: boolean;
}

const Hero = ({ showArrow = false }: HeroProps) => {
  const stats = [
    {
      number: "95%",
      label: "Client Satisfaction",
    },
    {
      number: "30%",
      label: "Efficiency Increase",
    },
    {
      number: "70+ Years",
      label: "Consulting Experience",
    },
    {
      number: "20+",
      label: "Projects Completed",
    },
  ];

  return (
    <section className="relative min-h-[100svh] bg-background section-padding pt-24 sm:pt-28 lg:pt-32 pb-10 sm:pb-12 z-20">
      {/* Animated background objects */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="hidden sm:block absolute -top-10 -left-10 w-44 h-44 rounded-full bg-gradient-to-tr from-primary/25 to-accent/20 blur-3xl animate-float-subtle"/>
        <div className="hidden lg:block absolute top-1/3 -right-16 w-56 h-56 rounded-full bg-gradient-to-tr from-accent/30 to-primary/20 blur-3xl animate-float-dynamic"/>
        <div className="absolute bottom-8 left-1/4 w-32 h-32 rounded-full bg-gradient-to-tr from-primary/20 to-background/0 blur-2xl animate-ai-pulse"/>
        <div className="absolute inset-0 opacity-70">
          <span className="absolute top-[18%] left-[14%] w-1 h-1 bg-primary rounded-full animate-ping"/>
          <span className="absolute top-[34%] left-[78%] w-1 h-1 bg-accent rounded-full animate-pulse" style={{animationDuration:'3.2s'}}/>
          <span className="absolute top-[58%] left-[38%] w-1 h-1 bg-primary rounded-full animate-ping" style={{animationDuration:'2.6s'}}/>
        </div>
      </div>
      <div className="container-standard">
        {/* Main Hero Content */}
        <div className="content-grid mb-6 sm:mb-10 lg:mb-16">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-6 sm:space-y-8">
              <div className="relative inline-block">
                {/* Decorative brush behind heading */}
                <img
                  src={decorBrush}
                  alt=""
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -z-10 -left-8 -top-10 w-56 sm:w-72 lg:w-96 opacity-100 dark:opacity-50 dark:sm:opacity-60"
                />
                <h1 className="text-hero text-foreground relative">
                  Simplify.
                  <br />
                  <span className="text-primary">Streamline.</span>
                  <br />
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Succeed.</span>
                </h1>
              </div>
            </div>
            
            <p className="text-body-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Harness the power of advanced AI technology to transform your business operations and unlock unprecedented growth opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="cta" size="lg" className="text-sm sm:text-base px-6 sm:px-8">
                Book a Consultant
              </Button>
              <Button variant="outline" size="lg" className="text-sm sm:text-base px-6 sm:px-8">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - AI Image */}
          <div className="relative order-first lg:order-last group w-full">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-glow-cyan border border-primary/20 transition-all duration-500 group-hover:shadow-glow-purple group-hover:border-primary/40 h-[28vh] sm:h-[38vh] lg:h-[48vh]">
              <img 
                src={heroImage} 
                alt="Satoru Consulting hero image" 
                className="w-full h-full min-w-full min-h-full object-cover object-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-110 group-hover:translate-y-0"
              />
              
              {/* Paper scroll effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Scroll shadow effect */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-y-full group-hover:translate-y-0" />
            </div>
          </div>
        </div>

        {/* AI Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-standard text-center hover:-translate-y-1"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1.5 sm:mb-3">
                {stat.number}
              </div>
              <div className="text-caption">
                {stat.label}
              </div>
            </div>
          ))}
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

export default Hero;