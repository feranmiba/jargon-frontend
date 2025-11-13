"use client";

import React from "react";
import { motion } from "framer-motion";
import { FolderCheck, ShieldCheck, AlertTriangle, Database, Layers } from "lucide-react";
import { useUser } from "../utils/apis/dashboard";
import showToast from "../components/showToast";
import toast from "react-hot-toast";
import Link from "next/link";

export default function StudentDashboardHome() {
  const { orgStats } = useUser();
  const { data, isLoading, isError } = orgStats();

  React.useEffect(() => {
    toast.dismiss();
    if (isLoading) showToast({ type: "loading", message: "Loading your stats..." });
    if (isError) showToast({ type: "error", message: "Failed to load stats" });
    if (data) showToast({ type: "success", message: "Dashboard loaded" });
  }, [isLoading, isError, data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base relative">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl font-extrabold text-primary tracking-wide"
        >
          JARGON
        </motion.h1>
      </div>
    );
  }

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <ShieldCheck className="w-16 h-16 text-primary/40" />
        <h2 className="text-2xl font-semibold text-title">No Stats Yet</h2>
        <p className="text-base opacity-60">Add or request data to see statistics.</p>
      </div>
    );

  const requestStats = data.request_data_stats;
  const addedStats = data.added_data_stats;

  const cards = [
    {
      icon: Layers,
      title: "Total Request Data",
      value: requestStats.total_request_data,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FolderCheck,
      title: "Approved Requests",
      value: requestStats.approved_request_data,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: AlertTriangle,
      title: "Rejected Requests",
      value: requestStats.rejected_request_data,
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Database,
      title: "Pending Requests",
      value: requestStats.un_approved_request_data,
      color: "from-yellow-500 to-orange-500",
    },

    // Added Data
    {
      icon: Layers,
      title: "Total Added Data",
      value: addedStats.total_added_data,
      color: "from-purple-500 to-fuchsia-500",
    },
    {
      icon: ShieldCheck,
      title: "Approved Added Data",
      value: addedStats.approved_added_data,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: AlertTriangle,
      title: "Rejected Added Data",
      value: addedStats.rejected_added_data,
      color: "from-red-500 to-rose-500",
    },
    {
      icon: Database,
      title: "Pending Added Data",
      value: addedStats.un_approved_added_data,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 py-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-title">Welcome Back 👋</h1>
        <p className="text-base opacity-60">Here's your data activity summary</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-base border border-primary/10 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <p className="text-base opacity-60">{stat.title}</p>
              <p className="text-4xl font-bold text-title mt-1">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-primary/10 border border-primary/20 rounded-2xl p-8 text-center space-y-4"
      >
        <h2 className="text-lg font-semibold text-title">
          Manage requests & added data easily
        </h2>
        <Link
          href="/org/request"
          className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/80 transition"
        >
          Go to Actions →
        </Link>
      </motion.div>
    </div>
  );
}
