"use client";
import { useState, useEffect } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ["/hero-slid.png", "/hero-slide.png", "/hero-slidee.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
    setIsSending(false);
    setIsModalOpen(true);
  };

  return (
    <div className="flex h-screen w-screen">
      <div
        className="hidden lg:flex w-1/2 h-screen bg-cover bg-center items-end justify-center relative transition-all duration-1000"
        style={{ backgroundImage: `url('${images[currentSlide]}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-6">
          <div className="flex justify-center mb-6">
            <img src="/klin-logo.png" alt="Logo" className="w-20 h-20" />
          </div>

          <h1 className="text-2xl font-bold mb-4 text-center text-[#1E1E1E]">
            Forgot Password
          </h1>
          <p className="text-base text-center mb-4 text-[#373737B2]">
            Enter your email address to receive a password reset link
          </p>

          <form onSubmit={handleSendResetLink}>
            <div className="mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border-2 text-black rounded-lg focus:border-blue-500 focus:ring-blue-500 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#3310C2] border border-[#3310C2] text-lg text-[#ffff] py-2 rounded-lg mx-auto block mb-4"
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-bold text-[#1E1E1E]">
              Password Reset Link Sent!
            </h2>
            <p className="text-[#373737B2] mt-2">
              Check your email for the reset link.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 px-4 py-2 bg-[#3310C2] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
