"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useUser } from "@/app/utils/apis/dashboard";

interface DataRequest {
  id: string;
  organization: string;
  dataTypes: string[];
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

export default function ActionsPage() {
  const { getUserRequestedData } = useUser();

  const { data } = getUserRequestedData();
  const [requests, setRequests] = useState<DataRequest[]>([
    {
      id: "1",
      organization: "TechCorp Nigeria",
      dataTypes: ["NIN", "BVN"],
      requestDate: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      organization: "Fintech Solutions",
      dataTypes: ["Driver License"],
      requestDate: "5 hours ago",
      status: "pending",
    },
    {
      id: "3",
      organization: "Healthcare Plus",
      dataTypes: ["NIN"],
      requestDate: "1 day ago",
      status: "pending",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
  };

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((req) => req.status === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-title mb-2">Data Requests</h1>
        <p className="text-base opacity-60">
          Review and manage organization data requests
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { value: "all", label: "All Requests" },
          { value: "pending", label: "Pending" },
          { value: "approved", label: "Approved" },
          { value: "rejected", label: "Rejected" },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value as any)}
            className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
              filter === tab.value
                ? "bg-primary text-white"
                : "bg-primary/5 text-base hover:bg-primary/10"
            }`}
          >
            {tab.label} (
            {tab.value === "all"
              ? requests.length
              : requests.filter((r) => r.status === tab.value).length}
            )
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredRequests.map((request, index) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.1 }}
              className="bg-base border border-primary/10 rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-title mb-1">
                      {request.organization}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {request.dataTypes.map((type) => (
                        <span
                          key={type}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <p className=" text-base opacity-60 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {request.requestDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {request.status === "pending" ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(request.id, "approved")}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(request.id, "rejected")}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </motion.button>
                    </>
                  ) : request.status === "approved" ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Approved
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium">
                      <XCircle className="w-4 h-4" />
                      Rejected
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredRequests.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Building2 className="w-16 h-16 text-primary/30 mx-auto mb-4" />
            <p className="text-base opacity-60">No {filter} requests found</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
