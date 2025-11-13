"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/app/utils/apis/dashboard";
import { Loader2, Plus, Send, UserSearch } from "lucide-react";

export default function OrganizationDataPage() {
  const { getRequestedForData, orgAdduserData } = useUser();

  const [email, setEmail] = useState("");
  const [dataType, setDataType] = useState("");
  const [encryptedData, setEncryptedData] = useState("");
  const [fetchedEmail, setFetchedEmail] = useState("");
  const [error, setError] = useState("");

  // React Query hook (called when email is set)
  const {
    data: fetchedData,
    isLoading,
    isError,
    refetch,
  } = getRequestedForData(fetchedEmail, true);

  const handleFetchUserData = async () => {
    if (!email) return setError("Please enter a user email.");
    setError("");
    setFetchedEmail(email);
    await refetch(); // trigger manual refetch from React Query
  };

  const handleAddUserData = async () => {
    if (!dataType || !encryptedData)
      return setError("Please fill out all fields before adding data.");
    setError("");
    try {
      await orgAdduserData.mutateAsync({
        data_type: dataType,
        encrypted_data: encryptedData,
        email,
        user_id: ""
      });
      setDataType("");
      setEncryptedData("");
      refetch();
    } catch (err) {
      console.error(err);
      setError("Failed to add user data.");
    }
  };

  return (
    <div className="min-h-screen bg-base text-title py-10 px-6 md:px-20">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-primary">
            Organization Dashboard
          </h1>
          <p className="text-note mt-2">
            Manage and view user data securely.
          </p>
        </motion.div>

        {/* Search User */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-primary/5 p-6 rounded-2xl shadow-md border border-primary/10"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <UserSearch className="w-5 h-5 text-primary" /> Search User
          </h2>

          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user email"
              className="flex-1 px-4 py-2 rounded-lg border border-primary/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              onClick={handleFetchUserData}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Fetch
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          {isError && (
            <p className="text-red-500 text-sm mt-3">
              Failed to fetch user data.
            </p>
          )}
        </motion.div>

        {/* Add New Data */}
        {fetchedData?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-primary/5 p-6 rounded-2xl shadow-md border border-primary/10"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" /> Add More User Data
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={dataType}
                onChange={(e) => setDataType(e.target.value)}
                placeholder="Data Type (e.g., bvn)"
                className="px-4 py-2 rounded-lg border border-primary/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <input
                type="text"
                value={encryptedData}
                onChange={(e) => setEncryptedData(e.target.value)}
                placeholder="Encrypted Data"
                className="px-4 py-2 rounded-lg border border-primary/20 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <button
              onClick={handleAddUserData}
              disabled={orgAdduserData.isPending}
              className="mt-4 w-full flex items-center justify-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
            >
              {orgAdduserData.isPending ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
              Add Data
            </button>
          </motion.div>
        )}

        {/* Display Data */}
        {fetchedData?.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Fetched User Data</h2>
            {fetchedData.map((item: any, index: any) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-primary/10 border border-primary/20 rounded-xl hover:bg-primary/15 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-primary">
                      {item["Data Type"].toUpperCase()}
                    </p>
                    <p className="text-note">{item["Data"]}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(item["Created At"]).toLocaleDateString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
