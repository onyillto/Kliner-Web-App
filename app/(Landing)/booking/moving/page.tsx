// pages/move-out.js
"use client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function MoveOutPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState({
    "Living Room": 0,
    "Terrace": 0,
    "Bedroom": 0,
    "Bathroom": 0,
    "Kitchen": 0,
    "Dining Room": 0,
    "Garage": 0
  });

  const handleIncrement = (room) => {
    setRooms(prev => ({
      ...prev,
      [room]: prev[room] + 1
    }));
  };

  const handleDecrement = (room) => {
    if (rooms[room] > 0) {
      setRooms(prev => ({
        ...prev,
        [room]: prev[room] - 1
      }));
    }
  };

  const handleContinue = () => {
    // Save the selected rooms data to localStorage
    localStorage.setItem("moveOutRooms", JSON.stringify(rooms));
    
    // Navigate to the next step
    router.push("/booking-summary");
  };

  return (
    <>
      <Head>
        <title>Move-out/in Package | Home Services</title>
        <meta name="description" content="Book our move-out/in cleaning service" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="p-4 flex items-center border-b">
          <button
            onClick={() => router.back()}
            className="mr-4"
            aria-label="Go back"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Move-out/in Package</h1>
        </div>

        <div className="p-4">
          <p className="text-lg font-medium mb-6">Enter the number of rooms to be cleared.</p>

          {/* Room selectors */}
          <div className="space-y-4">
            {Object.keys(rooms).map((room) => (
              <div key={room} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                <span className="text-lg font-medium">{room}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(room)}
                    className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
                    aria-label={`Decrease ${room}`}
                  >
                    <span className="text-purple-600 text-xl">−</span>
                  </button>
                  <span className="mx-4 w-6 text-center">{rooms[room]}</span>
                  <button
                    onClick={() => handleIncrement(room)}
                    className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
                    aria-label={`Increase ${room}`}
                  >
                    <span className="text-purple-600 text-xl">+</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Continue button */}
          <div className="mt-6">
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-purple-600 text-white rounded-lg text-lg font-medium"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}