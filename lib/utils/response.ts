import type { NextResponse } from "next/server";

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export function ok<T>(data: T, message = "Success"): Response {
  const body: ApiResponse<T> = { success: true, message, data };
  return Response.json(body, { status: 200 });
}

export function created<T>(data: T, message = "Created"): Response {
  const body: ApiResponse<T> = { success: true, message, data };
  return Response.json(body, { status: 201 });
}

export function noContent(): Response {
  return new Response(null, { status: 204 });
}

export function badRequest(message: string, error?: string): Response {
  const body: ApiResponse = { success: false, message, error };
  return Response.json(body, { status: 400 });
}

export function unauthorized(message = "Unauthorized"): Response {
  const body: ApiResponse = { success: false, message };
  return Response.json(body, { status: 401 });
}

export function forbidden(message = "Forbidden"): Response {
  const body: ApiResponse = { success: false, message };
  return Response.json(body, { status: 403 });
}

export function notFound(message = "Not found"): Response {
  const body: ApiResponse = { success: false, message };
  return Response.json(body, { status: 404 });
}

export function conflict(message: string): Response {
  const body: ApiResponse = { success: false, message };
  return Response.json(body, { status: 409 });
}

export function serverError(message = "Internal server error"): Response {
  const body: ApiResponse = { success: false, message };
  return Response.json(body, { status: 500 });
}

// Re-export NextResponse type for callers that need it
export type { NextResponse };
