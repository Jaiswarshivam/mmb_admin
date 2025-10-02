import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import pendingIcon from "../assets/icons/pending.svg";
import reportIcon from "../assets/icons/report.svg";
import settingsIcon from "../assets/icons/settings.svg";

const Header = ({ onMenuClick }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    function onClickOutside(e) {
      if (!dropdownOpen) return;
      const menu = menuRef.current;
      const btn = buttonRef.current;
      if (menu && !menu.contains(e.target) && btn && !btn.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [dropdownOpen]);

  // Get department from localStorage
  const [userDepartment, setUserDepartment] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsed = JSON.parse(user);
        setUserDepartment(parsed.department || "");
      } catch {}
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-[15] w-full border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex items-center justify-between px-4 py-3 lg:px-8">
        <div className="flex items-center">
          {/* Mobile menu button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100 mr-3"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Page title - only show on mobile when sidebar is closed */}
          <h1 className="text-lg font-semibold text-slate-800 lg:hidden">
            {userDepartment ? userDepartment : "Dashboard"}
          </h1>
        </div>
        <div className="relative">
          <button
            ref={buttonRef}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-label="User menu"
            className="flex items-center gap-3 rounded-full px-2 py-1 text-sm"
          >
            <span className="h-9 w-9 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 inline-flex items-center justify-center text-sm font-semibold text-white shadow-inner">
              u
            </span>
            <div className="hidden sm:flex flex-col items-start leading-tight text-left">
              <span className="text-slate-900 font-semibold">{userDepartment || "Admin User"}</span>
              <span className="text-[11px] text-slate-500">Administrator</span>
            </div>
            <svg
              className="ml-1 h-4 w-4 text-slate-500"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.1 1.02l-4.24 4.64a.75.75 0 01-1.1 0L5.21 8.29a.75.75 0 01.02-1.08z" />
            </svg>
          </button>

          {dropdownOpen && (
            <div
              ref={menuRef}
              role="menu"
              aria-label="User menu"
              className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 backdrop-blur shadow-2xl ring-1 ring-slate-100"
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-br from-slate-50 to-white">
                <span className="h-10 w-10 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-white inline-flex items-center justify-center font-semibold shadow-inner">
                  A
                </span>
                <div className="min-w-0">
                  <div className="truncate font-semibold text-slate-900">
                    {userDepartment || "Admin User"}
                  </div>
                  <div className="mt-0.5 inline-flex items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-100">
                      Administrator
                    </span>
                    <span className="text-[11px] text-slate-400">ID: 0001</span>
                  </div>
                </div>
              </div>

              <hr className="border-slate-200" />

              {/* Actions */}
              <div className="py-2">
                <div className="px-5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Quick navigation</div>
                {[
                  { label: "Grievances", icon: pendingIcon, href: "/grievances/pending" },
                  { label: "Reports", icon: reportIcon, href: "/reports/completed" },
                  { label: "Settings", icon: settingsIcon, href: "/settings" },
                ].map((item) => {
                  const isActive = location.pathname.startsWith(item.href.replace(/\/$/, ""));
                  return (
                    <button
                      key={item.label}
                      className={`group relative flex w-full items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                        isActive
                          ? "text-sky-700 bg-sky-50/70"
                          : "text-slate-700 hover:bg-slate-50 focus:bg-slate-50"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setDropdownOpen(false);
                        navigate(item.href);
                      }}
                    >
                      <span
                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full transition-all ${
                          isActive ? "bg-sky-500 opacity-100" : "bg-sky-400/60 opacity-0 group-hover:opacity-60"
                        }`}
                      />
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 ${
                        isActive ? "bg-white ring-sky-300 shadow-sm" : "bg-white ring-slate-200 group-hover:ring-slate-300"
                      }`}>
                        <img src={item.icon} alt="" className={`h-5 w-5 ${isActive ? "opacity-100" : "opacity-80"}`} />
                      </span>
                      <span className={`truncate ${isActive ? "font-semibold" : "font-normal"}`}>{item.label}</span>
                      {isActive && (
                        <span className="ml-auto text-[10px] rounded-full bg-sky-100 text-sky-700 px-2 py-0.5 ring-1 ring-sky-200">Active</span>
                      )}
                    </button>
                  );
                })}
                <button
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 focus:bg-slate-50"
                  onClick={(e) => {
                    e.preventDefault();
                    setDropdownOpen(false);
                    handleSignOut();
                  }}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 bg-white ring-rose-200">
                    <svg
                      className="w-5 h-5 text-rose-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </span>
                  <span>Sign out</span>
                  
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
