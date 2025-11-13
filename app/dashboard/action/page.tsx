"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Check,
  X,
  Clock,
  CheckCircle,
  XCircle,
  Hourglass,
} from "lucide-react";
import { useUser } from "@/app/utils/apis/dashboard";

type APIResponse = {
  "Data Type": string;
  Data: string;
  idx: string;
  "Created At": string;
  "Updated At": string;
  "Requested By": string;
  status: string;
  Duration: number;
};

export default function ActionsPage() {
  const { getUserRequestedData, approveOrRejectData } = useUser();
  const { data, isLoading, isError, refetch } = getUserRequestedData();

  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected" | "expired"
  >("all");

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleAction = async (
    data_id: string,
    action: "approve" | "reject"
  ) => {
    try {
      setLoadingId(data_id);
      await approveOrRejectData.mutateAsync({ data_id, action });
      refetch();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  const requests = useMemo(() => {
    if (!data) return [];

    const now = new Date();

    return data.map((item: APIResponse, index: number) => {
      const createdAt = new Date(item["Created At"]);
      const expiresAt = new Date(
        createdAt.getTime() + item.Duration * 60 * 1000
      );
      const expired = now > expiresAt;
      const remainingMins = Math.max(
        0,
        Math.round((expiresAt.getTime() - now.getTime()) / 60000)
      );

      return {
        id: item.idx || String(index),
        organization: item["Requested By"] || "Unknown Org",
        dataTypes: [item["Data Type"]],
        requestDate: createdAt.toLocaleString(),
        expired,
        remainingMins,
        status:
          expired && item.status === "un_approved"
            ? "expired"
            : item.status === "un_approved"
            ? "pending"
            : item.status === "approve"
            ? "approve"
            : "rejected",
      };
    });
  }, [data]);

  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter((r: any) => r.status === filter);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64 text-primary">
        <Clock className="animate-spin mr-2" />
        Loading requests...
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-500 font-medium py-10">
        Failed to load requests 😞
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-title mb-2">Data Requests</h1>
        <p className="text-base opacity-60">
          Review, approve, or reject organization data requests
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { value: "all", label: "All Requests" },
          { value: "pending", label: "Pending" },
          { value: "approve", label: "Approve" },
          { value: "rejected", label: "Rejected" },
          { value: "expired", label: "Expired" },
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
              : requests.filter((r: any) => r.status === tab.value).length}
            )
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredRequests.map((request: any, index: any) => (
            <motion.div
              key={request.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-base border border-primary/10 rounded-2xl p-6 shadow-sm ${
                request.expired ? "opacity-70" : ""
              }`}
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
                      {request.dataTypes.map((type: any) => (
                        <span
                          key={type}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                    <p className="text-base opacity-60 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Requested: {request.requestDate}
                    </p>

                    {request.expired ? (
                      <p className="text-sm text-red-500 mt-1">
                        ❌ Expired — Duration exceeded
                      </p>
                    ) : (
                      <p className="text-sm text-green-600 mt-1">
                        ⏳ Expires in {request.remainingMins} mins
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {request.expired ? (
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-600 rounded-xl font-medium">
                      <Hourglass className="w-4 h-4" />
                      Expired
                    </div>
                  ) : request.status === "pending" ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(request.id, "approve")}
                        disabled={loadingId === request.id}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors disabled:opacity-70"
                      >
                        {loadingId === request.id ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <Check className="w-4 h-4" />
                        )}
                        Approve
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(request.id, "reject")}
                        disabled={loadingId === request.id}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-70"
                      >
                        {loadingId === request.id ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <X className="w-4 h-4" />
                        )}
                        Reject
                      </motion.button>
                    </>
                  ) : request.status === "approve" ? (
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
