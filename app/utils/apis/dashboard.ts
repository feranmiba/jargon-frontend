"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import showToast from "@/app/components/showToast";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/auth";
import { userSavedData, UserProfile, Requesting } from "../lib/types";

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


  const userDataPaylod = {
    data_type: []
  }

  const getUserRequestedData = () => {
    return useQuery({
      queryKey: ["userRequestedData"],
      queryFn: () => request("get_thirdparty_data_requests", token || undefined, undefined, "GET"),
   
    });
  };


  const getUserSavedData = () => {
    return useQuery({
      queryKey: ["userSavedData"],
      queryFn: () => request(`data_vault/get_user_data`, token || undefined, undefined, "GET"),
    })
  }

  const getUserProfile = () => {
    return useQuery({
      queryKey: ["userProfile"],
      queryFn: () => request("get_user_profile", token || undefined, undefined, "GET"),
    });
  }


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
      request("update_user_profile", token || undefined, data, "PATCH"),
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
      showToast({ type: "success", message: "Profile updated successfully!" });
    },
  });


  const createUserProfile = useMutation({
    mutationFn: (data: Partial<UserProfile>) =>
      request("create_user_profile", token || undefined, data, "POST"),
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

  const requestDataMutation = useMutation({
    mutationFn: (data: Requesting) =>
      request(`org/get_user_data?description=${data.description}&email=${data.email}&minutes=${data.minutes}`, token || undefined, data.data_type),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Requesting data..." });
    },
    onError: (error: any) => {
      toast.dismiss()
      showToast({type:"error", message: error.message});
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Data requested successfully!" });
    }
  })

  const getRequestedForData = (email: string, enabled: boolean) => {
    return useQuery({
      queryKey: ["requestedData", email],
      queryFn: () =>
        request(
          `org/decrypt_user_request_data?email=${email}`,
          token || undefined,
          undefined,
          "GET"
        ),
      enabled, 
    });
  };


  const approveOrRejectData = useMutation({
    mutationFn: (data: { data_id: string; action: "approve" | "reject" | "un_approve" }) =>
      request(
        `approve_reject?data_id=${data.data_id}&response=${data.action}`,
        token || undefined,
        undefined,
        "PATCH"
      ),
  onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Processing request..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Request processed successfully!" });
    }
  });

  const orgAdduserData = useMutation({
    mutationFn: (data: userSavedData) =>
      request("org/add_user_vic_data", token || undefined, data),
  onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Adding user data..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "User data added successfully!" });
    },
  });

  const orgStats = () => {
    return useQuery({
      queryKey: ["orgStats"],
      queryFn: () => request("org/get_org_stat", token || undefined, undefined, "GET"),
    });
  }

  const userNotification = () => {
    return useQuery({
      queryKey: ["userNotification"],
      queryFn: () => request("get_user_notification", token || undefined, undefined, "GET")
    })
  }

  const orgNotification = () => {
    return useQuery({
      queryKey: ["userNotification"],
      queryFn: () => request("org/get_user_notification", token || undefined, undefined, "GET")
    })
  }

  const userResetPassword = useMutation({
    mutationFn: (data: { token: string; new_password: string }) =>
      request(`change_password?new_pass=${data.new_password}&token=${data.token}`, token || undefined, undefined, "PUT"),
  onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Resetting password..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Password reset succesfully" });
    },
  });
  const orgResetPassword = useMutation({
    mutationFn: (data: { token: string; new_password: string }) =>
      request(`org/change_password?new_pass=${data.new_password}&token=${data.token}`, token || undefined, undefined, "PUT"),
  onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Resetting password..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Password reset succesfully" });
    },
  });

  const sendResetEmail = useMutation({
    mutationFn: (data: { email: string }) =>
      request(`change_password_email?email=${data.email}`, undefined, undefined, "PUT"),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Sending reset email..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Reset email sent successfully" });
    },
  });

  const orgSendResetEmail = useMutation({
    mutationFn: (data: { email: string }) =>
      request(`org/change_password_email?email=${data.email}`, undefined, undefined, "PUT"),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: "loading", message: "Sending reset email..." });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({ type: "error", message: error.message });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({ type: "success", message: "Reset email sent successfully" });
    },
  });




  return { getUserRequestedData, saveData, createProfile, getUserSavedData, getUserProfile, requestDataMutation, getRequestedForData, orgAdduserData, approveOrRejectData, orgStats, createUserProfile, userNotification, orgNotification, orgResetPassword, userResetPassword, orgSendResetEmail, sendResetEmail };
}
