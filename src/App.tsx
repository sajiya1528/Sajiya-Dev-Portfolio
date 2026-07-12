import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Chatbot } from "./components/Chatbot";
import { Loader } from "./components/Loader";
import { Marquee } from "./components/Marquee";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Skills } from "./pages/Skills";
import { Experience } from "./pages/Experience";
import { Projects } from "./pages/Projects";
import { Certifications } from "./pages/Certifications";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";

const MainLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader finishLoading={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="relative min-h-screen bg-[#F8FAFC] text-slate-700 dark:bg-[#eaf4ff] dark:text-[#0f172a] transition-colors duration-300">
          {/* Header Sticky Navbar */}
          <Navbar />

          {/* Core Page Layout */}
          <main>
            <Home />
            <Marquee />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
          </main>

          {/* Footer & Chatbot */}
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
          <Route path="/" element={<MainLayout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
