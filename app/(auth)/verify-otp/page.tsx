"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter
import Link from "next/link";
export default function VerifyEmailPage() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(300);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // Initialize the router

  const images = ["/hero-slid.png", "/hero-slide.png", "/hero-slidee.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleInputChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`)?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus();
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setTimer(300);
    setIsResending(false);
  };


const handleVerify = (e) => {
  e.preventDefault();
  setIsModalOpen(true);
};

// Function to close modal and navigate to login page
const handleCloseModal = () => {
  setIsModalOpen(false);
  router.push("/signin");
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
            Verify Your Email
          </h1>
          <p className="text-base text-center mb-4 text-[#373737B2]">
            Please enter the 4-digit code sent to your email
          </p>
          <p className="text-sm text-center mb-6 text-[#373737B2]">
            Code expires in{" "}
            <span className="font-medium text-[#3310C2]">
              {formatTime(timer)}
            </span>
          </p>

          <form onSubmit={handleVerify}>
            <div className="flex justify-center space-x-2 mb-6">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-14 h-14 text-center text-black text-xl border-2 rounded-lg focus:border-blue-500 focus:ring-blue-500 outline-none"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-3/4 bg-[#3310C2] border border-[[#3310C2]] text-lg text-[#ffff] py-2 rounded-lg mx-auto block mb-4"
            >
              Verify Email
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={handleResendCode}
              disabled={timer > 0 || isResending}
              className={`text-sm font-medium ${
                timer > 0 || isResending
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#3310C2] hover:text-[#3310C2]/80"
              }`}
            >
              {isResending
                ? "Sending..."
                : timer > 0
                ? `Resend code in ${formatTime(timer)}`
                : "Resend verification code"}
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <p className="mb-4 text-black">
              Your email has been verified successfully!
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-[#3310C2] text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
