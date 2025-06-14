"use client";

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

export default function AiShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isTyping, setIsTyping] = useState(false);
  const [promptText, setPromptText] = useState("");
  const [codeText, setCodeText] = useState("");
  
  const fullPrompt = "Create a responsive navbar component with a logo, links, and mobile menu toggle";
  const fullCode = `// ResponsiveNavbar.jsx
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-900 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-900 hover:text-blue-600">About</a>
                <a href="#" className="text-gray-900 hover:text-blue-600">Services</a>
                <a href="#" className="text-gray-900 hover:text-blue-600">Contact</a>
              </div>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#" className="block px-3 py-2 text-gray-900 hover:bg-gray-100">Home</a>
            <a href="#" className="block px-3 py-2 text-gray-900 hover:bg-gray-100">About</a>
            <a href="#" className="block px-3 py-2 text-gray-900 hover:bg-gray-100">Services</a>
            <a href="#" className="block px-3 py-2 text-gray-900 hover:bg-gray-100">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
}`;

  useEffect(() => {
    if (inView) {
      // Start typing the prompt
      setIsTyping(true);
      let promptIndex = 0;
      const typePrompt = setInterval(() => {
        if (promptIndex < fullPrompt.length) {
          setPromptText(fullPrompt.substring(0, promptIndex + 1));
          promptIndex++;
        } else {
          clearInterval(typePrompt);
          
          // Start typing the code after prompt is done
          setTimeout(() => {
            let codeIndex = 0;
            const typeCode = setInterval(() => {
              if (codeIndex < fullCode.length) {
                setCodeText(fullCode.substring(0, codeIndex + 1));
                codeIndex++;
              } else {
                clearInterval(typeCode);
                setIsTyping(false);
                
                // Reset and start over after a delay
                setTimeout(() => {
                  setPromptText("");
                  setCodeText("");
                  setIsTyping(true);
                  promptIndex = 0;
                  const restartTypePrompt = setInterval(() => {
                    if (promptIndex < fullPrompt.length) {
                      setPromptText(fullPrompt.substring(0, promptIndex + 1));
                      promptIndex++;
                    } else {
                      clearInterval(restartTypePrompt);
                      
                      setTimeout(() => {
                        let codeIndex = 0;
                        const restartTypeCode = setInterval(() => {
                          if (codeIndex < fullCode.length) {
                            setCodeText(fullCode.substring(0, codeIndex + 1));
                            codeIndex++;
                          } else {
                            clearInterval(restartTypeCode);
                            setIsTyping(false);
                          }
                        }, 5);
                      }, 500);
                    }
                  }, 50);
                }, 5000);
              }
            }, 5); // Type code faster than prompt
          }, 500);
        }
      }, 50);
      
      return () => {
        clearInterval(typePrompt);
      };
    }
  }, [inView, fullPrompt, fullCode]);

  return (
    <section id="ai-showcase" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 gradientBg opacity-20 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">AI-Prompting Showcase</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Accelerating Development with AI Prompts
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Prompt */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Natural Language Prompt</h3>
            <div className="bg-muted/50 rounded-lg p-4 h-[300px] overflow-auto font-mono text-sm relative">
              <div className="absolute inset-0 p-4">
                <span className="text-earth-yellow">&gt;</span> {promptText}
                {isTyping && promptText.length < fullPrompt.length && (
                  <span className="animate-pulse">|</span>
                )}
              </div>
            </div>
          </div>
          
          {/* Generated Code */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-md h-full">
            <h3 className="text-xl font-semibold mb-4">Generated Component</h3>
            <div className="bg-muted/50 rounded-lg p-4 h-[300px] overflow-auto font-mono text-sm">
              <pre className="text-xs md:text-sm whitespace-pre-wrap break-words">
                <code>
                  {codeText}
                  {isTyping && codeText.length > 0 && codeText.length < fullCode.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-8 p-6 bg-card/30 backdrop-blur-sm border border-border rounded-xl shadow-md"
        >
          <h3 className="text-xl font-semibold mb-3">How I Leverage AI</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-earth-yellow mr-2">•</span>
              <span>Rapid prototyping of UI components and layouts</span>
            </li>
            <li className="flex items-start">
              <span className="text-earth-yellow mr-2">•</span>
              <span>Generating boilerplate code to accelerate development</span>
            </li>
            <li className="flex items-start">
              <span className="text-earth-yellow mr-2">•</span>
              <span>Creating documentation and technical specifications</span>
            </li>
            <li className="flex items-start">
              <span className="text-earth-yellow mr-2">•</span>
              <span>Optimizing complex algorithms and solving technical challenges</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}