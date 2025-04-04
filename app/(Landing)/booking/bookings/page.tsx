// pages/bookings.js
"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - in a real app, you would fetch this from an API
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBookings([
        {
          id: "B1234",
          serviceType: "House Cleaning",
          date: "2025-04-15T10:00:00",
          address: "123 Main St, Apartment 4B",
          price: "₦15,000",
          status: "confirmed",
          providerName: "Mary Johnson",
          providerImage: "/images/provider1.jpg",
          serviceImage: "/images/house-cleaning.jpg",
        },
        {
          id: "B1235",
          serviceType: "Laundry",
          date: "2025-04-12T14:30:00",
          address: "456 Oak Ave",
          price: "₦8,500",
          status: "pending",
          providerName: "Pending Assignment",
          providerImage: null,
          serviceImage: "/images/laundry.jpg",
        },
        {
          id: "B1236",
          serviceType: "Gardening",
          date: "2025-04-20T09:00:00",
          address: "789 Pine St",
          price: "₦12,000",
          status: "confirmed",
          providerName: "James Smith",
          providerImage: "/images/provider2.jpg",
          serviceImage: "/images/gardening.jpg",
        },
        {
          id: "B1237",
          serviceType: "Repairs",
          date: "2025-04-10T11:00:00",
          address: "321 Elm St",
          price: "₦9,500",
          status: "completed",
          providerName: "Robert Davis",
          providerImage: "/images/provider3.jpg",
          serviceImage: "/images/repairs.jpg",
        },
        {
          id: "B1238",
          serviceType: "Move-out Cleaning",
          date: "2025-04-05T08:00:00",
          address: "654 Maple Ave",
          price: "₦25,000",
          status: "cancelled",
          providerName: "Sarah Wilson",
          providerImage: "/images/provider4.jpg",
          serviceImage: "/images/move-out.jpg",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter bookings based on active tab and status filter
  const filteredBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();

    // First filter by tab
    if (activeTab === "upcoming" && bookingDate < today) {
      return false;
    }
    if (activeTab === "past" && bookingDate >= today) {
      return false;
    }

    // Then filter by status
    if (filterStatus !== "all" && booking.status !== filterStatus) {
      return false;
    }

    return true;
  });

  // Format date for display
  const formatBookingDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-NG", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Navigate to booking details
  const viewBookingDetails = (bookingId) => {
    router.push(`/bookings/${bookingId}`);
  };

  return (
    <>
      <Head>
        <title>My Bookings | Home Services</title>
        <meta
          name="description"
          content="View and manage your service bookings"
        />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6 md:space-x-10">
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  My Bookings
                </h1>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => router.push("/book-service")}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-purple-700"
                >
                  Book New Service
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "upcoming"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upcoming Bookings
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`py-4 px-6 font-medium text-sm ${
                activeTab === "past"
                  ? "border-b-2 border-purple-600 text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past Bookings
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterStatus === "all"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus("confirmed")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterStatus === "confirmed"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Confirmed
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterStatus === "pending"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("completed")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterStatus === "completed"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilterStatus("cancelled")}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filterStatus === "cancelled"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              Cancelled
            </button>
          </div>

          {/* Bookings List */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-500 mb-6">
                {activeTab === "upcoming"
                  ? "You don't have any upcoming bookings matching your filter."
                  : "You don't have any past bookings matching your filter."}
              </p>
              <button
                onClick={() => router.push("/book-service")}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
              >
                Book a Service
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="sm:flex">
                    <div className="sm:w-1/4 md:w-1/5">
                      <div className="h-48 sm:h-full bg-gray-200 relative">
                        {booking.serviceImage ? (
                          <img
                            src={booking.serviceImage}
                            alt={booking.serviceType}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="sm:w-3/4 md:w-4/5 p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                        <div>
                          <div className="flex items-center">
                            <h2 className="text-xl font-bold text-gray-900 mr-3">
                              {booking.serviceType}
                            </h2>
                            <span
                              className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status.charAt(0).toUpperCase() +
                                booking.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-500 mt-1">{booking.id}</p>
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          <p className="text-lg font-bold text-purple-600">
                            {booking.price}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="flex items-center text-gray-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            <span className="text-sm">
                              {formatBookingDate(booking.date)}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-500 mt-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                            <span className="text-sm">{booking.address}</span>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-2">
                            Service Provider
                          </p>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                              {booking.providerImage ? (
                                <img
                                  src={booking.providerImage}
                                  alt={booking.providerName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-gray-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                  />
                                </svg>
                              )}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">
                                {booking.providerName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => viewBookingDetails(booking.id)}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
                        >
                          View Details
                        </button>

                        {booking.status === "confirmed" && (
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Reschedule
                          </button>
                        )}

                        {(booking.status === "confirmed" ||
                          booking.status === "pending") && (
                          <button className="inline-flex items-center px-4 py-2 border border-red-300 text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50">
                            Cancel Booking
                          </button>
                        )}

                        {booking.status === "completed" && (
                          <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                            Leave Review
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
