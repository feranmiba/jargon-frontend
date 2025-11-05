"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const messages = [
  "Initializing secure identity...",
  "Encrypting your data streams...",
  "Syncing with sovereign ledger...",
  "Calibrating access permissions...",
  "Almost there...",
  "Finalizing setup...",
  "Completed!",
];

export default function LoadingScreen() {
  const [progress, setProgress] = useState(1);
  const [message, setMessage] = useState(messages[0]);

  useEffect(() => {
    let i = 1;
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
      i++;
      // Randomly change message
      if (i % 15 === 0 && i / 15 < messages.length) {
        setMessage(messages[Math.floor(i / 15)]);
      }
    }, 50); // speed of progress (lower = faster)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-base text-base flex flex-col items-center justify-center z-50 overflow-hidden">
      <motion.div
        className="relative w-40 h-40 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full border-[6px] border-primary border-t-transparent animate-spin-slow"
          style={{ borderRadius: "50%" }}
        />
        <span className="text-3xl font-bold text-title">{progress}%</span>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={message}
          className="mt-6 text-note text-center px-6 text-sm sm:text-base"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {message}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
