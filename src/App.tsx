import './App.css'
import { useEffect } from 'react'

function App() {
  // Enhanced counter animation with smooth counting from 0 to target
  useEffect(() => {
    let hasAnimated = false // Prevent multiple animations
    
    const animateCounters = () => {
      if (hasAnimated) return
      hasAnimated = true
      
      const counters = document.querySelectorAll('.stat-number')
      
      counters.forEach((counter, index) => {
        const target = parseInt(counter.getAttribute('data-target') || '0')
        const duration = 2000 // 2 seconds animation
        const startTime = Date.now()
        
        const updateCounter = () => {
          const elapsed = Date.now() - startTime
          const progress = Math.min(elapsed / duration, 1)
          
          // Use easing function for smooth animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4)
          const current = Math.floor(target * easeOutQuart)
          
          counter.textContent = current.toString()
          
          // Add pulse effect during counting
          if (progress < 1) {
            counter.style.animation = 'counterPulse 0.3s ease-in-out'
            requestAnimationFrame(updateCounter)
          } else {
            counter.textContent = target.toString()
            counter.style.animation = 'none'
          }
        }
        
        // Start animation with slight delay for staggered effect
        setTimeout(() => {
          updateCounter()
        }, index * 200)
      })
    }

    // Check if stats section is visible based on scroll position
    const checkStatsVisibility = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Check if we're in the stats section (60vh to 120vh)
      if (scrollY >= windowHeight * 0.6 && scrollY < windowHeight * 1.2) {
        // Reset counters to 0 first
        const counters = document.querySelectorAll('.stat-number')
        counters.forEach(counter => {
          counter.textContent = '0'
        })
        
        // Start animation after a brief delay
        setTimeout(() => {
          animateCounters()
        }, 300)
      }
    }

    // Listen for scroll events to trigger animation
    window.addEventListener('scroll', checkStatsVisibility, { passive: true })
    
    // Also check on initial load
    checkStatsVisibility()

    return () => {
      window.removeEventListener('scroll', checkStatsVisibility)
    }
  }, [])

  // Stacked cards animation for sections 1&2, different transition for others
  useEffect(() => {
    let currentSection = 0

    const handleScroll = () => {
      
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      
      // Calculate which section we should be in based on scroll position
      // Match the actual spacer heights: 60vh for Hero/Stats, 80vh for others
      let targetSection = 0
      
      if (scrollY < windowHeight * 0.6) {
        targetSection = 0 // Hero (0-60vh)
      } else if (scrollY < windowHeight * 1.2) {
        targetSection = 1 // Stats (60vh-120vh)
      } else if (scrollY < windowHeight * 2.0) {
        targetSection = 2 // About (120vh-200vh)
      } else if (scrollY < windowHeight * 2.8) {
        targetSection = 3 // Services (200vh-280vh)
      } else if (scrollY < windowHeight * 3.6) {
        targetSection = 4 // Values (280vh-360vh)
      } else if (scrollY < windowHeight * 4.4) {
        targetSection = 5 // Contact (360vh-440vh)
      } else {
        targetSection = 6 // Footer (440vh+)
      }
      
      // Always update section display to allow scrolling back
      if (targetSection !== currentSection) {
        currentSection = targetSection
      }
      updateSectionDisplay(currentSection, scrollY, windowHeight)
    }

    const updateSectionDisplay = (sectionIndex: number, scrollY: number, windowHeight: number) => {
      // Handle Hero and Stats as stacked cards
      const heroElement = document.querySelector('.hero') as HTMLElement
      const statsElement = document.querySelector('.stats') as HTMLElement
      
      if (heroElement && statsElement) {
        if (sectionIndex <= 1) {
          // Stacked card animation for sections 1&2
          // Calculate progress based on scroll position within the Hero/Stats range
          let scrollProgress = 0
          if (scrollY >= windowHeight * 0.6) {
            // In stats section - calculate progress from 60vh to 120vh
            scrollProgress = Math.min((scrollY - windowHeight * 0.6) / (windowHeight * 0.6), 1)
          }
          
          const heroTranslateY = -scrollProgress * 100
          const statsTranslateY = -100 + (scrollProgress * 100)
          
          heroElement.style.transform = `translateY(${heroTranslateY}vh)`
          heroElement.style.opacity = '1'
          
          statsElement.style.transform = `translateY(${statsTranslateY}vh)`
          statsElement.style.opacity = '1'
        } else {
          // Hide Hero and Stats when in other sections
          heroElement.style.transform = 'translateY(-100vh)'
          heroElement.style.opacity = '0'
          statsElement.style.transform = 'translateY(-100vh)'
          statsElement.style.opacity = '0'
        }
      }
      
      // Handle other sections (3+) with 1 scroll transition
      const otherSections = ['.about', '.services', '.values', '.contact', '.footer']
      otherSections.forEach((section, index) => {
        const element = document.querySelector(section) as HTMLElement
        if (element) {
          const otherSectionIndex = index + 2 // About=2, Services=3, etc.
          
          if (sectionIndex === otherSectionIndex) {
            // Current section - slide in from right
            element.style.transform = 'translateX(0)'
            element.style.opacity = '1'
          } else if (sectionIndex > otherSectionIndex) {
            // Previous sections - slide out to left
            element.style.transform = 'translateX(-100vw)'
            element.style.opacity = '0'
          } else {
            // Future sections - hide to the right
            element.style.transform = 'translateX(100vw)'
            element.style.opacity = '0'
          }
        }
      })
    }

    // Simple scroll handler
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Smooth scroll navigation - always return to top on refresh or home click
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Handle navigation clicks
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' && (target.getAttribute('href') === '#home' || target.textContent?.includes('SATORU'))) {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
    
    // Add click listeners to navigation links and logo
    document.addEventListener('click', handleNavClick)
    
    return () => {
      document.removeEventListener('click', handleNavClick)
    }
  }, [])


  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">SATORU</span>
            <div className="logo-ai-indicator"></div>
          </div>
          <div className="nav-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#services" className="nav-link">Services</a>
            <a href="#values" className="nav-link">Values</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-background">
          <div className="ai-grid"></div>
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span className="badge-text">AI-Powered Consulting</span>
            </div>
            <h1 className="hero-title">
              <span className="title-line">Transform Your</span>
              <span className="title-line gradient-text">Business Operations</span>
              <span className="title-line">with Intelligence</span>
            </h1>
            <p className="hero-description">
              Leverage cutting-edge AI and data-driven insights to streamline workflows, 
              optimize systems, and accelerate growth. Experience the future of business consulting.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">
                <span>Start Your Journey</span>
                <div className="btn-glow"></div>
              </button>
              <button className="btn btn-secondary">
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="ai-brain">
              <div className="brain-core"></div>
              <div className="neural-network">
                <div className="neural-node"></div>
                <div className="neural-node"></div>
                <div className="neural-node"></div>
                <div className="neural-node"></div>
                <div className="neural-node"></div>
                <div className="neural-node"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-number" data-target="95">0</div>
            <div className="stat-label">Efficiency Boost</div>
            <div className="stat-suffix">%</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🚀</div>
            <div className="stat-number" data-target="30">0</div>
            <div className="stat-label">Growth Acceleration</div>
            <div className="stat-suffix">%</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">🎯</div>
            <div className="stat-number" data-target="70">0</div>
            <div className="stat-label">Years of Expertise</div>
            <div className="stat-suffix">+</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">💡</div>
            <div className="stat-number" data-target="20">0</div>
            <div className="stat-label">AI Solutions</div>
            <div className="stat-suffix">+</div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '80vh' }}></div>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-background">
          <div className="circuit-pattern"></div>
        </div>
        <div className="about-container">
          <div className="about-content">
            <div className="section-badge">About SATORU</div>
            <h2 className="section-title">
              Intelligent Consulting for the 
              <span className="gradient-text"> Digital Age</span>
            </h2>
            <p className="about-description">
              We combine decades of consulting expertise with cutting-edge AI technology 
              to deliver unprecedented insights and solutions. Our intelligent systems 
              analyze your business operations in real-time, identifying optimization 
              opportunities that traditional methods miss.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">🧠</div>
                <div className="feature-content">
                  <h4>AI-Powered Analysis</h4>
                  <p>Advanced machine learning algorithms analyze your business data</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <div className="feature-content">
                  <h4>Real-time Optimization</h4>
                  <p>Continuous monitoring and instant recommendations</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔮</div>
                <div className="feature-content">
                  <h4>Predictive Insights</h4>
                  <p>Forecast trends and prevent issues before they occur</p>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">
              <span>Discover Our Technology</span>
              <div className="btn-glow"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '80vh' }}></div>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="services-container">
          <div className="services-header">
            <div className="section-badge">Our Services</div>
            <h2 className="section-title">
              Intelligent Solutions for 
              <span className="gradient-text">Every Challenge</span>
            </h2>
            <p className="services-description">
              Our AI-enhanced consulting services deliver measurable results through 
              intelligent automation, predictive analytics, and data-driven insights.
            </p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-header">
                <div className="service-icon">
                  <div className="icon-core"></div>
                  <div className="icon-ring"></div>
                </div>
                <div className="service-glow"></div>
              </div>
              <h3 className="service-title">AI Operations Optimization</h3>
              <p className="service-description">
                Intelligent workflow automation and process optimization using machine learning algorithms
              </p>
              <ul className="service-features">
                <li>Smart process mapping</li>
                <li>Automated workflow design</li>
                <li>Predictive resource allocation</li>
                <li>Real-time performance monitoring</li>
              </ul>
              <button className="btn btn-outline">
                <span>Explore Service</span>
              </button>
            </div>

            <div className="service-card">
              <div className="service-header">
                <div className="service-icon">
                  <div className="icon-core"></div>
                  <div className="icon-ring"></div>
                </div>
                <div className="service-glow"></div>
              </div>
              <h3 className="service-title">Intelligent IT Systems</h3>
              <p className="service-description">
                Next-generation technology infrastructure with AI-powered monitoring and optimization
              </p>
              <ul className="service-features">
                <li>Smart system integration</li>
                <li>AI-driven security protocols</li>
                <li>Predictive maintenance</li>
                <li>Automated scaling solutions</li>
              </ul>
              <button className="btn btn-outline">
                <span>Explore Service</span>
              </button>
            </div>

            <div className="service-card">
              <div className="service-header">
                <div className="service-icon">
                  <div className="icon-core"></div>
                  <div className="icon-ring"></div>
                </div>
                <div className="service-glow"></div>
              </div>
              <h3 className="service-title">AI Leadership Advisory</h3>
              <p className="service-description">
                Strategic guidance powered by data analytics and intelligent decision support systems
              </p>
              <ul className="service-features">
                <li>Data-driven strategy development</li>
                <li>AI-enhanced decision making</li>
                <li>Predictive business modeling</li>
                <li>Intelligent risk assessment</li>
              </ul>
              <button className="btn btn-outline">
                <span>Explore Service</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '80vh' }}></div>

      {/* Values Section */}
      <section id="values" className="values">
        <div className="values-background">
          <div className="data-streams">
            <div className="stream"></div>
            <div className="stream"></div>
            <div className="stream"></div>
          </div>
        </div>
        <div className="values-container">
          <div className="values-header">
            <div className="section-badge">Our Values</div>
            <h2 className="section-title">
              The SATORU 
              <span className="gradient-text">Intelligence Framework</span>
            </h2>
            <p className="values-description">
              Our core values are enhanced by artificial intelligence, creating a powerful 
              framework for delivering exceptional results.
            </p>
          </div>
          
          <div className="values-grid">
            <div className="value-item">
              <div className="value-visual">
                <div className="value-letter">S</div>
                <div className="value-connections">
                  <div className="connection"></div>
                  <div className="connection"></div>
                </div>
              </div>
              <h4 className="value-title">Strategic Intelligence</h4>
              <p className="value-description">
                AI-enhanced strategic planning with predictive modeling and scenario analysis
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-visual">
                <div className="value-letter">A</div>
                <div className="value-connections">
                  <div className="connection"></div>
                  <div className="connection"></div>
                </div>
              </div>
              <h4 className="value-title">Adaptive Solutions</h4>
              <p className="value-description">
                Machine learning systems that adapt and evolve with your business needs
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-visual">
                <div className="value-letter">T</div>
                <div className="value-connections">
                  <div className="connection"></div>
                  <div className="connection"></div>
                </div>
              </div>
              <h4 className="value-title">Transparent Analytics</h4>
              <p className="value-description">
                Clear, explainable AI insights with full transparency in decision processes
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-visual">
                <div className="value-letter">O</div>
                <div className="value-connections">
                  <div className="connection"></div>
                  <div className="connection"></div>
                </div>
              </div>
              <h4 className="value-title">Optimized Performance</h4>
              <p className="value-description">
                Continuous optimization through real-time data analysis and automated improvements
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-visual">
                <div className="value-letter">R</div>
                <div className="value-connections">
                  <div className="connection"></div>
                  <div className="connection"></div>
                </div>
              </div>
              <h4 className="value-title">Responsive Systems</h4>
              <p className="value-description">
                Intelligent systems that respond instantly to changing business conditions
              </p>
            </div>
            
            <div className="value-item">
              <div className="value-visual">
                <div className="value-letter">U</div>
                <div className="value-connections">
                  <div className="connection"></div>
                  <div className="connection"></div>
                </div>
              </div>
              <h4 className="value-title">Unified Intelligence</h4>
              <p className="value-description">
                Integrated AI systems that unify all aspects of your business operations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '80vh' }}></div>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="contact-background">
          <div className="contact-grid"></div>
        </div>
        <div className="contact-container">
          <div className="contact-content">
            <div className="section-badge">Get Started</div>
            <h2 className="section-title">
              Ready to Transform Your 
              <span className="gradient-text">Business?</span>
            </h2>
            <p className="contact-description">
              Let our AI-powered consulting solutions revolutionize your operations. 
              Schedule a consultation to discover how intelligent automation can accelerate your growth.
            </p>
            <div className="contact-actions">
              <button className="btn btn-primary large">
                <span>Schedule Consultation</span>
                <div className="btn-glow"></div>
              </button>
              <button className="btn btn-secondary large">
                <span>View Case Studies</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: '80vh' }}></div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-text">SATORU</span>
              <div className="logo-ai-indicator"></div>
            </div>
            <p className="footer-tagline">
              Intelligent Consulting for the Digital Age
            </p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 SATORU Consulting. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Final Spacer */}
      <div style={{ height: '80vh' }}></div>
    </div>
  )
}

export default App