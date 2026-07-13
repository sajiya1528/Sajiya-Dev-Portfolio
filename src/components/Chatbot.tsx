import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, X, Send, Bot, User,
  Trash2
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import { cn } from "../lib/utils";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

const SUGGESTION_CHIPS = [
  "What projects has Sajiya built?",
  "What are her top skills?",
  "Tell me about her experience.",
  "Show my certifications.",
  "How can I contact Sajiya?",
];

const getLocalResponse = (query: string): string => {
  const q = query.toLowerCase().trim();

  if (/\b(project|built|created|developed|portfolio|apps|applications)\b/.test(q)) {
    return "Sajiya has built several impressive projects:\n\n• **SpendSense AI** – An AI-powered financial dashboard with budget forecasting and smart money tips.\n• **Medico AI Assist** – A patient-centric AI medical assistance application with symptom analysis.\n• **Apna Mart** – A full-featured MERN e-commerce platform with Stripe checkout simulation.\n• **Attendance Management System** – Enterprise-grade tracker with role-based logins and CSV exports.\n• **Weather App** – Real-time forecasting dashboard using OpenWeather API.\n• **Zepto Clone** – High-fidelity grocery delivery UI with dynamic lists and animations.\n• **MergeMate Smart PDF Merger** – Client-side PDF reorder and merge utility.";
  }

  if (/\b(skill|tech|technology|stack|language|know|tools|proficient)\b/.test(q)) {
    return "Sajiya's core technical skills include:\n\n**Programming Languages:** Java, Python, JavaScript, HTML, CSS, SQL\n\n**Web Technologies:** React, Node.js, Express, REST APIs, Tailwind CSS, Bootstrap\n\n**Databases:** MySQL, MongoDB\n\n**Tools:** Git, GitHub, Docker, Postman, Figma, VS Code";
  }

  if (/\b(experience|work|job|internship|intern|training|company)\b/.test(q)) {
    return "Sajiya's professional experience includes:\n\n• **Web Development Intern** at Tech-Vise Solutions (3 months) – Built React components and Express.js API routes.\n• **Full Stack Training** at Industry Academy Program (6 months) – Intensive MERN stack development, clean MVC architecture, and JWT auth flows.\n• **Academic Projects** at HITAM Engineering Lab – Research-driven AI and full-stack utilities with Git-based collaboration.";
  }

  if (/\b(education|college|btech|b\.?tech|degree|study|student|hitam|university|academic)\b/.test(q)) {
    return "Sajiya is currently a final-year **B.Tech** student in **Artificial Intelligence & Data Science** (2022–2026) at the **Hyderabad Institute of Technology and Management (HITAM)** in Hyderabad, India. Her coursework focuses on AI, neural networks, machine learning, big data, cloud architecture, and modern full-stack web engineering.";
  }

  if (/\b(certificate|certification|certificates|credentials|badge|award)\b/.test(q)) {
    return "Sajiya holds the following certifications:\n\n• **React Developer Certification** – Udemy Academy (August 2025)\n• **Full Stack Web Engineering Core** – Industry Tech Council (May 2025)\n• **Java Foundation Programming** – HackerRank Gold Badge (December 2024)\n• **Database Query Optimization with MySQL** – Great Learning Academy (September 2024)";
  }

  if (/\b(resume|cv|download|pdf)\b/.test(q)) {
    return "You can download Sajiya's resume from the **Download Resume** button on the Home page. It contains her full education, experience, skills, and project details in a formatted PDF.";
  }

  if (/\b(github|git|repository|repos|code|source)\b/.test(q)) {
    return "Check out Sajiya's code repositories on GitHub: **github.com/sajiya1528**\n\nShe maintains active repositories for SpendSense AI, Medico AI Assist, Apna Mart, Attendance System, Weather App, Zepto Clone, MergeMate PDF Merger, and her personal portfolio.";
  }

  if (/\b(linkedin|profile|social|connect|network)\b/.test(q)) {
    return "Connect with Sajiya on LinkedIn: **linkedin.com/in/sajiya-nazir1528**\n\nShe regularly shares updates about her projects, learning journey, and tech insights.";
  }

  if (/\b(email|mail|reach|contact|message|write|gmail|inbox)\b/.test(q)) {
    return "You can reach Sajiya directly at:\n\n• **Email:** sajiyanazir28@gmail.com\n• **Phone:** +91 9263815041\n\nOr use the **Contact** form on this website and she'll get back to you quickly!";
  }

  if (/\b(phone|call|mobile|number|tel|contact)\b/.test(q)) {
    return "Sajiya's phone number is **+91 9263815041**. Feel free to reach out for opportunities, collaborations, or just to say hi!";
  }

  if (/\b(contact|reach|message|connect|touch|talk|hello|hi)\b/.test(q)) {
    return "You can contact Sajiya in multiple ways:\n\n• **Email:** sajiyanazir28@gmail.com\n• **Phone:** +91 9263815041\n• **LinkedIn:** linkedin.com/in/sajiya-nazir1528\n• **GitHub:** github.com/sajiya1528\n\nOr simply use the contact form on the Contact page!";
  }

  if (/\b(hello|hi|hey|greet|start|begin)\b/.test(q)) {
    return "Hey there! 👋 I'm Sajiya's AI Assistant. I can tell you about her **projects**, **skills**, **experience**, **education**, **certifications**, and **contact details**. What would you like to know?";
  }

  if (/\b(who|what|about|tell|information|info|introduce)\b/.test(q)) {
    return "Sajiya Nazir is an aspiring **Full Stack Developer** and final-year **B.Tech student** in AI & Data Science at HITAM, Hyderabad. She specializes in React, Node.js, and AI technologies. Her mission is to build premium, high-performance web systems that combine modern frontend design with robust backend APIs.";
  }

  return "That's a great question! I'm specifically trained to answer questions about Sajiya's **projects**, **skills**, **experience**, **education**, **certifications**, and **contact details**. Could you rephrase your question related to any of these topics?";
};

const simpleMarkdown = (text: string): string => {
  let html = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/`([^`]+)`/g, "<code class='bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded text-[10px] font-mono'>$1</code>");
  html = html.replace(/^• (.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, "<ul class='list-disc list-inside space-y-0.5 my-1'>$&</ul>");
  html = html.replace(/\n/g, "<br />");

  return html;
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const SNAILogo: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <div
    className="relative shrink-0"
    style={{ width: size, height: size }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: "drop-shadow(0 0 6px rgba(47,73,200,0.6)) drop-shadow(0 0 12px rgba(139,92,246,0.4))" }}>
      <defs>
        <linearGradient id="snGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill="none" stroke="url(#snGrad)" strokeWidth="4" filter="url(#glow)" opacity="0.9" />
      <circle cx="50" cy="50" r="38" fill="url(#snGrad)" opacity="0.15" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="url(#snGrad)" strokeWidth="1.5" opacity="0.5" />
      <text x="50" y="50" textAnchor="middle" dy=".35em" fill="white" fontSize="28" fontWeight="800" fontFamily="Space Grotesk, sans-serif" filter="url(#glow)">SN</text>
      <circle cx="50" cy="8" r="4" fill="#22C55E" filter="url(#glow)">
        <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const reconstructed = parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        }));
        setMessages(reconstructed);
      } catch {
        const welcomeMsg: Message = {
          id: "welcome-" + Date.now(),
          sender: "bot",
          text: `👋 Hi! I'm Sajiya's AI Assistant.\n\nAsk me anything about her projects, skills, experience, certifications or contact details.`,
          timestamp: new Date(),
        };
        setMessages([welcomeMsg]);
      }
    } else {
      const welcomeMsg: Message = {
        id: "welcome-" + Date.now(),
        sender: "bot",
        text: `👋 Hi! I'm Sajiya's AI Assistant.\n\nAsk me anything about her projects, skills, experience, certifications or contact details.`,
        timestamp: new Date(),
      };
      setMessages([welcomeMsg]);
    }
    setHasInitialized(true);
  }, []);

  useEffect(() => {
    if (hasInitialized && messages.length > 0) {
      localStorage.setItem("portfolio_chat_history", JSON.stringify(messages));
    }
  }, [messages, hasInitialized]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const clearChat = () => {
    localStorage.removeItem("portfolio_chat_history");
    const welcomeMsg: Message = {
      id: "welcome-" + Date.now(),
      sender: "bot",
      text: `👋 Hi! I'm Sajiya's AI Assistant.\n\nAsk me anything about her projects, skills, experience, certifications or contact details.`,
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  };

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userText = text.trim();
    setInputValue("");

    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: portfolioData.chatbotKnowledge.systemPrompt },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: userText },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            { id: `msg-${Date.now()}-bot`, sender: "bot", text: data.reply, timestamp: new Date() },
          ]);
          setIsTyping(false);
          return;
        }
      }
      throw new Error("Proxy unavailable");
    } catch {
      setTimeout(() => {
        const fallbackText = getLocalResponse(userText);
        setMessages((prev) => [
          ...prev,
          { id: `msg-${Date.now()}-bot`, sender: "bot", text: fallbackText, timestamp: new Date() },
        ]);
        setIsTyping(false);
      }, 600 + Math.random() * 800);
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 26, stiffness: 230 }}
            className="w-[380px] h-[520px] rounded-[20px] flex flex-col overflow-hidden mb-4 shadow-2xl dark:shadow-black/50"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(30,58,138,0.08)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between rounded-t-[20px]"
              style={{ background: "#2F49C8" }}
            >
              <div className="flex items-center gap-3">
                <SNAILogo size={38} />
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-white text-sm tracking-wide">
                    Sajiya AI
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-blue-100 font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    Online
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-3 select-text bg-[#F8FAFC]/80 dark:bg-[#0f172a]/80">
              {messages.map((msg, idx) => {
                const isUser = msg.sender === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx === messages.length - 1 ? 0.1 : 0 }}
                    className={`flex items-start gap-2 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    {/* Avatar */}
                    <div className={cn(
                      "w-7 h-7 rounded-full shrink-0 flex items-center justify-center border",
                      isUser
                        ? "bg-[#2F49C8]/10 border-[#2F49C8]/20 text-[#2F49C8] dark:bg-[#2F49C8]/30"
                        : "bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] border-transparent text-white shadow-sm"
                    )}>
                      {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    {/* Bubble */}
                    <div className="flex flex-col gap-0.5">
                      <div
                        className={cn(
                          "px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed text-left whitespace-pre-line",
                          isUser
                            ? "bg-gradient-to-r from-[#2F49C8] to-[#2563EB] text-white rounded-tr-sm shadow-md"
                            : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-200 border border-gray-100 dark:border-gray-800 rounded-tl-sm shadow-sm"
                        )}
                      >
                        <span dangerouslySetInnerHTML={{ __html: simpleMarkdown(msg.text) }} />
                      </div>
                      <span className={cn(
                        "text-[9px] text-gray-400 dark:text-slate-600 px-1",
                        isUser ? "text-right" : "text-left"
                      )}>
                        {formatTime(msg.timestamp)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 max-w-[80%] mr-auto"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] border-transparent text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            {messages.length <= 1 && !isTyping && (
              <div className="px-4 pb-2 pt-1 bg-[#F8FAFC]/80 dark:bg-[#0f172a]/80">
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTION_CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => sendMessage(chip)}
                      className="px-2.5 py-1.5 rounded-full text-[10px] font-medium bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-[#2F49C8] dark:hover:border-[#2563EB] hover:text-[#2F49C8] dark:hover:text-[#2563EB] transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input bar */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-gray-100 dark:border-gray-800/60 flex gap-2 items-center bg-white dark:bg-[#0B1120]"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-grow px-3.5 py-2.5 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#2F49C8] dark:focus:border-[#2563EB] focus:ring-2 focus:ring-[#2F49C8]/10 dark:focus:ring-[#2563EB]/10 transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#2F49C8] to-[#2563EB] text-white hover:from-[#2563EB] hover:to-[#8B5CF6] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:scale-100 flex items-center justify-center cursor-pointer shadow-lg shadow-blue-900/20 dark:shadow-blue-900/30"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Toggle Button ── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer group"
        style={{
          background: "linear-gradient(135deg, #2F49C8, #2563EB)",
          boxShadow: "0 0 20px rgba(47,73,200,0.4), 0 0 40px rgba(139,92,246,0.2), 0 8px 24px rgba(0,0,0,0.15)",
        }}
        whileHover={{ scale: 1.08, boxShadow: "0 0 30px rgba(47,73,200,0.6), 0 0 60px rgba(139,92,246,0.35), 0 12px 32px rgba(0,0,0,0.2)" }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open Sajiya AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5 text-white" /></motion.div>
            : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageSquare className="w-5 h-5 text-white" /></motion.div>
          }
        </AnimatePresence>
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2563EB] to-[#8B5CF6] -z-10 blur-md opacity-40 group-hover:opacity-70 transition-all duration-300" />
        {/* Pulse ping */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white dark:border-[#0f172a]" />
          </span>
        )}
      </motion.button>
    </div>
  );
};
