import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "../components/Timeline";
import { portfolioData } from "../data/portfolioData";

export const Experience: React.FC = () => {
  return (
    <motion.section
      id="experience"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#0f172a] border-t border-gray-100/30 dark:border-slate-800/50 relative"
    >
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-blue-500/10 dark:bg-blue-400/10 blur-sm pointer-events-none"
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
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            Professional Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F97316] mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            A journey showing internships, skill trainings, academic projects, and self-directed software development paths.
          </p>
        </motion.div>

        {/* Timeline Component wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          <Timeline items={portfolioData.experience} />
        </motion.div>
      </div>
    </motion.section>
  );
};
