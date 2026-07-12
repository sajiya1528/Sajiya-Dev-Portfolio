import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { portfolioData } from "../data/portfolioData";
import { cn } from "../lib/utils";

const FILTER_TABS = ["All", "Frontend", "Full Stack", "AI", "React"];

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const projects = portfolioData.projects;

  // Filter projects by active tab
  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    
    const formattedTab = activeTab.toLowerCase().replace(" ", "");
    return project.category.toLowerCase() === formattedTab;
  });

  return (
    <section id="projects" className="py-20 px-4 md:px-8 bg-gray-50/20 dark:bg-gray-950/5 border-t border-gray-100/30 dark:border-gray-900/30 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            My Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed text-center">
            A showcase of some of my development works, MERN full-stack systems, and Artificial Intelligence integrations.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-lg mx-auto">
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2 text-xs font-semibold rounded-full tracking-wide transition-colors border select-none cursor-pointer",
                  isActive
                    ? "text-purple-600 dark:text-cyan-400 border-purple-500/30 dark:border-cyan-500/30"
                    : "text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-gray-800/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-900/30"
                )}
              >
                <span className="relative z-10">{tab}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-purple-500/10 dark:bg-cyan-500/10 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Projects Grid Container with AnimatePresence */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No projects found under this category.
          </div>
        )}

      </div>
    </section>
  );
};
