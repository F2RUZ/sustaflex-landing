"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderModal({ isOpen, onClose }: OrderModalProps) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [activeField, setActiveField] = useState<"name" | "phone" | null>(null);

  // Formaning to'lish darajasi (Progress)
  const progress =
    (formData.name.length > 2 ? 50 : 0) +
    (formData.phone.length === 19 ? 50 : 0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setStatus("idle");
      setFormData({ name: "", phone: "" });
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value.startsWith("998")) value = "998" + value;
    value = value.slice(0, 12);

    let formatted = "+";
    if (value.length > 0) formatted += value.slice(0, 3);
    if (value.length > 3) formatted += " (" + value.slice(3, 5) + ")";
    if (value.length > 5) formatted += " " + value.slice(5, 8);
    if (value.length > 8) formatted += " " + value.slice(8, 10);
    if (value.length > 10) formatted += " " + value.slice(10, 12);

    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length < 19) return;

    setStatus("loading");
    // Telegram API yoki Backend uchun kutish
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setStatus("success");

    setTimeout(() => {
      onClose();
    }, 4000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          {/* 1. Dinamik Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#1A1A1A]/80 backdrop-blur-xl"
          />

          {/* 2. Asosiy Modal Konteyneri */}
          <motion.div
            initial={{ scale: 0.8, y: 100, rotateX: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 120 }}
            className="relative w-full max-w-[500px] bg-white rounded-[50px] shadow-[0_50px_100px_rgba(0,0,0,0.4)] overflow-hidden perspective-1000"
          >
            {/* Dekorativ elementlar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gray-100">
              <motion.div
                className="h-full bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <SuccessView key="success" />
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    {/* Header */}
                    <div className="text-center mb-10">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="inline-block"
                      >
                        <h2 className="text-4xl font-black italic tracking-tighter text-[#1A1A1A]">
                          СУСТА
                          <span className="text-red-600 underline decoration-4 underline-offset-4 decoration-red-600/20">
                            ФЛЕКС
                          </span>
                        </h2>
                      </motion.div>
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-[4px] mt-3">
                        Sog'liq sari bir qadam
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Input: Ism */}
                      <div className="relative">
                        <motion.div
                          animate={{
                            scale: activeField === "name" ? 1.02 : 1,
                            borderColor:
                              activeField === "name" ? "#DC2626" : "#F3F4F6",
                          }}
                          className="bg-gray-50 border-2 rounded-3xl overflow-hidden transition-colors"
                        >
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                              <circle cx="12" cy="7" r="4" />
                            </svg>
                          </span>
                          <input
                            required
                            type="text"
                            placeholder="Ismingiz"
                            onFocus={() => setActiveField("name")}
                            onBlur={() => setActiveField(null)}
                            className="w-full pl-16 pr-6 py-5 bg-transparent outline-none font-bold text-[#1A1A1A] placeholder:text-gray-300"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                          />
                        </motion.div>
                      </div>

                      {/* Input: Telefon */}
                      <div className="relative">
                        <motion.div
                          animate={{
                            scale: activeField === "phone" ? 1.02 : 1,
                            borderColor:
                              activeField === "phone" ? "#DC2626" : "#F3F4F6",
                          }}
                          className="bg-gray-50 border-2 rounded-3xl overflow-hidden transition-colors"
                        >
                          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                          </span>
                          <input
                            required
                            type="text"
                            placeholder="+998 (__) ___ __ __"
                            onFocus={() => setActiveField("phone")}
                            onBlur={() => setActiveField(null)}
                            className="w-full pl-16 pr-6 py-5 bg-transparent outline-none font-bold text-[#1A1A1A] placeholder:text-gray-300"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                          />
                        </motion.div>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={status === "loading" || progress < 100}
                        className="relative w-full py-6 bg-red-600 rounded-3xl text-white font-black uppercase tracking-[3px] text-xs shadow-2xl shadow-red-500/40 disabled:bg-gray-200 disabled:shadow-none transition-all group overflow-hidden"
                      >
                        <span className="relative z-10">
                          {status === "loading"
                            ? "Yuborilmoqda..."
                            : "Buyurtma berish"}
                        </span>
                        {status === "loading" && (
                          <motion.div
                            className="absolute inset-0 bg-black/10"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                          />
                        )}
                      </motion.button>
                    </form>

                    <p className="text-center text-[9px] text-gray-400 mt-8 leading-relaxed px-4">
                      Tugmani bosish orqali siz shaxsiy ma'lumotlarni qayta
                      ishlashga rozilik bildirasiz
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Yopish tugmasi */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all group"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="group-hover:rotate-90 transition-transform duration-300"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Muvaffaqiyatli yakunlangandagi ko'rinish
function SuccessView() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="py-12 text-center"
    >
      <div className="relative inline-block mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/40"
        >
          <svg
            width="45"
            height="45"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              d="M20 6L9 17l-5-5"
            />
          </svg>
        </motion.div>
        {/* Dekorativ zarrachalar */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 rounded-full"
            animate={{
              x: [0, (i % 2 === 0 ? 50 : -50) * Math.random()],
              y: [0, (i % 2 === 0 ? 50 : -50) * Math.random()],
              opacity: [1, 0],
            }}
            transition={{ duration: 1, delay: 0.5, repeat: Infinity }}
          />
        ))}
      </div>
      <h3 className="text-3xl font-black text-[#1A1A1A] mb-4">
        Qabul qilindi!
      </h3>
      <p className="text-gray-500 font-bold max-w-[250px] mx-auto leading-relaxed">
        Operatorlarimiz tez orada siz bilan bog'lanishadi.
      </p>
      <div className="mt-8 flex justify-center gap-2">
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]" />
        <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    </motion.div>
  );
}
