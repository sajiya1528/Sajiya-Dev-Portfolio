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
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    const rY = (xPct - 0.5) * 10;
    const rX = -(yPct - 0.5) * 10;
    setRotateX(rX);
    setRotateY(rY);
    setGlowPos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  const getProjectBackdrop = (imgName: string) => {
    switch (imgName) {
      case "spendsense":
        return "from-purple-900/80 to-indigo-900/60 border-purple-500/30";
      case "medico":
        return "from-emerald-900/80 to-teal-900/60 border-emerald-500/30";
      case "apnamart":
        return "from-blue-900/80 to-cyan-900/60 border-blue-500/30";
      case "attendance":
        return "from-amber-900/80 to-orange-900/60 border-amber-500/30";
      case "weather":
        return "from-sky-900/80 to-indigo-950/60 border-sky-500/30";
      case "zepto":
        return "from-rose-900/80 to-red-950/60 border-rose-500/30";
      case "mergemate":
        return "from-fuchsia-900/80 to-purple-950/60 border-fuchsia-500/30";
      default:
        return "from-gray-900/80 to-slate-900/60 border-gray-700/30";
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
      className="group relative w-full rounded-2xl glass-panel border border-gray-200/50 dark:border-slate-800/60 bg-white/60 dark:bg-slate-900/60 overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300"
    >
      {/* 3D Glass Glow effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(280px circle at ${glowPos.x}px ${glowPos.y}px, rgba(37, 99, 235, 0.12), transparent 85%)`,
        }}
      />

      {/* Content Layout */}
      <div className="flex flex-col relative z-20">

        {/* Upper Part (Project Image) */}
        <div className="relative">
          <div
            className={`w-full h-48 rounded-t-2xl bg-gradient-to-br ${getProjectBackdrop(
              project.image
            )} border-b border-gray-200/50 dark:border-slate-800/60 flex items-center justify-center overflow-hidden transition-all duration-300`}
          >
            {/* Geometric visual decoration */}
            <div className="absolute inset-0 bg-dot-grid opacity-30" />
            <div className="w-14 h-14 rounded-full bg-white/5 dark:bg-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-6 h-6 text-blue-400 group-hover:text-orange-400 transition-colors" />
            </div>

            {/* Featured Badge */}
            {project.isFeatured && (
              <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#1E3A8A]/90 text-white text-[10px] font-bold uppercase tracking-widest">
                Featured
              </span>
            )}

            {/* Category tag */}
            <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-black/40 text-[9px] font-medium text-white uppercase tracking-wider">
              {project.category}
            </span>
          </div>
        </div>

        {/* Lower Part (Information) */}
        <div className="flex flex-col p-5">
          <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg tracking-wide group-hover:text-[#1E3A8A] dark:group-hover:text-[#2563EB] transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.slice(0, 4).map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-[10px] font-medium text-gray-600 dark:text-gray-300 border border-gray-200/50 dark:border-slate-700/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 text-[10px] font-medium text-gray-400 dark:text-gray-500">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-[#1E3A8A] dark:hover:border-[#F97316] text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#F97316] hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            {project.liveUrlUrl && (
              <a
                href={project.liveUrlUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] hover:from-[#1E3A8A] hover:to-[#F97316] text-white text-xs font-bold transition-colors cursor-pointer shadow-md shadow-blue-900/20 dark:shadow-blue-900/30"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
