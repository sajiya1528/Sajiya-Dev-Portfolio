import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, RotateCcw, Bot, User } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
        initializeChat();
      }
    } else {
      initializeChat();
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("portfolio_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const initializeChat = () => {
    const welcomeMsg: Message = {
      id: "welcome-1",
      sender: "bot",
      text: portfolioData.chatbotKnowledge.fallbackAnswers[0].answer,
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
    localStorage.setItem("portfolio_chat_history", JSON.stringify([welcomeMsg]));
  };

  const clearChat = () => {
    localStorage.removeItem("portfolio_chat_history");
    initializeChat();
  };

  const getFallbackReply = (query: string): string => {
    const normalized = query.toLowerCase().trim();
    const match = portfolioData.chatbotKnowledge.fallbackAnswers.find((fb) =>
      fb.keywords.some((kw) => normalized.includes(kw))
    );
    return match ? match.answer : portfolioData.chatbotKnowledge.defaultAnswer;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
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
        const fallbackText = getFallbackReply(userText);
        setMessages((prev) => [
          ...prev,
          { id: `msg-${Date.now()}-bot`, sender: "bot", text: fallbackText, timestamp: new Date() },
        ]);
        setIsTyping(false);
      }, 900);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: "spring", damping: 26, stiffness: 230 }}
            className="w-[320px] sm:w-[360px] h-[460px] rounded-2xl flex flex-col overflow-hidden mb-4 shadow-[0_24px_70px_rgba(15,23,42,0.18)] dark:shadow-[0_24px_70px_rgba(2,6,23,0.45)]
              bg-white/95 dark:bg-[#f5faff]/95 backdrop-blur-2xl
              border border-slate-200/80 dark:border-blue-200/70"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#1E3A8A] via-[#3B82F6] to-[#F97316] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Hexagon SN logo */}
                <div className="hexagon w-9 h-9 bg-white/20 flex items-center justify-center shadow-inner shrink-0">
                  <span className="font-display font-extrabold text-white text-xs tracking-widest">SN</span>
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-display font-bold text-white text-xs tracking-wide">
                    SN AI Assistant
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-blue-100 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                    Powered by Groq Llama 3
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  title="Reset conversation"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 select-text bg-[#F8FAFC]/50 dark:bg-[#0B1120]/60">
              {messages.map((msg) => {
                const isUser = msg.sender === "user";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 max-w-[87%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                  >
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center border ${
                      isUser
                        ? "bg-[#1E3A8A]/10 border-[#1E3A8A]/20 text-[#1E3A8A] dark:bg-[#1E3A8A]/30 dark:border-[#1E3A8A]/40 dark:text-blue-300"
                        : "bg-[#F97316]/10 border-[#F97316]/20 text-[#F97316] dark:bg-[#F97316]/20 dark:border-[#F97316]/30"
                    }`}>
                      {isUser ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>

                    {/* Bubble */}
                    <div className={`px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed text-left whitespace-pre-line ${
                      isUser
                        ? "bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-tr-none shadow-sm"
                        : "bg-white dark:bg-[#111827] text-gray-700 dark:text-slate-200 border border-gray-100 dark:border-gray-800 rounded-tl-none shadow-sm"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-start gap-2.5 max-w-[80%]">
                  <div className="w-6 h-6 rounded-full bg-[#F97316]/10 border border-[#F97316]/20 text-[#F97316] dark:bg-[#F97316]/20 dark:border-[#F97316]/30 flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 flex items-center gap-1 w-16 justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A8A] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <form
              onSubmit={handleSend}
              className="p-3 border-t border-gray-100 dark:border-gray-800/60 flex gap-2 items-center bg-white dark:bg-[#0F172A]"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Sajiya's skills, projects..."
                className="flex-grow px-3.5 py-2 rounded-xl text-xs bg-[#F8FAFC] dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#F97316] transition-colors"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#F97316] text-white hover:from-[#F97316] hover:to-[#1E3A8A] hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:scale-100 flex items-center justify-center cursor-pointer shadow-md shadow-blue-900/20"
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
        className="relative w-14 h-14 rounded-full text-white flex items-center justify-center shadow-xl cursor-pointer group"
        style={{ background: "linear-gradient(135deg, #1E3A8A, #3B82F6)" }}
        whileHover={{ scale: 1.1, background: "linear-gradient(135deg, #F97316, #1E3A8A)" }}
        whileTap={{ scale: 0.92 }}
        aria-label="Open SN AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen
            ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X className="w-5 h-5" /></motion.div>
            : <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><MessageSquare className="w-5 h-5" /></motion.div>
          }
        </AnimatePresence>
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full bg-[#1E3A8A] -z-10 blur-md opacity-40 group-hover:opacity-70 group-hover:bg-[#F97316] transition-all duration-300" />
        {/* Pulse ping */}
        {!isOpen && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F97316] border-2 border-white dark:border-[#0B1120] animate-pulse" />}
      </motion.button>
    </div>
  );
};
