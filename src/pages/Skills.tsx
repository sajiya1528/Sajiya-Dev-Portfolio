import React from "react";
import { motion } from "framer-motion";
import { Code, Globe, Database, Cpu } from "lucide-react";
import { SkillSphere } from "../components/SkillSphere";
import { portfolioData } from "../data/portfolioData";

export const Skills: React.FC = () => {
  const { skillCategories } = portfolioData;

  const getCategoryIcon = (categoryTitle: string) => {
    switch (categoryTitle.toLowerCase()) {
      case "programming languages":
        return <Code className="w-5 h-5 text-purple-500" />;
      case "web technologies":
        return <Globe className="w-5 h-5 text-cyan-400" />;
      case "database":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "tools":
        return <Cpu className="w-5 h-5 text-rose-400" />;
      default:
        return <Code className="w-5 h-5 text-purple-500" />;
    }
  };

  const getCategoryGlow = (categoryTitle: string) => {
    switch (categoryTitle.toLowerCase()) {
      case "programming languages":
        return "hover:border-purple-500/50 hover:shadow-purple-500/5";
      case "web technologies":
        return "hover:border-cyan-400/50 hover:shadow-cyan-400/5";
      case "database":
        return "hover:border-emerald-400/50 hover:shadow-emerald-400/5";
      case "tools":
        return "hover:border-rose-400/50 hover:shadow-rose-400/5";
      default:
        return "hover:border-purple-500/50";
    }
  };

  const getPillStyle = (categoryTitle: string) => {
    switch (categoryTitle.toLowerCase()) {
      case "programming languages":
        return "hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-300 hover:border-purple-500/25";
      case "web technologies":
        return "hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-300 hover:border-cyan-500/25";
      case "database":
        return "hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-300 hover:border-emerald-500/25";
      case "tools":
        return "hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-300 hover:border-rose-500/25";
      default:
        return "hover:bg-purple-500/10 hover:text-purple-600 hover:border-purple-500/25";
    }
  };

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#0f172a] relative border-t border-gray-100/30 dark:border-slate-800/50"
    >
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
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
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            My Skills
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F97316] mx-auto mt-3 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left: Cards showing skills lists */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 order-2 lg:order-1">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-5 rounded-2xl glass-panel bg-white/60 dark:bg-slate-900/60 border border-gray-200/50 dark:border-slate-800/60 shadow-sm transition-all duration-300 ${getCategoryGlow(
                  category.title
                )} flex flex-col items-start`}
              >
                {/* Title block */}
                <div className="flex items-center gap-2.5 mb-5 border-b border-gray-100 dark:border-slate-800 pb-3 w-full text-left">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800">
                    {getCategoryIcon(category.title)}
                  </div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm md:text-base tracking-wide uppercase">
                    {category.title}
                  </h3>
                </div>

                {/* Pills list */}
                <div className="flex flex-wrap gap-2.5 w-full">
                  {category.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`px-3.5 py-1.5 rounded-full border border-gray-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 text-xs font-semibold text-gray-600 dark:text-gray-300 transition-all duration-300 ${getPillStyle(
                        category.title
                      )} cursor-default select-none`}
                    >
                      {skill.name}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Interactive 3D Skill Sphere */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[360px] flex flex-col items-center">
              <SkillSphere />
              <div className="text-center mt-3 text-xs text-gray-500 dark:text-gray-400 font-medium font-sans tracking-wider pointer-events-none">
                Drag or hover to rotate
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};
