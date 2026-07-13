import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { Loader } from "./components/Loader";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Skills } from "./pages/Skills";
import { Experience } from "./pages/Experience";
import { Projects } from "./pages/Projects";
import { Certifications } from "./pages/Certifications";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen bg-[#F8FAFC] text-slate-700 dark:bg-[#0f172a] dark:text-gray-100 transition-colors duration-300">
          <Navbar />

          <main className="min-h-screen">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/certifications" element={<Certifications />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>

          <Footer />
          <Chatbot />
        </div>
      )}
    </>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
