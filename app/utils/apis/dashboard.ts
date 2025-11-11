"use client";
import { useQuery } from "@tanstack/react-query";
import showToast from "@/app/components/showToast";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth";

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

  return { getUserRequestedData };
}
