"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/app/utils/apis/auth";
import {
  Building2,
  User,
  Mail,
  FileText,
  Hash,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Info,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";

interface Organization {
  organization_name: string;
  contact_name: string;
  contact_email: string;
  document_type: "CAC_REGISTRATION" | "GOVERNMENT_LICENSE" | "TAX_IDENTIFICATION_NUMBER" | "OTHER";
  document_reference: string;
  document_storage_url: string;
  password: string;
}

export default function Signup() {
  const { organizationSignUpMutation, organizationSignUpMutationLoading } = useAuth();
  const [form, setForm] = useState<Organization>({
    organization_name: "",
    contact_name: "",
    contact_email: "",
    document_type: "CAC_REGISTRATION",
    document_reference: "",
    document_storage_url: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPasswordGuide, setShowPasswordGuide] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.organization_name.trim())
      newErrors.organization_name = "Organization name is required";

    if (!form.contact_name.trim())
      newErrors.name = "Contact name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.contact_email))
      newErrors.email = "Invalid contact email";

    if (!form.document_reference.trim())
      newErrors.document_reference = "Document reference is required";

    if (!form.document_storage_url.trim())
      newErrors.document_storage_url = "Document storage URL is required";

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{12,})/; // At least 12 characters
    if (!passwordRegex.test(form.password))
      newErrors.password =
        "Password must have at least 12 chars, one uppercase, and one special character";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    try {

        const payload = {
        organization_name: form.organization_name,
        contact_name: form.contact_name,
        contact_email: form.contact_email,
        document_type: form.document_type,
        document_reference: form.document_reference,
        document_storage_url: String(form.document_storage_url),
        password: form.password,
        }

      const res = await organizationSignUpMutation.mutateAsync(payload);
      if (res?.status === 200 || res?.success) {
        setTimeout(() => {
          window.location.href = "/org/verify-email";
        }, 2000);
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-md"
    >
      <div className="bg-base border-2 border-primary/10 dark:border-primary/20 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-16 h-16 mx-auto mb-4 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center"
          >
            <Shield className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold text-title mb-2">
            Register Organization
          </h2>
          <p className="text-base opacity-60">
            Securely register your organization with verified documents
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            icon={Building2}
            placeholder="Organization Name"
            value={form.organization_name}
            onChange={(v) => setForm({ ...form, organization_name: v })}
            error={errors.organization_name}
          />

          <InputField
            icon={User}
            placeholder="Contact Name"
            value={form.contact_name}
            onChange={(v) => setForm({ ...form, contact_name: v })}
            error={errors.name}
          />

          <InputField
            icon={Mail}
            type="email"
            placeholder="Contact Email"
            value={form.contact_email}
            onChange={(v) => setForm({ ...form, contact_email: v })}
            error={errors.email}
          />

          {/* ✅ Document Type - Dropdown */}
          <div className="relative group">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <select
              value={form.document_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  document_type: e.target.value as Organization["document_type"],
                })
              }
              className="w-full pl-12 pr-4 py-3.5 bg-base border-2 rounded-xl text-base focus:outline-none transition-all border-primary/20 dark:border-primary/30 focus:border-primary"
            >
              <option value="CAC_REGISTRATION">CAC_REGISTRATION</option>
              <option value="GOVERNMENT_LICENSE">GOVERNMENT_LICENSE</option>
              <option value="TAX_IDENTIFICATION_NUMBER">TAX_IDENTIFICATION_NUMBER</option>
              <option value="OTHER">OTHER</option>
            </select>
            {errors.document_type && (
              <p className="text-red-500 text-xs mt-1">{errors.document_type}</p>
            )}
          </div>

          <InputField
            icon={Hash}
            placeholder="Document Reference (e.g., RC123456)"
            value={form.document_reference}
            onChange={(v) => setForm({ ...form, document_reference: v })}
            error={errors.document_reference}
          />

          <InputField
            icon={LinkIcon}
            placeholder="Document Storage URL (e.g., https://...)"
            value={form.document_storage_url}
            onChange={(v) => setForm({ ...form, document_storage_url: v })}
            error={errors.document_storage_url}
          />

          {/* ✅ Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`w-full pl-12 pr-12 py-3.5 bg-base border-2 rounded-xl text-base placeholder:opacity-40 focus:outline-none transition-all ${
                errors.password
                  ? "border-red-500"
                  : "border-primary/20 dark:border-primary/30 focus:border-primary"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-primary/60"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            <button
              onClick={() => setShowPasswordGuide(!showPasswordGuide)}
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary"
            >
              <Info className="w-5 h-5" />
            </button>

            {showPasswordGuide && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm text-gray-700 dark:text-gray-200 shadow-lg w-full left-0 z-10"
              >
                <p className="font-semibold mb-1">Password must contain:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>At least 12 characters</li>
                  <li>One uppercase letter</li>
                  <li>One special character (!@#$%^&*)</li>
                </ul>
              </motion.div>
            )}

            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={organizationSignUpMutationLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-primary/25"
          >
            {organizationSignUpMutationLoading ? "Creating Account..." : "Register Organization"}
          </motion.button>
        </form>

        <p className="text-center text-base opacity-60 mt-6">
          Already have an account?{" "}
          <Link
            href="/org/login"
            className="text-primary hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </motion.div>
  );
}

function InputField({
  icon: Icon,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
}: {
  icon: React.ElementType;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
}) {
  return (
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/60" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-12 pr-4 py-3.5 bg-base border-2 rounded-xl text-base placeholder:opacity-40 focus:outline-none transition-all ${
          error
            ? "border-red-500"
            : "border-primary/20 dark:border-primary/30 focus:border-primary"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
