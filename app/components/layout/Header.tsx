"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Menu, X, Shield } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

interface DashboardLink {
  icon: any;
  text: string;
  href: string;
}

interface HeaderProps {
  dashboardLinks: DashboardLink[];
  pathname: string;
}

function Header({ dashboardLinks, pathname }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <section className="fixed top-0 left-0 w-full bg-base border-b border-primary/10 shadow-sm z-50 px-5 py-4">
        <header className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-title">Jargon</span>
          </Link>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
            >
              <Bell className="w-5 h-5 text-primary" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 rounded-xl hover:bg-primary/5 transition-colors"
          >
            <Menu className="w-6 h-6 text-title" />
          </button>
        </header>
      </section>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-3/4 sm:w-1/2 bg-base shadow-2xl z-50 md:hidden"
            >
              <div className="p-6 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-title">
                      Jargon
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-xl hover:bg-primary/5 transition-colors"
                  >
                    <X className="w-6 h-6 text-title" />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2">
                  {dashboardLinks.map((item, idx) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-base hover:bg-primary/5"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.text}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Notification Bell */}
                <button className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-primary/5 transition-colors">
                  <Bell className="w-5 h-5 text-primary" />
                  <span className="font-medium text-base">Notifications</span>
                  <span className="ml-auto w-6 h-6 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


       <div className="absolute top-6 right-14 z-50">
              <ThemeToggle />
            </div>
    </>
  );
}

export default Header;
