import { authClient } from "./auth-client";

/**
 * Base URL of the BookNook Express API.
 * Set NEXT_PUBLIC_API_BASE_URL in the environment when deployed
 * (e.g. a Render backend URL). Falls back to local development.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

/**
 * Returns the JWT issued by the auth server (better-auth JWT plugin)
 * to attach to protected API requests, or null when unavailable.
 */
export async function getAuthToken(): Promise<string | null> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    return null;
  }

  return data.token;
}

/**
 * Authorization header for the given token (empty object when no token).
 */
export function authHeaders(token: string | null): HeadersInit {
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}
