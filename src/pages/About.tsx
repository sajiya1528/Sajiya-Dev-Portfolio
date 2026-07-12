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
    <section id="about" className="py-20 px-4 md:px-8 border-t border-gray-100/30 dark:border-gray-900/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header Title */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Professional domain cards */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6 tracking-wide text-left flex items-center gap-2">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              Core Competencies
            </h3>
            
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
                  className="group p-5 rounded-2xl glass-panel bg-white/40 dark:bg-gray-950/20 border border-gray-200/50 dark:border-gray-800/60 hover:border-purple-500/50 dark:hover:border-cyan-400/50 hover:shadow-md transition-all duration-300 flex flex-col items-start text-left"
                >
                  <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-200/40 dark:border-gray-800/40 mb-4 group-hover:scale-110 transition-transform duration-300">
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
            <h3 className="font-display font-bold text-xl text-gray-900 dark:text-white mb-6 tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-6 bg-cyan-500 rounded-full" />
              My Background
            </h3>

            <div className="rounded-2xl glass-panel p-6 border border-gray-200/50 dark:border-gray-800/60 bg-white/30 dark:bg-gray-950/10 mb-8 leading-relaxed text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-4">
                Hi! My name is <strong className="text-gray-900 dark:text-white font-semibold">{personalInfo.fullName}</strong>. I'm a final-year B.Tech student majoring in Artificial Intelligence & Data Science in Hyderabad, India.
              </p>
              <p>
                I developed a deep fascination for full-stack engineering, combining design ethics with robust back-end APIs. I focus on optimizing queries, writing secure middleware, and connecting interactive client-side interfaces to complex AI workflows.
              </p>
            </div>

            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5 tracking-wide flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              Education Timeline
            </h3>

            <div className="relative border-l border-gray-200 dark:border-gray-800 ml-3 space-y-6">
              {educationTimeline.map((edu, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* Timeline dot */}
                  <span className="absolute -left-2 top-1.5 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 border-2 border-white dark:border-[#030712] shadow-sm animate-pulse" />
                  
                  <div className="p-5 rounded-2xl border border-gray-200/50 dark:border-gray-800/60 bg-white/40 dark:bg-gray-950/20 shadow-sm hover:shadow-md transition-shadow">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold text-[9px] uppercase tracking-widest mb-2">
                      {edu.status}
                    </span>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm md:text-base leading-snug">
                      {edu.degree}
                    </h4>
                    <p className="text-xs text-purple-600 dark:text-cyan-400 font-semibold mt-1">
                      {edu.institution}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t border-gray-100 dark:border-gray-900">
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
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
