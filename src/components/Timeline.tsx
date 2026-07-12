import React from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, BookOpen, Calendar } from "lucide-react";
import type { ExperienceItem } from "../data/portfolioData";

interface TimelineProps {
  items: ExperienceItem[];
}

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case "internship":
        return <Briefcase className="w-5 h-5 text-purple-500" />;
      case "training":
        return <GraduationCap className="w-5 h-5 text-cyan-400" />;
      case "project":
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      case "education":
        return <BookOpen className="w-5 h-5 text-rose-400" />;
      default:
        return <Briefcase className="w-5 h-5 text-purple-500" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case "internship":
        return "border-purple-500/30 group-hover:border-purple-500";
      case "training":
        return "border-cyan-500/30 group-hover:border-cyan-400";
      case "project":
        return "border-emerald-500/30 group-hover:border-emerald-400";
      case "education":
        return "border-rose-500/30 group-hover:border-rose-400";
      default:
        return "border-purple-500/30 group-hover:border-purple-500";
    }
  };

  const getGlowBg = (type: string) => {
    switch (type) {
      case "internship":
        return "bg-purple-500/10 dark:bg-purple-500/20";
      case "training":
        return "bg-cyan-500/10 dark:bg-cyan-500/20";
      case "project":
        return "bg-emerald-500/10 dark:bg-emerald-500/20";
      case "education":
        return "bg-rose-500/10 dark:bg-rose-500/20";
      default:
        return "bg-purple-500/10";
    }
  };

  // Container motion parameters for staggered child reveals
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="relative max-w-4xl mx-auto px-2">
      {/* Central continuous glowing line */}
      <div className="absolute left-8 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-400 to-rose-400 opacity-30" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-10"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id || index}
            variants={itemVariants}
            className="group relative flex gap-8 items-start"
          >
            {/* Timeline Node Icon Pin */}
            <div className="relative z-10 flex items-center justify-center shrink-0">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-md bg-white dark:bg-[#080d16] transition-all duration-300 group-hover:scale-110 ${getBorderColor(
                  item.type
                )}`}
              >
                {getIcon(item.type)}
              </div>
              
              {/* Outer halo pulsing circle on active element */}
              <div
                className={`absolute inset-0 rounded-xl filter blur-md -z-10 opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${getGlowBg(
                  item.type
                )}`}
              />
            </div>

            {/* Timeline Experience Card */}
            <div
              className={`flex-grow rounded-2xl glass-panel p-5 md:p-6 bg-white/40 dark:bg-gray-950/20 border border-gray-200/50 dark:border-gray-800/60 hover:shadow-lg dark:hover:shadow-purple-500/2 transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                <div>
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-base md:text-lg tracking-wide group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-purple-600 dark:text-cyan-400 mt-0.5">
                    {item.company}
                  </p>
                </div>
                
                {/* Duration & Date pill */}
                <div className="flex items-center gap-1.5 self-start md:self-center bg-gray-100 dark:bg-gray-900 border border-gray-200/40 dark:border-gray-800/40 px-3 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.duration}</span>
                </div>
              </div>

              {/* Descriptions bullet list */}
              <ul className="space-y-2.5 text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed list-none text-left">
                {item.description.map((bullet, idx) => (
                  <li key={idx} className="flex gap-2 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shrink-0 mt-1.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
