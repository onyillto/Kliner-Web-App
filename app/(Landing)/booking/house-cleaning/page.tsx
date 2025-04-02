// pages/house-cleaning.js
"use client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HouseCleaningPage() {
  const router = useRouter();
  const [items, setItems] = useState({
    "Living Room": 0,
    Terrace: 0,
    Bedroom: 0,
    Bathroom: 0,
    Kitchen: 0,
    "Dining Room": 0,
    Garage: 0,
  });

  const handleIncrement = (item) => {
    setItems((prev) => ({
      ...prev,
      [item]: prev[item] + 1,
    }));
  };

  const handleDecrement = (item) => {
    if (items[item] > 0) {
      setItems((prev) => ({
        ...prev,
        [item]: prev[item] - 1,
      }));
    }
  };

  const handleContinue = () => {
    // Save the selected items data to localStorage
    localStorage.setItem("cleaningItems", JSON.stringify(items));

    // Navigate to the next step
    router.push("/booking-summary");
  };

  return (
    <>
      <Head>
        <title>House Cleaning | Home Services</title>
        <meta name="description" content="Book our house cleaning service" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Header with title */}
        <div className="bg-gray-800 text-white p-2 text-center">
          <h1 className="text-lg">Cleaning Booking</h1>
        </div>

        {/* Main content */}
        <div className="bg-white p-4">
          {/* Back button and page title */}
          <div className="flex items-center border-b pb-4 mb-4">
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
            <h2 className="text-2xl font-bold">House Cleaning</h2>
          </div>

          <p className="text-lg font-medium mb-6">
            Enter the number of items to be cleaned.
          </p>

          {/* Item selectors */}
          <div className="space-y-4">
            {Object.keys(items).map((item) => (
              <div
                key={item}
                className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
              >
                <span className="text-lg font-medium">{item}</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(item)}
                    className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
                    aria-label={`Decrease ${item}`}
                  >
                    <span className="text-purple-600 text-xl">−</span>
                  </button>
                  <span className="mx-4 w-6 text-center">{items[item]}</span>
                  <button
                    onClick={() => handleIncrement(item)}
                    className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center"
                    aria-label={`Increase ${item}`}
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
