import Header from "@/components/Header";
import decorBrush from "@/assets/decor/Satoru image.png";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative font-body ai-bg neural-bg">
      <Header />
      
      {/* Main About Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="w-full section-layout bg-gradient-subtle circuit-bg">
          {/* AI Animated Orbs */}
          <div className="absolute top-12 sm:top-20 left-8 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-ai rounded-full opacity-20 animate-orb-float"></div>
          <div className="absolute bottom-20 sm:bottom-40 right-16 sm:right-32 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-primary rounded-full opacity-30 animate-float-subtle"></div>
          <div className="absolute top-1/2 left-1/4 w-12 sm:w-16 h-12 sm:h-16 bg-primary/20 rounded-full animate-float-dynamic"></div>
          
          <div className="container-standard text-center space-y-8 sm:space-y-12 relative z-10 py-16 sm:py-20">
            <div className="space-y-4 sm:space-y-6 relative inline-block">
              <img
                src={decorBrush}
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute -z-10 -left-8 -top-10 w-56 sm:w-72 lg:w-96 opacity-100 dark:opacity-40 dark:sm:opacity-50"
              />
              <h1 className="text-hero bg-gradient-primary bg-clip-text text-transparent relative">
                About Satoru
              </h1>
              <div className="w-16 sm:w-24 h-1 bg-gradient-primary mx-auto rounded-full shadow-glow-ai"></div>
              <p className="text-body-lg text-muted-foreground max-w-4xl mx-auto">
                <span className="italic">Satoru</span> means to understand, to know, or to perceive—the foundation of transformative business consulting.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview Section */}
        <section className="section-padding bg-background relative">
          <div className="container-standard">
            <div className="content-grid gap-20">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-section text-foreground">
                    Who We Are
                  </h2>
                  <div className="w-16 h-1 bg-gradient-primary rounded-full"></div>
                </div>
                
                <div className="space-y-6 text-lg leading-relaxed">
                  <p className="text-muted-foreground">
                    Satoru Consulting is an operations and IT consulting firm that helps small and mid-sized businesses streamline workflows, optimize systems, and drive efficiency.
                  </p>
                  <p className="text-muted-foreground">
                    We act as an extension of our clients' teams, providing fractional operations and IT leadership to support growth, scalability, and long-term success.
                  </p>
                  <p className="text-muted-foreground">
                    Our approach is rooted in understanding and clarity, identifying bottlenecks and implementing tailored solutions that empower businesses to simplify, streamline, and succeed.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="backdrop-modern bg-card/20 p-12 rounded-3xl border border-border/30 shadow-elegant">
                  <div className="space-y-8">
                    <div className="text-center space-y-4">
                      <div className="text-6xl font-heading font-bold bg-gradient-primary bg-clip-text text-transparent">
                        70+
                      </div>
                      <div className="text-lg font-medium text-muted-foreground">
                        Years Combined Experience
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border/30">
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-heading font-semibold text-foreground">Operations</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wide">Expertise</div>
                      </div>
                      <div className="text-center space-y-2">
                        <div className="text-2xl font-heading font-semibold text-foreground">Technology</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wide">Solutions</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating accent elements */}
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-primary rounded-2xl animate-float-subtle opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-primary rounded-xl animate-float-dynamic opacity-60"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-32 px-6 lg:px-12 bg-gradient-subtle relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-12 mb-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Our Purpose
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="backdrop-modern bg-card/10 p-12 rounded-3xl border border-border/20 hover:shadow-elegant transition-all duration-500 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7v10c0 5.55 3.84 9.739 9 11 5.16-1.261 9-5.45 9-11V7l-10-5z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Mission</h3>
                  </div>
                  <p className="text-base sm:text-lg lg:text-lg text-muted-foreground leading-relaxed">
                    At Satoru Consulting, our mission is to empower your business to achieve sustainable success through strategic operations optimization and innovative technology solutions.
                  </p>
                </div>
              </div>
              
              <div className="backdrop-modern bg-card/10 p-12 rounded-3xl border border-border/20 hover:shadow-elegant transition-all duration-500 group">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Vision</h3>
                  </div>
                  <p className="text-base sm:text-lg lg:text-lg text-muted-foreground leading-relaxed">
                    To be the trusted force behind business transformation, envisioning a future where clarity powers growth and every business challenge leads to opportunity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-32 px-6 lg:px-12 bg-background relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-12 mb-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Our Values
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                These core principles guide every decision we make and every solution we deliver.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "People First, Always",
                  description: "We design solutions that empower people—owners, teams, and communities—not just systems.",
                  icon: "👥"
                },
                {
                  title: "Entrepreneurial Mindset", 
                  description: "We think like owners, not just advisors—because we are.",
                  icon: "🚀"
                },
                {
                  title: "Clarity Over Complexity",
                  description: "We simplify the path to growth—cutting through chaos with clear systems, processes, and priorities.",
                  icon: "💡"
                },
                {
                  title: "Build for Scale",
                  description: "We create operational foundations that evolve with the business, not just patch today's pain points.",
                  icon: "📈"
                },
                {
                  title: "Progress Through Partnerships",
                  description: "We don't consult from the sidelines—we embed, collaborate, and move businesses forward together.",
                  icon: "🤝"
                }
              ].map((value, index) => (
                <div key={index} className={`backdrop-modern bg-card/5 p-8 rounded-2xl border border-border/20 hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 group ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                  <div className="space-y-6">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                      {value.title}
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Excellence Section */}
        <section className="py-32 px-6 lg:px-12 bg-gradient-subtle relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-12 mb-20">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Excellence in Experience
              </h2>
              <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full"></div>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Backed by over 70 years of combined experience across operations, technology, strategy, and leadership, our founding team brings a proven track record of building scalable systems, leading transformative projects, and driving business growth across sectors.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  number: "70+",
                  label: "Years Experience",
                  description: "Combined expertise across our leadership team"
                },
                {
                  number: "100+",
                  label: "Projects Delivered",
                  description: "Successful transformations across industries"
                },
                {
                  number: "95%",
                  label: "Client Satisfaction",
                  description: "Consistently exceeding expectations"
                }
              ].map((stat, index) => (
                <div key={index} className="text-center space-y-6 group">
                  <div className="space-y-4">
                    <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-foreground">
                      {stat.label}
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 lg:px-12 bg-background relative">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Let's discuss how our expertise can help you streamline operations, optimize systems, and achieve sustainable growth.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover-lift bg-gradient-primary border-0 font-medium">
                Start Your Journey
              </Button>
              <Button variant="outline" size="lg" className="text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 hover-lift border-border/30 font-medium">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <ContactSection />
    </div>
  );
};

export default About;