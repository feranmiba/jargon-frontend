"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, CheckCircle, AlertCircle } from "lucide-react";

const dataTypes = [
  {
    value: "nin",
    label: "NIN (National Identification Number)",
    length: 11,
    pattern: /^\d{11}$/,
    placeholder: "12345678901",
  },
  {
    value: "bvn",
    label: "BVN (Bank Verification Number)",
    length: 11,
    pattern: /^\d{11}$/,
    placeholder: "22345678901",
  },
  {
    value: "driver_license",
    label: "Driver's License",
    length: 12,
    pattern: /^[A-Z]{3}\d{9}$/,
    placeholder: "ABC123456789",
  },
  {
    value: "passport",
    label: "Passport Number",
    length: 9,
    pattern: /^[A-Z]\d{8}$/,
    placeholder: "A12345678",
  },
  {
    value: "voter_card",
    label: "Voter's Card (PVC)",
    length: 19,
    pattern: /^\d{2}[A-Z]{2}\d{11}[A-Z]{2}\d{2}$/,
    placeholder: "90F5B639210270811ABC12",
  },
];

export default function AddDataPage() {
  const [selectedType, setSelectedType] = useState("");
  const [dataValue, setDataValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedDataType = dataTypes.find((dt) => dt.value === selectedType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!selectedType) {
      setError("Please select a data type");
      return;
    }

    if (!dataValue.trim()) {
      setError("Please enter your data");
      return;
    }

    if (selectedDataType && !selectedDataType.pattern.test(dataValue)) {
      setError(
        `Invalid format. Expected format: ${selectedDataType.placeholder}`
      );
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setDataValue("");
      setSelectedType("");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-title mb-2">Add Your Data</h1>
        <p className="text-base opacity-60">
          Securely store your personal identification data
        </p>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base border border-primary/10 rounded-2xl p-8 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Type Selection */}
          <div>
            <label className="block text-sm font-semibold text-title mb-3">
              Select Data Type <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setDataValue("");
                setError("");
              }}
              className="w-full px-4 py-3 bg-base border-2 border-primary/20 rounded-xl text-base focus:outline-none focus:border-primary transition-all"
            >
              <option value="">Choose data type...</option>
              {dataTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Data Value Input */}
          {selectedType && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <label className="block text-sm font-semibold text-title mb-3">
                Enter {selectedDataType?.label}{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={dataValue}
                onChange={(e) => {
                  setDataValue(e.target.value.toUpperCase());
                  setError("");
                }}
                placeholder={selectedDataType?.placeholder}
                className={`w-full px-4 py-3 bg-base border-2 rounded-xl text-base focus:outline-none transition-all ${
                  error
                    ? "border-red-500 focus:border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
              />
              <p className=" text-base opacity-50 mt-2">
                Format: {selectedDataType?.placeholder} ({selectedDataType?.length}{" "}
                characters)
              </p>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
            >
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-600 dark:text-green-400">
                Data added successfully and encrypted!
              </p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !selectedType}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Adding Data...
              </>
            ) : (
              <>
                <Database className="w-5 h-5" />
                Add Data Securely
              </>
            )}
          </motion.button>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-primary/5 rounded-xl">
          <p className=" text-base opacity-60 text-center">
            🔒 Your data is encrypted end-to-end and stored securely
          </p>
        </div>
      </motion.div>
    </div>
  );
}
