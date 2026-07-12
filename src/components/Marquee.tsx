import React from "react";
import { portfolioData } from "../data/portfolioData";

export const Marquee: React.FC = () => {
  const techs = portfolioData.techMarquee;

  return (
    <div className="relative w-full overflow-hidden py-8 bg-gray-50/20 dark:bg-gray-950/10 border-y border-gray-200/30 dark:border-gray-800/30 select-none">
      {/* Fade effects on edges */}
      <div className="absolute top-0 bottom-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white dark:from-[#030712] to-transparent z-10 pointer-events-none" />

      {/* Marquee sliding track */}
      <div className="flex w-[200%] overflow-hidden">
        {/* Original Set */}
        <div className="flex justify-around min-w-full gap-6 shrink-0 animate-marquee-infinite">
          {techs.map((tech, i) => (
            <div
              key={`tech-${i}`}
              className="px-5 py-2.5 rounded-full glass-panel dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-800/50 text-xs md:text-sm font-medium tracking-wide text-gray-700 dark:text-gray-300 shadow-sm hover:border-purple-500 dark:hover:border-cyan-400 hover:text-purple-600 dark:hover:text-cyan-400 transition-all duration-300 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
              {tech}
            </div>
          ))}
        </div>

        {/* Duplicate Set for Infinite Loop */}
        <div className="flex justify-around min-w-full gap-6 shrink-0 animate-marquee-infinite" aria-hidden="true">
          {techs.map((tech, i) => (
            <div
              key={`tech-dup-${i}`}
              className="px-5 py-2.5 rounded-full glass-panel dark:bg-gray-900/40 border border-gray-200/50 dark:border-gray-800/50 text-xs md:text-sm font-medium tracking-wide text-gray-700 dark:text-gray-300 shadow-sm hover:border-purple-500 dark:hover:border-cyan-400 hover:text-purple-600 dark:hover:text-cyan-400 transition-all duration-300 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
