
import { IssueCategory } from "@/types";
import { MapPin, Droplet, Trash2, Zap, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
        return "text-civic-orange dark:text-civic-orange-dark";
      case "water":
        return "text-civic-blue dark:text-civic-blue-dark";
      case "sanitation":
        return "text-civic-green dark:text-civic-green-dark";
      case "electricity":
        return "text-civic-purple dark:text-civic-purple-dark";
      case "other":
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const getBgColor = () => {
    if (!withBackground) return "";
    
    switch (category) {
      case "road":
        return "bg-civic-orange/10 dark:bg-civic-orange-dark/10";
      case "water":
        return "bg-civic-blue/10 dark:bg-civic-blue-dark/10";
      case "sanitation":
        return "bg-civic-green/10 dark:bg-civic-green-dark/10";
      case "electricity":
        return "bg-civic-purple/10 dark:bg-civic-purple-dark/10";
      case "other":
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const renderIcon = () => {
    switch (category) {
      case "road":
        return <MapPin size={size} className={cn("transition-transform duration-300 group-hover:scale-110", getCategoryColor())} />;
      case "water":
        return <Droplet size={size} className={cn("transition-transform duration-300 group-hover:scale-110", getCategoryColor())} />;
      case "sanitation":
        return <Trash2 size={size} className={cn("transition-transform duration-300 group-hover:scale-110", getCategoryColor())} />;
      case "electricity":
        return <Zap size={size} className={cn("transition-transform duration-300 group-hover:scale-110", getCategoryColor())} />;
      case "other":
      default:
        return <HelpCircle size={size} className={cn("transition-transform duration-300 group-hover:scale-110", getCategoryColor())} />;
    }
  };

  return (
    <div className={cn(
      "category-icon group rounded-full p-1.5", 
      getBgColor(), 
      withBackground && "p-2", 
      className
    )}>
      {renderIcon()}
    </div>
  );
};

export default CategoryIcon;
