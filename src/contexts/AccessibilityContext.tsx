// src/contexts/AccessibilityContext.tsx
import { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface AccessibilityContextType {
  isUsingKeyboard: boolean;
  setIsUsingKeyboard: (value: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  isUsingKeyboard: false,
  setIsUsingKeyboard: () => {},
});

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsUsingKeyboard(true);
      }
    };
    
    const handleMouseDown = () => {
      setIsUsingKeyboard(false);
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleMouseDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('touchstart', handleMouseDown);
    };
  }, []);
  
  useEffect(() => {
    if (isUsingKeyboard) {
      document.body.classList.add('using-keyboard');
    } else {
      document.body.classList.remove('using-keyboard');
    }
  }, [isUsingKeyboard]);
  
  return (
    <AccessibilityContext.Provider value={{ isUsingKeyboard, setIsUsingKeyboard }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => useContext(AccessibilityContext);