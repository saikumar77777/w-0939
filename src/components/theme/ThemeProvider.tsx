
import { createContext, useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [previousTheme, setPreviousTheme] = useState<Theme | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const root = window.document.documentElement;
    
    // If the theme is changing, store previous theme for animation
    if (theme !== previousTheme && previousTheme !== null) {
      setPreviousTheme(theme);
    }
    
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      
      root.classList.add(systemTheme);
      return;
    }
    
    root.classList.add(theme);
  }, [theme, isMounted, previousTheme]);

  const updateTheme = (newTheme: Theme) => {
    // Store previous theme for animation
    setPreviousTheme(theme);
    
    // Add theme transition class
    document.documentElement.classList.add("theme-transition");
    
    // Set theme with small delay to allow animation
    setTimeout(() => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
      
      // Remove transition class after animation completes
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 500);
    }, 10);
  };

  const value = {
    theme,
    setTheme: updateTheme,
  };

  if (!isMounted) {
    return <div className="theme-loading"></div>;
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      <style jsx global>{`
        .theme-transition,
        .theme-transition *,
        .theme-transition *::before,
        .theme-transition *::after {
          transition-property: background-color, border-color, color, fill, stroke;
          transition-duration: 500ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
    
  return context;
};
