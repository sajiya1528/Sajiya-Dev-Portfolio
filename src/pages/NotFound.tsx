import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export const NotFound: React.FC = () => {
  const handleBackToHome = () => {
    // Navigate to root path or scroll to home section
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712] px-4 select-none relative overflow-hidden bg-dot-grid">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-[30%] left-[20%] w-72 h-72 rounded-full bg-purple-500/10 blur-[80px] -z-10 animate-float-slow" />
      <div className="absolute bottom-[30%] right-[20%] w-72 h-72 rounded-full bg-cyan-500/10 blur-[80px] -z-10 animate-float-medium" />

      <div className="text-center space-y-6 max-w-md relative z-10">
        
        {/* Glowing 404 block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-8xl md:text-9xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-rose-500 to-cyan-500 tracking-wider filter drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          404
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl font-display font-bold text-white tracking-wide"
        >
          Lost in Space?
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-xs md:text-sm leading-relaxed"
        >
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back.
        </motion.p>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-4 flex justify-center"
        >
          <button
            onClick={handleBackToHome}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-xs md:text-sm tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-purple-500/10 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </motion.div>

      </div>
    </div>
  );
};
