import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Satoru Group
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Transform your business with fractional operations and IT leadership. 
              We provide expert guidance to accelerate growth and streamline operations.
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">
                LinkedIn
              </Button>
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                Contact
              </Button>
            </div>
          </div>

          {/* Simple Get In Touch */}
          <div>
            <h4 className="font-semibold mb-4">Get In Touch</h4>
            <form className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input placeholder="First Name" />
                <Input placeholder="Last Name" />
              </div>
              <Input type="email" placeholder="Email Address" />
              <Input placeholder="Company" />
              <Input placeholder="Tell us about your project..." />
              <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground space-y-1">
              <p>info@satorugroup.com</p>
              <p>858-878-2722</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="max-w-md">
            <h4 className="font-semibold mb-2">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest insights on business optimization and technology trends.
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1"
              />
              <Button size="sm">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Satoru Group. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
