// services/authService.js
import { httpClient, handleApiError } from "../utils/httpClient";
import { TokenService } from "../utils/tokenService";

const AuthService = {
  // Login user
  login: async (email, password) => {
    try {
      const response = await httpClient.post("/api/v1/auth/login", {
        email,
        password,
      });

      // Handle the login response with your specific structure
      if (response.data.success && response.data.data) {
        const { token, ...userData } = response.data.data;

        // Save the token and user data
        TokenService.saveToken(token);
        TokenService.saveUserData(userData);
      }

      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Register new user
  register: async (userData) => {
    try {
      const response = await httpClient.post("/api/v1/auth/register", userData);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Verify email with OTP
  verifyEmail: async (email, otp) => {
    try {
      const response = await httpClient.post("/api/v1/auth/verifyotp", {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Request password reset
  forgotPassword: async (email) => {
    try {
      const response = await httpClient.post(
        "/api/v1/auth/send-password-change-email",
        {
          email,
        }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Verify password reset PIN
  verifyPasswordPin: async (email, pin) => {
    try {
      const response = await httpClient.post("/api/v1/auth/verifypin", {
        email,
        pin,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Change password
  changePassword: async (email, password, confirmPassword) => {
    try {
      const response = await httpClient.post("/api/v1/auth/change-password", {
        email,
        password,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Logout user
  logout: () => {
    TokenService.removeToken();
    TokenService.removeUserData();

    // Optionally call logout API endpoint
    // return httpClient.post('/auth/logout');
  },

  // Create PIN
  createPin: async (user_id, pin) => {
    try {
      const response = await httpClient.post("/user/create-pin", {
        user_id,
        pin,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Verify PIN
  verifyPin: async (user_id, pin) => {
    try {
      const response = await httpClient.post("/user/verify-pin", {
        user_id,
        pin,
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};


// Add this method to your AuthService object

  fillProfileData: async (profileData) => {
    try {
      // Create a FormData object for the request
      const formDataToSend = new FormData();
      
      // Add all text fields
      if (profileData.firstName) formDataToSend.append("firstName", profileData.firstName);
      if (profileData.lastName) formDataToSend.append("lastName", profileData.lastName);
      if (profileData.username) formDataToSend.append("username", profileData.username);
      if (profileData.dateOfBirth) formDataToSend.append("dateOfBirth", profileData.dateOfBirth);
      if (profileData.email) formDataToSend.append("email", profileData.email);
      if (profileData.mobile) formDataToSend.append("mobile", profileData.mobile);
      if (profileData.address) formDataToSend.append("address", profileData.address);
      if (profileData.user_id) formDataToSend.append("user_id", profileData.user_id);
      
      // Add the image file if it exists
      if (profileData.image instanceof File) {
        formDataToSend.append("image", profileData.image);
      }
      
      // Send request to the correct endpoint
      const response = await httpClient.post(
        "/api/v1/user/fill-data", 
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // Ensure cookies with auth token are sent
        }
      );
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  };
export default AuthService;
