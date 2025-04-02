// File: pages/booking.js
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function BookingPage() {
  const router = useRouter();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      try {
        // Get the selected service from localStorage
        const storedService = localStorage.getItem("selectedService");

        if (storedService) {
          setServiceData(JSON.parse(storedService));
        } else {
          // If no data in localStorage, redirect back to home
          // This handles direct navigation to /booking without clicking a service first
          router.push("/");
        }
      } catch (error) {
        console.error("Error loading service data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [router]);

  // Function to navigate to the next image
  const nextImage = () => {
    if (serviceData && serviceData.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === serviceData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Function to navigate to the previous image
  const prevImage = () => {
    if (serviceData && serviceData.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? serviceData.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Show loading state while we're getting the data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // If no service data is found, show an error state
  if (!serviceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4 ">Service Not Found</h1>
        <p className="mb-4">
          Sorry, we couldn't find the service you're looking for.
        </p>
        <Link href="/">
          <div className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 cursor-pointer">
            Back to Home
          </div>
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{serviceData.name} Service | Booking</title>
        <meta
          name="description"
          content={`Book our ${serviceData.name} service today`}
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header with back button */}
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-5xl mx-auto flex items-center">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 rounded-full hover:bg-gray-500 text-black"
              aria-label="Go back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-black">{serviceData.name}</h1>
          </div>
        </header>

        <main className="max-w-5xl mx-auto p-4 mb-24">
          {/* Service hero section - similar to the screenshot */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-6">
            <div className="h-64 bg-gray-200 relative">
              <img
                src={
                  serviceData.mainImage ||
                  `/${serviceData.name.toLowerCase()}-service.svg`
                }
                alt={`${serviceData.name} service`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Cast e.target to HTMLImageElement
                  const img = e.target as HTMLImageElement;
                  img.src =
                    "/room1.svg";
                }}
              />
            </div>

            <div className="p-6">
              <h1 className="text-3xl font-bold text-black">{serviceData.name}</h1>

              <div className="flex items-center mt-2">
                <span className="text-yellow-500">★</span>
                <span className="ml-1">{serviceData.rating}</span>
                <span className="ml-1 text-gray-500">|</span>
                <span className="ml-1 text-gray-500">
                  {serviceData.reviews.toLocaleString()} Reviews
                </span>
              </div>

              <div className="mt-2 py-2">
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {serviceData.name}
                </span>
              </div>

              <div className="mt-2 text-2xl font-semibold text-indigo-600">
                {serviceData.price}
              </div>

              <p className="mt-4 text-gray-600">{serviceData.description}</p>
            </div>
          </div>

          {/* Photos & Videos Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Photos & Videos</h2>
              <button className="text-indigo-600 font-medium">See All</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {serviceData.images && serviceData.images.length > 0 ? (
                serviceData.images.slice(0, 2).map((image, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 rounded-lg h-40 overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`${serviceData.name} service ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        // Cast e.target to HTMLImageElement
                        const img = e.target as HTMLImageElement;
                        img.src =
                          "/room2.svg";
                      }}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-gray-200 rounded-lg h-40"></div>
                  <div className="bg-gray-200 rounded-lg h-40"></div>
                </>
              )}
            </div>
          </div>
        </main>

        {/* Action buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex gap-4 shadow-lg">
          <button className="flex-1 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-medium">
            Message
          </button>
          <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium">
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}
