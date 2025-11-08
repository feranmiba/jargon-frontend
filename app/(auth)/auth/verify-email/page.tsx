// ==========================================
// FILE: app/(auth)/verify-email/page.tsx
// ==========================================
"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useAuth } from "@/app/utils/apis/auth";
import { Mail } from "lucide-react";

export default function VerifyEmail() {
  const { verifyEmail, verifyEmailLoading } = useAuth();
  const [codes, setCodes] = useState(["", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const code = codes.join("");
    verifyEmail({ token: code });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-base border-2 border-primary/10 dark:border-primary/20 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-20 h-20 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center relative"
          >
            <Mail className="w-10 h-10 text-primary" />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl"
            />
          </motion.div>
          <h2 className="text-3xl font-bold text-title mb-2">Verify Your Email</h2>
          <p className="text-base opacity-60">Enter the 5-digit code we sent to your email</p>
        </div>

        <div>
          <div className="flex justify-center gap-3 mb-6">
            {codes.map((code, index) => (
              <motion.input
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-14 h-14 text-center text-2xl font-bold bg-base border-2 border-primary/20 dark:border-primary/30 rounded-xl text-title focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
            ))}
          </div>

          <motion.button
            onClick={handleSubmit}
            disabled={verifyEmailLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
          >
            {verifyEmailLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Verifying...
              </span>
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </div>

        <p className="text-center text-base opacity-60 mt-6">
          Didn't receive the code?{" "}
          <button className="text-primary hover:underline font-semibold">
            Resend
          </button>
        </p>
      </div>
    </motion.div>
  );
}