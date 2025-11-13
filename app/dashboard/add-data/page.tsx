"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Database, CheckCircle, AlertCircle } from "lucide-react";
import { useUser } from "@/app/utils/apis/dashboard";

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
  // 🔥 Added here
  {
    value: "other",
    label: "Other (Specify Manually)",
    length: null,
    pattern: null,
    placeholder: "",
  },
];

export default function AddDataPage() {
  const [selectedType, setSelectedType] = useState("");
  const [dataValue, setDataValue] = useState("");
  const [customType, setCustomType] = useState(""); // 🔥 new state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { saveData } = useUser();

  const selectedDataType = dataTypes.find((dt) => dt.value === selectedType);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!selectedType) {
      setError("Please select a data type");
      return;
    }

    // 🔥 If "other", user must enter custom type
    if (selectedType === "other" && !customType.trim()) {
      setError("Please specify the custom data type");
      return;
    }

    if (!dataValue.trim()) {
      setError("Please enter your data");
      return;
    }

    // Validation only for non-other
    if (
      selectedDataType &&
      selectedType !== "other" &&
      selectedDataType.pattern &&
      !selectedDataType.pattern.test(dataValue)
    ) {
      setError(
        `Invalid format. Expected format: ${selectedDataType.placeholder}`
      );
      return;
    }

    // 🔥 Build final type (lowercase)
    const finalType =
      selectedType === "other"
        ? customType.trim().toLowerCase()
        : selectedType.toLowerCase();

    const payload = {
      data_type: finalType,
      encrypted_data: dataValue.trim(),
    };

    try {
      setLoading(true);
      await saveData.mutateAsync(payload);

      setSuccess(true);
      setDataValue("");
      setCustomType("");
      setSelectedType("");
    } catch (err: any) {
      setError(err.message || "Failed to save data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-title mb-2">Add Your Data</h1>
      <p className="text-base opacity-60">
        Securely store your personal identification data
      </p>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base border border-primary/10 rounded-2xl p-8 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Data Type Select */}
          <div>
            <label className="block text-sm font-semibold text-title mb-3">
              Select Data Type <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value);
                setDataValue("");
                setCustomType("");
                setError("");
              }}
              className="w-full px-4 py-3 bg-base border-2 border-primary/20 rounded-xl"
            >
              <option value="">Choose data type...</option>
              {dataTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* 🔥 Custom Type Input */}
          {selectedType === "other" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <label className="block text-sm font-semibold text-title">
                Enter Custom Data Type *
              </label>
              <input
                type="text"
                value={customType}
                onChange={(e) => setCustomType(e.target.value)}
                placeholder="e.g., tax_id, birth_cert"
                className="w-full px-4 py-3 bg-base border-2 border-primary/20 rounded-xl"
              />
            </motion.div>
          )}

          {/* Data Input */}
          {selectedType && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="block text-sm font-semibold text-title mb-3">
                Enter Data <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={dataValue}
                onChange={(e) =>
                  setDataValue(e.target.value.toUpperCase())
                }
                placeholder={selectedDataType?.placeholder || ""}
                className="w-full px-4 py-3 bg-base border-2 border-primary/20 rounded-xl"
              />
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
              <AlertCircle className="text-red-500 w-5 h-5" />
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-2">
              <CheckCircle className="text-green-500 w-5 h-5" />
              <p className="text-green-600">
                Data added successfully and encrypted!
              </p>
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading || !selectedType}
            className="w-full px-6 py-4 bg-primary text-white rounded-xl font-semibold"
          >
            {loading ? "Saving..." : "Add Data Securely"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
