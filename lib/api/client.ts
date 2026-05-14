import axios, { AxiosError } from "axios";

/**
 * Creates a pre-configured Axios instance.
 * Automatically handles `withCredentials` for secure HTTP-only cookies.
 */
export const apiClient = axios.create({
  baseURL: "/api/admin", // Base URL for all admin API routes
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Standardizes API error messages from the backend so components don't
 * need to manually dig through `err.response?.data?.message`.
 */
export function getErrorMessage(error: unknown, defaultMessage = "An error occurred."): string {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || error.message || defaultMessage;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return defaultMessage;
}
