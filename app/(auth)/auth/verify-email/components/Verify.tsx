"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/utils/apis/auth";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const { verifyEmailMutation } = useAuth();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error" | "idle">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid or missing verification token.");
      return;
    }

    const verify = async () => {
      try {
        setStatus("loading");
        const res = await verifyEmailMutation.mutateAsync({ token });
        setStatus("success");
        localStorage.setItem("firstTime", "true");
        router.push("/auth/login")
        setMessage(res?.message || "Your email has been verified successfully!");
      } catch (err: any) {
        setStatus("error");
        const errorMsg =
          err?.response?.data?.detail ||
          err?.message ||
          err?.detail ||
          "Verification failed. Please try again.";
        setMessage(errorMsg);
      }
    };

    verify();
  }, [token]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md text-center"
    >
      <div className="bg-base border-2 border-primary/10 rounded-3xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <Mail className="w-10 h-10 text-primary mb-3" />
          <h2 className="text-2xl font-bold text-title mb-2">
            {status === "success"
              ? "Email Verified 🎉"
              : status === "error"
              ? "Verification Failed"
              : "Verifying Email"}
          </h2>

          <p className="text-base opacity-70">{message}</p>
        </div>

        {status === "loading" && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="mx-auto w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
          />
        )}
      </div>
    </motion.div>
  );
}
