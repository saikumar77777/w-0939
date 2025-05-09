
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          aria-label="Toggle theme" 
          className="text-foreground relative overflow-hidden rounded-full bg-muted/50 hover:bg-muted group hover:shadow-inner-glow"
        >
          <div className="relative w-10 h-10 flex items-center justify-center">
            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === "dark" ? 45 : 0, 
                scale: theme === "dark" ? 0 : 1,
                opacity: theme === "dark" ? 0 : 1
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
              className="absolute"
            >
              <Sun className="h-5 w-5 text-amber-500" />
            </motion.div>
            
            <motion.div
              initial={false}
              animate={{ 
                rotate: theme === "light" ? -45 : 0, 
                scale: theme === "light" ? 0 : 1,
                opacity: theme === "light" ? 0 : 1
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.34, 1.56, 0.64, 1] 
              }}
              className="absolute"
            >
              <Moon className="h-5 w-5 text-indigo-400" />
            </motion.div>
          </div>
          
          <span className="sr-only">Toggle theme</span>
          
          {/* Ripple effect */}
          <motion.span 
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: theme === "dark" ? [0, 2] : [0, 0], opacity: [0.5, 0] }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-indigo-400/20 rounded-full"
          />
          
          <motion.span 
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: theme === "light" ? [0, 2] : [0, 0], opacity: [0.5, 0] }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 bg-amber-500/20 rounded-full"
          />
          
          <span className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        align="end" 
        className="rounded-xl animate-scale-in min-w-[180px] border border-border/50 shadow-lg backdrop-blur-sm bg-card/90"
      >
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="rounded-lg cursor-pointer flex items-center gap-2 hover:bg-muted transition-colors duration-200 data-[highlighted]:bg-muted group"
        >
          <div className="p-1 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
            <Sun className="h-4 w-4 text-amber-500" />
          </div>
          <span>Light Mode</span>
          {theme === "light" && (
            <motion.span 
              className="ml-auto text-primary"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="rounded-lg cursor-pointer flex items-center gap-2 hover:bg-muted transition-colors duration-200 data-[highlighted]:bg-muted group"
        >
          <div className="p-1 rounded-full bg-indigo-400/10 group-hover:bg-indigo-400/20 transition-colors">
            <Moon className="h-4 w-4 text-indigo-400" />
          </div>
          <span>Dark Mode</span>
          {theme === "dark" && (
            <motion.span 
              className="ml-auto text-primary"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="rounded-lg cursor-pointer flex items-center gap-2 hover:bg-muted transition-colors duration-200 data-[highlighted]:bg-muted group"
        >
          <div className="p-1 rounded-full bg-sky-500/10 group-hover:bg-sky-500/20 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-sky-500"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <line x1="8" x2="16" y1="21" y2="21" />
              <line x1="12" x2="12" y1="17" y2="21" />
            </svg>
          </div>
          <span>System Preference</span>
          {theme === "system" && (
            <motion.span 
              className="ml-auto text-primary"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
