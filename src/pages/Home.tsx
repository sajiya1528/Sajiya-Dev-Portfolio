import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Home: React.FC = () => {
  const { roles, fullName, bio } = portfolioData.personalInfo;
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);

  // Rotate hero titles/roles every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles]);

  const handleHireMeClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dot-grid"
    >
      {/* Premium Floating Ambient Blob Orbs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-blue-600/10 dark:bg-blue-500/15 blur-[80px] animate-float-slow -z-10" />
      <div className="absolute bottom-[25%] right-[15%] w-80 h-80 rounded-full bg-orange-500/10 dark:bg-orange-400/15 blur-[90px] animate-float-medium -z-10" />
      <div className="absolute top-[50%] left-[45%] w-60 h-60 rounded-full bg-slate-500/5 dark:bg-slate-400/10 blur-[70px] animate-float-fast -z-10" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Copywriting Content */}
        <div className="lg:col-span-7 text-left order-2 lg:order-1 flex flex-col justify-center">
          
          {/* Sparkle Greeting tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/10 dark:bg-blue-500/15 border border-blue-600/20 w-fit text-xs font-semibold text-blue-700 dark:text-blue-300 tracking-wider mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#1E3A8A] animate-spin-slow" />
            <span>HELLO WORLD, WELCOME TO MY SPACE</span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I'm{" "}
            <span className="text-gradient font-extrabold select-all">
              {fullName}
            </span>
          </motion.h1>

          {/* Sliding Roles Display */}
          <div className="h-14 sm:h-16 flex items-center mt-3 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoleIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-xl sm:text-2xl md:text-3xl font-display font-medium text-gray-700 dark:text-orange-300 tracking-wide text-left"
              >
                {roles[currentRoleIdx]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtext description */}
          <motion.p
            className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {bio}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button
              onClick={handleHireMeClick}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#F97316] text-white font-bold text-sm tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/20 dark:shadow-orange-500/10 cursor-pointer"
            >
              Got a Project?
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <a
              href={portfolioData.personalInfo.resumeUrl}
              download
              className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-[#1E3A8A] dark:hover:border-[#F97316] text-gray-700 dark:text-gray-300 font-semibold text-sm tracking-wider flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-900/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* Right Side: Circular Glowing Profile wrapper */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Ambient Pulse circle glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#1E3A8A] to-[#F97316] opacity-20 filter blur-xl animate-float-medium" />

            {/* Inner moving border wrap */}
            <div className="w-full h-full rounded-full p-[3px] bg-gradient-to-r from-[#1E3A8A] via-[#2563EB] to-[#F97316] animate-spin-slow shadow-xl">
              
              {/* Profile Image container card */}
              <div className="w-full h-full rounded-full bg-white dark:bg-[#f5faff] overflow-hidden flex items-center justify-center relative">
                
                {/* Visual backdrop geometric vectors */}
                <div className="absolute inset-0 bg-dot-grid opacity-30" />
                
                {/* Profile Placeholder Image */}
                <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-gray-100 to-gray-200/50 dark:from-gray-900 dark:to-[#0d1321] border border-gray-200 dark:border-gray-800 shadow-inner flex flex-col items-center justify-center text-center p-4 relative z-10 hover:scale-105 transition-transform duration-300">
                  <span className="font-display font-bold text-gray-400 dark:text-gray-500 text-sm mb-1">
                    PROFILE PICTURE
                  </span>
                  <span className="text-[10px] text-[#1E3A8A] dark:text-[#F97316] font-medium tracking-wide">
                    Click to replace in code
                  </span>
                </div>
              </div>
            </div>

            {/* Micro Floating particle elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-6 h-6 rounded-full bg-blue-600/25 border border-blue-600/40 blur-xs"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-2 -left-6 w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/30 blur-xs"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
