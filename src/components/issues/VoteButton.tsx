
import { useState, useEffect } from "react";
import { ThumbsUp, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";

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
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Only run once to avoid unwanted animations on prop changes
    if (!hasInitialized) {
      setIsVoted(initialVoted);
      setVotes(initialVotes);
      setHasInitialized(true);
    }
  }, [initialVoted, initialVotes, hasInitialized]);

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
        className: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-400/20",
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
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
    
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
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button 
              variant={isVoted ? "secondary" : "outline"}
              size={size === "sm" ? "sm" : "default"}
              className={cn(
                "group transition-all duration-300 relative overflow-hidden",
                isVoted ? 
                  "border-emerald-500 text-emerald-600 bg-emerald-500/10 dark:border-emerald-400 dark:text-emerald-400 dark:bg-emerald-400/10" : 
                  "border-primary/80 text-primary hover:border-primary hover:text-primary dark:border-primary/80 dark:hover:text-primary",
                isLoading ? "opacity-80 cursor-not-allowed" : "",
                "rounded-full"
              )}
              onClick={handleVote}
              disabled={isVoted || isLoading}
            >
              {isVoted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Check className="w-4 h-4 mr-1 text-emerald-500 dark:text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <ThumbsUp className={cn(
                    "w-4 h-4 mr-1",
                    "group-hover:text-primary dark:group-hover:text-primary transition-all duration-300"
                  )} />
                </motion.div>
              )}
              <span>{isVoted ? "Voted" : "Upvote"}</span>
              {showCount && (
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={votes}
                    className="ml-1"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    ({votes})
                  </motion.span>
                </AnimatePresence>
              )}
              {isAnimating && (
                <motion.span 
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 0.7, opacity: 0.5 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ backgroundColor: 'hsl(var(--primary) / 0.2)' }}
                />
              )}
            </Button>
          </motion.div>
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
