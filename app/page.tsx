"use client";

import { motion } from "framer-motion";
import ThemeToggle from "./components/ThemeToggle";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Home() {
  const features = [
    {
      title: "Data Ownership",
      desc: "You approve every data request. No one accesses your information without consent.",
      icon: "shield-check",
    },
    {
      title: "Zero Trust Security",
      desc: "Your identity is encrypted and verified using cutting-edge protocols.",
      icon: "lock-closed",
    },
    {
      title: "Decentralized Control",
      desc: "Your data resides with you, not in a corporate server farm.",
      icon: "network",
    },
  ];

  return (
    <main className="relative min-h-screen bg-base text-base overflow-hidden font-sans transition-colors duration-300">
      {/* Background glowing gradient orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 blur-[160px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-120 h-120 bg-primary/10 blur-[200px] rounded-full animate-pulse-slow" />

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-36 space-y-8 max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-title leading-tight"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Take Control of Your{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-blue-800">
            Digital Identity
          </span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-note max-w-3xl leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Manage your identity, verify access requests, and protect your data sovereignty in a decentralized ecosystem — with total transparency.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button className="px-8 py-4 rounded-xl bg-primary text-white font-semibold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-primary/30">
            Get Started
          </button>
          <button className="px-8 py-4 rounded-xl border border-primary text-primary font-semibold text-lg hover:bg-primary/10 transition">
            Explore Features
          </button>
        </motion.div>
      </section>

      {/* Animated Floating Icons */}
      <motion.div
        className="absolute top-1/3 left-10 text-primary/40"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
      >
        <Github size={40} />
      </motion.div>

      <motion.div
        className="absolute bottom-1/3 right-10 text-secondary/40"
        animate={{ y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 7 }}
      >
        <LockIcon />
      </motion.div>

      {/* Features Section */}
      <section className="px-6 md:px-16 py-24 bg-muted/30 backdrop-blur-sm">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-title drop-shadow-md">
          Key Features
        </h2>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="p-8 bg-card rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-2 transform transition duration-300 ease-in-out"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center justify-center mb-4 text-primary text-4xl">
                {f.icon === "shield-check" && <ShieldIcon />}
                {f.icon === "lock-closed" && <LockIcon />}
                {f.icon === "network" && <NetworkIcon />}
              </div>
              <h3 className="text-xl font-semibold text-title mb-2">{f.title}</h3>
              <p className="text-note">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-linear-to-r from-primary/10 via-transparent to-secondary/10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-title">
          Ready to Secure Your Digital Life?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-note leading-relaxed text-lg">
          Start using Jargon today and regain full control over your data sovereignty.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="px-10 py-4 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-primary/40 transition"
        >
          Get Started Now
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center bg-base border-t border-muted/30">
        <p className="text-sm text-note">
          © {new Date().getFullYear()} Jargon — Built for the Data Sovereignty Hackathon.
        </p>
        <div className="flex justify-center gap-6 mt-4 text-note">
          <a href="#" className="hover:text-primary transition"><Github /></a>
          <a href="#" className="hover:text-primary transition"><Twitter /></a>
          <a href="#" className="hover:text-primary transition"><Linkedin /></a>
        </div>
      </footer>
    </main>
  );
}

/* Icons */
function ShieldIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3l7 4v5c0 5.25-3.5 9.75-7 10-3.5-.25-7-4.75-7-10V7l7-4z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-4 0h8a2 2 0 002-2v-4a2 2 0 00-2-2H8a2 2 0 00-2 2v4a2 2 0 002 2zm2-8V7a4 4 0 018 0v2" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-12 h-12">
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36-6.36l-2.12 2.12M6.76 17.24l-2.12 2.12M17.24 17.24l2.12 2.12M6.76 6.76L4.64 4.64" />
    </svg>
  );
}
