import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/logos/logo.png";
import passwordIcon from "../../assets/icons/password.svg";
import viewIcon from "../../assets/icons/view.svg";
import viewOffIcon from "../../assets/icons/view-off.svg";
import { resetPassword } from "../../hooks/api";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = useMemo(() => {
    if (!password || !confirmPassword) return true;
    if (password.length < 6) return true;
    if (password !== confirmPassword) return true;
    return false;
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const resp = await resetPassword(token, password);
      if (resp?.success) {
        setSuccess("Password reset successfully. Redirecting to sign in...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        console.error('[UI] resetPassword unexpected response:', resp);
        setError(resp?.message || "Failed to reset password");
      }
    } catch (err) {
      console.error('[UI] resetPassword caught error:', err);
      setError(err?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-100 via-white to-sky-50 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
          <div className="grid md:grid-cols-2 min-h-[520px]">
            <div className="relative p-8 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="mb-6 flex items-center justify-center text-center">
                  <img src={logo} alt="" className="h-10" />
                </div>
                <header className="mb-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900 leading-tight">Set New Password</h2>
                  <p className="mt-1 text-sm text-gray-600">Enter and confirm your new password.</p>
                </header>

                {success ? (
                  <div className="mb-4 rounded-md border border-green-300 bg-green-100 px-3 py-2 text-sm text-green-800 font-medium">
                    {success}
                  </div>
                ) : null}
                {error ? (
                  <div className="mb-4 rounded-md border border-red-300 bg-red-100 px-3 py-2 text-sm text-red-800 font-medium">
                    {error}
                  </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">New Password</label>
                    <div className="relative group">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <img src={passwordIcon} alt="Password" className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100" />
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-400 bg-white/90 pl-10 pr-10 py-3 text-sm outline-none transition-all focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <img src={showPassword ? viewOffIcon : viewIcon} alt={showPassword ? "Hide" : "Show"} className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
                    <div className="relative group">
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <img src={passwordIcon} alt="Confirm" className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100" />
                      </span>
                      <input
                        type={showConfirm ? "text" : "password"}
                        className="w-full rounded-lg border border-gray-300 text-gray-800 placeholder:text-gray-400 bg-white/90 pl-10 pr-10 py-3 text-sm outline-none transition-all focus:border-sky-300 focus:ring-2 focus:ring-sky-100"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600"
                        aria-label={showConfirm ? "Hide confirm" : "Show confirm"}
                      >
                        <img src={showConfirm ? viewOffIcon : viewIcon} alt={showConfirm ? "Hide" : "Show"} className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100" />
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || isDisabled}
                    className="mt-2 flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#dcf2ff] to-sky-500 px-4 py-3 font-semibold text-sky-900 shadow-md transition-all hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? "Saving..." : "Save New Password"}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="text-sm font-medium text-sky-500 underline-offset-2 transition-all duration-300 hover:scale-105 hover:text-sky-600"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="relative bg-gradient-to-b from-[#dcf2ff] via-blue-50 to-sky-100 p-8 items-center justify-center overflow-hidden hidden md:flex">
              <div className="text-center space-y-6">
                <div className="relative">
                  <div className="text-sky-800 font-semibold">Secure password reset</div>
                  <div className="text-sky-600 text-sm">Keep your account protected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SetNewPassword;


