"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save, AlertCircle, CheckCircle } from "lucide-react";

interface ProfileData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  profile_picture_url: string;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    profile_picture_url: "",
  });

  const [errors, setErrors] = useState<Partial<ProfileData>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Partial<ProfileData> = {};

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 11 digits";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-title mb-2">Profile Settings</h1>
        <p className="text-base opacity-60">
          Manage your personal information
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base border border-primary/10 rounded-2xl p-8 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center overflow-hidden">
                {formData.profile_picture_url ? (
                  <img
                    src={formData.profile_picture_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-primary" />
                )}
              </div>
              <button
                type="button"
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <input
              type="url"
              name="profile_picture_url"
              value={formData.profile_picture_url}
              onChange={handleChange}
              placeholder="Profile picture URL (optional)"
              className="mt-4 px-4 py-2 bg-base border-2 border-primary/20 rounded-xl text-base focus:outline-none focus:border-primary transition-all text-center w-full max-w-md"
            />
          </div>

          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-title mb-3">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Enter first name"
                className={`w-full px-4 py-3 bg-base border-2 rounded-xl text-base focus:outline-none transition-all ${
                  errors.first_name
                    ? "border-red-500 focus:border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
              />
              {errors.first_name && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.first_name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-title mb-3">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Enter last name"
                className={`w-full px-4 py-3 bg-base border-2 rounded-xl text-base focus:outline-none transition-all ${
                  errors.last_name
                    ? "border-red-500 focus:border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
              />
              {errors.last_name && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.last_name}
                </p>
              )}
            </div>
          </div>

          {/* Date of Birth & Phone */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-title mb-3">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-base border-2 rounded-xl text-base focus:outline-none transition-all ${
                  errors.date_of_birth
                    ? "border-red-500 focus:border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
              />
              {errors.date_of_birth && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.date_of_birth}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-title mb-3">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="08012345678"
                maxLength={11}
                className={`w-full px-4 py-3 bg-base border-2 rounded-xl text-base focus:outline-none transition-all ${
                  errors.phone_number
                    ? "border-red-500 focus:border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
              />
              {errors.phone_number && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.phone_number}
                </p>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-semibold text-title mb-3">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full address"
              rows={4}
              className={`w-full px-4 py-3 bg-base border-2 rounded-xl text-base focus:outline-none transition-all resize-none ${
                errors.address
                  ? "border-red-500 focus:border-red-500"
                  : "border-primary/20 focus:border-primary"
              }`}
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.address}
              </p>
            )}
          </div>

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl"
            >
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-green-600 dark:text-green-400">
                Profile updated successfully!
              </p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25"
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Profile
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}