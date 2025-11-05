"use client";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { useAuth } from "@/app/utils/apis/auth";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = codes.join("");
    verifyEmail({
          token: code,
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base text-base">
      <motion.div
        className="bg-white dark:bg-neutral-900 rounded-2xl p-8 shadow-lg w-full max-w-md text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-title mb-6">
          Verify Your Email
        </h2>
        <p className="text-sm text-muted mb-4">
          Enter the 5-digit code sent to your email
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-6">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={code}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 text-center border border-primary/20 rounded-lg text-lg focus:outline-none focus:border-primary"
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={verifyEmailLoading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition disabled:opacity-70"
          >
            {verifyEmailLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
