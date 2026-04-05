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
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/70 dark:bg-[#030712]/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-3 shadow-sm" : "bg-transparent py-6"}`}>
      <div className="container px-4 md:px-8 mx-auto max-w-7xl flex items-center justify-between">

        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl md:text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
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
                `text-sm font-medium transition-colors hover:text-cyan-600 dark:hover:text-cyan-400 ${isActive ? "text-cyan-600 dark:text-cyan-400 font-semibold" : "text-slate-600 dark:text-slate-300"}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <NavLink to="/login" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors px-2">
            Login
          </NavLink>
          <NavLink to="/signup" className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-full font-semibold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-slate-900/20 dark:shadow-white/20 ml-2">
            <Rocket className="w-4 h-4" />
            Get Started
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
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
            className="absolute top-full left-0 right-0 bg-white/95 dark:bg-[#030712]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-xl flex flex-col p-4 gap-4 md:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `p-4 rounded-xl text-base font-medium transition-colors ${isActive ? "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
            <div className="flex flex-col gap-3 pb-4">
              <NavLink to="/login" className="p-4 text-center font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                Login
              </NavLink>
              <NavLink to="/signup" className="p-4 text-center font-semibold bg-gradient-to-r from-cyan-500 to-indigo-500 text-white rounded-xl shadow-md">
                Get Started
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
