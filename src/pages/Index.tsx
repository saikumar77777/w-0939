
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
import { getDailyImage } from "@/utils/getDynamicImage";

const HERO_IMAGE_URL = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop";

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
        <section className="relative overflow-hidden py-20 md:py-28 lg:py-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="text-center md:text-left"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="inline-block mb-4 px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-full text-sm font-medium">
                  <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    💡 Your community, your voice
                  </motion.span>
                </div>
                
                <motion.h1 
                  className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-primary via-primary/80 to-blue-600 dark:from-primary dark:to-blue-400 bg-clip-text text-transparent">Report civic issues</span> in your community
                </motion.h1>
                
                <motion.p 
                  className="mt-4 text-lg text-muted-foreground max-w-md mx-auto md:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  CivicSync connects citizens with local authorities to resolve problems 
                  and improve neighborhoods together.
                </motion.p>
                
                <motion.div 
                  className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 transition-all duration-300 group relative overflow-hidden"
                    asChild
                  >
                    <Link to="/report">
                      <span className="relative z-10">Report an Issue</span>
                      <ArrowRight className="relative z-10 ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      
                      {/* Button highlight effect */}
                      <motion.div
                        className="absolute inset-0 bg-white opacity-0"
                        whileHover={{ opacity: 0.2 }}
                        transition={{ duration: 0.2 }}
                      />
                      
                      {/* Button gradient underline effect */}
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-white/0 via-white/80 to-white/0"
                        initial={{ scaleX: 0, opacity: 0 }}
                        whileHover={{ scaleX: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-primary text-primary hover:bg-primary/10 dark:border-primary dark:text-primary dark:hover:bg-primary/10 group relative overflow-hidden"
                    asChild
                  >
                    <Link to="/issues">
                      <span>Browse Issues</span>
                      
                      {/* Button highlight effect */}
                      <motion.div
                        className="absolute inset-0 bg-primary opacity-0"
                        whileHover={{ opacity: 0.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
              
              <motion.div 
                className="relative mx-auto w-full max-w-md"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {/* Decorative elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full blur-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
                
                <motion.div 
                  className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary/10 dark:bg-secondary/20 rounded-full blur-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                />
                
                {/* Card with image */}
                <motion.div
                  className="relative bg-card dark:bg-card rounded-2xl overflow-hidden shadow-2xl"
                  whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent opacity-30 mix-blend-overlay"></div>
                  
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <motion.img 
                      src={HERO_IMAGE_URL}
                      alt="Community engagement" 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Status indicator */}
                    <div className="absolute top-4 right-4">
                      <StatusBadge status="resolved" size="md" animate />
                    </div>
                    
                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center mb-2">
                        <div className="p-1 rounded-full bg-amber-500/10 mr-2">
                          <CategoryIcon category="infrastructure" size={16} />
                        </div>
                        <span className="text-xs font-medium text-amber-200">Infrastructure</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-1">Community Center Renovation</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-white/80 text-sm">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          <span>Downtown Plaza</span>
                        </div>
                        <div className="flex items-center bg-white/20 rounded-full px-2 py-0.5">
                          <ThumbsUp className="w-3 h-3 mr-1 text-white/90" />
                          <span className="text-xs font-medium text-white/90">24</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating info cards */}
                <motion.div
                  className="absolute -top-10 -right-10 bg-card dark:bg-card rounded-lg p-3 shadow-lg border border-border/50"
                  initial={{ opacity: 0, y: 20, rotate: 5 }}
                  animate={{ opacity: 1, y: 0, rotate: 5 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                      <Check className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold">Issues Resolved</p>
                      <p className="text-lg font-bold">1,234</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-card dark:bg-card rounded-lg p-3 shadow-lg border border-border/50"
                  initial={{ opacity: 0, y: -20, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: -5 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                      <ThumbsUp className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold">Active Citizens</p>
                      <p className="text-lg font-bold">5,678</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dot-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect x="0" y="0" width="100%" height="100%" fill="url(#dot-pattern)" />
            </svg>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block mb-2 px-4 py-1.5 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary rounded-full text-sm font-medium">
                Simple Process
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading">How It Works</h2>
              <div className="mt-2 h-1 w-24 bg-gradient-to-r from-primary to-secondary dark:from-primary dark:to-secondary mx-auto rounded-full"></div>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
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
                className="flex flex-col items-center text-center relative z-10"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 shine-effect relative z-10">
                    <Megaphone className="h-10 w-10 text-primary dark:text-primary" />
                  </div>
                  <div className="absolute w-full h-full top-3 left-3 bg-primary/5 dark:bg-primary/10 rounded-2xl -z-0"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card shadow-lg border border-border flex items-center justify-center font-bold text-lg">1</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Submit Your Report</h3>
                <p className="text-muted-foreground">
                  Fill out a simple form with details about the issue you've noticed in your community.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center relative z-10"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center mb-4 shine-effect relative z-10">
                    <MapPin className="h-10 w-10 text-accent dark:text-accent" />
                  </div>
                  <div className="absolute w-full h-full top-3 left-3 bg-accent/5 dark:bg-accent/10 rounded-2xl -z-0"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card shadow-lg border border-border flex items-center justify-center font-bold text-lg">2</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
                <p className="text-muted-foreground">
                  Follow updates as your issue is received, reviewed, and addressed by local authorities.
                </p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col items-center text-center relative z-10"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center mb-4 shine-effect relative z-10">
                    <Check className="h-10 w-10 text-secondary dark:text-secondary" />
                  </div>
                  <div className="absolute w-full h-full top-3 left-3 bg-secondary/5 dark:bg-secondary/10 rounded-2xl -z-0"></div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-card shadow-lg border border-border flex items-center justify-center font-bold text-lg">3</div>
                </div>
                <h3 className="text-xl font-semibold mb-3">Problem Solved</h3>
                <p className="text-muted-foreground">
                  See real results as issues are resolved, improving quality of life in your neighborhood.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>
        
        {/* Recent Issues Preview */}
        <section className="py-20 bg-muted/30 dark:bg-muted/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-muted/50 dark:from-transparent dark:to-muted/20"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className="inline-block mb-2 px-4 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary rounded-full text-sm font-medium">
                  Community Activity
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading">Recent Issues</h2>
                <p className="mt-2 text-muted-foreground">See what's happening in your community</p>
              </div>
              
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 dark:border-primary dark:text-primary dark:hover:bg-primary/10 min-w-[140px] relative overflow-hidden group"
                asChild
              >
                <Link to="/issues">
                  <span className="relative z-10">View All Issues</span>
                  <motion.span 
                    className="absolute inset-0 bg-primary"
                    initial={{ x: "-100%", opacity: 0.1 }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </Link>
              </Button>
            </motion.div>
            
            {isLoadingIssues ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <motion.div 
                    key={i}
                    className="bg-card dark:bg-card rounded-xl shadow-lg overflow-hidden border border-border/50 h-[460px]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="h-48 bg-muted dark:bg-muted animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-6 bg-muted dark:bg-muted rounded-full w-24 animate-pulse mb-4"></div>
                      <div className="h-8 bg-muted dark:bg-muted rounded-lg w-3/4 animate-pulse mb-4"></div>
                      <div className="h-4 bg-muted dark:bg-muted rounded-lg w-1/2 animate-pulse mb-4"></div>
                      <div className="h-20 bg-muted dark:bg-muted rounded-lg animate-pulse mb-4"></div>
                      <div className="flex justify-between text-sm">
                        <div className="h-8 bg-muted dark:bg-muted rounded-lg w-24 animate-pulse"></div>
                        <div className="h-8 bg-muted dark:bg-muted rounded-lg w-20 animate-pulse"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : recentIssues.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recentIssues.map((issue, index) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/issues/${issue.id}`} className="block h-full">
                      <motion.div 
                        className="bg-card dark:bg-card rounded-xl overflow-hidden border border-border/50 shadow-lg h-full transition-all duration-500 group relative"
                        whileHover={{ 
                          y: -8,
                          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)" 
                        }}
                      >
                        <div className="h-52 bg-muted dark:bg-muted relative overflow-hidden">
                          {issue.imageUrl ? (
                            <>
                              <motion.img 
                                src={issue.imageUrl} 
                                alt={issue.title} 
                                className="w-full h-full object-cover"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.8 }}
                              />
                              <motion.div 
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                              />
                            </>
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50 dark:from-muted dark:to-muted/80">
                              <motion.div
                                initial={{ y: 0 }}
                                whileHover={{ y: -10 }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                              >
                                <CategoryIcon category={issue.category} size={60} withBackground />
                              </motion.div>
                            </div>
                          )}
                          
                          {/* Status Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <StatusBadge status={issue.status} size="md" animate />
                          </div>
                          
                          {/* Category Pill */}
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-white/90 dark:bg-black/50 backdrop-blur-sm">
                                <CategoryIcon category={issue.category} size={14} className="mr-1 text-primary" />
                                <span className="capitalize">{issue.category}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {issue.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {issue.description || "No description provided for this issue."}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin size={14} className="mr-1 text-accent dark:text-accent" />
                              <span className="truncate max-w-[150px]">{issue.location}</span>
                            </div>
                            
                            <div className="flex items-center bg-muted/80 dark:bg-muted/40 rounded-full px-2.5 py-1">
                              <ThumbsUp size={14} className="mr-1 text-primary dark:text-primary" />
                              <span className="text-sm font-medium">{issue.votes}</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Hover indicator */}
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="bg-card dark:bg-card rounded-xl p-8 text-center border border-border/50 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/60 dark:bg-muted/40 flex items-center justify-center">
                  <Megaphone className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">No issues reported yet</h3>
                <p className="mb-6 text-muted-foreground max-w-md mx-auto">Be the first to report an issue in your community and start making a difference!</p>
                <Button 
                  className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 py-6 px-8 rounded-xl font-medium text-lg"
                  asChild
                >
                  <Link to="/report" className="inline-flex items-center">
                    Report an Issue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </section>
        
        {/* Auth Section */}
        <section id="auth-section" className="py-20 relative overflow-hidden" ref={authSectionRef}>
          <div className="absolute inset-0 opacity-10">
            <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wave-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M0,50 Q25,40 50,50 T100,50 T150,50 T200,50" stroke="currentColor" fill="none" strokeWidth="2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wave-pattern)" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="text-center md:text-left"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block mb-2 px-4 py-1.5 bg-secondary/10 dark:bg-secondary/20 text-secondary dark:text-secondary rounded-full text-sm font-medium">
                  Join Our Platform
                </div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 bg-gradient-to-r from-primary via-accent to-secondary dark:from-primary dark:via-accent dark:to-secondary bg-clip-text text-transparent">
                  Be Part of the Solution
                </h2>
                <p className="text-lg text-muted-foreground">
                  Create an account to report issues, track your reports, and make a difference 
                  in your neighborhood.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    "Track the status of your reported issues",
                    "Receive updates when issues are resolved",
                    "Vote on issues that matter to you",
                    "Engage with your local community"
                  ].map((item, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                    >
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-secondary/10 dark:bg-secondary/20 flex items-center justify-center mt-0.5">
                        <Check size={14} className="text-secondary dark:text-secondary" />
                      </div>
                      <span className="ml-3">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                {/* Decorative elements */}
                <div className="absolute -top-8 -right-8 w-40 h-40 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-secondary/5 dark:bg-secondary/10 rounded-full blur-3xl"></div>
                
                <div className="relative">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-96 bg-card dark:bg-card rounded-2xl border border-border/50 shadow-lg">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full border-4 border-muted border-t-primary animate-spin mb-4"></div>
                        <p className="text-muted-foreground">Loading...</p>
                      </div>
                    </div>
                  ) : user ? (
                    <motion.div 
                      className="bg-card dark:bg-card rounded-2xl p-10 text-center shadow-lg border border-border/50 relative overflow-hidden"
                      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-secondary"></div>
                      
                      <div className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-secondary/20 p-2 relative">
                        <div className="w-full h-full rounded-full bg-secondary/15 dark:bg-secondary/25 text-secondary dark:text-secondary flex items-center justify-center">
                          <Shield size={40} />
                        </div>
                        <motion.div 
                          className="absolute inset-0 rounded-full border-4 border-secondary opacity-0"
                          animate={{ 
                            opacity: [0, 0.2, 0], 
                            scale: [1, 1.2, 1] 
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-2 text-foreground">Welcome Back!</h3>
                      <p className="text-lg mb-2 text-muted-foreground">
                        You're successfully logged in
                      </p>
                      <p className="mb-8 text-muted-foreground">
                        Thank you for being part of our community. You can now report issues 
                        and track their progress.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                          size="lg" 
                          className="bg-secondary hover:bg-secondary/90 dark:bg-secondary dark:hover:bg-secondary/90 transition-all duration-300 group relative overflow-hidden"
                          asChild
                        >
                          <Link to="/report">
                            <span className="relative z-10">Report an Issue</span>
                            <motion.div
                              className="absolute inset-0 bg-white opacity-0"
                              whileHover={{ opacity: 0.2 }}
                              transition={{ duration: 0.2 }}
                            />
                          </Link>
                        </Button>
                        
                        <Button 
                          size="lg"
                          variant="outline"
                          className="border-secondary text-secondary hover:bg-secondary/10 dark:border-secondary dark:text-secondary dark:hover:bg-secondary/10"
                          asChild
                        >
                          <Link to="/my-issues">My Reports</Link>
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="bg-card dark:bg-card rounded-2xl border border-border/50 shadow-lg overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
                      <AuthForm onSuccess={handleAuthSuccess} />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
