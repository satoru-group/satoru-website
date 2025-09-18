import Header from "@/components/Header";
import ScrollingSections from "@/components/ScrollingSections";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative ai-bg neural-bg">
      <Header />
      <ScrollingSections />
      {/* Spacer to ensure proper positioning after scrolling sections */}
      <div className="relative z-20 ai-bg neural-bg">
        {/* Get in touch is simplified and embedded in the footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Index;
