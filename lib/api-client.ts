import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/auth/stores/auth-store';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Normalized error shape the rest of the app deals with —
// hooks/UI never need to know NestJS's raw error format.
export class ApiError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
  }
}

interface NestErrorBody {
  message?: string | string[];
  statusCode?: number;
  error?: string;
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- Request interceptor: attach Bearer token to every outgoing request ---
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Response interceptor: normalize errors, handle 401 globally ---
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<NestErrorBody>) => {
    // Network error / timeout — no response at all
    if (!error.response) {
      return Promise.reject(
        new ApiError(
          error.code === 'ECONNABORTED'
            ? 'Request timed out. Please try again.'
            : 'Network error. Check your connection.'
        )
      );
    }

    const { status, data } = error.response;

    if (status === 401) {
      useAuthStore.getState().logout();
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(new ApiError('Unauthorized', 401));
    }

    // NestJS class-validator returns message as string[] on 400s
    const message = Array.isArray(data?.message)
      ? data.message.join(', ')
      : data?.message ?? 'Something went wrong';

    return Promise.reject(new ApiError(message, status));
  }
);

// --- Typed request methods — same call signature your hooks already use ---
export const apiClient = {
  get: <T>(path: string, signal?: AbortSignal) =>
    axiosInstance.get<T>(path, { signal }).then((res) => res.data),

  post: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    axiosInstance.post<T>(path, body, { signal }).then((res) => res.data),

  patch: <T>(path: string, body?: unknown, signal?: AbortSignal) =>
    axiosInstance.patch<T>(path, body, { signal }).then((res) => res.data),

  delete: <T>(path: string, signal?: AbortSignal) =>
    axiosInstance.delete<T>(path, { signal }).then((res) => res.data),
};