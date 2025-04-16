"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/services/authService";
import { isAuthenticated, getCurrentUser } from "../utils/tokenService";

// Create the context
const AuthContext = createContext();

// AuthProvider component that wraps our app and makes auth available to all components
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      if (typeof window !== "undefined") {
        // Check if a user is already logged in
        if (isAuthenticated()) {
          setUser(getCurrentUser());
        }
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login function that will be passed to components
  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);

      if (response.success) {
        setUser(getCurrentUser());
        return { success: true };
      } else {
        return { success: false, message: response.error || "Login failed" };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message || "An error occurred during login",
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      return response;
    } catch (error) {
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  };

  // Logout function
  const logout = () => {
    AuthService.logout();
    setUser(null);
    router.push("/login");
  };

  // Context values to be provided
  const values = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: () => isAuthenticated(),
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
