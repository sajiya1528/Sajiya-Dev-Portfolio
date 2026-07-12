import React from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  finishLoading: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ finishLoading }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#eaf4ff]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={finishLoading}
    >
      <div className="relative flex flex-col items-center gap-6">
        {/* Outer glow rings */}
        <div className="absolute w-32 h-32 rounded-full bg-[#1E3A8A]/10 blur-xl animate-pulse" />
        <div className="absolute w-24 h-24 rounded-full bg-[#F97316]/10 blur-lg animate-pulse" style={{ animationDelay: "0.5s" }} />

        {/* Rotating border */}
        <motion.div
          className="w-24 h-24 rounded-full border-2 border-transparent border-t-[#1E3A8A] border-r-[#3B82F6] border-b-[#F97316]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        />

        {/* Hexagon SN logo in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="hexagon w-14 h-14 bg-gradient-to-br from-[#1E3A8A] to-[#F97316] flex items-center justify-center shadow-xl shadow-blue-900/30">
            <span className="font-display font-extrabold text-white text-xl tracking-widest">SN</span>
          </div>
        </div>

        {/* Loading label */}
        <motion.p
          className="mt-6 text-sm font-sans font-semibold tracking-[0.3em] text-slate-400 uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Loading Experience
        </motion.p>
      </div>
    </motion.div>
  );
};
