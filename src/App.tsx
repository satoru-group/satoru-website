import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WaterAnimation } from "@/components/WaterAnimation";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [loaderPercent, setLoaderPercent] = useState(0);
  // Always ensure we start at the top (first section) on load/refresh
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual';
      } catch {}
    }

    // Ensure no smooth behavior interferes during reset
    const prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    // Immediate reset
    window.scrollTo({ top: 0, behavior: 'auto' });
    // Double-check after initial paint
    const id = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    // Hide loader after 1 second
    // Animate numeric percentage 0 -> 100 within ~1s
    let rafId = 0;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const percent = Math.min(100, Math.round((elapsed / 1000) * 100));
      setLoaderPercent(percent);
      if (elapsed < 1000) {
        rafId = window.requestAnimationFrame(step);
      }
    };
    rafId = window.requestAnimationFrame(step);
    const loaderTimer = window.setTimeout(() => setShowLoader(false), 1000);
    return () => {
      window.cancelAnimationFrame(id);
      // Restore previous scroll behavior
      document.documentElement.style.scrollBehavior = prevScrollBehavior;
      if (rafId) window.cancelAnimationFrame(rafId);
      window.clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WaterAnimation />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {showLoader && (
            <div className="fixed inset-0 z-[9999] bg-background/95 flex items-center justify-center select-none">
              <div className="w-[60%] sm:w-[50%] lg:w-[40%] max-w-xl">
                <div className="mb-2 text-center text-xs sm:text-sm text-muted-foreground">
                  {loaderPercent}%
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-[width] duration-75"
                    style={{ width: `${loaderPercent}%` }}
                  />
                </div>
              </div>
            </div>
          )}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
