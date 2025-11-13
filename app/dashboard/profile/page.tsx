"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Camera,
  Save,
  AlertCircle,
  CheckCircle,
  Edit3,
  ArrowLeft,
} from "lucide-react";
import { useUser } from "@/app/utils/apis/dashboard";
import { useQueryClient } from "@tanstack/react-query";

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
  const [editMode, setEditMode] = useState(false);

  const { createProfile, getUserProfile } = useUser();
  const { data, isLoading, isError, refetch } = getUserProfile();

  const queryClient = useQueryClient();

  // Prefill the form when user data is fetched
  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        date_of_birth: data.date_of_birth || "",
        address: data.address || "",
        phone_number: data.phone_number || "",
        profile_picture_url: data.profile_picture_url || "",
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    await createProfile.mutateAsync(formData);

    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      setEditMode(false);
      refetch();
    }, 1500);

    queryClient.invalidateQueries({ queryKey: ["userProfile"] });

  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load profile. Please try again later.
      </p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-title mb-2">Profile</h1>
          <p className="text-base opacity-60">Manage your personal information</p>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <button
            onClick={() => setEditMode(false)}
            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel
          </button>
        )}
      </motion.div>

      {/* Profile View or Edit Form */}
      {!editMode ? (
        // VIEW MODE
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-base border border-primary/10 rounded-2xl p-8 shadow-sm"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
              {data?.profile_picture_url ? (
                <img
                  src={data.profile_picture_url}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-primary" />
              )}
            </div>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-xl font-semibold text-title">
              {data?.first_name} {data?.last_name}
            </p>
            <p className="text-gray-500">{data?.date_of_birth}</p>
            <p className="text-gray-500">{data?.phone_number}</p>
            <p className="text-gray-500">{data?.address}</p>
          </div>
        </motion.div>
      ) : (
        // EDIT MODE (Your Existing Form)
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
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none border-primary/20 focus:border-primary"
                />
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
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Date of Birth & Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-title mb-3">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none border-primary/20 focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-title mb-3">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none border-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-title mb-3">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none border-primary/20 focus:border-primary resize-none"
              />
            </div>

            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <p className="text-sm text-green-600">Profile updated successfully!</p>
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
      )}
    </div>
  );
}
