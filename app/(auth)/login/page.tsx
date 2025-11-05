"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/app/utils/apis/auth";

export default function Login() {
  const { login, loginLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base text-base">
      <motion.div
        className="bg-base rounded-2xl p-8 shadow-lg w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-semibold text-title mb-6 text-center">
          Welcome Back
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 rounded-lg border border-primary/20 bg-transparent focus:outline-none focus:border-primary"
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 rounded-lg border border-primary/20 bg-transparent focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 bg-primary text-white rounded-lg hover:opacity-90 transition disabled:opacity-70"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

