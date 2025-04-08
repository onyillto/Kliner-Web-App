// context/AuthContext.js
"use client"
import { createContext, useContext, useState, useEffect } from "react";
import Router from "next/router";
import API, { isAuthenticated, getCurrentUser } from "../utils/httpClient";

// Create the auth context
const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loading: false,
  error: null,
});

// Auth Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if the user is authenticated on initial load
  useEffect(() => {
    // If we're in the browser
    if (typeof window !== "undefined") {
      // Check if a user is already logged in
      if (isAuthenticated()) {
        setUser(getCurrentUser());
      }
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.login(email, password);

      if (response.success) {
        setUser(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.message || "Login failed");
        return { success: false, message: response.message };
      }
    } catch (err) {
      setError(err.message || "Login failed");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await API.register(userData);

      if (response.success) {
        return { success: true, data: response.data };
      } else {
        setError(response.message || "Registration failed");
        return { success: false, message: response.message };
      }
    } catch (err) {
      setError(err.message || "Registration failed");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    API.logout();
    setUser(null);
    Router.push("/login");
  };

  // Auth context value
  const value = {
    isAuthenticated: !!user,
    user,
    login,
    logout,
    register,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
