import Header from "@/components/Header";
import decorBrush from "@/assets/decor/Satoru image.png";
import ContactSection from "@/components/ContactSection";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Services = () => {
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
      
      {/* Main Services Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="w-full section-layout bg-gradient-subtle circuit-bg">
          {/* AI Animated Background Elements */}
          <div className="absolute top-16 sm:top-32 right-8 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-gradient-ai rounded-full opacity-15 animate-orb-float"></div>
          <div className="absolute bottom-16 sm:bottom-32 left-6 sm:left-16 w-16 sm:w-28 h-16 sm:h-28 bg-primary/20 rounded-full animate-float-subtle"></div>
          <div className="absolute top-1/3 left-1/3 w-12 sm:w-20 h-12 sm:h-20 bg-accent/30 rounded-full animate-float-dynamic"></div>
          
          <div className="absolute inset-0 opacity-10 animate-neural-drift">
            <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ai-circuit" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M20 0v40M0 20h40M10 10h20v20H10z" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                  <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.5" className="animate-ai-pulse"/>
                </pattern>
              </defs>
              <rect width="200" height="200" fill="url(#ai-circuit)" />
            </svg>
          </div>
          
          <div className="container-standard text-center space-y-6 sm:space-y-8 relative z-10">
            <div className="relative inline-block">
              <img
                src={decorBrush}
                alt=""
                aria-hidden="true"
                className="pointer-events-none select-none absolute -z-10 -left-8 -top-10 w-56 sm:w-72 lg:w-96 opacity-100 dark:opacity-40 dark:sm:opacity-50"
              />
              <h1 className="text-hero bg-gradient-primary bg-clip-text text-transparent mb-6 sm:mb-8 relative">
                Our Services
              </h1>
            </div>
            <p className="text-body-lg text-muted-foreground max-w-4xl mx-auto">
              We act as an extension of your team, providing fractional operations and IT leadership to support growth, scalability, and long-term success.
            </p>
          </div>
        </section>

        {/* Services Grid (Updated: Our Service Breakdown) */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-card/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-10 sm:mb-12 bg-gradient-primary bg-clip-text text-transparent">
              Our Service Breakdown
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Operations",
                  desc: "Process Optimization, Sales Enablement & Project Delivery",
                },
                {
                  title: "Systems Building",
                  desc: "Custom System Builds, Tech Stack Integration & Migration Planning",
                },
                {
                  title: "Leadership Development",
                  desc: "Executive Coaching, Assessment Tools & Growth Sustainability",
                },
                {
                  title: "Technology Enablement",
                  desc: "IT Strategy, Infrastructure Alignment and Digital Tools Support",
                },
                {
                  title: "Automation & Intelligence",
                  desc: "Data Automation, Insights & Workflow Triggers",
                },
                {
                  title: "Strategic Scaling",
                  desc: "Preparing teams and tools for the next level",
                },
              ].map((s, i) => (
                <div key={i} className="bg-card/90 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-border/50 hover:shadow-xl transition-all duration-300">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                    <span className="text-base sm:text-lg font-bold text-primary-foreground">{i + 1}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-foreground">{s.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Phased Approach */}
        <section className="py-20 px-6 lg:px-12 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-primary bg-clip-text text-transparent">
              Our Phased Approach
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-card/60 border border-border/50 rounded-xl p-6">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">Discovery & Action Plan</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We listen, analyze, and design roadmap. Objective: Understand your goals, pain points, & system through audits, data analysis and process mapping. Turn insights into strategic execution plans with priorities, timelines, SOPs, and recommendations.
                </p>
              </div>
              <div className="text-center bg-card/60 border border-border/50 rounded-xl p-6">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">Implementation</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We build the solution. Objective: Deploy tools, automations, documentation, and workflows. Collaborate with your team for seamless rollout.
                </p>
              </div>
              <div className="text-center bg-card/60 border border-border/50 rounded-xl p-6">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">Optimization & Scalability</h4>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  We refine and future-proof. Objective: Tweak based on feedback, train, and prepare your business for sustainability and scale while continuously improving processes together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 lg:px-12 bg-secondary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 bg-gradient-primary bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed">
              Let's discuss how we can help you streamline operations, optimize systems, and drive sustainable growth.
            </p>
            <Button size="lg" className="text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6">
              Get Started Today
            </Button>
          </div>
        </section>
      </main>
      
      <ContactSection />
    </div>
  );
};

export default Services;