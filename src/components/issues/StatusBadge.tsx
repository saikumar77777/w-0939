
import React from "react";
import { IssueStatus } from "@/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface StatusBadgeProps {
  status: IssueStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  size = "md",
  className = "",
  animate = false
}) => {
  const getStatusClasses = () => {
    const baseClasses = "status-badge rounded-full inline-flex items-center justify-center font-medium transition-all duration-300";
    
    const sizeClasses = {
      sm: "text-xs px-1.5 py-0.5",
      md: "text-xs px-2.5 py-1",
      lg: "text-sm px-3 py-1.5"
    };
    
    const statusClasses = {
      "pending": "bg-amber-500/15 text-amber-600 dark:bg-amber-400/15 dark:text-amber-400 border border-amber-500/20 dark:border-amber-400/20",
      "in-progress": "bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-400/20",
      "resolved": "bg-emerald-500/15 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-400/20"
    };

    const animationClasses = animate ? {
      "pending": "animate-pulse",
      "in-progress": "animate-bounce-soft",
      "resolved": "shine-effect"
    } : {
      "pending": "",
      "in-progress": "",
      "resolved": ""
    };
    
    return cn(
      baseClasses, 
      statusClasses[status], 
      sizeClasses[size], 
      animationClasses[status], 
      className
    );
  };
  
  const getStatusLabel = () => {
    const labels = {
      "pending": "Pending",
      "in-progress": "In Progress",
      "resolved": "Resolved"
    };
    
    return labels[status];
  };
  
  const getStatusIcon = () => {
    if (status === "pending") {
      return (
        <motion.svg 
          className="w-3 h-3 mr-1" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          initial={animate ? { opacity: 0.6 } : {}}
          animate={animate ? { opacity: [0.6, 1, 0.6] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
      );
    }
    
    if (status === "in-progress") {
      return (
        <motion.svg 
          className="w-3 h-3 mr-1"
          viewBox="0 0 24 24"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          initial={false}
          animate={{ rotate: animate ? 360 : 0 }}
          transition={{ duration: 2, repeat: animate ? Infinity : 0, ease: "linear" }}
        >
          <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      );
    }
    
    return (
      <motion.svg
        className="w-3 h-3 mr-1"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </motion.svg>
    );
  };
  
  return (
    <motion.span 
      className={getStatusClasses()}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05, boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
      layout
    >
      {getStatusIcon()}
      {getStatusLabel()}
      
      {/* Add subtle glow effect based on status */}
      {status === 'pending' && animate && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-amber-500/5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {status === 'in-progress' && animate && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-indigo-500/5"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      
      {status === 'resolved' && animate && (
        <motion.div 
          className="absolute inset-0 rounded-full bg-emerald-500/5"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.2, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.span>
  );
};

export default StatusBadge;
