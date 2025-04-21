"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthService from "./../services/authService";
import { isAuthenticated, getCurrentUser } from "../utils/tokenService";
import API from "../utils/httpClient"; // Make sure to import API

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user data function
  const fetchUserData = async (userId) => {
    try {
      const response = await API.get(`/api/v1/user/${userId}`);
      return response;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  // Check if user is authenticated on mount
  // In your AuthContext.js, modify the useEffect

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);

      if (typeof window !== "undefined") {
        if (isAuthenticated()) {
          const basicUserData = getCurrentUser();

          // Format user data to include a name property
          const formattedUserData = {
            ...basicUserData,
            name: basicUserData.firstName || "Guest",
          };

          setUser(formattedUserData);

          // Rest of your code for fetching additional user data...
        }
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Define the login function properly
  const loginUser = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);

      if (response.success) {
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Also fetch complete user data after login
        if (currentUser && currentUser.id) {
          const userData = await fetchUserData(currentUser.id);
          if (userData) {
            setUser((prev) => ({ ...prev, ...userData }));
          }
        }

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
  const registerUser = async (userData) => {
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
  const logoutUser = () => {
    AuthService.logout();
    setUser(null);
    router.push("/login");
  };

  // Context values with correctly named functions
  const values = {
    user,
    loading,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    isAuthenticated: () => isAuthenticated(),
    fetchUserData, // Add this to allow components to refresh user data if needed
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
