
import { IssueCategory } from "@/types";
import { MapPin, Droplet, Trash2, Zap, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CategoryIconProps {
  category: IssueCategory;
  size?: number;
  className?: string;
  withBackground?: boolean;
}

const CategoryIcon = ({ 
  category, 
  size = 18, 
  className = "", 
  withBackground = false 
}: CategoryIconProps) => {
  const getCategoryColor = () => {
    switch (category) {
      case "road":
        return "text-amber-500 dark:text-amber-400";
      case "water":
        return "text-sky-500 dark:text-sky-400";
      case "sanitation":
        return "text-emerald-500 dark:text-emerald-400";
      case "electricity":
        return "text-indigo-500 dark:text-indigo-400";
      case "other":
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const getBgColor = () => {
    if (!withBackground) return "";
    
    switch (category) {
      case "road":
        return "bg-amber-500/10 dark:bg-amber-400/10";
      case "water":
        return "bg-sky-500/10 dark:bg-sky-400/10";
      case "sanitation":
        return "bg-emerald-500/10 dark:bg-emerald-400/10";
      case "electricity":
        return "bg-indigo-500/10 dark:bg-indigo-400/10";
      case "other":
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.15, rotate: [0, -10, 10, -5, 5, 0], transition: { duration: 0.6 } },
  };
  
  const iconContainerVariants = {
    initial: { backgroundColor: 'rgba(0, 0, 0, 0.05)' },
    hover: { 
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      boxShadow: '0 0 12px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 } 
    },
  };

  const renderIcon = () => {
    switch (category) {
      case "road":
        return (
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            className="transition-transform duration-300"
          >
            <MapPin size={size} className={cn(getCategoryColor())} />
          </motion.div>
        );
      case "water":
        return (
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            className="transition-transform duration-300"
          >
            <Droplet size={size} className={cn(getCategoryColor())} />
          </motion.div>
        );
      case "sanitation":
        return (
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            className="transition-transform duration-300"
          >
            <Trash2 size={size} className={cn(getCategoryColor())} />
          </motion.div>
        );
      case "electricity":
        return (
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            className="transition-transform duration-300"
          >
            <Zap size={size} className={cn(getCategoryColor())} />
          </motion.div>
        );
      case "other":
      default:
        return (
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            className="transition-transform duration-300"
          >
            <HelpCircle size={size} className={cn(getCategoryColor())} />
          </motion.div>
        );
    }
  };

  return (
    <motion.div 
      className={cn(
        "category-icon rounded-full p-1.5 flex items-center justify-center", 
        getBgColor(), 
        withBackground && "p-3", 
        className
      )}
      variants={withBackground ? iconContainerVariants : {}}
      initial="initial"
      whileHover="hover"
    >
      {renderIcon()}
    </motion.div>
  );
};

export default CategoryIcon;
