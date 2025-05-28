// utils/tokenService.js

// Storage helpers to manage the token and user data
export const TokenService = {
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("auth_token");
    }
    return null;
  },

  saveToken: (token) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token);
    }
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
    }
  },

  getUserData: () => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("user_data");
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  },

  saveUserData: (userData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_data", JSON.stringify(userData));
    }
  },

  removeUserData: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user_data");
    }
  },

  clearAll: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user_data");
    }
  },
};

// Auth status checking functions - export as named exports
export const isAuthenticated = () => {
  return !!TokenService.getToken();
};

export const getCurrentUser = () => {
  return TokenService.getUserData();
};

// Import API from httpClient for fetchUserData
import API from "./httpClient";

// Fetch user data function - now uses /user-info endpoint
export const fetchUserData = async () => {
  try {
    const response = await API.get(`/api/v1/user-info`);
    return response;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};
