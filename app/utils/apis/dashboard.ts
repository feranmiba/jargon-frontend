"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import showToast from "@/app/components/showToast";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { userSavedData, UserProfile } from "../lib/types";

const api_url =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://your-backend-api.com/api/auth";

async function request(
  endpoint: string,
  token?: string,
  data?: any,
  method: string = "POST"
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${api_url}/${endpoint}`, {
    method,
    headers,
    body: method !== "GET" && data ? JSON.stringify(data) : undefined,
  });

  const result = await res.json().catch(() => ({}));

  // handle not found
  if (result?.detail === "Not Found") {
    return null;
  }

  if (!res.ok) {
    throw new Error(result.detail || result.message || "Something went wrong");
  }

  return result;
}

export function useUser() {
  const { token, clearToken } = useAuthStore();

  const getUserRequestedData = () => {
    return useQuery({
      queryKey: ["userRequestedData"],
      queryFn: () => request("get_user_requested_data", token || undefined, undefined, "GET"),
   
    });
  };


  const saveData = useMutation({
    mutationFn: (data: userSavedData) =>
      request("data_vault/save_data_vault", token || undefined, data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Saving data..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Data saved successfully!" });
    },
  });

  const createProfile = useMutation({
    mutationFn: (data: Partial<UserProfile>) =>
      request("create_user_profile", token || undefined, data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Creating profile..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Profile created successfully!" });
    },
  });




  return { getUserRequestedData, saveData, createProfile };
}
