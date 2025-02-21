"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";

export default function CreateNewPasswordPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ["/hero-slid.png", "/hero-slide.png", "/hero-slidee.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push("/signin");
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left Side with Sliding Images */}
      <div
        className="hidden lg:flex w-1/2 h-screen bg-cover bg-center items-end justify-center relative transition-all duration-1000"
        style={{ backgroundImage: `url('${images[currentSlide]}')` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white pb-10 px-6 w-full">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Impeccable Service
          </h2>
          <p className="text-sm lg:text-base opacity-80 mb-4">
            Klinners.co helps you tidy up your environment impeccably
          </p>
          <div className="flex justify-center space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-[#787878]"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side with Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-6">
          <div className="flex justify-center mb-6">
            <img
              src="/klin-logo.png"
              alt="Logo"
              className="w-16 h-16 sm:w-24 sm:h-24"
            />
          </div>

          <h1 className="text-2xl font-bold mb-4 text-center text-[#1E1E1E]">
            Create New Password
          </h1>
          <p className="text-base text-center mb-6 text-[#373737B2]">
            Your new password must be different from previously used passwords
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border text-black rounded-lg focus:border-[#3310C2] focus:ring-[#3310C2] outline-none"
                placeholder="New Password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, new: !prev.new }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword.new ? (
                  <EyeOff className="text-gray-500 w-5 h-5" />
                ) : (
                  <Eye className="text-gray-500 w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border text-black rounded-lg focus:border-[#3310C2] focus:ring-[#3310C2] outline-none"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({
                    ...prev,
                    confirm: !prev.confirm,
                  }))
                }
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword.confirm ? (
                  <EyeOff className="text-gray-500 w-5 h-5" />
                ) : (
                  <Eye className="text-gray-500 w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#3310C2] text-white text-lg py-3 rounded-lg transition-colors hover:bg-[#3310C2]/90 disabled:bg-[#3310C2]/50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update Password"}
            </button>
          </form>

          <p className="text-sm text-[#373737B2] mt-4 text-center">
            Password must be at least 8 characters long
          </p>
        </div>
      </div>

      {/* Enhanced Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full mx-4 animate-fade-in">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-[#1E1E1E] mb-2">
                Password Updated!
              </h2>
              <p className="text-[#373737B2] mb-6">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </p>
              <button
                onClick={handleModalClose}
                className="w-full bg-[#3310C2] text-white py-3 rounded-lg hover:bg-[#3310C2]/90 transition-colors"
              >
                Continue to Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
