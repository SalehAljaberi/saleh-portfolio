// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import SmoothScroll from "./components/ui/SmoothScroll";
import { TransitionProvider } from "./contexts/TransitionContext";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import PageLoader from "./components/ui/PageLoader";

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize dark mode based on localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AccessibilityProvider>
        <TooltipProvider>
          {isLoading && <PageLoader onComplete={() => setIsLoading(false)} />}
          <TransitionProvider>
            <SmoothScroll>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SmoothScroll>
          </TransitionProvider>
        </TooltipProvider>
      </AccessibilityProvider>
    </QueryClientProvider>
  );
};

export default App;