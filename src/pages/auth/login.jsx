import React, { useEffect, useState } from "react";
import RememberMe from "../../components/RememberMe";
import Lottie from "react-lottie";
import ship from "../../assets/lotties/login.json";
import emailIcon from "../../assets/icons/email.svg";
import viewIcon from "../../assets/icons/view.svg";
import viewOffIcon from "../../assets/icons/view-off.svg";
import passwordIcon from "../../assets/icons/password.svg";
import logo from "../../assets/logos/logo.png";
import { useNavigate } from "react-router-dom";
import { sendResetLink } from "../../hooks/api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("a@gmail.com");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("123456");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showMobileSplash, setShowMobileSplash] = useState(false);

  // Reset password states
  const [pageView, setPageView] = useState("SignIn");
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");
    if (!department) {
      setError("Please select a department");
      return;
    }
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // Check for dummy credentials
    if (
      (email === "a@gmail.com" || email === "u@gmail.com") &&
      password === "123456"
    ) {
      setLoading(true);
      try {
        await new Promise((r) => setTimeout(r, 800));
        // Set dummy auth for temporary access with role by email
        const role = email === "u@gmail.com" ? "user" : "admin";
        localStorage.setItem(
          "user",
          JSON.stringify({ email, role, name: "Demo User", department })
        );
        localStorage.setItem("token", "dummy-token");
        // Redirect based on role
        if (role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/grievances/pending");
        }
      } catch {
        setError("Login failed. Try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // Handle other credentials (existing functionality)
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      alert(`Logged in!\nEmail: ${email}`);
    } catch {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetEmailError("");

    if (!resetEmail.trim()) {
      setResetEmailError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) {
      setResetEmailError("Please enter a valid email address");
      return;
    }

    setResetLoading(true);
    try {
      const resp = await sendResetLink(resetEmail.trim());
      if (resp?.success) {
        setResetSuccess(true);
        setTimeout(() => {
          setPageView("SignIn");
          setResetEmail("");
          setResetSuccess(false);
        }, 2000);
      } else {
        console.error('[UI] sendResetLink unexpected response:', resp);
        setResetEmailError(resp?.message || "Failed to send reset link.");
      }
    } catch (err) {
      console.error('[UI] sendResetLink caught error:', err);
      setResetEmailError(err?.message || "Failed to send reset link. Please try again.");
    } finally {
      setResetLoading(false);
    }
  };

  const handlePageView = () => {
    setPageView("ResetPassword");
    setResetEmail("");
    setResetEmailError("");
    setResetSuccess(false);
  };

  const handleBackToSignIn = () => {
    setPageView("SignIn");
    setResetEmail("");
    setResetEmailError("");
    setResetSuccess(false);
  };

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: ship,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) {
      setShowMobileSplash(true);
      const timerId = setTimeout(() => setShowMobileSplash(false), 2000);
      return () => clearTimeout(timerId);
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-white to-sky-50 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-4">
        {/* Main Card Container */}
        <div className="bg-white rounded-xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-[600px]">
            {/* Right: Form Section */}
            <div
              className={`relative p-8 items-center justify-center ${
                showMobileSplash ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Login Form */}
              <div
                className={`w-full max-w-sm transition-all duration-500 ease-in-out ${
                  pageView === "ResetPassword"
                    ? "transform -translate-x-full opacity-0 absolute"
                    : "transform translate-x-0 opacity-100 relative"
                }`}
              >
                {/* Brand */}
                <div className="mb-6 flex items-center justify-center text-center">
                  <img src={logo} alt="" className="h-10" />
                </div>

                {/* Welcome */}
                <header className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    Welcome Back
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Please enter your details to continue.
                  </p>
                </header>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Select Department
                    </label>
                    <select
                      className="w-full rounded-lg border border-gray-300 text-gray-800 bg-white/90 pl-3 pr-3 py-3 text-sm outline-none transition-all focus:border-sky-300 focus:ring-2 focus:ring-sky-100 p mb-3"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="" disabled>
                        Select Department
                      </option>
                      <option value="General Legal Framework Department">General Legal Framework</option>
                      <option value="Ports, Shipyards, Marinas, Floatels, and Other Infrastructure Department">Ports, Shipyards, Marinas, Floatels, and Other Infrastructure</option>
                      <option value="Passenger Water Transport Department">Passenger Water Transport</option>
                      <option value="Engineering Department">Engineering </option>
                      <option value="Environment Department">Environment </option>
                      <option value="Inland Vessel Survey and Registration Department">Inland Vessel Survey and Registration</option>
                      <option value="Hydrography Department">Hydrography</option>
                      <option value="Coastal Safety and Security Department">Coastal Safety and Security</option>
                      <option value="Finance and Accounts Department">Finance and Accounts</option>
                      <option value="Administration & Personnel Department">Administration & Personnel</option>
                      <option value="Advertisement and Events Department">Advertisement and Events</option>
                    </select>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative group">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <img
                          src={emailIcon}
                          alt="Email"
                          className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100"
                        />
                      </span>
                      <input
                        type="email"
                        className="w-full rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-400 bg-white/90 pl-10 pr-3 py-3 text-sm outline-none transition-all focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                        placeholder="a@gmail.com | u@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <div className="relative group">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <img
                          src={passwordIcon}
                          alt="Password"
                          className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100"
                        />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-400 bg-white/90 pl-10 pr-10 py-3 text-sm outline-none transition-all focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600"
                      >
                        <img
                          src={showPassword ? viewOffIcon : viewIcon}
                          alt={showPassword ? "Hide" : "Show"}
                          className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100"
                        />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <RememberMe
                        checked={rememberMe}
                        onChange={setRememberMe}
                      />
                      <button
                        type="button"
                        onClick={handlePageView}
                        className="text-xs font-medium text-sky-500 decoration-[] underline-offset-2 transition-all duration-300 hover:scale-105 hover:text-sky-600 animate-pulse hover:animate-none cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {error ? (
                    <div className="rounded-md border border-red-300 bg-red-100 px-3 py-2 text-sm text-red-800 font-medium">
                      {error}
                    </div>
                  ) : null}

                  <button
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#dcf2ff] to-sky-500 px-4 py-3 font-semibold text-sky-900 shadow-md transition-all hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={loading}
                  > 
                    {loading ? "Signing in..." : "Sign In"}
                  </button> 

                  <p className="pt-2 text-center text-xs text-gray-500">
                    By continuing you agree to our Terms and Privacy Policy.
                  </p>
                </form>
              </div>

              {/* Reset Password Form */}
              <div
                className={`w-full max-w-sm transition-all duration-500 ease-in-out ${
                  pageView === "ResetPassword"
                    ? "transform translate-x-0 opacity-100 relative"
                    : "transform translate-x-full opacity-0 absolute"
                }`}
              >
                {/* Brand */}
                <div className="mb-6 flex items-center justify-center text-center">
                  <img src={logo} alt="" className="h-10" />
                </div>

                {/* Reset Password Header */}
                <header className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                    Reset Password
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    Enter your email to receive a reset link.
                  </p>
                </header>

                {/* Success Message */}
                {resetSuccess && (
                  <div className="mb-4 rounded-md border border-green-300 bg-green-100 px-3 py-2 text-sm text-green-800 font-medium">
                    Reset link sent successfully! Check your email.
                  </div>
                )}

                {/* Reset Password Form */}
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative group">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <img
                          src={emailIcon}
                          alt="Email"
                          className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100"
                        />
                      </span>
                      <input
                        type="email"
                        className={`w-full rounded-lg border ${
                          resetEmailError ? "border-red-300" : "border-gray-300"
                        } text-gray-800 placeholder:text-gray-400 bg-white/90 pl-10 pr-3 py-3 text-sm outline-none transition-all focus:border-sky-300 focus:ring-2 focus:ring-sky-100`}
                        placeholder="Enter your email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                    </div>
                    {resetEmailError && (
                      <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {resetEmailError}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#dcf2ff] to-sky-500 px-4 py-3 font-semibold text-sky-900 shadow-md transition-all hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={resetLoading}
                  >
                    {resetLoading ? "Sending..." : "Send Reset Link"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleBackToSignIn}
                      className="text-sm font-medium text-sky-500 decoration-[] underline-offset-2 transition-all duration-300 hover:scale-105 hover:text-sky-600 cursor-pointer"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* Left: Lottie Animation Section */}
            <div
              className={`relative bg-gradient-to-b from-[#dcf2ff] via-blue-50 to-sky-100 p-8 items-center justify-center overflow-hidden ${
                showMobileSplash ? "flex" : "hidden md:flex"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 -z-10 select-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 via-transparent to-transparent" />

              {/* Animated Content */}
              <div className="text-center space-y-6">
                <div className="relative animate-scroll-left-right">
                  <Lottie
                    options={lottieOptions}
                    height={300}
                    width={300}
                    isClickToPauseDisabled={true}
                  />

                  {/* Animated Elements */}
                  <div className="absolute left-0 top-10 animate-cloud-slow">
                    <svg width="60" height="30" viewBox="0 0 60 30" fill="none">
                      <ellipse cx="30" cy="15" rx="20" ry="8" fill="#e0f2fe" />
                      <ellipse cx="45" cy="18" rx="10" ry="5" fill="#bae6fd" />
                    </svg>
                  </div>
                  <div className="absolute right-0 bottom-10 animate-cloud-fast">
                    <svg width="50" height="25" viewBox="0 0 50 25" fill="none">
                      <ellipse
                        cx="25"
                        cy="12.5"
                        rx="15"
                        ry="6"
                        fill="#e0f2fe"
                      />
                      <ellipse cx="35" cy="15" rx="8" ry="4" fill="#bae6fd" />
                    </svg>
                  </div>
                  <div className="absolute left-5 top-0 animate-sunrise">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="15" fill="#fde68a" />
                      <circle cx="20" cy="20" r="10" fill="#fbbf24" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Animations CSS */}
              <style>
                {`
                  @keyframes cloudSlow {
                    0% { transform: translateX(-20px); }
                    100% { transform: translateX(20px); }
                  }
                  @keyframes cloudFast {
                    0% { transform: translateX(20px); }
                    100% { transform: translateX(-20px); }
                  }
                  @keyframes sunrise {
                    0% { transform: translateY(10px) scale(0.9); opacity: 0.7; }
                    100% { transform: translateY(0) scale(1); opacity: 1; }
                  }
                  @keyframes scrollLeftRight {
                    0% { transform: translateX(-50px); opacity: 0.8; }
                    50% { transform: translateX(0); opacity: 1; }
                    100% { transform: translateX(50px); opacity: 0.8; }
                  }
                  .animate-cloud-slow {
                    animation: cloudSlow 6s linear infinite alternate;
                  }
                  .animate-cloud-fast {
                    animation: cloudFast 4s linear infinite alternate;
                  }
                  .animate-sunrise {
                    animation: sunrise 2s cubic-bezier(0.4,0,0.2,1) forwards;
                  }
                  .animate-scroll-left-right {
                    animation: scrollLeftRight 8s ease-in-out infinite;
                  }
                `}
              </style>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
