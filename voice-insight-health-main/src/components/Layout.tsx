import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Home, History, Info, Shield, Lock, FileText } from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border shadow-health-md"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="bg-gradient-primary p-2.5 rounded-2xl shadow-health-md group-hover:shadow-health-glow transition-all"
              >
                <Activity className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-foreground font-poppins">Voice Health AI</h1>
                <p className="text-xs text-muted-foreground font-inter">Early Detection Assistant</p>
              </div>
            </Link>

            <nav className="flex gap-2">
              <Link to="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium ${
                    isActive("/")
                      ? "bg-primary text-primary-foreground shadow-health-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </motion.button>
              </Link>
              <Link to="/history">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium ${
                    isActive("/history")
                      ? "bg-primary text-primary-foreground shadow-health-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span className="hidden sm:inline">History</span>
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-medium ${
                    isActive("/about")
                      ? "bg-primary text-primary-foreground shadow-health-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  <Info className="w-4 h-4" />
                  <span className="hidden sm:inline">About</span>
                </motion.button>
              </Link>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 py-6 px-8 bg-card/80 backdrop-blur-sm rounded-2xl shadow-health-sm max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            <span className="font-medium text-foreground">AI-Powered</span>
          </div>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <div className="p-2 bg-secondary/10 rounded-lg">
              <Lock className="w-4 h-4 text-secondary" />
            </div>
            <span className="font-medium text-foreground">Privacy Guaranteed</span>
          </div>
          <div className="h-6 w-px bg-border hidden sm:block" />
          <div className="flex items-center gap-2 text-sm">
            <div className="p-2 bg-warning/10 rounded-lg">
              <Shield className="w-4 h-4 text-warning" />
            </div>
            <span className="font-medium text-foreground">Non-Diagnostic</span>
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-block w-2 h-2 bg-secondary rounded-full animate-pulse-soft"></span>
              All processing happens securely with your consent
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <FileText className="w-4 h-4" />
                Terms
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Privacy Policy
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <Info className="w-4 h-4" />
                About Project
              </Link>
            </div>
          </div>
          <p className="text-xs text-center text-muted-foreground">
            This tool is for screening purposes only and does not replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
