import React, { useEffect } from "react";

const LogoutModal = ({ isOpen, onClose, onConfirm, isLoggingOut }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm transform transition-all duration-300 scale-100 opacity-100">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200/50">
          {/* Header with gradient */}
          <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 px-6 py-8 border-b border-rose-100/50">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-rose-200/20 to-pink-200/20 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-red-200/20 rounded-full translate-y-12 -translate-x-12" />

            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 border border-rose-200/50">
              <svg
                className={`w-8 h-8 text-rose-600 transition-all duration-500 ${
                  isLoggingOut ? "animate-spin" : "animate-pulse"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isLoggingOut ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                )}
              </svg>
            </div>

            {/* Title */}
            <h2 className="relative z-10 text-xl font-bold text-slate-800 text-center mb-2">
              {isLoggingOut ? "Signing Out..." : "Confirm Sign Out"}
            </h2>

            {/* Subtitle */}
            <p className="relative z-10 text-sm text-slate-600 text-center">
              {isLoggingOut
                ? "Please wait while we securely log you out"
                : "Are you sure you want to sign out of your account?"}
            </p>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {!isLoggingOut && (
              <div className="mb-6">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/50">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-1">
                      Important Notice
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You will be redirected to the login page and will need to
                      sign in again to access your account.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!isLoggingOut && (
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-slate-200/50"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={onConfirm}
                disabled={isLoggingOut}
                className="flex-1 relative overflow-hidden px-4 py-3 rounded-xl bg-gradient-to-br from-rose-500 via-rose-500 to-pink-600 hover:from-rose-600 hover:via-rose-600 hover:to-pink-700 text-white font-semibold transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl hover:shadow-rose-500/25 border border-rose-400/20"
              >
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

                {/* Button Content */}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoggingOut ? (
                    <>
                      <svg
                        className="w-4 h-4 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Signing Out...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Yes, Sign Out
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
