import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Github, Linkedin, Send,
  CheckCircle2, AlertCircle, Clock,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { portfolioData } from "../data/portfolioData";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface Toast {
  type: "success" | "error";
  message: string;
}

export const Contact: React.FC = () => {
  const { email, phone, location, github, linkedin } = portfolioData.personalInfo;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const showToast = (type: Toast["type"], message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Build template params including submission time
    const submittedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      to_name: "Sajiya Nazir",
      to_email: "sajiyanazir28@gmail.com",
      reply_to: data.email,
      submitted_at: submittedAt,
    };

    if (!serviceId || !templateId || !publicKey) {
      // Mock mode: simulate sending with a delay
      setTimeout(() => {
        setIsSubmitting(false);
        showToast("success", "Message delivered! (EmailJS keys not set — configure .env for live emails)");
        reset();
      }, 1500);
      return;
    }

    try {
      const res = await emailjs.send(serviceId, templateId, templateParams, publicKey);
      if (res.status === 200) {
        setIsSubmitting(false);
        showToast("success", "✓ Message sent successfully! Sajiya will get back to you soon.");
        reset();
      } else {
        throw new Error("EmailJS returned non-200 status");
      }
    } catch (err: any) {
      console.error("EmailJS error:", err);
      setIsSubmitting(false);
      showToast("error", "✗ Failed to send. Please email directly at sajiyanazir28@gmail.com");
    }
  };

  /* ────────────────────────── Contact info cards ───────────────────────── */
  const contactCards = [
    {
      label: "Email",
      value: email,
      href: `mailto:${email}`,
      icon: <Mail className="w-4 h-4" />,
      color: "text-[#1E3A8A] dark:text-blue-400",
      bg: "bg-[#1E3A8A]/8 dark:bg-[#1E3A8A]/20 border-[#1E3A8A]/15",
    },
    {
      label: "Phone",
      value: `+91 ${phone}`,
      href: `tel:${phone}`,
      icon: <Phone className="w-4 h-4" />,
      color: "text-[#F97316] dark:text-orange-400",
      bg: "bg-[#F97316]/8 dark:bg-[#F97316]/15 border-[#F97316]/15",
    },
    {
      label: "Location",
      value: location,
      href: undefined,
      icon: <MapPin className="w-4 h-4" />,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-500/8 dark:bg-emerald-500/15 border-emerald-500/15",
    },
    {
      label: "GitHub",
      value: "github.com/sajiya1528",
      href: github,
      icon: <Github className="w-4 h-4" />,
      color: "text-gray-700 dark:text-gray-300",
      bg: "bg-gray-100 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700",
    },
    {
      label: "LinkedIn",
      value: "in/sajiya-nazir1528",
      href: linkedin,
      icon: <Linkedin className="w-4 h-4" />,
      color: "text-[#1E3A8A] dark:text-blue-400",
      bg: "bg-[#1E3A8A]/8 dark:bg-[#1E3A8A]/20 border-[#1E3A8A]/15",
    },
  ];

  /* ─────────────────── Input classes ───────────────────────────────────── */
  const inputCls =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 " +
    "bg-[#F8FAFC] dark:bg-[#111827] text-gray-900 dark:text-white placeholder:text-gray-400 " +
    "text-sm focus:outline-none focus:border-[#1E3A8A] dark:focus:border-[#F97316] " +
    "transition-colors duration-200";

  const labelCls = "text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500";

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-8 relative border-t border-blue-900/8 dark:border-blue-200/70
        bg-[#F8FAFC] dark:bg-[#eaf4ff]"
    >
      {/* Floating toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold min-w-[280px] max-w-sm ${
              toast.type === "success"
                ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                : "bg-red-50 dark:bg-red-950/80 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}
          >
            {toast.type === "success"
              ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              : <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            }
            <span className="leading-snug">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-[#1E3A8A] dark:text-white tracking-wide">
            Let's Work Together
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-[#1E3A8A] to-[#F97316] mx-auto mt-3 rounded-full" />
          <p className="text-gray-500 dark:text-slate-400 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
            Have a project in mind or want to discuss a full-stack developer role? Send me a message and I'll get back to you quickly!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* ── Left: Contact Cards ── */}
          <div className="lg:col-span-5 space-y-3 text-left">
            <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white mb-5 tracking-wide flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-[#1E3A8A] to-[#F97316] rounded-full" />
              Contact Details
            </h3>

            {contactCards.map((card, idx) => {
              const Wrapper = card.href ? "a" : "div";
              const wrapperProps = card.href
                ? { href: card.href, target: card.href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
                : {};

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                >
                  <Wrapper
                    {...wrapperProps}
                    className={`flex items-center gap-4 p-4 rounded-2xl border ${card.bg} glass-panel dark:card-glow transition-all duration-300 group ${card.href ? "cursor-pointer hover:scale-[1.01]" : ""}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${card.bg} shrink-0 ${card.color} group-hover:scale-110 transition-transform duration-300`}>
                      {card.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                        {card.label}
                      </span>
                      <span className={`text-sm font-semibold truncate ${card.color} group-hover:opacity-80 transition-opacity`}>
                        {card.value}
                      </span>
                    </div>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>

          {/* ── Right: Contact Form ── */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl p-7 md:p-8 glass-panel dark:card-glow border border-blue-900/8 dark:border-orange-500/8
                bg-white dark:bg-[#111827] shadow-lg shadow-blue-900/5 dark:shadow-black/30"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">

                {/* Two-col row: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className={labelCls}>Name</label>
                    <input
                      id="name" type="text"
                      {...register("name", { required: "Name is required" })}
                      className={inputCls}
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-medium">{errors.name.message}</span>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input
                      id="email" type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email" },
                      })}
                      className={inputCls}
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-[10px] text-red-500 font-medium">{errors.email.message}</span>}
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className={labelCls}>Subject</label>
                  <input
                    id="subject" type="text"
                    {...register("subject", { required: "Subject is required" })}
                    className={inputCls}
                    placeholder="Project Inquiry / Job Opportunity"
                  />
                  {errors.subject && <span className="text-[10px] text-red-500 font-medium">{errors.subject.message}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className={labelCls}>Message</label>
                  <textarea
                    id="message" rows={5}
                    {...register("message", { required: "Message is required", minLength: { value: 10, message: "Message too short (min 10 chars)" } })}
                    className={`${inputCls} resize-none`}
                    placeholder="Hi Sajiya, I'd love to discuss..."
                  />
                  {errors.message && <span className="text-[10px] text-red-500 font-medium">{errors.message.message}</span>}
                </div>

                {/* Submission time notice */}
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-slate-500">
                  <Clock className="w-3 h-3" />
                  <span>Submission timestamp will be included in the email.</span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg
                    bg-[#1E3A8A] hover:bg-[#F97316] text-white
                    dark:bg-[#1E3A8A] dark:hover:bg-[#F97316]
                    shadow-blue-900/20 hover:shadow-orange-500/25
                    disabled:opacity-55 disabled:cursor-not-allowed
                    hover:scale-[1.01] active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
