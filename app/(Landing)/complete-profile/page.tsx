"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import axios from "axios";

export default function UserProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    address: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  // Load existing user data from localStorage if available
  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          username: user.username || "",
          dateOfBirth: user.dateOfBirth || "",
          email: user.email || "",
          mobile: user.phone || "", // Note: API returns 'phone' but form uses 'mobile'
          address: user.address || "",
          image: null,
        });

        // Set preview if user has existing profile image
        if (user.profileImage?.url) {
          setPreview(user.profileImage.url);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, mobile: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for the API request
      const formDataToSend = new FormData();

      // Add all text fields (only if they have values)
      if (formData.firstName)
        formDataToSend.append("firstName", formData.firstName);
      if (formData.lastName)
        formDataToSend.append("lastName", formData.lastName);
      if (formData.username)
        formDataToSend.append("username", formData.username);
      if (formData.dateOfBirth)
        formDataToSend.append("dateOfBirth", formData.dateOfBirth);
      if (formData.email) formDataToSend.append("email", formData.email);
      if (formData.mobile) formDataToSend.append("mobile", formData.mobile);
      if (formData.address) formDataToSend.append("address", formData.address);

      // Add the image file if it exists
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      // Get the auth token from cookies
      const authToken = Cookies.get("authToken");

      if (!authToken) {
        toast.error("Authentication token not found. Please login again.");
        router.push("/auth/signin");
        return;
      }

      // Make the API request using token-based authentication (no user_id needed)
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"
        }/api/v1/user/fill-data`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully!");

        // Update user data in localStorage with the new information
        const currentUserData = JSON.parse(
          localStorage.getItem("user_data") || "{}"
        );
        const updatedUserData = { ...currentUserData, ...response.data.data };
        localStorage.setItem("user_data", JSON.stringify(updatedUserData));

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);

      // Handle different error types
      if (err.response?.status === 401) {
        toast.error("Authentication failed. Please login again.");
        Cookies.remove("authToken");
        Cookies.remove("userData");
        router.push("/auth/signin");
      } else if (err.response?.status === 413) {
        toast.error("File too large. Please choose a smaller image.");
      } else {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to update profile. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Clean up preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Profile Picture Upload */}
        <div className="flex flex-col items-center mb-4">
          <label className="relative cursor-pointer">
            {preview ? (
              <Image
                src={preview}
                alt="Profile Preview"
                width={100}
                height={100}
                className="rounded-full object-cover w-24 h-24 border-2 border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-400">
                <span className="text-4xl">👤</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
              disabled={loading}
            />
            <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full">
              ✎
            </div>
          </label>
          <p className="text-xs text-gray-500 mt-2">Max size: 5MB</p>
        </div>

        {/* Form Fields */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              disabled={loading}
              className="w-full p-2 border text-black rounded-md focus:ring focus:ring-purple-300 disabled:opacity-50"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              disabled={loading}
              className="w-full p-2 border text-black rounded-md focus:ring focus:ring-purple-300 disabled:opacity-50"
            />
          </div>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Username"
            disabled={loading}
            className="w-full p-2 border text-black rounded-md focus:ring focus:ring-purple-300 disabled:opacity-50"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={loading}
            className="w-full p-2 text-black border rounded-md focus:ring focus:ring-purple-300 disabled:opacity-50"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            disabled={true} // Make email field uneditable
            className="w-full text-black p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />

          <PhoneInput
            country={"ng"}
            value={formData.mobile}
            onChange={handlePhoneChange}
            disabled={loading}
            inputClass="!w-full !p-2 !border !rounded-md focus:ring focus:ring-purple-300 !text-black"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Address"
            disabled={loading}
            className="w-full text-black p-2 border rounded-md focus:ring focus:ring-purple-300 disabled:opacity-50"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-purple-600 text-white text-lg py-2 rounded-md transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-purple-700"
            }`}
          >
            {loading ? "Updating..." : "Complete Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
