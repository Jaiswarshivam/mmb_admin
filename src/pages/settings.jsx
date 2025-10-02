import React, { useEffect, useMemo, useRef, useState } from "react";
import viewIcon from "../assets/icons/view.svg";
import viewOffIcon from "../assets/icons/view-off.svg";

const Settings = () => {
  const fileInputRef = useRef(null);

  const [profileImage, setProfileImage] = useState(() => {
    try {
      return localStorage.getItem("profileImage") || "";
    } catch (err) {
      console.warn("Could not read profileImage from localStorage", err);
      return "";
    }
  });

  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState("");

  const storedUser = useMemo(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      return u || null;
    } catch (err) {
      console.warn("Could not read user from localStorage", err);
      return null;
    }
  }, []);

  const displayName = storedUser?.name || storedUser?.username || "User";
  const displayEmail = storedUser?.email || "user@example.com";
  const role = storedUser?.role || "user";

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!avatarMessage) return;
    const t = setTimeout(() => setAvatarMessage(""), 2500);
    return () => clearTimeout(t);
  }, [avatarMessage]);

  useEffect(() => {
    if (!passwordMessage && !passwordError) return;
    const t = setTimeout(() => {
      setPasswordMessage("");
      setPasswordError("");
    }, 3000);
    return () => clearTimeout(t);
  }, [passwordMessage, passwordError]);

  const handlePickImage = () => fileInputRef.current?.click();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result || "");
      setIsSavingAvatar(true);
      setTimeout(() => {
        try {
          localStorage.setItem("profileImage", dataUrl);
        } catch (err) {
          console.warn("Could not store profileImage", err);
        }
        setProfileImage(dataUrl);
        setIsSavingAvatar(false);
        setAvatarMessage("Profile photo updated");
      }, 500);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setIsSavingAvatar(true);
    setTimeout(() => {
      try {
        localStorage.removeItem("profileImage");
      } catch (err) {
        console.warn("Could not remove profileImage", err);
      }
      setProfileImage("");
      setIsSavingAvatar(false);
      setAvatarMessage("Profile photo removed");
    }, 400);
  };

  const validatePassword = () => {
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation do not match");
      return false;
    }
    return true;
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordMessage("");

    if (!validatePassword()) return;

    // Check current password against stored user (if present)
    const savedPassword = storedUser?.password;
    if (savedPassword && currentPassword !== savedPassword) {
      setPasswordError("Current password is incorrect");
      return;
    }

    setIsSavingPassword(true);
    setTimeout(() => {
      try {
        if (storedUser) {
          const updated = { ...storedUser, password: newPassword };
          localStorage.setItem("user", JSON.stringify(updated));
        }
      } catch (err) {
        console.warn("Could not update user in localStorage", err);
      }
      setIsSavingPassword(false);
      setPasswordMessage("Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }, 700);
  };

  const initials = useMemo(() => {
    const parts = String(displayName || "U")
      .trim()
      .split(/\s+/);
    const [a, b] = [parts[0]?.[0] || "U", parts[1]?.[0] || ""];
    return (a + b).toUpperCase();
  }, [displayName]);

  return (
    <section className="space-y-6">
      <header className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
            <p className="text-slate-600 text-sm mt-1">
              Manage your profile and security preferences
            </p>
          </div>
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-sky-100 text-sky-700 ring-1 ring-sky-200">
            {role === "user" ? "User" : "Admin"}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="col-span-1">
          <div className="relative rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-sky-500 to-indigo-500" />
            <div className="px-6 pb-6 -mt-10">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-2xl ring-4 ring-white overflow-hidden bg-slate-100 shadow-md grid place-items-center text-slate-500 text-2xl font-semibold">
                    {profileImage ? (
                      <img
                        src={profileImage}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>{initials}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handlePickImage}
                    className="absolute -bottom-2 -right-2 inline-flex items-center gap-1.5 rounded-xl bg-white text-sky-700 px-3 py-1.5 text-xs font-semibold shadow-md ring-1 ring-sky-200 hover:bg-sky-50 active:scale-[0.98]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M10.5 6h3l.471-1.414A2 2 0 0 1 15.88 3h2.24a2 2 0 0 1 1.886 2.667L19.5 9.75V19a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V9.75l-.506-1.52A2 2 0 0 1 5.88 3h2.24a2 2 0 0 1 1.909 1.586L10.5 6Z" />
                    </svg>
                    Change
                  </button>
                </div>

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-slate-800 leading-tight">
                    {displayName}
                  </h2>
                  <p className="text-slate-500 text-sm">{displayEmail}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />

                <button
                  onClick={handlePickImage}
                  disabled={isSavingAvatar}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-sky-600 text-white text-sm font-medium shadow hover:bg-sky-700 active:scale-[0.99] disabled:opacity-60"
                >
                  {isSavingAvatar ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                      Updating
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-white/30" />
                      Upload new
                    </span>
                  )}
                </button>

                {profileImage && (
                  <button
                    onClick={handleRemoveImage}
                    disabled={isSavingAvatar}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-rose-600 text-sm font-medium shadow border border-rose-200 hover:bg-rose-50 active:scale-[0.99] disabled:opacity-60"
                  >
                    Remove
                  </button>
                )}
              </div>

              {avatarMessage && (
                <div className="mt-4 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  {avatarMessage}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security Card */}
        <div className="col-span-1 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 rounded-t-2xl">
              <h3 className="text-base font-semibold text-slate-800">
                Change Password
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Keep your account secure by using a strong password
              </p>
            </div>

            <form
              onSubmit={handleChangePassword}
              className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Current password
                </label>
                <div className="relative group">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white pr-10 pl-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    placeholder="Enter current password"
                    autoComplete="current-password"
                    required={Boolean(storedUser?.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((v) => !v)}
                    aria-label={
                      showCurrentPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-3 flex items-center justify-center text-slate-400 hover:text-slate-600"
                  >
                    <img
                      src={showCurrentPassword ? viewOffIcon : viewIcon}
                      alt={showCurrentPassword ? "Hide" : "Show"}
                      className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100"
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  New password
                </label>
                <div className="relative group">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white pr-10 pl-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    placeholder="At least 6 characters"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((v) => !v)}
                    aria-label={
                      showNewPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-3 flex items-center justify-center text-slate-400 hover:text-slate-600"
                  >
                    <img
                      src={showNewPassword ? viewOffIcon : viewIcon}
                      alt={showNewPassword ? "Hide" : "Show"}
                      className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100"
                    />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Confirm new password
                </label>
                <div className="relative group">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white pr-10 pl-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200 focus:border-sky-400"
                    placeholder="Re-enter new password"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    className="absolute inset-y-0 right-3 flex items-center justify-center text-slate-400 hover:text-slate-600"
                  >
                    <img
                      src={showConfirmPassword ? viewOffIcon : viewIcon}
                      alt={showConfirmPassword ? "Hide" : "Show"}
                      className="h-4 w-4 filter grayscale opacity-60 transition group-focus-within:grayscale-0 group-focus-within:opacity-100"
                    />
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="md:col-span-2 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2">
                  {passwordError}
                </div>
              )}

              {passwordMessage && (
                <div className="md:col-span-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
                  {passwordMessage}
                </div>
              )}

              <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
                <button
                  type="reset"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-700 text-sm font-medium shadow border border-slate-200 hover:bg-slate-50 active:scale-[0.99]"
                  onClick={() => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setPasswordError("");
                    setPasswordMessage("");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingPassword}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 text-white text-sm font-semibold shadow hover:bg-sky-700 active:scale-[0.99] disabled:opacity-60"
                >
                  {isSavingPassword ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
                      Updating
                    </span>
                  ) : (
                    <span>Update password</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
