import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, ShieldCheck } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export const Certifications: React.FC = () => {
  const certifications = portfolioData.certifications;

  return (
    <section id="certifications" className="py-20 px-4 md:px-8 border-t border-gray-100/30 dark:border-gray-900/30 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 dark:text-white tracking-wide">
            Certifications
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Professional training validation, skill badges, and academy certificates.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-2xl glass-panel bg-white/40 dark:bg-gray-950/20 border border-gray-200/50 dark:border-gray-800/60 p-5 flex flex-col justify-between hover:shadow-lg dark:hover:shadow-purple-500/2 hover:border-purple-500/40 dark:hover:border-cyan-400/40 transition-all duration-300"
            >
              
              {/* Top Section: Placeholders */}
              <div>
                {/* Visual Backdrop Placeholder */}
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-purple-950/20 to-cyan-950/20 border border-gray-200/30 dark:border-gray-800/30 flex items-center justify-center relative overflow-hidden mb-4 select-none">
                  <div className="absolute inset-0 bg-dot-grid opacity-35" />
                  <div className="w-10 h-10 rounded-full bg-white/5 dark:bg-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                  <Award className="absolute -bottom-2 -right-2 w-12 h-12 text-purple-500/10 pointer-events-none" />
                </div>

                {/* Details info */}
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-sm md:text-base tracking-wide leading-snug text-left group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
                  {cert.name}
                </h3>
                <p className="text-xs text-purple-600 dark:text-cyan-400 font-semibold text-left mt-1.5">
                  {cert.issuer}
                </p>
              </div>

              {/* Bottom Section: Date & Link */}
              <div className="mt-6 pt-3 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-medium font-sans">
                  {cert.date}
                </span>

                <a
                  href={cert.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-gray-100/50 dark:bg-gray-900/60 border border-gray-200/50 dark:border-gray-800/50 hover:border-purple-500 dark:hover:border-cyan-400 hover:bg-white dark:hover:bg-gray-900 text-[10px] font-bold text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-cyan-400 transition-all cursor-pointer"
                >
                  View
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
