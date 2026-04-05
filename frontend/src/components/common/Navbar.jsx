import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import { Menu, X, Rocket, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Questionnaire", to: "/questionnaire" },
  { label: "Roadmaps", to: "/roadmap" },
  { label: "Dashboard", to: "/dashboard" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3" : "bg-transparent py-5"}`}>
      <div className="container px-4 mx-auto max-w-6xl flex items-center justify-between">

        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            your_Advisor
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors hover:text-primary ${isActive ? "text-primary dark:text-accent font-semibold" : "text-gray-600 dark:text-gray-300"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <NavLink to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
            Login
          </NavLink>
          <NavLink to="/signup" className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background dark:bg-white dark:text-black rounded-full font-medium text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-black/10 dark:shadow-white/10">
            <Rocket className="w-4 h-4" />
            Get Started
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-card border-x-0 border-t-0 rounded-b-2xl shadow-xl flex flex-col p-4 gap-4 md:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `p-3 rounded-xl text-base font-medium transition-colors ${isActive ? "bg-primary/10 text-primary dark:text-accent" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="h-px bg-border my-2" />
            <div className="flex flex-col gap-3">
              <NavLink to="/login" className="p-3 text-center font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                Login
              </NavLink>
              <NavLink to="/signup" className="p-3 text-center font-medium bg-gradient-to-r from-primary to-accent text-white rounded-xl shadow-md">
                Get Started
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
