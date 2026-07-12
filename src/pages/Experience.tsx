import React from "react";
import { Timeline } from "../components/Timeline";
import { portfolioData } from "../data/portfolioData";

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-20 px-4 md:px-8 border-t border-gray-100/30 dark:border-gray-900/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            Professional Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            A journey showing internships, skill trainings, academic projects, and self-directed software development paths.
          </p>
        </div>

        {/* Timeline Component wrapper */}
        <div className="mt-8">
          <Timeline items={portfolioData.experience} />
        </div>
      </div>
    </section>
  );
};
