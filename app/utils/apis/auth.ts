'use client';
import { useMutation } from '@tanstack/react-query';
import { AuthInputs } from '../lib/types';
import showToast from '@/app/components/showToast';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-api.com/api/auth';


async function request(endpoint: string, data?: any, method: string = 'POST') {
  const res = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return res.json();
}

export function useAuth() {
  const { setToken, clearToken } = useAuthStore();


  const signUpMutation = useMutation({
    mutationFn: (data: AuthInputs) => request('create-user', data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: 'loading', message: 'Creating account...' });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({
        type: 'success',
        message: data.message || 'Account created successfully!',
      });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({
        type: 'error',
        message: error.message || 'Failed to create account',
      });
    },
  });

  // 🔹 LOGIN
  const loginMutation = useMutation({
    mutationFn: (data: AuthInputs) => request('user_login', data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: 'loading', message: 'Logging in...' });
    },
    onSuccess: (data) => {
      toast.dismiss();

      if (data.token && data.expiresIn) {
        setToken(data.token, data.expiresIn);
        showToast({
          type: 'success',
          message: data.message || 'Login successful!',
        });
      } else {
        showToast({
          type: 'error',
          message: 'Missing token or expiration time',
        });
      }
    },
    onError: (error: any) => {
      toast.dismiss();
      clearToken();
      showToast({
        type: 'error',
        message: error.message || 'Invalid login credentials',
      });
    },
  });

  // 🔹 VERIFY EMAIL
  const verifyEmailMutation = useMutation({
    mutationFn: (data: { token: string }) => request('verify_email', data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: 'loading', message: 'Verifying email...' });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({
        type: 'success',
        message: data.message || 'Email verified successfully!',
      });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({
        type: 'error',
        message: error.message || 'Email verification failed',
      });
    },
  });

  // 🔹 FORGOT PASSWORD
  const forgotPasswordMutation = useMutation({
    mutationFn: (data: { email: string }) => request('forgot-password', data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: 'loading', message: 'Sending reset link...' });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({
        type: 'success',
        message: data.message || 'Password reset email sent!',
      });
    },
    onError: (error: any) => {
      toast.dismiss();
      showToast({
        type: 'error',
        message: error.message || 'Failed to send reset email',
      });
    },
  });

  const signUpLoading = signUpMutation.status === 'pending';
  const loginLoading = loginMutation.status === 'pending';
  const verifyEmailLoading = verifyEmailMutation.status === 'pending';
  const forgotPasswordLoading = forgotPasswordMutation.status === 'pending';

  return {
    // Actions
    signUp: signUpMutation.mutate,
    login: loginMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    forgotPassword: forgotPasswordMutation.mutate,

    // Statuses
    signUpStatus: signUpMutation.status,
    loginStatus: loginMutation.status,
    verifyEmailStatus: verifyEmailMutation.status,
    forgotPasswordStatus: forgotPasswordMutation.status,

    // ✅ Loading flags
    signUpLoading,
    loginLoading,
    verifyEmailLoading,
    forgotPasswordLoading,
  };
}
