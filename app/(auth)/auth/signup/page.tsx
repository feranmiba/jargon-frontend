"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/app/utils/apis/auth";
import { User, Mail, Lock, Eye, EyeOff, Phone, Shield } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  const { signUp, signUpLoading } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", primary_phone: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    await signUp(form);
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center"
          >
            <Shield className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold text-title mb-2">Create Account</h2>
          <p className="text-base opacity-60">Start protecting your data today</p>
        </div>

        <div className="space-y-4">
          {/* Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full pl-12 pr-4 py-3.5 bg-base border-2 border-primary/20 dark:border-primary/30 rounded-xl text-base placeholder-base placeholder:opacity-40 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full pl-12 pr-4 py-3.5 bg-base border-2 border-primary/20 dark:border-primary/30 rounded-xl text-base placeholder-base placeholder:opacity-40 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full pl-12 pr-12 py-3.5 bg-base border-2 border-primary/20 dark:border-primary/30 rounded-xl text-base placeholder-base placeholder:opacity-40 focus:outline-none focus:border-primary transition-all"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Phone Input */}
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={form.primary_phone}
              onChange={(e) => setForm({ ...form, primary_phone: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full pl-12 pr-4 py-3.5 bg-base border-2 border-primary/20 dark:border-primary/30 rounded-xl text-base placeholder-base placeholder:opacity-40 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={signUpLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
          >
            {signUpLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </div>

        <p className="text-center text-base opacity-60 mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

