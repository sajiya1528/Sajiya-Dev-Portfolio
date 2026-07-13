import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { portfolioData } from "../data/portfolioData";
import { cn } from "../lib/utils";

const FILTER_TABS = ["All", "Frontend", "Full Stack", "AI", "React"];

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const projects = portfolioData.projects;

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "All") return true;
    const formattedTab = activeTab.toLowerCase().replace(" ", "");
    return project.category.toLowerCase() === formattedTab;
  });

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#0f172a] border-t border-gray-100/30 dark:border-slate-800/50 relative"
    >
      {/* Floating particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-500/10 dark:bg-orange-400/10 blur-sm pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: Math.random() * 3 + 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            My Projects
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F97316] mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed text-center">
            A showcase of some of my development works, MERN full-stack systems, and Artificial Intelligence integrations.
          </p>
        </motion.div>

        {/* Filter Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-lg mx-auto"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2 text-xs font-semibold rounded-full tracking-wide transition-colors border select-none cursor-pointer",
                  isActive
                    ? "text-white border-[#1E3A8A] dark:border-[#2563EB]"
                    : "text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-slate-800/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900/30"
                )}
              >
                <span className="relative z-10">{tab}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

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
    </motion.section>
  );
};
