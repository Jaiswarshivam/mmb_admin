import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import actionIcon from "../../assets/icons/action.svg";
import audio from "../../assets/audio/call.mp3";
import searchIcon from "../../assets/icons/searchTic.svg";

const sampleGrievances = [
  // Marine Operations
  {
    id: 1,
    dateTime: "2025-08-28 09:30 AM",
    ticketNo: "MMB-SEA-240201",
    mobile: "+91 98765 43210",
    shipName: "MV Blue Horizon",
    location: "Mumbai Port, Dock 3",
    audioUrl: audio,
    transcription:
      "Oil spill detected near the hull of MV Blue Horizon. Request immediate containment and cleanup Oil spill detected near the hull of MV Blue Horizon. Request immediate containment and cleanup Oil spill detected near the hull of MV Blue Horizon. Request immediate containment and cleanup",
    grievanceType: "Pollution",
    department: "Marine Operations",
  },
  {
    id: 2,
    dateTime: "2025-08-27 11:15 AM",
    ticketNo: "MMB-SEA-240202",
    mobile: "+91 91234 56789",
    shipName: "SS Marine Star",
    location: "Offshore, 5 NM from Gateway of India",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    transcription:
      "Navigation buoy light not functioning, posing risk to passing vessels at night.",
    grievanceType: "Navigation Hazard",
    department: "Marine Operations",
  },
  {
    id: 3,
    dateTime: "2025-08-23 01:40 PM",
    ticketNo: "MMB-SEA-240203",
    mobile: "+91 90000 00000",
    shipName: "FV Sea Pearl",
    location: "Fishing Zone B, Arabian Sea",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_2MG.mp3",
    transcription:
      "Illegal fishing trawlers spotted in restricted area. Request patrolling.",
    grievanceType: "Illegal Activity",
    department: "Marine Operations",
  },
  {
    id: 4,
    dateTime: "2025-08-19 02:20 PM",
    ticketNo: "MMB-SEA-240204",
    mobile: "+91 95555 12345",
    shipName: "MV Ocean Explorer",
    location: "JNPT Terminal, Navi Mumbai",
    audioUrl: audio,
    transcription:
      "Cargo handling equipment malfunction causing delays in loading operations.",
    grievanceType: "Equipment Failure",
    department: "Marine Operations",
  },
  // Port Security
  {
    id: 5,
    dateTime: "2025-08-28 03:15 PM",
    ticketNo: "MMB-SEA-240205",
    mobile: "+91 98888 87654",
    shipName: "SS Coastal Guardian",
    location: "Mumbai Harbour, Anchorage A",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    transcription:
      "Suspicious vessel movements detected near restricted zone. Immediate patrol required.",
    grievanceType: "Security Alert",
    department: "Port Security",
  },
  {
    id: 6,
    dateTime: "2025-08-22 08:30 AM",
    ticketNo: "MMB-SEA-240206",
    mobile: "+91 97777 11111",
    shipName: "MV Security Watch",
    location: "Port Entry Point Alpha",
    audioUrl: audio,
    transcription:
      "Unauthorized personnel attempting to access restricted dock area.",
    grievanceType: "Security Breach",
    department: "Port Security",
  },
  {
    id: 7,
    dateTime: "2025-08-16 11:45 AM",
    ticketNo: "MMB-SEA-240207",
    mobile: "+91 96666 22222",
    shipName: "FV Border Patrol",
    location: "International Waters Boundary",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_2MG.mp3",
    transcription:
      "Unregistered fishing vessel spotted crossing territorial boundaries.",
    grievanceType: "Border Violation",
    department: "Port Security",
  },
  {
    id: 8,
    dateTime: "2024-12-24 05:20 PM",
    ticketNo: "MMB-SEA-240208",
    mobile: "+91 95555 33333",
    shipName: "SS Alert Response",
    location: "Outer Harbor Zone",
    audioUrl: audio,
    transcription:
      "Multiple vessels gathering in unauthorized formation near port entrance.",
    grievanceType: "Suspicious Activity",
    department: "Port Security",
  },
  // Environmental Control
  {
    id: 9,
    dateTime: "2025-08-24 04:10 AM",
    ticketNo: "MMB-SEA-240209",
    mobile: "+91 94444 44444",
    shipName: "MV Green Guardian",
    location: "Mumbai Bay, Sector 7",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    transcription:
      "Large oil slick visible on water surface. Immediate cleanup required.",
    grievanceType: "Environmental Hazard",
    department: "Environmental Control",
  },
  {
    id: 10,
    dateTime: "2025-08-12 07:25 AM",
    ticketNo: "MMB-SEA-240210",
    mobile: "+91 93333 55555",
    shipName: "FV Eco Watch",
    location: "Coastal Waters, Zone B",
    audioUrl: audio,
    transcription:
      "Chemical discharge observed from industrial vessel. Water contamination risk.",
    grievanceType: "Pollution Report",
    department: "Environmental Control",
  },
  {
    id: 11,
    dateTime: "2024-12-30 09:15 PM",
    ticketNo: "MMB-SEA-240211",
    mobile: "+91 92222 66666",
    shipName: "MV Nature Shield",
    location: "Marine Protected Area",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_2MG.mp3",
    transcription:
      "Plastic waste dumping witnessed from cargo vessel. Environmental violation.",
    grievanceType: "Waste Violation",
    department: "Environmental Control",
  },
  // Navigation Services
  {
    id: 12,
    dateTime: "2025-08-25 06:45 AM",
    ticketNo: "MMB-SEA-240212",
    mobile: "+91 91111 77777",
    shipName: "SS Navigator",
    location: "Main Shipping Channel",
    audioUrl: audio,
    transcription:
      "Navigation beacon malfunctioning. Ships reporting difficulty in channel navigation.",
    grievanceType: "Navigation Aid Failure",
    department: "Navigation Services",
  },
  {
    id: 13,
    dateTime: "2025-08-21 12:30 PM",
    ticketNo: "MMB-SEA-240213",
    mobile: "+91 90000 88888",
    shipName: "MV Route Master",
    location: "Approach Channel Delta",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    transcription:
      "GPS interference detected in main approach route. Multiple vessels affected.",
    grievanceType: "Signal Interference",
    department: "Navigation Services",
  },
  {
    id: 14,
    dateTime: "2025-08-14 03:20 PM",
    ticketNo: "MMB-SEA-240214",
    mobile: "+91 89999 99999",
    shipName: "FV Chart Reader",
    location: "Secondary Navigation Route",
    audioUrl: audio,
    transcription:
      "Depth markers showing incorrect readings. Risk of grounding for deep draft vessels.",
    grievanceType: "Chart Discrepancy",
    department: "Navigation Services",
  },
  // Emergency Response
  {
    id: 15,
    dateTime: "2025-08-20 01:15 AM",
    ticketNo: "MMB-SEA-240215",
    mobile: "+91 88888 11111",
    shipName: "MV Emergency Call",
    location: "Emergency Anchorage Zone",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_2MG.mp3",
    transcription:
      "Medical emergency aboard vessel. Crew member requires immediate evacuation.",
    grievanceType: "Medical Emergency",
    department: "Emergency Response",
  },
  {
    id: 16,
    dateTime: "2024-12-28 10:45 PM",
    ticketNo: "MMB-SEA-240216",
    mobile: "+91 87777 22222",
    shipName: "SS Rescue Ready",
    location: "Distress Signal Coordinates",
    audioUrl: audio,
    transcription:
      "Vessel taking on water rapidly. Engine failure reported. Immediate assistance required.",
    grievanceType: "Vessel Distress",
    department: "Emergency Response",
  },
];

const Pending = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [activeTicketFilter, setActiveTicketFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Apply incoming ticket number filter from navigation state
  useEffect(() => {
    if (
      location.state?.filterTicketNos &&
      Array.isArray(location.state.filterTicketNos)
    ) {
      setActiveTicketFilter({
        ticketNos: location.state.filterTicketNos,
        meta: location.state.filterMeta || null,
      });
    }
  }, [location.state]);

  const clearTicketFilter = () => setActiveTicketFilter(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = sampleGrievances;
    if (activeTicketFilter?.ticketNos?.length) {
      const setNos = new Set(
        activeTicketFilter.ticketNos.map((t) => t.toLowerCase())
      );
      base = base.filter((g) => setNos.has(g.mobile.toLowerCase()));
    }
    if (!q) return base;
    return base.filter((g) => {
      return (
        g.mobile.toLowerCase().includes(q) ||
        g.transcription.toLowerCase().includes(q) ||
        (g.department && g.department.toLowerCase().includes(q)) ||
        (g.location && g.location.toLowerCase().includes(q)) ||
        (g.grievanceType && g.grievanceType.toLowerCase().includes(q))
      );
    });
  }, [query, activeTicketFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = filtered.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query, activeTicketFilter]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => goToPage(currentPage + 1);
  const goToPrevPage = () => goToPage(currentPage - 1);

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {(() => {
                try {
                  const user = JSON.parse(localStorage.getItem("user") || "null");
                  return user && user.department ? `${user.department} ` : "Grievances";
                } catch {
                  return "Grievances";
                }
              })()}
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Review and take action on unresolved grievances.
            </p>
          </div>
          <div className="relative">
            <img
              src={searchIcon}
              alt="search"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Mobile, Text, Department."
              className="w-64 md:w-80 rounded-xl text-slate-700  border border-slate-200 bg-white/80 px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              {filtered.length}/{sampleGrievances.length}
            </span>
          </div>
        </div>
        {activeTicketFilter?.ticketNos?.length ? (
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs text-slate-600">
              Showing filtered mobile numbers from
              {activeTicketFilter.meta?.department ? (
                <>
                  {" "}
                  <span className="font-semibold text-slate-800">
                    {activeTicketFilter.meta.department}
                  </span>
                </>
              ) : null}
              {activeTicketFilter.meta?.label ? (
                <>
                  <span className="font-semibold text-slate-800">
                    {activeTicketFilter.meta.label}
                  </span>
                </>
              ) : null}
              : {activeTicketFilter.ticketNos.join(", ")}
            </div>
            <button
              type="button"
              onClick={clearTicketFilter}
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white ring-1 ring-slate-200 hover:ring-slate-300"
            >
              Clear filter
            </button>
          </div>
        ) : null}
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-0 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.05),transparent_60%)] pointer-events-none" />

          {/* Responsive Table Layout */}
          <div className="hidden md:flex">
            {/* Fixed Columns Table - Completely Frozen (Desktop only) */}
            <div className="flex-shrink-0 bg-white border-r-2 border-slate-300 relative z-50 shadow-xl">
              <table className="w-full text-left align-middle">
                <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap w-[80px]">
                      Sr. No.
                    </th>
                    <th className="px-4 py-3 whitespace-nowrap w-[160px]">
                      Mobile Number
                    </th>
                    <th className="px-4 py-3 whitespace-nowrap w-[200px]">
                      Date & Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentEntries.map((g, index) => (
                    <tr
                      key={g.id}
                      className="hover:bg-sky-50/50 transition-colors group"
                    >
                      <td className="px-4 py-5.5 text-slate-700 font-medium bg-white">
                        {startIndex + index + 1}
                      </td>
                      <td className="px-4 py-5.5 bg-white">
                        <span className="inline-flex items-center rounded-lg bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700 ring-1 ring-green-200 group-hover:ring-green-300">
                          {g.mobile}
                        </span>
                      </td>
                      <td className="px-3 py-5.5 text-slate-700 text-sm bg-white">
                        {g.dateTime}
                      </td>
                    </tr>
                  ))}
                  {currentEntries.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-4 py-8 text-center bg-white"
                      >
                        <div className="mx-auto max-w-md">
                          <p className="text-slate-600">
                            No grievances match your search. Try a different
                            query.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Scrollable Columns Table - Goes Behind Fixed (Desktop only) */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-2 glow-scrollbar relative z-10">
              <table className="min-w-[1200px] w-full text-left align-middle">
                <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-4 whitespace-nowrap">
                      Grievance Audio
                    </th>
                    <th className="px-4 py-4 min-w-[20rem]">
                      Text Transcription
                    </th>
                    <th className="px-4 py-4 text-right whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentEntries.map((g) => (
                    <tr
                      key={g.id}
                      className="hover:bg-sky-50/50 transition-colors group"
                    >
                      <td className="px-4 py-4">
                        <audio
                          controls
                          preload="none"
                          controlsList="nodownload"
                          className="max-w-[220px] h-8 rounded-md ring-1 ring-slate-200 bg-white/80"
                        >
                          <source src={g.audioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                          {g.transcription}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-1 rounded-lg bg-white text-white px-3 py-1.5 text-xs font-semibold shadow hover:brightness-110 active:scale-[0.98] transition"
                            onClick={() =>
                              navigate(`/grievances/action/${g.mobile}`, {
                                state: { grievance: g },
                              })
                            }
                          >
                            <img
                              src={actionIcon}
                              alt="action"
                              className="h-6 w-6"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Table Layout - All columns visible */}
          <div className="md:hidden overflow-x-auto">
            <table className="w-full text-left align-middle min-w-[800px]">
              <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-3 py-3 whitespace-nowrap w-[60px]">
                    Sr. No.
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[140px]">
                    Mobile Number
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[160px]">
                    Date & Time
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[180px]">
                    Grievance Audio
                  </th>
                  <th className="px-3 py-3 min-w-[200px]">
                    Text Transcription
                  </th>
                  <th className="px-3 py-3 text-right whitespace-nowrap w-[80px]">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentEntries.map((g, index) => (
                  <tr
                    key={g.id}
                    className="hover:bg-sky-50/50 transition-colors group"
                  >
                    <td className="px-3 py-4 text-slate-700 font-medium text-sm">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700 ring-1 ring-green-200 group-hover:ring-green-300">
                        {g.mobile}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-slate-700 text-xs">
                      {g.dateTime}
                    </td>
                    <td className="px-3 py-4">
                      <audio
                        controls
                        preload="none"
                        controlsList="nodownload"
                        className="max-w-[160px] h-7 rounded-md ring-1 ring-slate-200 bg-white/80"
                      >
                        <source src={g.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </td>
                    <td className="px-3 py-4">
                      <p className="text-slate-700 text-xs leading-relaxed line-clamp-2">
                        {g.transcription}
                      </p>
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 rounded-lg bg-white text-white px-2 py-1 text-xs font-semibold shadow hover:brightness-110 active:scale-[0.98] transition"
                          onClick={() =>
                            navigate(`/grievances/action/${g.mobile}`, {
                              state: { grievance: g },
                            })
                          }
                        >
                          <img
                            src={actionIcon}
                            alt="action"
                            className="h-5 w-5"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {currentEntries.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <div className="mx-auto max-w-md">
                        <p className="text-slate-600">
                          No grievances match your search. Try a different
                          query.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-white/70">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, filtered.length)}{" "}
              of {filtered.length} entries
            </span>
            {activeTicketFilter?.ticketNos?.length && (
              <span className="text-sky-600">
                (Filtered from {sampleGrievances.length} total)
              </span>
            )}
          </div>
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white ring-1 ring-slate-200 hover:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    const isCurrent = page === currentPage;
                    const isNearCurrent = Math.abs(page - currentPage) <= 1;
                    const isFirst = page === 1;
                    const isLast = page === totalPages;

                    if (isCurrent || isNearCurrent || isFirst || isLast) {
                      return (
                        <button
                          key={page}
                          type="button"
                          onClick={() => goToPage(page)}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                            isCurrent
                              ? "bg-sky-600 text-white shadow-lg"
                              : "bg-white text-slate-700 ring-1 ring-slate-200 hover:ring-sky-300 hover:text-sky-700"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="text-slate-400 text-xs">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}
              </div>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white ring-1 ring-slate-200 hover:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next
                <svg
                  className="w-3 h-3 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Pending;
