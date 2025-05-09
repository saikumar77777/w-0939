
import { useState } from "react";
import { ThumbsUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface VoteButtonProps {
  issueId: string;
  initialVotes: number;
  initialVoted?: boolean;
  onVote?: (issueId: string) => Promise<void>;
  size?: "sm" | "default";
  showCount?: boolean;
}

const VoteButton = ({ 
  issueId, 
  initialVotes, 
  initialVoted = false,
  onVote,
  size = "default",
  showCount = true 
}: VoteButtonProps) => {
  const [isVoted, setIsVoted] = useState(initialVoted);
  const [votes, setVotes] = useState(initialVotes);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();

  const handleVote = async () => {
    if (isVoted || isLoading) return;
    
    setIsLoading(true);
    setIsAnimating(true);
    
    try {
      if (onVote) {
        await onVote(issueId);
      }
      
      setVotes(prev => prev + 1);
      setIsVoted(true);
      
      toast({
        title: "Vote recorded",
        description: "Thanks for supporting this issue!",
        className: "bg-civic-green/10 text-civic-green dark:bg-civic-green-dark/10 dark:text-civic-green-dark border-civic-green/20 dark:border-civic-green-dark/20",
      });
      
      // Milestone vote celebration
      if ((votes + 1) % 10 === 0) {
        showConfetti();
      }
    } catch (error) {
      console.error("Error voting:", error);
      toast({
        title: "Could not record vote",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };
  
  const showConfetti = () => {
    const confettiCount = 50;
    const colors = ['#2A6CB0', '#34A853', '#FF9800', '#7B61FF'];
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;
      confetti.style.opacity = `${Math.random() * 0.5 + 0.5}`;
      document.body.appendChild(confetti);
      
      setTimeout(() => document.body.removeChild(confetti), 5000);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isVoted ? "secondary" : "outline"}
            size={size === "sm" ? "sm" : "default"}
            className={cn(
              "group transition-all duration-300 relative overflow-hidden",
              isVoted ? "border-civic-green text-civic-green dark:border-civic-green-dark dark:text-civic-green-dark" : 
                       "border-civic-blue hover:border-civic-blue hover:text-civic-blue dark:border-civic-blue-dark dark:hover:text-civic-blue-dark",
              isLoading ? "opacity-80 cursor-not-allowed" : ""
            )}
            onClick={handleVote}
            disabled={isVoted || isLoading}
          >
            {isVoted ? (
              <Check className="w-4 h-4 mr-1 text-civic-green dark:text-civic-green-dark" />
            ) : (
              <ThumbsUp className={cn(
                "w-4 h-4 mr-1",
                "group-hover:scale-110 group-hover:rotate-12 group-hover:text-civic-blue dark:group-hover:text-civic-blue-dark transition-all duration-300"
              )} />
            )}
            <span>{isVoted ? "Voted" : "Upvote"}</span>
            {showCount && (
              <span className={cn(
                "ml-1 transition-all duration-300",
                isAnimating && "animate-pulse text-civic-blue dark:text-civic-blue-dark"
              )}>
                ({votes})
              </span>
            )}
            {isAnimating && (
              <span className="absolute inset-0 bg-civic-blue/10 dark:bg-civic-blue-dark/10 animate-ping rounded-md"></span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent 
          className="bg-card text-card-foreground animate-fade-in border border-border shadow-lg"
          sideOffset={4}
        >
          {isVoted 
            ? "You've already voted on this issue" 
            : "Upvote this issue to show your support"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VoteButton;
