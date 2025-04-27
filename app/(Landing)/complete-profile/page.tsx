"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dateOfBirth: "",
    email: "",
    mobile: "",
    address: "",
    image: null,
    user_id: "",
  });
  const [preview, setPreview] = useState(null);

  // Try to get user_id on component mount
  useEffect(() => {
    // If you have the user_id available from your screenshot
    setFormData((prev) => ({
      ...prev,
      user_id: "Klinner-4e9cf4c6-7866-4836-bc9c-f99c90c0ea23", // This is from your screenshot
    }));

  
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
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create FormData for the API request
      const formDataToSend = new FormData();

      // Add all text fields
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
      if (formData.user_id) formDataToSend.append("user_id", formData.user_id);

      // Add the image file if it exists
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      // Get the auth token from cookies
      const authToken = Cookies.get("authToken");

      // Make the API request to the correct endpoint
      const response = await axios.post(
        "https://klinner.onrender.com/api/v1/user/fill-data",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Include the auth token in the Authorization header if it exists
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      console.log("Profile updated successfully:", response.data);
      alert("Profile Updated Successfully!");

      // Redirect to dashboard or home page after successful update
      router.push("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);

      // Format error message
      let errorMessage = "Failed to update profile. Please try again.";

      if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
              className="hidden text-black"
              onChange={handleImageUpload}
            />
            <div className="absolute bottom-0 right-0 bg-purple-600 text-white p-1 rounded-full">
              ✎
            </div>
          </label>
        </div>

        {/* Form Fields */}
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Fill your profile
        </h1>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="w-full p-2 border text-black rounded-md focus:ring focus:ring-purple-300"
            />

            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="w-full p-2 border text-black rounded-md focus:ring focus:ring-purple-300"
            />
          </div>

          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Username"
            className="w-full p-2 border text-black rounded-md focus:ring focus:ring-purple-300"
          />

          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-2 text-black border rounded-md focus:ring focus:ring-purple-300"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full text-black p-2 border rounded-md focus:ring focus:ring-purple-300"
          />

          <PhoneInput
            country={"ng"}
            value={formData.mobile}
            onChange={handlePhoneChange}
            inputClass="!w-full !p-2 !border !rounded-md focus:ring focus:ring-purple-300"
          />

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="w-full text-black p-2 border rounded-md focus:ring focus:ring-purple-300"
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
