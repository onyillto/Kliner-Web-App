"use client";
import { useState } from "react";
import NotificationDropdown from "./Notification_Dropdown";

export default function UserHeader({ name }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <header className="relative flex justify-between items-center p-4 lg:p-6">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden lg:w-12 lg:h-12">
          <img
            src="/avartar.png"
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-gray-600 text-sm lg:text-base">Good Morning 👋</p>
          <h2 className="font-bold text-black text-xl lg:text-2xl">{name}</h2>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="p-2 hover:bg-gray-400 text-black rounded-full transition-colors lg:mr-2"
          onClick={toggleNotification}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
        </button>
        {/* Notification dropdown*/}

        <button className="hidden lg:block p-2 hover:bg-gray-400 text-black rounded-full transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </div>
      {/*Notification  Dropdown*/}
    </header>
  );
}
