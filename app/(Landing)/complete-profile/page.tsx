"use client";
import { useState } from "react";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function UserProfileForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    profilePic: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Profile Updated Successfully!");
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full p-2 border text-black rounded-md focus:ring focus:ring-purple-300"
          />

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
            required
            className="w-full p-2 text-black border rounded-md focus:ring focus:ring-purple-300"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full text-black p-2 border rounded-md focus:ring focus:ring-purple-300"
          />

          <PhoneInput
            country={"ng"}
            value={formData.phone}
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
            className="w-full text-black  p-2 border rounded-md focus:ring focus:ring-purple-300"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 text-white text-lg py-2 rounded-md hover:bg-purple-700 transition duration-200"
          >
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
}
