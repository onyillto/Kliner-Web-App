"use client";
import { useState, useEffect } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = ["/hero-slid.png", "/hero-slide.png", "/hero-slidee.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login submitted", { usernameOrEmail, password });
  };

  return (
    <div className="flex h-[100vh] w-screen">
      {/* Left Side - Image Slider */}
      <div
        className="hidden lg:flex w-1/2 h-screen bg-cover bg-center items-end justify-center relative transition-all duration-1000"
        style={{ backgroundImage: `url('${images[currentSlide]}')` }}
      >
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content container */}
        <div className="relative text-center text-white pb-10 px-6 w-full">
          <h2 className="text-xl lg:text-2xl font-bold mb-3">
            Impeccable Service
          </h2>
          <p className="text-sm lg:text-base opacity-80 mb-4">
            Klinners.co helps you tidy up your environment impeccably
          </p>

          {/* Slide indicators - Styled as fine buttons */}
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

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-4 sm:p-6">
          {/* Logo */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <img
              src="/klin-logo.png" // Replace with your logo path
              alt="Logo"
              className="w-16 h-16 sm:w-24 sm:h-24" // Adjust size as needed
            />
          </div>

          <h1
            className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center"
            style={{ color: "#1E1E1E" }}
          >
            Welcome to Klinners.co
          </h1>
          <p
            className="text-sm sm:text-base text-center mb-4"
            style={{ color: "#373737B2" }}
          >
            Continue with Facebook or enter your account
          </p>
          <div className="space-y-2">
            <button
              className="w-[90%] max-w-[440px] sm:w-[80%] md:w-[440px] h-12 sm:h-[52px] bg-white py-1 sm:py-2 rounded flex items-center justify-center mx-auto"
              style={{ border: "1px solid black", color: "white" }}
            >
              <FaFacebook className="mr-2" style={{ color: "#1877F2" }} />
              <span style={{ color: "#1E1E1EB2" }}>Login with Facebook</span>
            </button>

            <button
              className="w-[90%] max-w-[440px] sm:w-[80%] md:w-[440px] h-12 sm:h-[52px] bg-white text-white py-1 sm:py-2 rounded flex items-center justify-center mx-auto"
              style={{ border: "1px solid black" }}
            >
              <FaGoogle className="mr-2" style={{ color: "#DB4437" }} />
              <span style={{ color: "#1E1E1EB2" }}>Login with Google</span>
            </button>
          </div>
          <div
            className="option-two"
            style={{ width: "440px", height: "58px" }}
          ></div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            <div className="w-16 sm:w-[108px] border-t border-black"></div>
            <p
              className="text-sm sm:text-base text-center"
              style={{ color: "#373737" }}
            >
              Or login with your account
            </p>
            <div className="w-16 sm:w-[108px] border-t border-black"></div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="space-y-3 sm:space-y-4">
              {/* Username or Email Field */}
              <div className="relative w-[90%] max-w-[440px] sm:w-full mx-auto">
                <input
                  type="text"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="w-full p-2 pr-10 text-sm sm:text-base text-black border border-gray-300 rounded-lg focus:border-blue-500 outline-none placeholder-black"
                  placeholder="Username or Email"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative w-[90%] max-w-[440px] sm:w-full mx-auto">
                <input
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 pr-10 text-sm sm:text-base text-black border border-gray-300 rounded-lg focus:border-blue-500 outline-none placeholder-black"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-500 w-5 h-5" />
                  ) : (
                    <Eye className="text-gray-500 w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mb-3 sm:mb-4 w-[90%] max-w-[440px] sm:w-full mx-auto">
              <label className="flex items-center text-sm sm:text-base text-[#000000]">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a
                href="/forget-password"
                className="text-sm sm:text-base text-[#00438F]"
              >
                Recovery Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-[90%] max-w-[440px] sm:w-full bg-white border bg-[#3310C2] border border-[#3310C2] text-lg text-[#ffff] text-sm sm:text-[18px] py-2 rounded-lg mx-auto block"
            >
              Login
            </button>
          </form>
          <p className="text-sm sm:text-base text-center mt-4 sm:mt-6 mb-3 sm:mb-4 font-semibold text-[#1E1E1E]">
            Join with us?{" "}
            <a href="/signup" className="text-blue-500">
              Create account it’s free
            </a>
          </p>

          <div>
            <p className="text-xs sm:text-sm text-[#A9B4CD] w-[90%] max-w-[440px] sm:w-full mx-auto">
              By continuing, you agree to NGservice{" "}
              <span className="text-[#000000]" style={{ fontWeight: "500" }}>
                Term of Use
              </span>{" "}
              and confirm that you have read{" "}
              <span className="text-[#000000]" style={{ fontWeight: "500" }}>
                Privacy Policy
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
