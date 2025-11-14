"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Save, CheckCircle } from "lucide-react";
import { useUser } from "@/app/utils/apis/dashboard";
import { useRouter } from "next/navigation";

interface ProfileData {
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  phone_number: string;
  profile_picture_url: string;
}

export default function CreateProfile() {
  const [formData, setFormData] = useState<ProfileData>({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    address: "",
    phone_number: "",
    profile_picture_url: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const  router  = useRouter();

  const { createUserProfile } = useUser();

  // 🔥 Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    setSuccess(false);
    setLoading(true);
  
    try {
      const response = await createUserProfile.mutateAsync(formData);
  
      if (response) {
        setSuccess(true);
  
        // Redirect AFTER successful profile creation
        router.push('/dashboard');
      }
  
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-base border border-primary/10 rounded-2xl p-8 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-6">


          {/* First & Last Name */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-3">
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
              <label className="block text-sm font-semibold mb-3">
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
              <label className="block text-sm font-semibold mb-3">
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
              <label className="block text-sm font-semibold mb-3">
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
            <label className="block text-sm font-semibold mb-3">
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

          {/* Success Message */}
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
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25 cursor-pointer"
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
