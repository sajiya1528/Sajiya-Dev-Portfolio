import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ShieldCheck, Filter } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { cn } from "../lib/utils";

const FILTER_TABS = ["All", "Web Development", "Backend", "Database", "AI & ML"];

export const Certifications: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All");
  const certifications = portfolioData.certifications;

  const filteredCertifications = certifications.filter((cert) => {
    if (activeTab === "All") return true;
    const lower = activeTab.toLowerCase();
    if (lower === "web development") return cert.name.toLowerCase().includes("react") || cert.name.toLowerCase().includes("web");
    if (lower === "backend") return cert.name.toLowerCase().includes("full stack") || cert.name.toLowerCase().includes("backend");
    if (lower === "database") return cert.name.toLowerCase().includes("database") || cert.name.toLowerCase().includes("mysql");
    if (lower === "ai & ml") return cert.name.toLowerCase().includes("ai") || cert.name.toLowerCase().includes("java");
    return true;
  });

  return (
    <motion.section
      id="certifications"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-20 px-4 md:px-8 bg-[#F8FAFC] dark:bg-[#0f172a] border-t border-gray-100/30 dark:border-slate-800/50 relative"
    >
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500/10 dark:bg-purple-400/10 blur-sm pointer-events-none"
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
            Certifications
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F97316] mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Professional training validation, skill badges, and academy certificates.
          </p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          <Filter className="w-4 h-4 text-gray-400 mr-1" />
          {FILTER_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative px-4 py-2 text-xs font-semibold rounded-full tracking-wide transition-colors border cursor-pointer",
                  isActive
                    ? "text-white border-[#1E3A8A] dark:border-[#2563EB]"
                    : "text-gray-600 dark:text-gray-400 border-gray-200/50 dark:border-slate-800/50 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-900/30"
                )}
              >
                <span className="relative z-10">{tab}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeCertFilterBg"
                    className="absolute inset-0 bg-gradient-to-r from-[#1E3A8A] to-[#2563EB] rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredCertifications.map((cert, idx) => (
              <motion.div
                key={cert.id || idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-2xl glass-panel bg-white/60 dark:bg-slate-900/60 border border-gray-200/50 dark:border-slate-800/60 overflow-hidden hover:shadow-xl dark:hover:shadow-blue-500/5 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-all duration-300 cursor-pointer"
              >
                {/* Certificate Image Placeholder */}
                <div className="w-full h-36 bg-gradient-to-br from-[#1E3A8A]/10 to-[#F97316]/10 dark:from-[#1E3A8A]/20 dark:to-[#F97316]/20 border-b border-gray-200/50 dark:border-slate-800/60 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-dot-grid opacity-30" />
                  <div className="w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-6 h-6 text-[#1E3A8A] group-hover:text-[#F97316] transition-colors" />
                  </div>
                  <Award className="absolute -bottom-2 -right-2 w-10 h-10 text-[#F97316]/10 pointer-events-none" />
                </div>

                {/* Details info */}
                <div className="p-5">
                  <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm md:text-base tracking-wide leading-snug text-left group-hover:text-[#1E3A8A] dark:group-hover:text-[#2563EB] transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-xs text-[#1E3A8A] dark:text-[#F97316] font-semibold text-left mt-1.5">
                    {cert.issuer}
                  </p>

                  {/* Bottom: Date & Link */}
                  <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium font-sans">
                      {cert.date}
                    </span>

                    <a
                      href={cert.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-200/50 dark:border-slate-700/50 hover:border-[#1E3A8A] dark:hover:border-[#F97316] hover:bg-white dark:hover:bg-slate-700 text-[10px] font-bold text-gray-600 dark:text-gray-300 hover:text-[#1E3A8A] dark:hover:text-[#F97316] transition-all cursor-pointer"
                    >
                      View
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </motion.section>
  );
};
