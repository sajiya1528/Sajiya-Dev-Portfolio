import React from "react";
import { motion } from "framer-motion";
import { Layout, Server, Database, Code, Palette, Brain, GraduationCap, MapPin, Calendar } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const About: React.FC = () => {
  const { aboutDomainCards, educationTimeline, personalInfo } = portfolioData;

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case "layout":
        return <Layout className="w-5 h-5 text-purple-500" />;
      case "server":
        return <Server className="w-5 h-5 text-cyan-400" />;
      case "database":
        return <Database className="w-5 h-5 text-emerald-400" />;
      case "code":
        return <Code className="w-5 h-5 text-indigo-400" />;
      case "palette":
        return <Palette className="w-5 h-5 text-rose-400" />;
      case "brain":
        return <Brain className="w-5 h-5 text-pink-400" />;
      default:
        return <Code className="w-5 h-5 text-purple-500" />;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.section
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
        {/* Header Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F97316] mx-auto mt-3 rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Professional domain cards */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6 tracking-wide text-left flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#1E3A8A] to-[#F97316] rounded-full" />
              Core Competencies
            </motion.h3>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {aboutDomainCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  variants={cardVariants}
                  className="group p-5 rounded-2xl glass-panel bg-white/60 dark:bg-slate-900/60 border border-gray-200/50 dark:border-slate-800/60 hover:border-blue-500/50 dark:hover:border-blue-500/30 hover:shadow-lg dark:hover:shadow-blue-500/5 transition-all duration-300 flex flex-col items-start text-left"
                >
                  <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200/40 dark:border-slate-700/40 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {getCardIcon(card.icon)}
                  </div>
                  <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm md:text-base tracking-wide">
                    {card.title}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Bio details + Timeline-style Education Card */}
          <div className="lg:col-span-6 flex flex-col text-left">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6 tracking-wide flex items-center gap-2"
            >
              <span className="w-1.5 h-6 bg-gradient-to-b from-[#F97316] to-[#1E3A8A] rounded-full" />
              My Background
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl glass-panel p-6 border border-gray-200/50 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/30 mb-8 leading-relaxed text-sm text-gray-600 dark:text-gray-300"
            >
              <p className="mb-4">
                Hi! My name is <strong className="text-gray-900 dark:text-white font-semibold">{personalInfo.fullName}</strong>. I'm a final-year B.Tech student majoring in Artificial Intelligence & Data Science in Hyderabad, India.
              </p>
              <p>
                I developed a deep fascination for full-stack engineering, combining design ethics with robust back-end APIs. I focus on optimizing queries, writing secure middleware, and connecting interactive client-side interfaces to complex AI workflows.
              </p>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5 tracking-wide flex items-center gap-2"
            >
              <GraduationCap className="w-5 h-5 text-[#1E3A8A]" />
              Education Timeline
            </motion.h3>

            <div className="relative border-l border-gray-200 dark:border-slate-800 ml-3 space-y-6">
              {educationTimeline.map((edu, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-6"
                >
                  {/* Timeline dot */}
                  <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#F97316] border-2 border-white dark:border-[#0f172a] shadow-sm" />

                  <div className="p-5 rounded-2xl border border-gray-200/50 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/20 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 font-bold text-[9px] uppercase tracking-widest mb-2">
                      {edu.status}
                    </span>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm md:text-base leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-[#1E3A8A] dark:text-[#F97316] font-semibold mt-1">
                      {edu.institution}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-slate-800">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-3 leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};
