// UserProfile.js
"use client";
import React, { useState, useEffect } from "react";
import BottomNavigation from "../../components/BottomNavigation";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

const UserProfile = () => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    streetNumber: "",
    houseNumber: "",
    city: "",
    state: "",
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.push("/auth/signin");
    }
  }, [loading, isAuthenticated, router]);

  // Update profile data when user data is available
  useEffect(() => {
    if (user) {
      setProfileData({
        name:
          user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        streetNumber: user.address ? user.address.split(" ")[0] || "" : "",
        houseNumber: "",
        city: "",
        state: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // If not authenticated, don't render the page content
  if (!isAuthenticated()) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Redirecting to login...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 ">
      {/* Import BottomNavigation component which includes the sidebar */}
      <BottomNavigation />

      {/* Main content */}
      <div className="flex-1 p-8 bg-white rounded-lg shadow-sm mx-4 my-4 lg:ml-56">
        <div className="max-w-4xl mx-auto">
          {/* Profile completion section */}
          <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-3">
              <div className="relative h-12 w-12 rounded-full bg-white flex items-center justify-center mr-4">
                <div className="absolute h-full w-full rounded-full border-4 border-indigo-500">
                  <div
                    className="absolute top-0 left-0 h-full w-full rounded-full border-4 border-indigo-500"
                    style={{
                      clipPath: "polygon(0 0, 66% 0, 66% 100%, 0 100%)",
                      borderColor: "white",
                    }}
                  ></div>
                </div>
                <span className="text-indigo-500 font-bold text-sm">66%</span>
              </div>
              <div>
                <h3 className="text-indigo-800 font-semibold">
                  Complete profile
                </h3>
                <p className="text-indigo-600 text-sm">
                  Complete your profile to unlock all features
                </p>
              </div>
            </div>
            <button className="w-full py-2 bg-white text-gray-800 rounded-md font-medium">
              Verify identity
            </button>
          </div>

          {/* Personal information section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              <div className="w-24 h-24 relative">
                <img
                  src={
                    user?.profileImage?.url ||
                    "https://randomuser.me/api/portraits/men/72.jpg"
                  }
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).src =
                      "https://randomuser.me/api/portraits/men/72.jpg";
                  }}
                />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {profileData.name}
                </h3>
                <div className="mt-4 space-x-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                    Upload New Picture
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Information fields */}
            <div className="space-y-6">
              {/* Account Information */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Account Information
                      </h4>
                      <p className="text-sm text-gray-500">
                        Change your Account Information
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">{profileData.name}</p>
                </div>
              </div>

              {/* Password */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Password</h4>
                      <p className="text-sm text-gray-500">
                        Change your Password
                      </p>
                    </div>
                  </div>
                  <button className="text-gray-500 hover:text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700">••••••••</p>
                </div>
              </div>

              {/* Email */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-full">
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      className="bg-gray-50 p-4 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button className="text-gray-500 ml-2 hover:text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="border-b pb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-full">
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      className="bg-gray-50 p-4 rounded-md w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button className="text-gray-500 ml-2 hover:text-indigo-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Address Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="streetNumber"
                  value={profileData.streetNumber}
                  onChange={handleInputChange}
                  placeholder="Street Number"
                  className="bg-gray-50 p-4 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  name="houseNumber"
                  value={profileData.houseNumber}
                  onChange={handleInputChange}
                  placeholder="Apt / House Number"
                  className="bg-gray-50 p-4 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    name="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="bg-gray-50 p-4 rounded-md text-gray-700 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">City</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                    <option value="Tokyo">Tokyo</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* <div className="relative">
                  <select
                    name="state"
                    value={profileData.state}
                    onChange={handleInputChange}
                    className="bg-gray-50 p-4 rounded-md text-gray-700 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">State</option>
                    <option value="NY">New York</option>
                    <option value="CA">California</option>
                    <option value="TX">Texas</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div> */}
              </div>

              {/* Update Button */}
              <div className="mt-8">
                <button className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition duration-200">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
