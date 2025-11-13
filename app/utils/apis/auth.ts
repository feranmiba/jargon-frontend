'use client';
import { useMutation } from '@tanstack/react-query';
import { AuthInputs, Organization } from '../lib/types';
import showToast from '@/app/components/showToast';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/auth';
import { data } from 'framer-motion/client';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://your-backend-api.com/api/auth';


  async function request(endpoint: string, data?: any, method: string = 'POST') {
    const isFormEncoded = endpoint === 'user_login' || endpoint === 'org/login';

  
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };
  
    let body: BodyInit | undefined;
  
    if (data) {
      if (isFormEncoded) {
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
        const formData = new URLSearchParams();
        for (const key in data) {
          if (data[key] !== undefined && data[key] !== null) {
            formData.append(key, data[key]);
          }
        }
        body = formData.toString();
      } else {
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
      }
    }
  
    const res = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers,
      body,
    });
  
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.detail || error.message || 'Something went wrong');
    }
  
    return res.json();
  }
  

export function useAuth() {
  const { setToken, clearToken } = useAuthStore();


  const signUpMutation = useMutation({
    mutationFn: (data: AuthInputs) => request('create_user', data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: 'loading', message: 'Creating account...' });
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({
        type: 'success',
        message: data.message || 'Account created successfully! Please check your email to verify with the link provided.',
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

  const loginMutation = useMutation({
    mutationFn: (data: AuthInputs) => request('user_login', data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: 'loading', message: 'Logging in...' });
    },
    onSuccess: (data) => {
      toast.dismiss();

      if (data.token) {
        setToken(data.token, 7 * 60 * 60);
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

  const verifyEmailMutation = useMutation({
    mutationFn: (data: { token: string }) => request(`verify_email?token=${data.token}`, data, 'PUT'),
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

  const verifyEmailOrganizationMutation = useMutation({
    mutationFn: (data: { token: string }) => request(`org/verify_email?token=${data.token}`, data, 'PUT'),
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

  const organizationSignUpMutation = useMutation({
    mutationFn: (data: Organization) => request('org/register', data),
    onMutate: () => {
      toast.dismiss();
      showToast({type: 'loading', message: 'Creating organization account...'});
    },
    onSuccess: (data) => {
      toast.dismiss();
      showToast({
        type: 'success',
        message: data.message || 'Organization account created successfully! Please check your email to verify with the link provided.',
      });
    },
    onError: (data) => {
      toast.dismiss();
      showToast({
        type: 'error',
        message: data.message || 'Failed to create organization account',
      })
    },
  });

  const organizationLoginMutation = useMutation({
    mutationFn: (data: AuthInputs) => request('org/login', data),
    onMutate: () => {
      toast.dismiss();
      showToast({ type: 'loading', message: 'Logging in...' });
    },
    onSuccess: (data) => {
      toast.dismiss();

      if (data.token) {
        setToken(data.token, 7 * 60 * 60);
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

  const signUpLoading = signUpMutation.status === 'pending';
  const loginLoading = loginMutation.status === 'pending';
  const verifyEmailLoading = verifyEmailMutation.status === 'pending';
  const forgotPasswordLoading = forgotPasswordMutation.status === 'pending';
  const organizationSignUpMutationLoading = organizationSignUpMutation.status === 'pending';
  const organizationLoginMutationLoading = organizationLoginMutation.status === 'pending';
  const verifyEmailOrganizationMutationLoading = verifyEmailOrganizationMutation.status === 'pending'

  return {
    // Actions
   signUpMutation,
    loginMutation,
    verifyEmailMutation,
    forgotPassword: forgotPasswordMutation.mutate,
    organizationSignUpMutation,
    organizationLoginMutation,
    verifyEmailOrganizationMutation,

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
    organizationSignUpMutationLoading,
    organizationLoginMutationLoading,
    verifyEmailOrganizationMutationLoading
  };
}
