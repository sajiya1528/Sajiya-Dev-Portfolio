import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import profilePic from "../assets/sajiya portfoilio logo.jpeg";

const ALL_SKILLS = [
  ...portfolioData.skillCategories.flatMap(cat => cat.skills.map(s => s.name))
];

const SKILL_COLORS = [
  "bg-blue-500/10 text-blue-600 dark:text-blue-300 border-blue-500/20 dark:border-blue-500/30",
  "bg-orange-500/10 text-orange-600 dark:text-orange-300 border-orange-500/20 dark:border-orange-500/30",
  "bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20 dark:border-purple-500/30",
  "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/20 dark:border-cyan-500/30",
  "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20 dark:border-emerald-500/30",
];

export const Home: React.FC = () => {
  const { roles, fullName, bio } = portfolioData.personalInfo;
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);

  const skillPositions = useMemo(() => {
    return ALL_SKILLS.map((_, i) => {
      const angle = (i / ALL_SKILLS.length) * Math.PI * 2;
      const seed = i * 137.508;
      const radiusX = 35 + ((seed % 100) / 100) * 15;
      const radiusY = 18 + (((seed * 2) % 100) / 100) * 8;
      const centerX = 50;
      const centerY = 50;
      const x = centerX + Math.cos(angle) * radiusX;
      const y = centerY + Math.sin(angle) * radiusY;
      const duration = 3 + ((seed * 3) % 100) / 100 * 3;
      const delay = ((seed * 5) % 100) / 100 * 2;
      const yOffset = 10 + ((seed * 7) % 100) / 100 * 10;
      const xOffset = ((seed * 11) % 100) / 100 * 10 - 5;
      return { x, y, duration, delay, yOffset, xOffset };
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIdx((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-dot-grid"
    >
      {/* Floating Ambient Blob Orbs */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-blue-600/10 dark:bg-blue-500/15 blur-[80px] animate-float-slow -z-10" />
      <div className="absolute bottom-[25%] right-[15%] w-80 h-80 rounded-full bg-orange-500/10 dark:bg-orange-400/15 blur-[90px] animate-float-medium -z-10" />
      <div className="absolute top-[50%] left-[45%] w-60 h-60 rounded-full bg-slate-500/5 dark:bg-slate-400/10 blur-[70px] animate-float-fast -z-10" />

      {/* Floating Background Particles */}
      {[...Array(12)].map((_, i) => {
        const seed = i * 137.508;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/20 dark:bg-blue-400/20 blur-sm pointer-events-none"
            style={{
              width: 2 + ((seed % 100) / 100) * 4,
              height: 2 + ((seed % 100) / 100) * 4,
              left: `${(seed * 3) % 100}%`,
              top: `${(seed * 7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, ((seed * 11) % 100) / 100 * 20 - 10, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + ((seed * 13) % 100) / 100 * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: ((seed * 17) % 100) / 100 * 2,
            }}
          />
        );
      })}

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
            <Link
              to="/projects"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#F97316] text-white font-bold text-sm tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-900/20 dark:shadow-orange-500/10 cursor-pointer"
            >
              Got a Project?
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={portfolioData.personalInfo.resumeUrl}
              download
              className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#1E3A8A] dark:hover:border-[#F97316] text-gray-700 dark:text-gray-300 font-semibold text-sm tracking-wider flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800/40 hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
              <div className="w-full h-full rounded-full bg-white dark:bg-[#1e293b] overflow-hidden flex items-center justify-center relative">

                {/* Visual backdrop geometric vectors */}
                <div className="absolute inset-0 bg-dot-grid opacity-30" />

                {/* Profile Image */}
                <img
                  src={profilePic}
                  alt="Sajiya Nazir"
                  className="w-[85%] h-[85%] rounded-full object-cover relative z-10 hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />

                {/* Fallback if image doesn't load */}
                <div className="hidden absolute inset-0 flex items-center justify-center">
                  <span className="font-display font-bold text-gray-400 dark:text-gray-500 text-sm">
                    SN
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

        {/* Floating Skill Badges Below Profile */}
        <div className="lg:col-span-12 flex justify-center mt-8 lg:mt-12 order-3">
          <div className="relative w-full max-w-2xl h-32">
            {ALL_SKILLS.map((skill, i) => {
              const pos = skillPositions[i];
              return (
                <motion.div
                  key={skill}
                  className={`absolute px-3 py-1 rounded-full border text-[10px] md:text-xs font-semibold backdrop-blur-sm whitespace-nowrap ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    y: [0, -pos.yOffset, 0],
                    x: [0, pos.xOffset, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                >
                  {skill}
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
