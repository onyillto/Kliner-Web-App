// File: app/page.tsx
"use client"
import UserHeader from "./components/UserHeader";
import SearchBar from "./components/SearchBar";
import SpecialOffers from "./components/SpecialOffers";
import ServiceCategories from "./components/ServiceCategories";
import ServiceItem from "./components/ServiceItem";
import BottomNavigation from "./components/BottomNavigation";
import DesktopSidebar from "./components/DesktopSidebar";
import ProgressBar from "./components/ProgressBar";
import NotificationDropdown from "./components/Notification_Dropdown";
import { useState } from "react";

export default function Home() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };
  return (
    <div className="bg-gray-50 min-h-screen relative">
      <main className="max-w-6xl mx-auto bg-white min-h-screen shadow-lg pb-16 lg:pl-16">
        <div className="max-w-md mx-auto lg:max-w-full lg:px-8">
          {/* User Header */}
          <UserHeader name="Daniel" />
          <NotificationDropdown isNotificationOpen={isNotificationOpen} />
          {/* Desktop Progress Bar - Only visible on lg+ screens */}
          <div className="px-4 my-4 hidden lg:block">
            <ProgressBar />
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-9">
              {/* Search Bar */}
              <div className="px-4 my-4">
                <SearchBar />
              </div>

              {/* Special Offers Section */}
              <div className="px-4 mb-6">
                <SpecialOffers />
              </div>

              {/* Service Categories - Component handles mobile/desktop display internally */}
              <div className="px-4 mb-6">
                <ServiceCategories />
              </div>

              {/* Service Items */}
              <div className="px-4 mb-6 lg:grid lg:grid-cols-2 lg:gap-6 text-indigo-600">
                <ServiceItem
                  title="Standard Cleaning"
                  price="$5/hr"
                  rating={4.5}
                  reviewCount={8000}
                  imageUrl="/standard.svg"
                />

                <div className=" lg:block">
                  <ServiceItem
                    title="Deep Cleaning"
                    price="$8/hr"
                    rating={4.7}
                    reviewCount={5200}
                    imageUrl="/deep.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Sidebar - Only visible on lg+ screens */}
            <div className="lg:col-span-3">
              <DesktopSidebar />
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </main>
    </div>
  );
}
