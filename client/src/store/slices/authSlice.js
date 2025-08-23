import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * API base URL:
 * - Uses VITE_API_URL if provided
 * - Falls back to http://localhost:8000/api
 */
const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // allows cookie-based flows if you add refresh tokens later
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Safely read/write auth in localStorage
 */
const STORAGE_KEY = "slack_clone_auth_v1";

function saveAuthToStorage({ token, user }) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        token: token || null,
        user: user || null,
      })
    );
  } catch {
    // ignore storage errors
  }
}

function readAuthFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { token: null, user: null };
    const parsed = JSON.parse(raw);
    return {
      token: parsed?.token || null,
      user: parsed?.user || null,
    };
  } catch {
    return { token: null, user: null };
  }
}

function clearAuthStorage() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * Thunks
 */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      // expected payload: { name, email, password }
      const { data } = await axiosInstance.post("/auth/register", payload);
      // backend should return { message, user, token } or { message } then user must login
      // To stay flexible, if token exists we treat as logged in. Otherwise redirect to login.
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed";
      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      // expected payload: { email, password }
      const { data } = await axiosInstance.post("/auth/login", payload);
      // expected response: { token, user }
      if (!data?.token || !data?.user) {
        throw new Error("Invalid login response. Missing token or user.");
      }
      return data;
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const loadUserFromStorage = createAsyncThunk(
  "auth/loadUserFromStorage",
  async () => {
    const { token, user } = readAuthFromStorage();
    return { token, user };
  }
);

/**
 * Slice
 */
const initialState = {
  user: null,
  token: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  justRegistered: false, // lets UI know to redirect to login after register (if backend doesn't auto-login)
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.status = "idle";
      state.justRegistered = false;
      clearAuthStorage();
    },
    setAuth(state, action) {
      const { token, user } = action.payload || {};
      state.token = token || null;
      state.user = user || null;
      saveAuthToStorage({ token, user });
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.justRegistered = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        const { token, user } = action.payload || {};
        if (token && user) {
          // Some APIs return token after register (auto-login)
          state.token = token;
          state.user = user;
          saveAuthToStorage({ token, user });
          state.justRegistered = false;
        } else {
          // Many APIs require user to login after register
          state.justRegistered = true;
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Registration failed";
        state.justRegistered = false;
      });

    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.token = action.payload.token;
        state.user = action.payload.user;
        saveAuthToStorage({ token: state.token, user: state.user });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Login failed";
      });

    // Load from storage
    builder.addCase(loadUserFromStorage.fulfilled, (state, action) => {
      const { token, user } = action.payload || {};
      state.token = token || null;
      state.user = user || null;
      state.status = "idle";
      state.error = null;
    });
  },
});

export const { logout, setAuth, clearError } = authSlice.actions;

export default authSlice.reducer;

/**
 * Selectors
 */
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => Boolean(state.auth.token);
