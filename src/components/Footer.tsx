import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/70 dark:border-slate-800 bg-white/90 dark:bg-[#111827] py-8 px-4 relative z-10 shadow-[0_-12px_40px_rgba(15,23,42,0.04)] dark:shadow-[0_-12px_40px_rgba(0,0,0,0.3)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Left — Hexagon Logo + Brand */}
        <div className="flex items-center gap-3">
          <div className="hexagon w-9 h-9 bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] flex items-center justify-center shadow-md shadow-blue-900/15 shrink-0">
            <span className="font-display font-extrabold text-white text-xs tracking-widest">
              {portfolioData.personalInfo.logo}
            </span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-bold text-[#1E3A8A] dark:text-white tracking-wider text-sm">
              {portfolioData.personalInfo.fullName}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-slate-500 font-medium">
              © {currentYear} Sajiya Nazir. All rights reserved.
            </span>
          </div>
        </div>

        {/* Center — Credits */}
        <p className="text-xs text-gray-400 dark:text-slate-500 font-medium text-center">
          Made with <span className="text-[#F97316]">♥</span> using React 18 + TypeScript + Tailwind CSS
        </p>

        {/* Right — Social Icons */}
        <div className="flex items-center gap-2">
          <a
            href={portfolioData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-[#F97316] hover:border-[#1E3A8A] dark:hover:border-[#F97316] hover:bg-blue-50 dark:hover:bg-orange-500/10 transition-all duration-200 shadow-sm"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={portfolioData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 hover:text-[#1E3A8A] dark:hover:text-[#F97316] hover:border-[#1E3A8A] dark:hover:border-[#F97316] hover:bg-blue-50 dark:hover:bg-orange-500/10 transition-all duration-200 shadow-sm"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 text-gray-500 dark:text-gray-400 hover:text-[#F97316] dark:hover:text-[#F97316] hover:border-[#F97316] hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200 shadow-sm backdrop-blur-sm"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};
