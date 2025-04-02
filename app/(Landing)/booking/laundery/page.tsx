// pages/laundry.js
"use client";
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LaundryPage() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);

  const laundryOptions = [
    "Washed and Folded",
    "Washed and Ironed",
    "Washed, Ironed, and Folded",
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption) {
      // Save the selected option to localStorage
      localStorage.setItem("laundryOption", selectedOption);

      // Navigate to the next step
      router.push("/booking-summary");
    }
  };

  return (
    <>
      <Head>
        <title>Laundry Service | Home Services</title>
        <meta name="description" content="Book our laundry service" />
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
          <h1 className="text-2xl font-bold">Laundry</h1>
        </div>

        <div className="p-4">
          <p className="text-lg font-medium mb-6">
            Tick how you want your Laundry done.
          </p>

          {/* Laundry options */}
          <div className="space-y-4">
            {laundryOptions.map((option) => (
              <div
                key={option}
                className="bg-gray-50 p-4 rounded-lg flex items-center justify-between"
                onClick={() => handleOptionSelect(option)}
              >
                <span className="text-lg font-medium">{option}</span>
                <div
                  className={`w-6 h-6 rounded-full border ${
                    selectedOption === option
                      ? "border-purple-600"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {selectedOption === option && (
                    <div className="w-4 h-4 rounded-full border border-white bg-purple-600"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Continue button */}
          <div className="mt-auto pt-6 fixed bottom-4 left-4 right-4">
            <button
              onClick={handleContinue}
              className="w-full py-4 bg-purple-600 text-white rounded-lg text-lg font-medium"
              disabled={!selectedOption}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
