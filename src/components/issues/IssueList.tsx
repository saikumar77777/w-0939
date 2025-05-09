
import { useState } from "react";
import { Issue } from "@/types";
import IssueCard from "./IssueCard";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import VoteButton from "./VoteButton";
import { motion } from "framer-motion";
import { Trash2, AlertCircle, List } from "lucide-react";

interface IssueListProps {
  issues: Issue[];
  isUserOwned?: boolean;
  onEdit?: (issue: Issue) => void;
  onDelete?: (issueId: string) => void;
  onVote?: (issueId: string) => Promise<void>;
  onClick?: (issue: Issue) => void;
}

const IssueList = ({ 
  issues, 
  isUserOwned = false,
  onEdit,
  onDelete,
  onVote,
  onClick
}: IssueListProps) => {
  const { toast } = useToast();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [issueToDelete, setIssueToDelete] = useState<Issue | null>(null);

  const handleDelete = (issue: Issue) => {
    setIssueToDelete(issue);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (issueToDelete && onDelete) {
      onDelete(issueToDelete.id);
      toast({
        title: "Issue deleted",
        description: `The issue "${issueToDelete.title}" has been deleted.`,
        variant: "default",
      });
    }
    setDeleteDialogOpen(false);
    setIssueToDelete(null);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (issues.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center py-16 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="rounded-full bg-muted p-6 mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {isUserOwned ? (
            <List className="h-10 w-10 text-muted-foreground" />
          ) : (
            <AlertCircle className="h-10 w-10 text-muted-foreground" />
          )}
        </motion.div>
        <h3 className="font-semibold text-xl mb-2">No issues found</h3>
        <p className="text-muted-foreground mt-2 max-w-md">
          {isUserOwned 
            ? "You haven't reported any issues yet. Create your first report to help improve your community!" 
            : "No issues have been reported in this area. Be the first to report an issue in your community!"}
        </p>
        {isUserOwned && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="mt-6"
          >
            <Button className="btn-gradient px-6 py-2.5 rounded-full shadow-lg" asChild>
              <a href="/report">
                <span>Report an issue</span>
              </a>
            </Button>
          </motion.div>
        )}
      </motion.div>
    );
  }

  return (
    <>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {issues.map((issue, index) => (
          <motion.div key={issue.id} variants={item} custom={index}>
            <IssueCard
              issue={issue}
              showActions={isUserOwned}
              onEdit={onEdit ? () => onEdit(issue) : undefined}
              onDelete={onDelete ? () => handleDelete(issue) : undefined}
              onVote={onVote ? () => onVote(issue.id) : undefined}
              onClick={onClick ? () => onClick(issue) : undefined}
            />
          </motion.div>
        ))}
      </motion.div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-card border border-border sm:max-w-[425px] rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-xl">
              <Trash2 className="h-5 w-5 text-destructive" />
              Delete Issue
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-base">
              Are you sure you want to permanently delete &quot;{issueToDelete?.title}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="rounded-full border-border hover:border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default IssueList;
