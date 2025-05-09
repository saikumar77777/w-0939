
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "./pages/Index";
import ReportIssue from "./pages/ReportIssue";
import MyIssues from "./pages/MyIssues";
import BrowseIssues from "./pages/BrowseIssues";
import IssueDetails from "./pages/IssueDetails";
import EditIssue from "./pages/EditIssue";
import NotFound from "./pages/NotFound";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { AuthProvider } from "./context/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// AnimatedRoutes component for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/report" element={
            <RequireAuth>
              <ReportIssue />
            </RequireAuth>
          } />
          <Route path="/my-issues" element={
            <RequireAuth>
              <MyIssues />
            </RequireAuth>
          } />
          <Route path="/issues" element={<BrowseIssues />} />
          <Route path="/issues/:id" element={<IssueDetails />} />
          <Route path="/edit-issue/:id" element={
            <RequireAuth>
              <EditIssue />
            </RequireAuth>
          } />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="civic-sync-theme">
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner 
            className="sonner-theme" 
            expand={true}
            position="top-right"
            closeButton={true}
            richColors={true}
            toastOptions={{
              style: {
                background: 'hsl(var(--card))',
                color: 'hsl(var(--card-foreground))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              },
            }}
          />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
          
          {/* Accessibility skip link */}
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
