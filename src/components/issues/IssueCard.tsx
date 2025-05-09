
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
  
  return (
    <Card 
      className={cn(
        "overflow-hidden h-full flex flex-col transition-all duration-300",
        "border border-border dark:border-border hover:shadow-card",
        "hover:border-civic-blue/20 dark:hover:border-civic-blue-dark/20",
        onClick && "cursor-pointer",
        "animate-scale-in"
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-0 flex-grow">
        <div className="relative overflow-hidden">
          {issue.imageUrl ? (
            <div className="relative w-full h-36 overflow-hidden group">
              <img 
                src={issue.imageUrl} 
                alt={issue.title}
                className={cn(
                  "w-full h-36 object-cover transition-all duration-500",
                  isHovered && "scale-105"
                )}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className={cn(
              "w-full h-36 bg-muted flex items-center justify-center transition-all duration-300",
              isHovered && "bg-muted/80"
            )}>
              <CategoryIcon category={issue.category} size={40} withBackground className="animate-bounce-soft" />
            </div>
          )}
          
          <div className="absolute top-2 right-2 z-10">
            <StatusBadge status={issue.status} size="sm" animate />
          </div>
          
          {issue.imageUrl && (
            <div className="absolute bottom-2 left-2 bg-black/50 rounded-full p-1">
              <Image size={16} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <CategoryIcon category={issue.category} />
            <span className="inline-block px-2 py-1 bg-muted dark:bg-muted text-foreground dark:text-foreground rounded-full text-xs font-medium mb-2 capitalize">
              {issue.category}
            </span>
            <span className="text-xs text-muted-foreground ml-auto">{timeAgo}</span>
          </div>
          
          <h3 className={cn(
            "font-medium text-lg mb-2 line-clamp-2 transition-colors duration-300",
            isHovered ? "text-civic-blue dark:text-civic-blue-dark" : "text-foreground"
          )}>
            {issue.title}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="mt-2 text-sm text-muted-foreground truncate max-w-[70%]">
              <span className="inline-flex items-center">
                <MapPin className="w-3 h-3 mr-1 text-civic-orange dark:text-civic-orange-dark" />
                {issue.location}
              </span>
              <span className="block text-xs text-muted-foreground mt-1">By: {creatorName}</span>
            </div>
            
            <button
              onClick={handleVote}
              disabled={isVoting || !onVote}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full transition-all duration-300",
                onVote ? "hover:bg-civic-blue/10 dark:hover:bg-civic-blue-dark/10 cursor-pointer" : "cursor-default",
                "bg-muted dark:bg-muted/50",
                isVoting && "animate-pulse"
              )}
            >
              <ThumbsUp size={14} className={cn(
                "text-civic-blue dark:text-civic-blue-dark transition-transform duration-300", 
                (isHovered && onVote) && "scale-110"
              )} /> 
              <span className="text-xs font-medium">{issue.votes}</span>
              <span className="ml-1 text-xs font-semibold">Votes</span>
            </button>
          </div>

          {showActions && onEdit && onDelete && (
            <div className={cn(
              "flex justify-end gap-2 mt-4 pt-3 border-t border-border/50",
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-70"
            )}>
              {issue.status === "pending" && (
                <Button variant="ghost" size="sm" className="h-8 px-2 hover:text-civic-blue dark:hover:text-civic-blue-dark hover:bg-civic-blue/10 dark:hover:bg-civic-blue-dark/10" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit();
                }}>
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              )}
              {issue.status === "pending" && (
                <Button variant="ghost" size="sm" className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10" onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete();
                }}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default IssueCard;
