
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Shield, Megaphone, Check, ThumbsUp } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/auth/AuthForm";
import { useAuth } from "@/context/AuthContext";
import { getIssues } from "@/lib/supabase-data";
import { Issue } from "@/types";
import StatusBadge from "@/components/issues/StatusBadge";
import CategoryIcon from "@/components/issues/CategoryIcon";
import { motion } from "framer-motion";

// Static hero image URL
const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop";

const Index = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [recentIssues, setRecentIssues] = useState<Issue[]>([]);
  const [isLoadingIssues, setIsLoadingIssues] = useState(true);
  const authSectionRef = useRef<HTMLDivElement>(null);
  
  const handleAuthSuccess = () => {
    // This is handled by the AuthContext now
  };

  useEffect(() => {
    const fetchRecentIssues = async () => {
      try {
        const issues = await getIssues();
        setRecentIssues(issues.slice(0, 3)); // Only get the 3 most recent issues
      } catch (error) {
        console.error("Error fetching recent issues:", error);
      } finally {
        setIsLoadingIssues(false);
      }
    };

    fetchRecentIssues();
  }, []);

  useEffect(() => {
    if (location.state && location.state.scrollToAuth) {
      setTimeout(() => {
        const el = document.getElementById("auth-section");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-muted dark:from-background dark:to-muted py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="text-center md:text-left"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-civic-blue to-civic-purple dark:from-civic-blue-dark dark:to-civic-purple-dark bg-clip-text text-transparent">
                  Report civic issues in your community
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                  CivicSync connects citizens with local authorities to resolve problems 
                  and improve neighborhoods together.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-civic-blue hover:bg-civic-blue-hover transition-all duration-300 group"
                    asChild
                  >
                    <Link to="/report">
                      Report an Issue 
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-civic-blue text-civic-blue hover:bg-civic-blue/10 dark:border-civic-blue-dark dark:text-civic-blue-dark dark:hover:bg-civic-blue-dark/10"
                    asChild
                  >
                    <Link to="/issues">Browse Issues</Link>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="relative mx-auto w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-civic-blue/20 dark:bg-civic-blue-dark/20 rounded-lg transform rotate-3 scale-105"></div>
                <img 
                  src={HERO_IMAGE_URL}
                  alt="Community enhancement" 
                  className="relative rounded-lg shadow-lg w-full h-64 md:h-auto object-cover hero-image"
                />
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-16 bg-background dark:bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold">How It Works</h2>
              <div className="mt-2 h-1 w-24 bg-civic-blue dark:bg-civic-blue-dark mx-auto rounded-full"></div>
              <p className="mt-3 text-muted-foreground">
                Three simple steps to report and track civic issues in your neighborhood
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={fadeIn}
              >
                <div className="w-16 h-16 rounded-full bg-civic-blue/10 dark:bg-civic-blue-dark/10 flex items-center justify-center mb-4 shine-effect">
                  <Megaphone className="h-8 w-8 text-civic-blue dark:text-civic-blue-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Submit Your Report</h3>
                <p className="text-muted-foreground">
                  Fill out a simple form with details about the issue you've noticed in your community.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={fadeIn}
              >
                <div className="w-16 h-16 rounded-full bg-civic-purple/10 dark:bg-civic-purple-dark/10 flex items-center justify-center mb-4 shine-effect">
                  <MapPin className="h-8 w-8 text-civic-purple dark:text-civic-purple-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
                <p className="text-muted-foreground">
                  Follow updates as your issue is received, reviewed, and addressed by local authorities.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center"
                variants={fadeIn}
              >
                <div className="w-16 h-16 rounded-full bg-civic-green/10 dark:bg-civic-green-dark/10 flex items-center justify-center mb-4 shine-effect">
                  <Check className="h-8 w-8 text-civic-green dark:text-civic-green-dark" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Problem Solved</h3>
                <p className="text-muted-foreground">
                  See real results as issues are resolved, improving quality of life in your neighborhood.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Recent Issues Preview */}
        <section className="py-16 bg-muted/50 dark:bg-muted/10">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div 
              className="flex justify-between items-center mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold">Recent Issues</h2>
              <Button 
                variant="outline" 
                className="border-civic-blue text-civic-blue hover:bg-civic-blue/10 dark:border-civic-blue-dark dark:text-civic-blue-dark dark:hover:bg-civic-blue-dark/10"
                asChild
              >
                <Link to="/issues">View All</Link>
              </Button>
            </motion.div>
            
            {isLoadingIssues ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    className="bg-card dark:bg-card rounded-lg shadow overflow-hidden civic-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="h-48 bg-muted dark:bg-muted animate-pulse"></div>
                    <div className="p-4">
                      <div className="h-6 bg-muted dark:bg-muted rounded-full w-24 animate-pulse mb-2"></div>
                      <div className="h-8 bg-muted dark:bg-muted rounded w-3/4 animate-pulse mb-2"></div>
                      <div className="h-4 bg-muted dark:bg-muted rounded w-1/2 animate-pulse mb-3"></div>
                      <div className="flex justify-between text-sm">
                        <div className="h-4 bg-muted dark:bg-muted rounded w-16 animate-pulse"></div>
                        <div className="h-4 bg-muted dark:bg-muted rounded w-20 animate-pulse"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : recentIssues.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentIssues.map((issue, index) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/issues/${issue.id}`} className="block h-full">
                      <div className="civic-card h-full transition-transform duration-300 hover:-translate-y-1">
                        <div className="h-48 bg-muted dark:bg-muted relative overflow-hidden group">
                          {issue.imageUrl ? (
                            <img 
                              src={issue.imageUrl} 
                              alt={issue.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <CategoryIcon category={issue.category} size={48} withBackground />
                            </div>
                          )}
                          <div className="absolute top-2 right-2">
                            <StatusBadge status={issue.status} size="sm" />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-4">
                          <span className="inline-block px-2 py-1 bg-muted dark:bg-muted text-foreground dark:text-foreground rounded-full text-xs font-medium mb-2 capitalize flex items-center">
                            <CategoryIcon category={issue.category} size={14} className="mr-1" />
                            {issue.category}
                          </span>
                          <h3 className="text-lg font-semibold mb-2 hover:text-civic-blue hover:underline dark:hover:text-civic-blue-dark transition-colors duration-300 line-clamp-2">
                            {issue.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-3 flex items-center">
                            <MapPin size={14} className="mr-1 text-civic-orange dark:text-civic-orange-dark" />
                            {issue.location}
                          </p>
                          <div className="flex justify-between text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <ThumbsUp size={14} className="mr-1 text-civic-blue dark:text-civic-blue-dark" />
                              {issue.votes} votes
                            </span>
                            <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="bg-card dark:bg-card rounded-lg p-8 text-center civic-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-medium mb-2">No issues reported yet</h3>
                <p className="mb-4 text-muted-foreground">Be the first to report an issue in your community!</p>
                <Button 
                  className="bg-civic-blue hover:bg-civic-blue-hover dark:bg-civic-blue-dark dark:hover:bg-opacity-90"
                  asChild
                >
                  <Link to="/report">Report an Issue</Link>
                </Button>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Auth Section */}
        <section id="auth-section" className="py-16 bg-background dark:bg-background" ref={authSectionRef}>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="text-center md:text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold bg-gradient-to-r from-civic-blue to-civic-purple dark:from-civic-blue-dark dark:to-civic-purple-dark bg-clip-text text-transparent">Join Our Community</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Create an account to report issues, track your reports, and make a difference 
                  in your neighborhood.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-civic-green/10 dark:bg-civic-green-dark/10 flex items-center justify-center">
                      <Check size={14} className="text-civic-green dark:text-civic-green-dark" />
                    </div>
                    <span className="ml-2">Track the status of your reported issues</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-civic-green/10 dark:bg-civic-green-dark/10 flex items-center justify-center">
                      <Check size={14} className="text-civic-green dark:text-civic-green-dark" />
                    </div>
                    <span className="ml-2">Receive updates when issues are resolved</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-civic-green/10 dark:bg-civic-green-dark/10 flex items-center justify-center">
                      <Check size={14} className="text-civic-green dark:text-civic-green-dark" />
                    </div>
                    <span className="ml-2">Vote on issues that matter to you</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center h-72">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-civic-blue dark:border-civic-blue-dark"></div>
                  </div>
                ) : user ? (
                  <div className="bg-civic-light dark:bg-card rounded-lg p-8 text-center shadow-card">
                    <div className="w-16 h-16 rounded-full bg-civic-green/15 dark:bg-civic-green-dark/15 text-civic-green dark:text-civic-green-dark mx-auto mb-4 flex items-center justify-center">
                      <Shield size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">You're logged in!</h3>
                    <p className="mb-6 text-muted-foreground">
                      Thank you for being part of our community. You can now report issues 
                      and track their progress.
                    </p>
                    <Button 
                      size="lg" 
                      className="bg-civic-green hover:bg-opacity-90 dark:bg-civic-green-dark dark:hover:bg-opacity-90 transition-all duration-300"
                      asChild
                    >
                      <Link to="/report">Report an Issue</Link>
                    </Button>
                  </div>
                ) : (
                  <AuthForm onSuccess={handleAuthSuccess} />
                )}
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
