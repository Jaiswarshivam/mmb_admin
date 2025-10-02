// Simple API client for authentication using axios
import axios from 'axios';

// Get API base URL from environment or use default
const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_URL)
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : 'http://localhost:3000/api/v1';

// Keys for storing token and user info
const AUTH_TOKEN_KEY = 'token';
const AUTH_USER_KEY = 'user';

// Get auth token from storage
export function getAuthToken() {
  return (
    localStorage.getItem(AUTH_TOKEN_KEY) ||
    sessionStorage.getItem(AUTH_TOKEN_KEY) ||
    null
  );
}

// Save auth token to storage (local or session)
export function setAuthToken(token, persist = true) {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    if (persist) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  } catch (error) {
    console.warn('Failed to set auth token in storage', error);
  }
}

// Remove token and user info from storage
export function clearAuthStorage() {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.warn('Failed to clear auth storage', error);
  }
}

// Save user info to storage (local or session)
export function setStoredUser(user, persist = true) {
  try {
    const payload = JSON.stringify(user);
    if (persist) {
      localStorage.setItem(AUTH_USER_KEY, payload);
    } else {
      sessionStorage.setItem(AUTH_USER_KEY, payload);
    }
  } catch (error) {
    console.warn('Failed to store user in storage', error);
  }
}

// Get user info from storage
export function getStoredUser() {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY) || sessionStorage.getItem(AUTH_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Simple axios request for login
export async function login(email, password) {
  try {
    const response = await axios.post(
      `${API_BASE}/auth/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data; // { user, token }
  } catch (error) {
    // Log full error details for debugging
    console.error('[API] login error:', {
      url: `${API_BASE}/auth/login`,
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    // Try to get error message from response
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Login failed';
    const err = new Error(message);
    err.status = error?.response?.status;
    err.data = error?.response?.data;
    throw err;
  }
}

// Send a reset link to user's email
export async function sendResetLink(email) {
  try {
    const response = await axios.post(
      `${API_BASE}/auth/send-reset-link`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data; // { success, message }
  } catch (error) {
    console.error('[API] sendResetLink error:', {
      url: `${API_BASE}/auth/send-reset-link`,
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Failed to send reset link';
    const err = new Error(message);
    err.status = error?.response?.status;
    err.data = error?.response?.data;
    throw err;
  }
}

// Reset password with token and new password
export async function resetPassword(token, password) {
  try {
    const response = await axios.post(
      `${API_BASE}/auth/reset-password/${token}`,
      { password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );
    return response.data; // { success, message }
  } catch (error) {
    console.error('[API] resetPassword error:', {
      url: `${API_BASE}/auth/reset-password/${token}`,
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.message,
    });
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Failed to reset password';
    const err = new Error(message);
    err.status = error?.response?.status;
    err.data = error?.response?.data;
    throw err;
  }
}

// Simple axios request for getting current user
export async function me() {
  try {
    const token = getAuthToken();
    const response = await axios.get(
      `${API_BASE}/auth/me`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        withCredentials: true,
      }
    );
    return response.data; // { user }
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      'Failed to fetch user';
    const err = new Error(message);
    err.status = error?.response?.status;
    err.data = error?.response?.data;
    throw err;
  }
}

// Logout just clears storage
export function logout() {
  clearAuthStorage();
}
