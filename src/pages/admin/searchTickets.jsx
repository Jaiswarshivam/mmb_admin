import React, { useState } from "react";
import audio from "../../assets/audio/call.mp3";

const sampleTickets = [
  {
    id: 1,
    date: "2025-08-28",
    time: "09:30 AM",
    mobile: "+91 98765 43210",
    grievanceText:
      "Oil spill detected near the hull of MV Blue Horizon. Request immediate containment and cleanup. The spill appears to be approximately 50 liters of heavy fuel oil.Navigation buoy light not functioning, posing risk to passing vessels at night. The buoy is located at coordinates 18.9217° N, 72.8347° E.",
    grievanceAudio: audio,
    department: "Environmental Control",
    rpo: "Mumbai RPO",
    terminal: "Mumbai Port Terminal",
    boatNumber: "BH-001",
    boatName: "MV Blue Horizon",
    actionTaken:
      "Deployed oil containment booms and cleanup crew. Successfully contained and cleaned the spill area.",
    actionTakenDate: "2025-08-28 02:15 PM",
    timeTakenForAction: "4 days",
    feedback:
      "Excellent response time and effective cleanup. The area is now safe for operations.",
    status: "Completed",
  },
  {
    id: 2,
    date: "2025-08-28",
    time: "11:15 AM",
    mobile: "+91 91234 56789",
    grievanceText:
      "Navigation buoy light not functioning, posing risk to passing vessels at night. The buoy is located at coordinates 18.9217° N, 72.8347° E.",
    grievanceAudio:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    department: "Navigation Services",
    rpo: "Mumbai RPO",
    terminal: "Gateway Terminal",
    boatNumber: "MS-002",
    boatName: "SS Marine Star",
    actionTaken:
      "Replaced faulty navigation buoy light with new LED system. Conducted safety inspection.",
    actionTakenDate: "2025-08-27 03:30 PM",
    timeTakenForAction: "4 days",
    feedback:
      "Navigation light restored successfully. All safety checks completed.",
    status: "Completed",
  },
  {
    id: 3,
    date: "2025-08-28",
    time: "01:40 PM",
    mobile: "+91 90000 00000",
    grievanceText:
      "Illegal fishing trawlers spotted in restricted area. Request patrolling. Multiple vessels observed using prohibited fishing methods.",
    grievanceAudio:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_2MG.mp3",
    department: "Port Security",
    rpo: "Mumbai RPO",
    terminal: "Fishing Terminal",
    boatNumber: "SP-003",
    boatName: "FV Sea Pearl",
    actionTaken:
      "Deployed patrol vessel to intercept illegal trawlers. Issued warnings and citations.",
    actionTakenDate: "2025-08-26 05:20 PM",
    timeTakenForAction: "3 days",
    feedback: "Illegal fishing activities stopped. Area is now secure.",
    status: "Completed",
  },
  {
    id: 4,
    date: "2025-08-25",
    time: "08:20 AM",
    mobile: "+91 95555 12345",
    grievanceText:
      "Cargo handling equipment malfunction causing delays in loading operations. Crane hydraulic system failure detected.",
    grievanceAudio: audio,
    department: "Marine Operations",
    rpo: "Navi Mumbai RPO",
    terminal: "JNPT Terminal",
    boatNumber: "OE-004",
    boatName: "MV Ocean Explorer",
    actionTaken:
      "Repaired cargo crane hydraulic system. Replaced damaged components and tested functionality.",
    actionTakenDate: "2025-08-25 12:45 PM",
    timeTakenForAction: "4 days",
    feedback:
      "Equipment repaired successfully. Loading operations resumed normally.",
    status: "Completed",
  },
  {
    id: 5,
    date: "2025-08-24",
    time: "03:15 PM",
    mobile: "+91 98888 87654",
    grievanceText:
      "Medical emergency on board. Crew member requires immediate medical assistance. Patient showing symptoms of severe chest pain.",
    grievanceAudio:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    department: "Emergency Response",
    rpo: "Mumbai RPO",
    terminal: "Mumbai Harbour",
    boatNumber: "CG-005",
    boatName: "SS Coastal Guardian",
    actionTaken:
      "Coordinated with port medical team. Arranged emergency medical evacuation and treatment.",
    actionTakenDate: "2025-08-24 04:30 PM",
    timeTakenForAction: "2 days",
    feedback:
      "Patient successfully evacuated and treated. Medical emergency handled efficiently.",
    status: "Completed",
  },
];

const SearchTickets = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSelectedTicket(null);
      return;
    }

    setIsSearching(true);

    // Simulate API delay
    setTimeout(() => {
      const query = searchQuery.trim().toLowerCase();
      // Normalize mobile numbers by removing spaces and special characters for comparison
      const normalizeMobile = (mobile) =>
        mobile.replace(/[\s\-()]/g, "").toLowerCase();
      const normalizedQuery = normalizeMobile(query);

      const results = sampleTickets.filter((ticket) => {
        const normalizedTicketMobile = normalizeMobile(ticket.mobile);
        return (
          normalizedTicketMobile.includes(normalizedQuery) ||
          ticket.mobile.toLowerCase().includes(query)
        );
      });

      setSearchResults(results);
      setSelectedTicket(results.length > 0 ? results[0] : null);
      setIsSearching(false);
    }, 500);
  };

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 ring-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 ring-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 ring-blue-200";
      case "Critical":
        return "bg-red-100 text-red-800 ring-red-200";
      default:
        return "bg-gray-100 text-gray-800 ring-gray-200";
    }
  };

  // getPriorityColor and all priority logic removed

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Search Grievances
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Search for specific grievances by mobile number to view detailed
              information
            </p>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
        <div className="max-w-2xl">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Search Grievance by Mobile Number
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter mobile number"
              className="flex-1 rounded-lg border text-slate-700 border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition"
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="lg:px-6 lg:py-3 px-1 text-xs lg:text-base bg-sky-600 text-white rounded-lg font-medium hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Search Results ({searchResults.length} found)
          </h2>
          <div className="space-y-3">
            {searchResults.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => handleTicketSelect(ticket)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  selectedTicket?.id === ticket.id
                    ? "border-sky-300 bg-sky-50 ring-2 ring-sky-100"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex items-center rounded-lg bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700 ring-1 ring-sky-200">
                        {ticket.mobile}
                      </span>
                      <div>
                        <p className="text-sm text-slate-600">{ticket.department}</p>
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center gap-3">
                      <span
                        className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  </div>

                  {/* Date and Time */}
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <svg
                      className="w-4 h-4 text-slate-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{ticket.date}</span>
                    <span className="text-slate-400">•</span>
                    <span>{ticket.time}</span>
                  </div>

                  {/* Grievance Audio */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-slate-700">
                        Audio:
                      </span>
                    </div>
                    <audio
                      controls
                      preload="none"
                      controlsList="nodownload"
                      className="flex-1 h-8 rounded-md ring-1 ring-slate-200 bg-white/80"
                    >
                      <source src={ticket.grievanceAudio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {/* Grievance Text Transcription */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-slate-700">
                        Transcription:
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-3 border border-slate-200">
                      {ticket.grievanceText}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Ticket Details */}
      {selectedTicket && (
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/50 backdrop-blur p-4 sm:p-6 lg:p-8 shadow-xl">
          {/* Header with Ticket Number */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                Grievance Details
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold ring-1 ${getStatusColor(
                    selectedTicket.status
                  )}`}
                >
                  {selectedTicket.status}
                </span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-md sm:rounded-lg flex items-center justify-center">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs sm:text-sm text-blue-600 font-medium">
                    Mobile Number
                  </p>
                  <p className="text-sm sm:text-lg font-bold text-blue-900 break-all">
                    {selectedTicket.mobile}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Left Column - Basic Information */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-100 rounded-md sm:rounded-lg flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    Basic Information
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-slate-100 last:border-b-0 gap-1 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        Date & Time
                      </span>
                    </div>
                    <div className="text-left sm:text-right ml-7 sm:ml-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-900">
                        {selectedTicket.date}
                      </p>
                      <p className="text-xs text-slate-500">
                        {selectedTicket.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-slate-100 last:border-b-0 gap-1 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        Department
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 ml-7 sm:ml-0">
                      {selectedTicket.department}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-slate-100 last:border-b-0 gap-1 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        RPO
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 ml-7 sm:ml-0">
                      {selectedTicket.rpo}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-slate-100 last:border-b-0 gap-1 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        Terminal
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 ml-7 sm:ml-0">
                      {selectedTicket.terminal}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-slate-100 last:border-b-0 gap-1 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        Boat Number
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 ml-7 sm:ml-0">
                      {selectedTicket.boatNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Action Details */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-md sm:rounded-lg flex items-center justify-center">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                    Action Details
                  </h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-slate-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-200 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-700">
                        Action Taken
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {selectedTicket.actionTaken}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-slate-100 gap-1 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        Action Date
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 ml-7 sm:ml-0">
                      {selectedTicket.actionTakenDate}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 sm:py-3 border-b border-slate-100 gap-1 sm:gap-0">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-slate-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-slate-600">
                        Time Taken
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 ml-7 sm:ml-0">
                      {selectedTicket.timeTakenForAction}
                    </span>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-green-200">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-md flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-green-700">
                        Feedback
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-green-800 leading-relaxed">
                      {selectedTicket.feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-8 shadow-sm text-center">
          <p className="text-slate-600 text-lg">
            No grievances found matching "{searchQuery}"
          </p>
          <p className="text-slate-500 text-sm mt-2">
            Please check the mobile number and try again
          </p>
        </div>
      )}
    </section>
  );
};

export default SearchTickets;
