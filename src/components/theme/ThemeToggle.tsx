
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
          className="text-foreground relative overflow-hidden rounded-full bg-muted/50 hover:bg-muted group"
        >
          <motion.div
            initial={false}
            animate={{ rotate: theme === "dark" ? 45 : 0, scale: theme === "dark" ? 0 : 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute"
          >
            <Sun className="h-5 w-5 text-amber-500" />
          </motion.div>
          
          <motion.div
            initial={false}
            animate={{ rotate: theme === "light" ? -45 : 0, scale: theme === "light" ? 0 : 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute"
          >
            <Moon className="h-5 w-5 text-indigo-400" />
          </motion.div>
          <span className="sr-only">Toggle theme</span>
          <span className="absolute inset-0 rounded-full bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-xl animate-scale-in min-w-[150px] border border-border/50 shadow-lg backdrop-blur-sm bg-card/90">
        <DropdownMenuItem 
          onClick={() => setTheme("light")}
          className="rounded-lg cursor-pointer flex items-center gap-2 hover:bg-muted transition-colors duration-200 data-[highlighted]:bg-muted"
        >
          <Sun className="h-4 w-4 text-amber-500" />
          <span>Light</span>
          {theme === "light" && (
            <motion.span 
              className="ml-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("dark")}
          className="rounded-lg cursor-pointer flex items-center gap-2 hover:bg-muted transition-colors duration-200 data-[highlighted]:bg-muted"
        >
          <Moon className="h-4 w-4 text-indigo-400" />
          <span>Dark</span>
          {theme === "dark" && (
            <motion.span 
              className="ml-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setTheme("system")}
          className="rounded-lg cursor-pointer flex items-center gap-2 hover:bg-muted transition-colors duration-200 data-[highlighted]:bg-muted"
        >
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
          <span>System</span>
          {theme === "system" && (
            <motion.span 
              className="ml-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              ✓
            </motion.span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
