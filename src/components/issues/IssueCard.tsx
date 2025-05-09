
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Issue } from "@/types";
import { Card } from "@/components/ui/card";
import { ThumbsUp, Image, Pencil, Trash2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import StatusBadge from "./StatusBadge";
import CategoryIcon from "./CategoryIcon";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { getUserProfile } from "@/lib/supabase-data";
import { motion } from "framer-motion";

interface IssueCardProps {
  issue: Issue;
  showActions?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onVote?: () => void;
}

const IssueCard = ({ 
  issue, 
  showActions = false, 
  onClick, 
  onEdit, 
  onDelete,
  onVote
}: IssueCardProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const [creatorName, setCreatorName] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const timeAgo = formatDistanceToNow(issue.createdAt, { addSuffix: true });
  
  useEffect(() => {
    let mounted = true;
    async function fetchCreator() {
      try {
        const profile = await getUserProfile(issue.userId);
        if (mounted) setCreatorName(profile.name || profile.email || "User");
      } catch {
        if (mounted) setCreatorName("User");
      }
    }
    fetchCreator();
    return () => { mounted = false; };
  }, [issue.userId]);
  
  const handleVote = async (e: React.MouseEvent) => {
    if (!onVote) return;

    e.preventDefault();
    e.stopPropagation();
    
    setIsVoting(true);
    try {
      await onVote();
    } finally {
      setIsVoting(false);
    }
  };

  const cardVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className={cn(
          "overflow-hidden h-full flex flex-col transition-all duration-300",
          "border border-border dark:border-border rounded-xl",
          "backdrop-blur-sm bg-card/95 dark:bg-card/95",
          onClick && "cursor-pointer",
        )}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-0 flex-grow">
          <div className="relative overflow-hidden">
            {issue.imageUrl ? (
              <div className="relative w-full h-40 overflow-hidden group">
                <motion.img 
                  src={issue.imageUrl} 
                  alt={issue.title}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                  animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
                  isHovered ? "opacity-100" : "opacity-0"
                )}></div>
              </div>
            ) : (
              <div className={cn(
                "w-full h-40 bg-muted flex items-center justify-center transition-all duration-300",
                isHovered && "bg-muted/80"
              )}>
                <motion.div
                  animate={isHovered ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                  <CategoryIcon category={issue.category} size={48} withBackground />
                </motion.div>
              </div>
            )}
            
            <div className="absolute top-3 right-3 z-10">
              <StatusBadge status={issue.status} size="sm" animate />
            </div>
            
            {issue.imageUrl && (
              <div className="absolute bottom-3 left-3 bg-black/60 rounded-full p-1.5">
                <Image size={16} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <CategoryIcon category={issue.category} />
              <span className="inline-block px-2.5 py-1 bg-muted/70 dark:bg-muted/70 text-foreground dark:text-foreground rounded-full text-xs font-medium capitalize">
                {issue.category}
              </span>
              <motion.span 
                className="text-xs text-muted-foreground ml-auto"
                animate={isHovered ? { scale: 1.05 } : {}}
                transition={{ duration: 0.2 }}
              >
                {timeAgo}
              </motion.span>
            </div>
            
            <motion.h3 
              className={cn(
                "font-semibold text-lg mb-2 line-clamp-2 transition-colors duration-300",
                isHovered ? "text-primary dark:text-primary" : "text-foreground"
              )}
              animate={isHovered ? { y: -2 } : { y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {issue.title}
            </motion.h3>
            
            <div className="flex items-center justify-between mt-3">
              <div className="text-sm text-muted-foreground truncate max-w-[70%]">
                <span className="inline-flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-amber-500 dark:text-amber-400" />
                  <span className="truncate">{issue.location}</span>
                </span>
                <span className="block text-xs text-muted-foreground mt-1.5">By: {creatorName}</span>
              </div>
              
              <motion.button
                onClick={handleVote}
                disabled={isVoting || !onVote}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-300",
                  onVote ? "hover:bg-primary/10 dark:hover:bg-primary/10 cursor-pointer" : "cursor-default",
                  "bg-muted/50 dark:bg-muted/30 hover:shadow-md",
                  isVoting && "animate-pulse"
                )}
                whileHover={onVote ? { y: -2 } : {}}
                whileTap={onVote ? { scale: 0.95 } : {}}
              >
                <ThumbsUp size={14} className={cn(
                  "text-primary dark:text-primary transition-transform duration-300", 
                  (isHovered && onVote) && "scale-110"
                )} /> 
                <span className="text-xs font-medium">{issue.votes}</span>
                <span className="text-xs font-semibold">Votes</span>
              </motion.button>
            </div>

            {showActions && onEdit && onDelete && (
              <div className={cn(
                "flex justify-end gap-2 mt-4 pt-3 border-t border-border/50",
                "transition-all duration-300",
                isHovered ? "opacity-100" : "opacity-70"
              )}>
                {issue.status === "pending" && (
                  <Button variant="ghost" size="sm" className="h-8 px-3 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/10 rounded-full" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit();
                  }}>
                    <motion.span whileHover={{ scale: 1.1 }}>
                      <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    </motion.span>
                    Edit
                  </Button>
                )}
                {issue.status === "pending" && (
                  <Button variant="ghost" size="sm" className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete();
                  }}>
                    <motion.span whileHover={{ scale: 1.1 }}>
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                    </motion.span>
                    Delete
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default IssueCard;
