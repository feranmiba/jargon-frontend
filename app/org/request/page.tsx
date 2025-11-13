"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Mail,
  Clock,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Send,
  Plus,
  Minus,
} from "lucide-react";
import { useUser } from "@/app/utils/apis/dashboard";

interface Requesting {
  data_type: string[];
  email: string;
  description: string;
  minutes: number;
}

const dataTypes = [
  {
    value: "nin",
    label: "NIN",
    fullLabel: "National Identification Number",
    icon: "🆔",
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: "bvn",
    label: "BVN",
    fullLabel: "Bank Verification Number",
    icon: "🏦",
    color: "from-green-500 to-emerald-500",
  },
  {
    value: "driver_license",
    label: "Driver's License",
    fullLabel: "Driver's License",
    icon: "🚗",
    color: "from-orange-500 to-red-500",
  },
  {
    value: "passport",
    label: "Passport",
    fullLabel: "Passport Number",
    icon: "✈️",
    color: "from-purple-500 to-pink-500",
  },
  {
    value: "voter_card",
    label: "Voter's Card",
    fullLabel: "Voter's Card (PVC)",
    icon: "🗳️",
    color: "from-yellow-500 to-amber-500",
  },
];

function RequestData() {
  const [formData, setFormData] = useState<Requesting>({
    data_type: [],
    email: "",
    description: "",
    minutes: 30,
  });

  const [errors, setErrors] = useState<Partial<Requesting>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { requestDataMutation } = useUser()

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleDataTypeToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      data_type: prev.data_type.includes(value)
        ? prev.data_type.filter((dt) => dt !== value)
        : [...prev.data_type, value],
    }));
    setErrors((prev) => ({ ...prev, data_type: undefined }));
  };

  const handleMinutesChange = (change: number) => {
    setFormData((prev) => ({
      ...prev,
      minutes: Math.max(5, Math.min(1440, prev.minutes + change)),
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<Requesting> = {};

    if (formData.data_type.length === 0) {
      newErrors.data_type = ["Please select at least one data type"];
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please provide a reason for this request";
    }
    if (formData.minutes < 5) {
      newErrors.minutes = 5;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);


    try {
      await requestDataMutation.mutateAsync(formData)

      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
        setFormData({
          data_type: [],
          email: "",
          description: "",
          minutes: 30,
        });
      }, 2000);

    } catch (error: any) {
      setErrors(error.message || "Failed to save data. Please try again.");
    } finally {
      setIsSubmitting(false)
    }
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours} hour${hours > 1 ? "s" : ""}`;
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br  p-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-title">Request User Data</h1>
                <p className="text-base opacity-60">
                  Request secure access to user data with transparency
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-base  rounded-3xl  border border-gray-100  overflow-hidden"
          >
            <div className="p-8 space-y-8">
              {/* Data Types Selection */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-title mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  Select Data Types to Request
                  <span className="text-red-500">*</span>
                </label>
                <p className=" text-base opacity-60 mb-4">
                  Choose which data you need from the user (You can select multiple)
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dataTypes.map((type) => {
                    const isSelected = formData.data_type.includes(type.value);
                    return (
                      <motion.div
                        key={type.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDataTypeToggle(type.value)}
                        className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-14 h-14 bg-linear-to-br ${type.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}
                          >
                            {type.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-title">{type.label}</h3>
                            <p className=" text-base opacity-60">
                              {type.fullLabel}
                            </p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? "bg-primary border-primary"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                <CheckCircle className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {errors.data_type && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500  mt-3"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.data_type}
                  </motion.p>
                )}

                {formData.data_type.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800"
                  >
                    <p className=" text-green-700 dark:text-green-400 font-medium">
                      ✓ Selected {formData.data_type.length} data type
                      {formData.data_type.length > 1 ? "s" : ""}
                    </p>
                  </motion.div>
                )}
              </div>

              {/* User Email */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-title mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  User Email Address
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="user@example.com"
                  className={`w-full px-5 py-4 bg-base border-2 rounded-xl text-base placeholder-gray-400 focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-primary"
                  }`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-500  mt-2"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Access Duration */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-title mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  Access Duration
                </label>
                <p className=" text-base opacity-60 mb-4">
                  How long should the user have to respond? (5 mins - 24 hours)
                </p>

                <div className="flex items-center gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMinutesChange(-5)}
                    disabled={formData.minutes <= 5}
                    className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>

                  <div className="flex-1 px-6 py-4 bg-primary/5 border-2 border-primary/20 rounded-xl text-center">
                    <p className="text-3xl font-bold text-primary">
                      {formatTime(formData.minutes)}
                    </p>
                    <p className=" text-base opacity-60 mt-1">
                      Response deadline
                    </p>
                  </div>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMinutesChange(5)}
                    disabled={formData.minutes >= 1440}
                    className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </motion.button>
                </div>

                {/* Preset Time Options */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {[15, 30, 60, 120, 1440].map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setFormData({ ...formData, minutes: mins })}
                      className={`px-4 py-2 rounded-xl  font-medium transition-all ${
                        formData.minutes === mins
                          ? "bg-primary text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {formatTime(mins)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description/Reason */}
              <div>
                <label className="flex items-center gap-2 text-lg font-bold text-title mb-3">
                  <FileText className="w-5 h-5 text-primary" />
                  Reason for Request
                  <span className="text-red-500">*</span>
                </label>
                <p className=" text-base opacity-60 mb-3">
                  Explain why you need this data (The user will see this)
                </p>
                <textarea
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    setErrors({ ...errors, description: undefined });
                  }}
                  placeholder="We need your NIN and BVN to verify your identity for the loan application process..."
                  rows={5}
                  className={`w-full px-5 py-4 bg-base border-2 rounded-xl text-base placeholder-gray-400 focus:outline-none resize-none transition-all ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-200 dark:border-gray-700 focus:border-primary"
                  }`}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.description ? (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-500 "
                    >
                      <AlertCircle className="w-4 h-4" />
                      {errors.description}
                    </motion.p>
                  ) : (
                    <span></span>
                  )}
                  <span className=" text-base opacity-40">
                    {formData.description.length} characters
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gray-50 dark:bg-gray-900 px-8 py-6 border-t border-gray-200 dark:border-gray-700">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-linear-to-r from-primary to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Data Request
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-green-600" />
              </motion.div>

              <h3 className="text-2xl font-bold text-title text-center mb-3">
                Request Sent Successfully! 🎉
              </h3>
              <p className="text-base opacity-70 text-center mb-6">
                The user will receive an email notification and can approve or reject
                your data access request within the specified timeframe.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSuccess(false)}
                className="w-full px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition-all"
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default RequestData;