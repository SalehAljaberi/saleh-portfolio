// src/lib/scrollUtils.ts
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Scrolls smoothly to the specified element ID with options
 */
export const scrollToElement = (
  elementId: string,
  options: {
    offset?: number;  // Pixels to offset from the target (e.g., to account for fixed header)
    duration?: number; // Duration of scroll animation in seconds
    ease?: string;    // GSAP easing function
    onComplete?: () => void; // Callback after scroll completes
  } = {}
) => {
  const {
    offset = 0,
    duration = 1,
    ease = "power3.inOut",
    onComplete
  } = options;
  
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found.`);
    return;
  }
  
  // Get element's position accounting for any offset
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  // Use GSAP for smooth scrolling
  gsap.to(window, {
    duration,
    scrollTo: offsetPosition,
    ease,
    onComplete: () => {
      // Update URL with hash if needed (without causing another scroll)
      const originalScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      
      // Update URL without scrolling
      window.history.pushState({}, '', `#${elementId}`);
      
      // Restore original scroll behavior
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
      
      // Call the completion callback if provided
      if (onComplete) onComplete();
      
      // Focus on the element for accessibility
      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
  });
};

/**
 * Handles all anchor links on the page automatically
 */
export const setupSmoothScrolling = () => {
  // Calculate header height for offset
  const getHeaderHeight = () => {
    const header = document.querySelector('header');
    return header ? header.offsetHeight : 0;
  };

  // Process all links on the page
  const processLinks = () => {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          scrollToElement(targetId, { offset: getHeaderHeight() + 20 });
        }
      });
    });

    // Handle initial URL with hash
    if (window.location.hash) {
      const targetId = window.location.hash.substring(1);
      if (targetId) {
        // Small delay to ensure page is fully loaded
        setTimeout(() => {
          scrollToElement(targetId, { offset: getHeaderHeight() + 20 });
        }, 500);
      }
    }
  };

  // Run initial setup
  processLinks();
  
  // Re-process links when DOM changes significantly (for dynamically added links)
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        processLinks();
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Cleanup function
  return () => observer.disconnect();
};