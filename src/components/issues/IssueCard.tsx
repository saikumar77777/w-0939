
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
      y: -8,
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
          "backdrop-blur-sm bg-card/95 dark:bg-card/95 shadow-lg",
          onClick && "cursor-pointer",
        )}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="p-0 flex-grow">
          {/* Image or category icon section */}
          <div className="relative overflow-hidden">
            {issue.imageUrl ? (
              <div className="relative w-full h-48 overflow-hidden group">
                <motion.img 
                  src={issue.imageUrl} 
                  alt={issue.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.8 }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-muted via-muted/80 to-muted/60 dark:from-muted dark:via-muted/70 dark:to-muted/40 flex items-center justify-center">
                <motion.div
                  animate={isHovered ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  <CategoryIcon category={issue.category} size={56} withBackground />
                </motion.div>
              </div>
            )}
            
            {/* Status badge */}
            <div className="absolute top-4 right-4 z-10">
              <StatusBadge status={issue.status} size="md" animate />
            </div>
            
            {/* Category indicator */}
            <div className="absolute bottom-4 left-4">
              <motion.div 
                className="flex items-center space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className={cn(
                  "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium",
                  "bg-white/90 dark:bg-black/60 backdrop-blur-sm"
                )}>
                  <CategoryIcon category={issue.category} size={14} className="mr-2 text-primary" />
                  <span className="capitalize">{issue.category}</span>
                </span>
              </motion.div>
            </div>
          </div>
          
          {/* Content section */}
          <div className="p-5">
            <motion.h3 
              className={cn(
                "font-semibold text-xl mb-3 line-clamp-2 transition-colors duration-300",
                isHovered ? "text-primary dark:text-primary" : "text-foreground"
              )}
              animate={isHovered ? { y: -2 } : { y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {issue.title}
            </motion.h3>
            
            <motion.p 
              className="text-sm text-muted-foreground mb-4 line-clamp-3"
              animate={isHovered ? { opacity: 0.9 } : { opacity: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              {issue.description || "No description provided for this issue."}
            </motion.p>
            
            {/* Footer with metadata */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              <div className="flex flex-col">
                <div className="text-sm text-muted-foreground truncate max-w-[70%]">
                  <span className="inline-flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-accent dark:text-accent" />
                    <span className="truncate">{issue.location}</span>
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-1.5">By: {creatorName} • {timeAgo}</span>
              </div>
              
              <motion.button
                onClick={handleVote}
                disabled={isVoting || !onVote}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-full transition-all duration-300 relative overflow-hidden",
                  onVote ? "hover:bg-primary/10 dark:hover:bg-primary/20 cursor-pointer" : "cursor-default",
                  "bg-muted/50 dark:bg-muted/30",
                  isVoting && "animate-pulse"
                )}
                whileHover={onVote ? { y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" } : {}}
                whileTap={onVote ? { scale: 0.95 } : {}}
              >
                <ThumbsUp size={14} className={cn(
                  "text-primary dark:text-primary transition-transform duration-300", 
                  (isHovered && onVote) && "scale-110"
                )} /> 
                <span className="font-medium">{issue.votes}</span>
              </motion.button>
            </div>

            {/* Action buttons */}
            {showActions && onEdit && onDelete && (
              <div className={cn(
                "flex justify-end gap-2 mt-4 pt-3 border-t border-border/50",
                "transition-all duration-300",
                isHovered ? "opacity-100" : "opacity-70"
              )}>
                {issue.status === "pending" && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 hover:text-primary dark:hover:text-primary hover:bg-primary/10 dark:hover:bg-primary/10 rounded-full" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEdit();
                    }}
                  >
                    <motion.span whileHover={{ scale: 1.1, rotate: 15 }} transition={{ duration: 0.2 }}>
                      <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    </motion.span>
                    Edit
                  </Button>
                )}
                {issue.status === "pending" && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-3 text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
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
