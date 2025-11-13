"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Building2, Shield } from "lucide-react";
import Link from "next/link";
import { useUser } from "../utils/apis/dashboard";
import showToast from "../components/showToast";
import toast from "react-hot-toast";

export default function StudentDashboardHome() {
  const { getUserRequestedData } = useUser();
  const { data, isLoading, isError } = getUserRequestedData();

  React.useEffect(() => {
    toast.dismiss();
    if (isLoading) {
      showToast({ type: "loading", message: "Loading your data..." });
    } else if (isError) {
      showToast({ type: "error", message: "Failed to load user data" });
    } else if (data) {
      showToast({ type: "success", message: "User data loaded successfully" });
    }
  }, [isLoading, isError, data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-base relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 1, 0.4],
            textShadow: [
              "0 0 10px rgba(255,255,255,0.3)",
              "0 0 20px rgba(59,130,246,0.8)",
              "0 0 10px rgba(255,255,255,0.3)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-6xl font-extrabold tracking-wider text-primary blur-[1px]"
        >
          JARGON
        </motion.h1>

        {/* Background glow effect */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-blue-500/5 to-transparent blur-3xl animate-pulse" />
      </div>
    );
  }

  const stats = [
    {
      icon: Users,
      label: "Total Requests",
      value: data?.totalRequests ?? "24",
      change: "+12%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Building2,
      label: "Organizations",
      value: data?.organizations ?? "8",
      change: "+3",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      label: "Data Protected",
      value: "100%",
      change: "Secure",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const recentRequests = data?.requests ?? [
    {
      org: "TechCorp Nigeria",
      dataType: "NIN, BVN",
      date: "2 hours ago",
      status: "pending",
    },
    {
      org: "Fintech Solutions",
      dataType: "Driver License",
      date: "5 hours ago",
      status: "pending",
    },
    {
      org: "Healthcare Plus",
      dataType: "NIN",
      date: "1 day ago",
      status: "pending",
    },
  ];


  if (!isLoading && !isError && data === null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center space-y-4">
        <Shield className="w-16 h-16 text-primary/40" />
        <h2 className="text-2xl font-semibold text-title">No Data Found</h2>
        <p className="text-base opacity-60">
          You don’t have any requests yet. Start by adding new data!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-title mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-base opacity-60">
          Here's what's happening with your data requests
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-base border border-primary/10 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-linear-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm text-green-600 font-semibold">
                  {stat.change}
                </span>
              </div>
              <p className="text-base opacity-60 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-title">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Requests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-base border border-primary/10 rounded-2xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-title">Recent Requests</h2>
          <Link
            href="/dashboard/actions"
            className="text-primary hover:underline text-sm font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="space-y-4">
          {recentRequests.map((request: any, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-title">{request.org}</p>
                  <p className="text-base opacity-60">{request.dataType}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-base opacity-60">{request.date}</p>
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full mt-1">
                  Pending
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {recentRequests.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <p className="text-base opacity-60">No pending requests</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
