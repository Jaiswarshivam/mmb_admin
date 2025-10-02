import React, { useState } from "react";
import homeIcon from "../assets/icons/home.svg";
import pendingIcon from "../assets/icons/pending.svg";
import expandIcon from "../assets/icons/expand.svg";
import addIcon from "../assets/icons/add.svg";
import Logo from "../assets/logos/logo.png";
import favicon from "../assets/logos/favicon.png";
import search from "../assets/icons/searchTic.svg";
import report from "../assets/icons/report.svg";
import settingsIcon from "../assets/icons/settings.svg";
import LogoutModal from "../utils/logoutModal";

import { useLocation, useNavigate } from "react-router-dom";
import { AmpersandIcon, BookDashedIcon, PersonStandingIcon } from "lucide-react";

const Sidebar = ({
  expanded,
  onToggleExpand,
  forceVisible = false,
  showToggleExpand = true,
  onItemClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [reportsExpanded, setReportsExpanded] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(false);
  const [publicExpanded, setPublicExpanded] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Determine role and department from localStorage (dummy auth)
  const storedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();
  const role = storedUser?.role || null;
  const department = storedUser?.department || null;
  const isUser = role === "user";

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    
  };

  const handleLogoutConfirm = async () => {
    setIsLoggingOut(true);

    // Simulate logout process with a small delay for better UX
    setTimeout(() => {
      // Clear any stored authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Navigate to login page
      navigate("/");
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }, 1200);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };


  // Department-specific navigation configurations
  const getDepartmentNavigation = (dept) => {
    const baseItems = [
      { label: "Dashboard", icon: homeIcon, href: "/dashboard" },
      { label: "Settings", icon: settingsIcon, href: "/settings" },
    ];

    // Department-specific configurations
    const departmentConfigs = {
      "Environment Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/environment/",
            subroutes: [
              { label: "1.	CZMP Map Pendency ", href: "/admin/environment/czmp-map-pendency" },
              { label: "2.	MCZMA Pendency ", href: "/admin/environment/mczma-pendency" },
              { label: "3.	SEIAA Pendency", href: "/admin/environment/seiaa-pendency" },
              { label: "4.	SEAC  Pendency", href: "/admin/environment/seac-pendency" },
              { label: "5.	MOEFCC Pendency", href: "/admin/environment/moefc-pendency" },
              { label: "6.	High court pendency", href: "/admin/environment/high-court-pendency" },
              { label: "7.	Forest Pendency", href: "/admin/environment/forest-pendency" },
              { label: "8.	ASI Pendency", href: "/admin/environment/asi-pendency" },
            ],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/Environment/environment-public/",
          
        },
      },
      // All other departments have empty options until specified
      "General Legal Framework Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/general-legal-framework/",
          subroutes: [
            { label: "1. LIST OF ONGOING COURT CASES (Pendancy Timeline)", href: "/admin/general-legal-framework/list-of-ongoing-court-cases" },
            { label: "2. LIST OF ONGOING COURT CASES (Status)", href: "/admin/general-legal-framework/list-of-ongoing-court-cases-status" },
            { label: "3. COMPLIANCE STATUS OF DIRECTIONS UNDER FINAL COURT ORDERS", href: "/admin/general-legal-framework/compliance-status-of-directions-under-final-court-orders" },
          ],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/general-legal-framework/general-legal-framework-public/",
          subroutes: [],
        },
      },
      "Engineering Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/engineering/",
          subroutes: [],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/engineering/",
          subroutes: [],
        },
      },
      "Ports, Shipyards, Marinas, Floatels, and Other Infrastructure Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/ports-shipyards-marinas-floatels-and-other-infrastructure/",
          subroutes: [],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/port-shipyards-marinas-floatels/port-shipyards-marinas-floatels-public",
          subroutes: [],
        },
      },
      "Advertisement and Events Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/advertisement-and-events/",
          subroutes: [
            { label: "BARGE ADVERTISEMENT", href: "/admin/advertisement-and-events/barge-advertisements" },
            { label: "ADVERTISEMENT REVENUE", href: "/admin/advertisement-and-events/advertisement-revenue" },
            { label: "EVENT REVENUE", href: "/admin/advertisement-and-events/event-revenue" },
            { label: "LAND INFORMATION", href: "/admin/advertisement-and-events/land-information" },
          ],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/advertisement-and-events/",
          subroutes: [],
        },
      },
      "Passenger Water Transport Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/passenger-water-transport/",
          subroutes: [{label:"Passenger Water Transport Route", href: "/admin/passenger-water-transport/passenger-water-transport-route"},
            {label:"Boat Type", href: "/admin/passenger-water-transport/boat-type"},
            {label:"Revenue Analysis", href: "/admin/passenger-water-transport/revenue-analysis"},
            {label:"Vessel Registration-Port Group Wise1", href: "/admin/passenger-water-transport/vessel-registration-1"},
            {label:"Vessel Registration-Port Group Wise2", href: "/admin/passenger-water-transport/vessel-registration-2"},
          ],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/passenger-water-transport/",
          subroutes: [],
        },
      },
      "Hydrography Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/hydrography/",
          subroutes: [],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/hydrography/hydrography-public/",
          
        },
      },
      "Finance and Accounts Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/finance-and-accounts/",
          subroutes: [{ label: "Investment", href: "/admin/finance-and-account/investment-admin" },
            { label: "Budget", href: "/admin/finance-and-account/budget-admin" }
          ],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/finance-and-accounts/",
          subroutes: [],
        },
      },
      "Inland Vessel Survey and Registration Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/inland-vessel-survey-and-registration/",
          subroutes: [
            { label: "PWT Route Wise Dredging", href: "/admin/inland-vessel-survey-and-registration/pwtroute-wise-dredging/" },
          ],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/inland-vessel-survey-and-registration/",
          subroutes: [ { label: "IV SURVEY PORT WISE FINAL LIST", href: "/public/inland-vessel-survey-and-registration/inland-vessel-public-1" },
            { label: "IV SURVEY INFM FINAL", href: "/public/inland-vessel-survey-and-registration/inland-vessel-public-2" }
           ],
        },
      },
      "Administration & Personnel Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/administration-and-personnel/",
          subroutes: [],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/administration-and-personnel/",
          subroutes: [ { label: "summary(public)", href: "/public/administration-and-personnel/administration-personnel-public-summary" },
            { label: "class I", href: "/public/administration-and-personnel/administration-personnel-public-class-I" },
            { label: "class II", href: "/public/administration-and-personnel/administration-personnel-public-class-II" },
            { label: "class III", href: "/public/administration-and-personnel/administration-personnel-public-class-III" },
            { label: "class IV", href: "/public/administration-and-personnel/administration-personnel-public-class-IV" },
           ],
        },
      },
      
      "Coastal Safety and Security Department": {
        admin: {
          label: "Admin",
          icon: homeIcon,
          href: "/admin/coastal-safety-and-security/coastal-safety-security-admin",
          subroutes: [],
        },
        public: {
          label: "Public",
          icon: homeIcon,
          href: "/public/coastal-safety-and-security/coastal-safety-security-public",
          subroutes: [],
        },
      },
      
    };

    // Get department configuration or default
    const deptConfig = departmentConfigs[dept];
    
    if (deptConfig) {
      return [
        baseItems[0], // Dashboard
        deptConfig.admin, // Department-specific Admin
        deptConfig.public, // Department-specific Public
        ...baseItems.slice(1), // Only Settings
      ];
    }

    // Default navigation if no department or unknown department
    return [
      { label: "Dashboard", icon: homeIcon, href: "/dashboard" },
      {
        label: "Admin",
        icon: homeIcon,
        href: "/admin/",
        subroutes: [],
      },
      { label: "Public", icon: homeIcon, href: "/public" },
      ...baseItems.slice(1),
    ];
  };

  const navItems = getDepartmentNavigation(department);

  // Helper function to demonstrate department switching (for testing)
  const switchDepartment = (newDepartment) => {
    const currentUser = storedUser || {};
    const updatedUser = { ...currentUser, department: newDepartment };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // Force re-render by navigating to current page
    window.location.reload();
  };

  // Debug information (remove in production)
  console.log("Current Department:", department);
  console.log("Navigation Items:", navItems);

  // If dummy user, only show Pending and Completed Tickets
  const visibleItems = isUser
    ? [
        { label: "Settings", icon: settingsIcon, href: "/settings" },
      ]
    : navItems;

  const visibilityClass = forceVisible ? "block" : "hidden md:block";

  const handleReportsClick = () => {
    if (expanded) {
      setReportsExpanded(!reportsExpanded);
    } else {
      // If sidebar is collapsed, expand it and show subroutes
      onToggleExpand(true);
      setReportsExpanded(true);
    }
  };

  const handleAdminClick = () => {
    if (expanded) {
      setAdminExpanded(!adminExpanded);
    } else {
      // If sidebar is collapsed, expand it and show subroutes
      onToggleExpand(true);
      setAdminExpanded(true);
    }
  };

  const handlePublicClick = () => {
    if (expanded) {
      setPublicExpanded(!publicExpanded);
    } else {
      // If sidebar is collapsed, expand it and show subroutes
      onToggleExpand(true);
      setPublicExpanded(true);
    }
  };

  const isReportsActive = location.pathname.startsWith("/reports");
  const isAdminActive = location.pathname.startsWith("/admin");
  const isPublicActive = location.pathname.startsWith("/public");

  return (
    <aside
      className={`fixed left-0 top-0 h-screen ${
        expanded ? "w-64" : "w-20"
      } border-r border-slate-200 bg-slate-50 shadow-lg z-[25] ${visibilityClass} transition-[width] duration-300 overflow-visible`}
    >
      {/* Header */}
      <div className="px-3 py-4 relative">
        {/* Expand toggle visible at md+ unless disabled */}
        {showToggleExpand && (
          <button
            type="button"
            onClick={() => onToggleExpand(!expanded)}
            className="group absolute left-[20px] top-[80%] -translate-y-1/2 inline-flex items-center justify-center rounded-full p-1 bg-white/75 backdrop-blur-md text-sky-700 shadow-[0_10px_30px_-10px_rgba(2,132,199,0.55)] border border-white/80 hover:bg-white active:scale-[0.98] z-[30] cursor-pointer"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            <span className="absolute -inset-1 rounded-full bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative grid place-items-center h-7 w-7 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-inner">
              <img
                src={expandIcon}
                alt="Expand"
                className={`h-3.5 w-3.5 transition-transform ${
                  expanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            <span className="pointer-events-none absolute left-full ml-2 whitespace-nowrap rounded-md bg-slate-900/90 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {expanded ? "Collapse" : "Expand"}
            </span>
          </button>
        )}

        <div
          className={`flex items-center ${
            expanded ? "gap-5 justify-start" : "gap-0 justify-center"
          } mt-3`}
        >
          {expanded ? (
            <img src={Logo} alt="" className="h-10 w-34  drop-shadow-sm" />
          ) : (
            <img
              src={favicon}
              alt=""
              className="h-10 w-12 object-contain drop-shadow-sm"
            />
          )}

          {/* <div className={`${expanded ? "block" : "hidden"}`}>
            <p className="text-red-900 text-xl font-semibold leading-none">
              MMB
            </p>
            <p className="text-black text-[10px] mt-1">Management Portal</p>
          </div> */}
        </div>
        <hr className="border-t-2 border-slate-200 my-3 opacity-40 transition-all duration-500 ease-in-out hover:opacity-100 hover:border-sky-500 hover:shadow-sm" />
      </div>

      {/* Navigation */}
      <nav className="px-2 py-4 space-y-1">
        {visibleItems.map((item) => {
          const isActive = location.pathname === item.href;
          const hasSubroutes = item.subroutes && item.subroutes.length > 0;
          const isAdminItem = item.label.includes("Admin");
          const isPublicItem = item.label.includes("Public");
          const isReportsItem = item.label === "Reports";

          return (
            <div key={item.label} className="relative group">
              {/* Active indicator */}
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full transition-all duration-300 ${
                  isActive || (hasSubroutes && item.subroutes.length > 0 && ((isAdminActive && isAdminItem) || (isPublicActive && isPublicItem) || (isReportsActive && isReportsItem)))
                    ? "bg-sky-500 opacity-100"
                    : "bg-sky-400/60 opacity-0 group-hover:opacity-60"
                }`}
              />

              <button
                onClick={() => {
                  if (hasSubroutes && item.subroutes.length > 0) {
                    if (isAdminItem) {
                      handleAdminClick();
                    } else if (isPublicItem) {
                      handlePublicClick();
                    } else if (isReportsItem) {
                      handleReportsClick();
                    }
                  } else {
                    navigate(item.href);
                    if (onItemClick) onItemClick(item.label);
                  }
                }}
                className={`relative w-full flex items-center ${
                  expanded ? "justify-start" : "justify-center"
                } gap-3 ${
                  expanded ? "pl-4 pr-3" : "pl-0 pr-0"
                } rounded-xl py-2.5 text-sm transition-all duration-300 ${
                  isActive || (hasSubroutes && item.subroutes.length > 0 && ((isAdminActive && isAdminItem) || (isPublicActive && isPublicItem) || (isReportsActive && isReportsItem)))
                    ? "bg-sky-50 text-sky-700 ring-1 ring-sky-100 shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                } group-hover:translate-x-[2px]`}
                aria-current={isActive ? "page" : undefined}
              >
                {/* Icon container */}
                <span
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 transition-all duration-300 ${
                    isActive || (hasSubroutes && item.subroutes.length > 0 && ((isAdminActive && isAdminItem) || (isPublicActive && isPublicItem) || (isReportsActive && isReportsItem)))
                      ? "bg-white ring-sky-300 shadow-sm"
                      : "bg-white ring-slate-200 group-hover:ring-slate-300"
                  }`}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className={`h-5 w-5 transition-all duration-300 ${
                      isActive || (hasSubroutes && item.subroutes.length > 0 && ((isAdminActive && isAdminItem) || (isPublicActive && isPublicItem) || (isReportsActive && isReportsItem)))
                        ? "opacity-100"
                        : "opacity-70 grayscale contrast-75 group-hover:opacity-100 group-hover:grayscale-0 group-hover:contrast-100"
                    }`}
                  />
                </span>

                {/* Label */}
                <span
                  className={`${
                    expanded ? "inline" : "hidden"
                  } truncate transition-colors ${
                    isActive || (hasSubroutes && item.subroutes.length > 0 && ((isAdminActive && isAdminItem) || (isPublicActive && isPublicItem) || (isReportsActive && isReportsItem)))
                      ? "font-medium"
                      : "font-normal"
                  }`}
                >
                  {item.label}
                </span>

                {/* Plus icon for items with subroutes to indicate expandable - only show if there are actual subroutes */}
                {hasSubroutes && item.subroutes.length > 0 && expanded && (
                  <div className="ml-auto flex items-center gap-2">
                    <img
                      src={addIcon}
                      alt=""
                      className={`h-5 w-5 transition-transform opacity-60 ${
                        ((isAdminItem && adminExpanded) || (isPublicItem && publicExpanded) || (isReportsItem && reportsExpanded)) ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                )}

                <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Tooltip when collapsed */}
                {!expanded && (
                  <span className="pointer-events-none absolute left-full ml-2 rounded-md bg-slate-900 text-white text-[11px] font-medium px-2 py-1 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </button>

              {/* Subroutes */}
              {hasSubroutes && item.subroutes.length > 0 && expanded && (((isAdminItem && adminExpanded) || (isPublicItem && publicExpanded)) || (isReportsItem && reportsExpanded)) && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.subroutes.map((subroute) => {
                    const isSubrouteActive =
                      location.pathname === subroute.href;
                    return (
                      <button
                        key={subroute.label}
                        onClick={() => {
                          navigate(subroute.href);
                          if (onItemClick) onItemClick(subroute.label);
                        }}
                        className={`relative w-full flex items-center justify-start gap-3 pl-4 pr-3 rounded-lg py-2 text-xs transition-all duration-300 ${
                          isSubrouteActive
                            ? "bg-sky-100 text-sky-700 font-medium"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isSubrouteActive
                              ? "bg-sky-500"
                              : "bg-slate-300 group-hover:bg-slate-400"
                          }`}
                        />
                        <span className="truncate">{subroute.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-4 border-t border-slate-200 bg-white/90 backdrop-blur-sm">
        {/* User Info */}

        {/* Logout Button */}
        <div className={`${expanded ? "block" : "hidden"}`}>
          <button
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="group relative w-full overflow-hidden flex items-center justify-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 hover:from-rose-100 hover:via-pink-100 hover:to-red-100 shadow-md hover:shadow-lg hover:shadow-rose-200/30 border border-rose-200/60 hover:border-rose-300/80 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-200/20 via-pink-200/20 to-rose-200/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

            {/* Icon Container */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/50 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <svg
                className={`w-5 h-5 text-rose-600 transition-all duration-500 ${
                  isLoggingOut
                    ? "animate-spin"
                    : "group-hover:scale-110 group-hover:rotate-12"
                } drop-shadow-sm`}
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

            {/* Button Text */}
            <span className="relative z-10 text-sm text-rose-700 tracking-wide group-hover:text-rose-800 group-hover:tracking-wider transition-all duration-300">
              {isLoggingOut ? "Signing out..." : "Sign Out"}
            </span>

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/60 scale-0 group-active:scale-100 transition-transform duration-150 ease-out" />
          </button>
        </div>

        {/* Collapsed Logout Button */}
        <div className={`${expanded ? "hidden" : "block"}`}>
          <button
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="group relative w-full overflow-hidden flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 hover:from-rose-100 hover:via-pink-100 hover:to-red-100 shadow-md hover:shadow-lg hover:shadow-rose-200/30 border border-rose-200/60 hover:border-rose-300/80 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed transform hover:scale-[1.05] active:scale-[0.95]"
            title="Sign Out"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-rose-200/20 via-pink-200/20 to-rose-200/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

            {/* Icon Container */}
            <div className="relative z-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-white/50 scale-0 group-hover:scale-100 transition-transform duration-300" />
              <svg
                className={`w-6 h-6 text-rose-600 transition-all duration-500 ${
                  isLoggingOut
                    ? "animate-spin"
                    : "group-hover:scale-110 group-hover:rotate-12"
                } drop-shadow-sm`}
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

            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-2xl bg-white/60 scale-0 group-active:scale-100 transition-transform duration-150 ease-out" />

            {/* Enhanced Tooltip */}
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-xl bg-gradient-to-r from-slate-800/95 to-slate-700/95 backdrop-blur-sm px-3 py-2 text-[12px] font-semibold text-white opacity-0 shadow-2xl transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 border border-slate-600/50">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                {isLoggingOut ? "Signing out..." : "Sign Out"}
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-800/95 rotate-45 border-l border-b border-slate-600/50" />
            </span>
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
        isLoggingOut={isLoggingOut}
      />
    </aside>
  );
};

export default Sidebar;
