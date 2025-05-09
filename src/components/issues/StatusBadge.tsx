
import React from "react";
import { IssueStatus } from "@/types";
import { cn } from "@/lib/utils";

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
      "pending": "bg-civic-orange/15 text-civic-orange dark:bg-civic-orange-dark/15 dark:text-civic-orange-dark border border-civic-orange/20 dark:border-civic-orange-dark/20",
      "in-progress": "bg-civic-purple/15 text-civic-purple dark:bg-civic-purple-dark/15 dark:text-civic-purple-dark border border-civic-purple/20 dark:border-civic-purple-dark/20",
      "resolved": "bg-civic-green/15 text-civic-green dark:bg-civic-green-dark/15 dark:text-civic-green-dark border border-civic-green/20 dark:border-civic-green-dark/20"
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
        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }
    
    if (status === "in-progress") {
      return (
        <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" 
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    
    return (
      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };
  
  return (
    <span className={getStatusClasses()}>
      {getStatusIcon()}
      {getStatusLabel()}
    </span>
  );
};

export default StatusBadge;
