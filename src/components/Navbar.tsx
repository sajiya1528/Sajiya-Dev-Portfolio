import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Linkedin, Github } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { portfolioData } from "../data/portfolioData";
import { cn } from "../lib/utils";

const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "skills", label: "Skills", path: "/skills" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "certifications", label: "Certifications", path: "/certifications" },
  { id: "contact", label: "Contact", path: "/contact" },
];

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getActiveId = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/about") return "about";
    if (path === "/skills") return "skills";
    if (path === "/experience") return "experience";
    if (path === "/projects") return "projects";
    if (path === "/certifications") return "certifications";
    if (path === "/contact") return "contact";
    return "";
  };

  const activeId = getActiveId();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 md:px-8",
          isScrolled
            ? "bg-white/80 dark:bg-[#111827]/95 backdrop-blur-2xl border-b border-slate-200/70 dark:border-blue-900/20 shadow-[0_10px_35px_rgba(15,23,42,0.08)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)] py-2"
            : "bg-transparent py-3"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">

          {/* Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-10 h-10 shrink-0">
              <div className="hexagon w-10 h-10 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] group-hover:from-[#F97316] group-hover:to-[#1E3A8A] transition-all duration-500 flex items-center justify-center shadow-lg shadow-blue-900/20 dark:shadow-orange-500/10">
                <span className="font-display font-extrabold text-white text-sm tracking-widest">
                  {portfolioData.personalInfo.logo}
                </span>
              </div>
            </div>
            <span className="font-display font-bold text-[#1E3A8A] dark:text-white tracking-wider text-sm md:text-base leading-none group-hover:text-[#F97316] dark:group-hover:text-[#F97316] transition-colors duration-300">
              {portfolioData.personalInfo.fullName}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-0.5 bg-white/70 dark:bg-slate-900/80 p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_24px_rgba(15,23,42,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.25)] relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn(
                    "relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer",
                    isActive
                      ? "text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-white"
                  )}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#F97316] rounded-full shadow-md shadow-blue-900/10 dark:shadow-blue-900/30"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right-side Icons */}
          <div className="flex items-center gap-1">
            <Link
              to={portfolioData.personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-[#F97316] hover:bg-blue-50 dark:hover:bg-[#1E3A8A]/20 transition-all duration-200 backdrop-blur-sm"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </Link>

            <Link
              to={portfolioData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-[#F97316] hover:bg-blue-50 dark:hover:bg-[#1E3A8A]/20 transition-all duration-200 backdrop-blur-sm"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#F97316] dark:hover:text-[#F97316] hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200 cursor-pointer backdrop-blur-sm"
              aria-label="Toggle Theme"
            >
              {theme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />
              }
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#111827] transition-colors cursor-pointer ml-1"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-[72px] right-4 left-4 rounded-2xl overflow-hidden shadow-2xl border border-blue-900/10 dark:border-blue-900/20 bg-white dark:bg-[#111827] p-4 flex flex-col gap-1"
              initial={{ scale: 0.95, y: -16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -16, opacity: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer",
                      isActive
                        ? "bg-[#1E3A8A]/10 dark:bg-[#2563EB]/20 text-[#1E3A8A] dark:text-white border-l-[3px] border-[#1E3A8A]"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1E293B] hover:text-[#1E3A8A] dark:hover:text-white"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <div className="flex items-center gap-3 px-4 pt-3 mt-1 border-t border-gray-100 dark:border-gray-800">
                <Link to={portfolioData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-[#F97316] hover:bg-blue-50 dark:hover:bg-[#1E3A8A]/20 transition-all backdrop-blur-sm"
                  aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </Link>
                <Link to={portfolioData.personalInfo.github} target="_blank" rel="noopener noreferrer"
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-[#F97316] hover:bg-blue-50 dark:hover:bg-[#1E3A8A]/20 transition-all backdrop-blur-sm"
                  aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </Link>
                <button onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-[#F97316] hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all cursor-pointer backdrop-blur-sm"
                  aria-label="Toggle Theme">
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
