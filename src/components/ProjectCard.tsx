import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import type { Project } from "../data/portfolioData";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate mouse percentage inside card
    const xPct = x / rect.width;
    const yPct = y / rect.height;

    // Calculate rotation: max 12 degrees
    const rY = (xPct - 0.5) * 12;
    const rX = -(yPct - 0.5) * 12;

    setRotateX(rX);
    setRotateY(rY);
    setGlowPos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  // Get a colored mockup backdrop pattern depending on the project image name
  const getProjectBackdrop = (imgName: string) => {
    switch (imgName) {
      case "spendsense":
        return "from-purple-900/50 to-indigo-900/40 border-purple-500/20";
      case "medico":
        return "from-emerald-900/50 to-teal-900/40 border-emerald-500/20";
      case "apnamart":
        return "from-blue-900/50 to-cyan-900/40 border-blue-500/20";
      case "attendance":
        return "from-amber-900/50 to-orange-900/40 border-amber-500/20";
      case "weather":
        return "from-sky-900/50 to-indigo-950/40 border-sky-500/20";
      case "zepto":
        return "from-rose-900/50 to-red-950/40 border-rose-500/20";
      case "mergemate":
        return "from-fuchsia-900/50 to-purple-950/40 border-fuchsia-500/20";
      default:
        return "from-gray-900/60 to-slate-900/40 border-gray-700/20";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="group relative w-full h-[400px] rounded-2xl glass-panel border border-gray-200/50 dark:border-gray-800/60 bg-white/40 dark:bg-gray-950/30 overflow-hidden shadow-md hover:shadow-xl dark:hover:shadow-purple-500/5 transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      {/* 3D Glass Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(280px circle at ${glowPos.x}px ${glowPos.y}px, rgba(168, 85, 247, 0.15), transparent 85%)`,
        }}
      />

      {/* Content Layout */}
      <div className="flex flex-col h-full justify-between p-5 relative z-20">
        
        {/* Upper Part (Mockup image placeholder + Category) */}
        <div className="relative">
          <div
            className={`w-full h-40 rounded-xl bg-gradient-to-br ${getProjectBackdrop(
              project.image
            )} border flex items-center justify-center overflow-hidden transition-all duration-300`}
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Geometric visual decoration */}
            <div className="absolute inset-0 bg-dot-grid opacity-30" />
            <div className="w-12 h-12 rounded-full bg-white/5 dark:bg-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-cyan-400" />
            </div>
            
            {/* Featured Badge */}
            {project.isFeatured && (
              <span className="absolute top-2.5 right-2.5 px-2 py-1 rounded bg-purple-500/20 border border-purple-500/30 text-[10px] font-bold text-purple-600 dark:text-purple-300 uppercase tracking-widest">
                Featured
              </span>
            )}

            {/* Category tag */}
            <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/40 text-[9px] font-medium text-white uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </div>

        {/* Lower Part (Information) */}
        <div className="flex flex-col flex-grow justify-between mt-4">
          <div style={{ transform: "translateZ(20px)" }}>
            <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg tracking-wide group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 line-clamp-3 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="mt-4" style={{ transform: "translateZ(10px)" }}>
            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 max-h-12 overflow-y-auto no-scrollbar">
              {project.technologies.slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-900 text-[10px] font-medium text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-gray-800/50"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-900 text-[9px] font-medium text-gray-400 dark:text-gray-500">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-gray-100 dark:border-gray-900">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-purple-500 dark:hover:border-cyan-400 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-900/35 transition-colors cursor-pointer"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
              {project.liveUrlUrl && (
                <a
                  href={project.liveUrlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-cyan-500/10 hover:from-purple-500/25 hover:to-cyan-500/25 border border-purple-500/20 dark:border-cyan-500/20 hover:border-purple-500 dark:hover:border-cyan-400 text-xs font-bold text-purple-600 dark:text-cyan-400 transition-colors cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
