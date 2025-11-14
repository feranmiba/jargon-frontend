"use client";

import React, { useState } from "react";
import { useUser } from "@/app/utils/apis/dashboard";
import { useSearchParams, useRouter } from "next/navigation";

function Reset() {
  const { orgResetPassword } = useUser();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!token) {
      alert("Missing reset token. Please try again.");
      return;
    }

    if (!password.trim()) {
      alert("Password cannot be empty");
      return;
    }

    try {
      setLoading(true);

      await orgResetPassword.mutateAsync({
        token: token,
        new_password: password,
      });

      router.push("/org/login");

    } catch (error: any) {
      console.error("Error resetting password:", error);
      alert("Reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reset Password</h2>

        {!token ? (
          <p className="text-red-500 text-center">
            Invalid or expired reset link.
          </p>
        ) : (
          <>
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
            />

            <button
              onClick={handleReset}
              disabled={loading}
              className="w-full bg-blue-600 text-white p-2 rounded-lg disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Reset;
