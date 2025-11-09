"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/app/utils/apis/auth";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const { loginMutation, loginLoading } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" }); 
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = await loginMutation.mutateAsync(form);
      if (res?.status === 200 || res?.success) {
        // redirect or perform post-login logic
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
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
            <Lock className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold text-title mb-2">Welcome Back</h2>
          <p className="text-base opacity-60">Sign in to your secure vault</p>
        </div>

        <div className="space-y-4">
          {/* Username field */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Email or Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-12 pr-4 py-3.5 bg-base border-2 border-primary/20 dark:border-primary/30 rounded-xl text-base placeholder-base placeholder:opacity-40 focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Password field */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/60 group-focus-within:text-primary transition-colors" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              className="w-full pl-12 pr-12 py-3.5 bg-base border-2 border-primary/20 dark:border-primary/30 rounded-xl text-base placeholder-base placeholder:opacity-40 focus:outline-none focus:border-primary transition-all"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-base opacity-60 cursor-pointer hover:opacity-80 transition-opacity">
              <input type="checkbox" className="mr-2 rounded accent-primary" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <motion.button
            onClick={handleSubmit}
            disabled={loginLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
          >
            {loginLoading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </div>

        <p className="text-center text-base opacity-60 mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-primary hover:underline font-semibold">
            Create Account
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
