import Header from "@/components/Header";
import decorBrush from "@/assets/decor/Satoru image.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

const Contact = () => {
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
      
      {/* Main Contact Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section className="w-full section-layout bg-gradient-subtle circuit-bg">
          {/* AI Animated Background Elements */}
          <div className="absolute top-12 sm:top-24 left-12 sm:left-24 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-ai rounded-full opacity-20 animate-orb-float"></div>
          <div className="absolute bottom-16 sm:bottom-32 right-8 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 bg-primary/30 rounded-full animate-float-subtle"></div>
          <div className="absolute top-2/3 right-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-accent/20 rounded-full animate-float-dynamic"></div>
          
          <div className="absolute inset-0 opacity-5 animate-circuit-flow">
            <svg className="w-full h-full" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ai-contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1"/>
                  <circle cx="30" cy="30" r="1.5" fill="currentColor" opacity="0.6" className="animate-ai-pulse"/>
                </pattern>
              </defs>
              <rect width="60" height="60" fill="url(#ai-contact-grid)" />
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
                Get In Touch
              </h1>
            </div>
            <p className="text-body-lg text-muted-foreground max-w-4xl mx-auto">
              Ready to transform your business operations? Let's discuss how we can help you streamline workflows and drive growth.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 bg-card/30 ai-bg">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Form */}
              <div className="ai-card-hover bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary/30 shadow-glow-ai">
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-bold text-foreground mb-4 sm:mb-6 lg:mb-8">Send us a message</h2>
                <form className="space-y-4 sm:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                      <Input placeholder="John" className="bg-background/50 border-primary/20 text-sm sm:text-base" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                      <Input placeholder="Doe" className="bg-background/50 border-primary/20 text-sm sm:text-base" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <Input type="email" placeholder="john@company.com" className="bg-background/50 border-primary/20 text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company</label>
                    <Input placeholder="Your Company" className="bg-background/50 border-primary/20 text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone (Optional)</label>
                    <Input placeholder="858-878-2722" className="bg-background/50 border-primary/20 text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us about your project and how we can help..." 
                      className="bg-background/50 border-primary/20 min-h-[100px] sm:min-h-[120px] text-sm sm:text-base" 
                    />
                  </div>
                  <Button size="lg" className="w-full text-sm sm:text-base hover-lift shadow-glow-ai">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-6 sm:space-y-8">
                <div className="ai-card-hover bg-card/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-primary/30 shadow-glow-ai">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-4 sm:mb-6">Contact Information</h3>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center animate-float-subtle">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm sm:text-base">Email</div>
                        <div className="text-muted-foreground text-xs sm:text-sm">info@satorugroup.com</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center animate-float-dynamic">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm sm:text-base">Phone</div>
                        <div className="text-muted-foreground text-xs sm:text-sm">858-878-2722</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-lg flex items-center justify-center animate-ai-pulse">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm sm:text-base">Response Time</div>
                        <div className="text-muted-foreground text-xs sm:text-sm">Within 24 hours</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 backdrop-blur-sm p-8 rounded-2xl border border-border/50">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6">Why Choose Satoru?</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">Proven Expertise</div>
                        <div className="text-sm text-muted-foreground">70+ years combined experience</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">Tailored Solutions</div>
                        <div className="text-sm text-muted-foreground">Custom strategies for your business</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">Scalable Growth</div>
                        <div className="text-sm text-muted-foreground">Solutions that grow with your business</div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">Collaborative Approach</div>
                        <div className="text-sm text-muted-foreground">We work as part of your team</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 lg:px-12 bg-background">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-heading font-bold text-center mb-16 bg-gradient-primary bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h4 className="text-xl font-heading font-semibold text-foreground mb-3">How quickly can you start working with my business?</h4>
                <p className="text-lg text-muted-foreground leading-relaxed">We can typically begin our discovery process within one week of our initial consultation, with full engagement starting within 2-3 weeks depending on project scope.</p>
              </div>
              
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h4 className="text-xl font-heading font-semibold text-foreground mb-3">What size businesses do you work with?</h4>
                <p className="text-lg text-muted-foreground leading-relaxed">We specialize in small and mid-sized businesses, typically ranging from startups to companies with up to 500 employees across various industries.</p>
              </div>
              
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h4 className="text-xl font-heading font-semibold text-foreground mb-3">Do you offer ongoing support or just project-based work?</h4>
                <p className="text-lg text-muted-foreground leading-relaxed">We offer both! We can work on specific projects or provide ongoing fractional leadership and support to help your business continue growing and optimizing.</p>
              </div>
              
              <div className="bg-card/50 p-6 rounded-xl border border-border/50">
                <h4 className="text-xl font-heading font-semibold text-foreground mb-3">How do you measure success?</h4>
                <p className="text-lg text-muted-foreground leading-relaxed">We establish clear KPIs and metrics at the beginning of every engagement, focusing on measurable improvements in efficiency, cost savings, and business growth.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;