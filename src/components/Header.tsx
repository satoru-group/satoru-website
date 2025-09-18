import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleNavigation = (path: string) => {
    // Close mobile menu if open
    setMobileMenuOpen(false);
    
    // If navigating to a different page, scroll to top
    if (location.pathname !== path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Navigate to the new page
    navigate(path);
  };
  
  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full py-4 px-4 sm:py-6 sm:px-6 lg:px-12 flex items-center justify-between bg-background/95 backdrop-blur-sm border-b border-border/50 z-[100]">
        <div className="flex items-center">
          <div className="flex flex-col text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-pulse">
              SATORU<span className="text-primary glow">.</span>
            </div>
            <div className="text-xs sm:text-sm lg:text-base text-muted-foreground font-medium tracking-wide">
              GROUP
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button 
            onClick={() => handleNavigation('/')}
            className={`relative text-sm lg:text-base transition-smooth font-medium hover:shadow-glow-cyan ${
              isActive('/') 
                ? 'text-primary' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Home
            {isActive('/') && (
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"></div>
            )}
          </button>
          <button 
            onClick={() => handleNavigation('/about')}
            className={`relative text-sm lg:text-base transition-smooth font-medium hover:shadow-glow-cyan ${
              isActive('/about') 
                ? 'text-primary' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            About Us
            {isActive('/about') && (
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"></div>
            )}
          </button>
          <button 
            onClick={() => handleNavigation('/services')}
            className={`relative text-sm lg:text-base transition-smooth font-medium hover:shadow-glow-cyan ${
              isActive('/services') 
                ? 'text-primary' 
                : 'text-foreground hover:text-primary'
            }`}
          >
            Services
            {isActive('/services') && (
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"></div>
            )}
          </button>
          <button 
            onClick={() => handleNavigation('/contact')}
            className={`relative text-sm lg:text-base transition-smooth font-medium hover:shadow-glow-cyan ${
              isActive('/contact') 
                ? 'text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            Contact
            {isActive('/contact') && (
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-primary rounded-full"></div>
            )}
          </button>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button variant="ai" size="sm" className="hidden md:inline-flex text-sm lg:text-base">
            Get Started
          </Button>
          
          {/* Mobile controls */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] md:hidden">
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm" />
          <div className="fixed top-16 left-0 right-0 bg-card/95 backdrop-blur-sm border-b border-border/50 p-4">
            <nav className="flex flex-col space-y-4">
              <button 
                onClick={() => handleNavigation('/')}
                className={`relative transition-smooth font-medium py-2 px-4 rounded-lg hover:bg-muted/50 ${
                  isActive('/') 
                    ? 'text-primary bg-muted/30' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Home
                {isActive('/') && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-primary rounded-full"></div>
                )}
              </button>
              <button 
                onClick={() => handleNavigation('/about')}
                className={`relative transition-smooth font-medium py-2 px-4 rounded-lg hover:bg-muted/50 ${
                  isActive('/about') 
                    ? 'text-primary bg-muted/30' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                About Us
                {isActive('/about') && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-primary rounded-full"></div>
                )}
              </button>
              <button 
                onClick={() => handleNavigation('/services')}
                className={`relative transition-smooth font-medium py-2 px-4 rounded-lg hover:bg-muted/50 ${
                  isActive('/services') 
                    ? 'text-primary bg-muted/30' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Services
                {isActive('/services') && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-primary rounded-full"></div>
                )}
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                className={`relative transition-smooth font-medium py-2 px-4 rounded-lg hover:bg-muted/50 ${
                  isActive('/contact') 
                    ? 'text-primary bg-muted/30' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Contact
                {isActive('/contact') && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-primary rounded-full"></div>
                )}
              </button>
              <Button variant="ai" size="sm" className="mt-4 w-full">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;