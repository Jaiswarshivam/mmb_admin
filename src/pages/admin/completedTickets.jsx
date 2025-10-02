import React, { useMemo, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, Filter, X } from "lucide-react";
import audio from "../../assets/audio/call.mp3";
import searchIcon from "../../assets/icons/searchTic.svg";

const sampleCompletedTickets = [
  {
    id: 1,
    dateTime: "2025-08-28 09:30 AM",
    mobile: "+91 98765 43210",
    location: "Mumbai Port, Dock 3",
    audioUrl: audio,
    transcription:
      "Oil spill detected near the hull of MV Blue Horizon. Request immediate containment and cleanup Oil spill detected near the hull of MV Blue Horizon. Request immediate containment and cleanup Oil spill detected near the hull of MV Blue Horizon. Request immediate containment and cleanup",
    grievanceType: "Pollution",
    actionTaken:
      "Deployed oil containment booms and cleanup crew. Successfully contained and cleaned the spill area.",
    actionTakenDate: "2025-08-28 02:15 PM",
    timeTaken: "4 days",
    department: "Environmental Control",
  },
  {
    id: 2,
    dateTime: "2025-08-27 11:15 AM",
    mobile: "+91 91234 56789",
    location: "Offshore, 5 NM from Gateway of India",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    transcription:
      "Navigation buoy light not functioning, posing risk to passing vessels at night.",
    grievanceType: "Navigation Hazard",
    actionTaken:
      "Replaced faulty navigation buoy light with new LED system. Conducted safety inspection.",
    actionTakenDate: "2025-08-27 03:30 PM",
    timeTaken: "4 days",
    department: "Navigation Services",
  },
  {
    id: 3,
    dateTime: "2025-08-26 01:40 PM",
    mobile: "+91 90000 00000",
    location: "Fishing Zone B, Arabian Sea",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_2MG.mp3",
    transcription:
      "Illegal fishing trawlers spotted in restricted area. Request patrolling.",
    grievanceType: "Illegal Activity",
    actionTaken:
      "Deployed patrol vessel to intercept illegal trawlers. Issued warnings and citations.",
    actionTakenDate: "2025-08-26 05:20 PM",
    timeTaken: "3 days",
    department: "Port Security",
  },
  {
    id: 4,
    dateTime: "2025-08-25 08:20 AM",
    mobile: "+91 95555 12345",
    location: "JNPT Terminal, Navi Mumbai",
    audioUrl: audio,
    transcription:
      "Cargo handling equipment malfunction causing delays in loading operations.",
    grievanceType: "Equipment Failure",
    actionTaken:
      "Repaired cargo crane hydraulic system. Replaced damaged components and tested functionality.",
    actionTakenDate: "2025-08-25 12:45 PM",
    timeTaken: "4 days",
    department: "Marine Operations",
  },
  {
    id: 5,
    dateTime: "2025-08-24 03:15 PM",
    mobile: "+91 98888 87654",
    location: "Mumbai Harbour, Anchorage A",
    audioUrl:
      "https://file-examples.com/storage/fe1f9d7b6c4d5d90e7e5f86/2017/11/file_example_MP3_1MG.mp3",
    transcription:
      "Medical emergency on board. Crew member requires immediate medical assistance.",
    grievanceType: "Medical Emergency",
    actionTaken:
      "Coordinated with port medical team. Arranged emergency medical evacuation and treatment.",
    actionTakenDate: "2025-08-24 04:30 PM",
    timeTaken: "1 day",
    department: "Emergency Response",
  },
];

const CompletedTickets = () => {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [activeTicketFilter, setActiveTicketFilter] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);

  // Apply incoming mobile number filter from navigation state
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

  const clearAllFilters = () => {
    setActiveTicketFilter(null);
    setFromDate("");
    setToDate("");
    setShowDateFilter(false);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let base = sampleCompletedTickets;

    // Apply mobile number filter
    if (activeTicketFilter?.ticketNos?.length) {
      const setNos = new Set(
        activeTicketFilter.ticketNos.map((t) => t.toLowerCase())
      );
      base = base.filter((g) => setNos.has(g.mobile.toLowerCase()));
    }

    // Apply date range filter
    if (fromDate || toDate) {
      base = base.filter((ticket) => {
        const ticketDate = new Date(ticket.actionTakenDate);
        const from = fromDate ? new Date(fromDate) : null;
        const to = toDate ? new Date(toDate) : null;

        if (from && to) {
          return ticketDate >= from && ticketDate <= to;
        } else if (from) {
          return ticketDate >= from;
        } else if (to) {
          return ticketDate <= to;
        }
        return true;
      });
    }

    // Apply text search filter
    if (!q) return base;
    return base.filter((ticket) => {
      return (
        ticket.mobile.toLowerCase().includes(q) ||
        ticket.transcription.toLowerCase().includes(q) ||
        ticket.actionTaken.toLowerCase().includes(q) ||
        ticket.department.toLowerCase().includes(q)
      );
    });
  }, [query, activeTicketFilter, fromDate, toDate]);

  return (
    <section className="space-y-4 w-full min-w-0">
      <header className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Completed Tickets
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              View all resolved grievances and completed actions.
            </p>
          </div>
        </div>

        {/* Search and Filter Row */}
        <div className="mt-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <img
              src={searchIcon}
              alt="search"
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Mobile, Text, Action or Department"
              className="w-full rounded-xl text-slate-700 border border-slate-200 bg-white/80 px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              {filtered.length}/{sampleCompletedTickets.length}
            </span>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowDateFilter(!showDateFilter)}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                showDateFilter || fromDate || toDate
                  ? "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300 hover:text-slate-700"
              }`}
            >
              <Filter className="h-4 w-4" />
              Date Filter
              {(fromDate || toDate) && (
                <span className="inline-flex items-center rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                  Active
                </span>
              )}
            </button>

            {(fromDate || toDate) && (
              <button
                type="button"
                onClick={() => {
                  setFromDate("");
                  setToDate("");
                }}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50"
                title="Clear date filter"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Date Filter Panel */}
        {showDateFilter && (
          <div className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                  From:
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="rounded-lg border text-slate-700 border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition min-w-[140px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <label className="text-sm font-medium text-slate-700 whitespace-nowrap">
                  To:
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="rounded-lg border text-slate-700 border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition min-w-[140px]"
                />
              </div>
            </div>
          </div>
        )}

        {activeTicketFilter?.ticketNos?.length || fromDate || toDate ? (
          <div className="mt-3 flex items-center justify-between flex-wrap gap-2">
            <div className="text-xs text-slate-600">
              {activeTicketFilter?.ticketNos?.length && (
                <>
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
                        {" "}
                        {activeTicketFilter.meta.label}
                      </span>
                    </>
                  ) : null}
                  : {activeTicketFilter.ticketNos.join(", ")}
                </>
              )}
              {fromDate || toDate ? (
                <>
                  {activeTicketFilter?.ticketNos?.length && " | "}
                  Date range: {fromDate || "Any"} to {toDate || "Any"}
                </>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              {(fromDate || toDate) && (
                <button
                  type="button"
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                  }}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 bg-white ring-1 ring-slate-200 hover:ring-slate-300"
                >
                  Clear Date
                </button>
              )}
              {activeTicketFilter?.ticketNos?.length && (
                <button
                  type="button"
                  onClick={clearTicketFilter}
                  className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white ring-1 ring-slate-200 hover:ring-slate-300"
                >
                  Clear Mobiles
                </button>
              )}
              <button
                type="button"
                onClick={clearAllFilters}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-red-600 bg-white ring-1 ring-red-200 hover:ring-red-300"
              >
                Clear All
              </button>
            </div>
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
                    <th className="px-4 py-3 whitespace-nowrap w-[80px]">Sr. No.</th>
                    <th className="px-4 py-3 whitespace-nowrap w-[160px]">Mobile Number</th>
                    <th className="px-4 py-3 whitespace-nowrap w-[200px]">Date & Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((ticket, index) => (
                    <tr key={ticket.id} className="hover:bg-sky-50/50 transition-colors group">
                      <td className="px-4 py-6 text-slate-700 font-medium bg-white">
                        {index + 1}
                      </td>
                      <td className="px-4 py-6 bg-white">
                        <span className="inline-flex items-center rounded-lg bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700 ring-1 ring-green-200 group-hover:ring-green-300">
                          {ticket.mobile}
                        </span>
                      </td>
                      <td className="px-3 py-6 text-slate-700 text-sm bg-white">
                        {ticket.dateTime}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-4 py-8 text-center bg-white">
                        <div className="mx-auto max-w-md">
                          <p className="text-slate-600">
                            No completed tickets match your search. Try a
                            different query.
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
                    <th className="px-4 py-3 whitespace-nowrap">
                      Grievance Audio
                    </th>
                    <th className="px-4 py-3 min-w-[20rem]">
                      Text Transcription
                    </th>
                    <th className="px-4 py-3 min-w-[18rem]">Action Taken</th>
                    <th className="px-4 py-3 whitespace-nowrap">Action Date</th>
                    <th className="px-4 py-3 whitespace-nowrap">Time Taken</th>
                    <th className="px-4 py-3 whitespace-nowrap">Department</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((ticket, index) => (
                    <tr key={ticket.id} className="hover:bg-sky-50/50 transition-colors group">
                      <td className="px-4 py-3">
                        <audio
                          controls
                          preload="none"
                          controlsList="nodownload"
                          className="max-w-[220px] h-8 rounded-md ring-1 ring-slate-200 bg-white/80"
                        >
                          <source src={ticket.audioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                          {ticket.transcription}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
                          {ticket.actionTaken}
                        </p>
                      </td>
                      <td className="px-3 py-3 text-slate-700 text-sm">
                        {ticket.actionTakenDate}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200 group-hover:ring-blue-300">
                          {ticket.timeTaken}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-semibold text-purple-700 ring-1 ring-purple-200 group-hover:ring-purple-300">
                          {ticket.department}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Table Layout - All columns visible */}
          <div className="md:hidden overflow-x-auto">
            <table className="w-full text-left align-middle min-w-[1000px]">
              <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
                <tr>
                  <th className="px-3 py-3 whitespace-nowrap w-[60px]">Sr. No.</th>
                  <th className="px-3 py-3 whitespace-nowrap w-[140px]">Mobile Number</th>
                  <th className="px-3 py-3 whitespace-nowrap w-[160px]">Date & Time</th>
                  <th className="px-3 py-3 whitespace-nowrap w-[180px]">Grievance Audio</th>
                  <th className="px-3 py-3 min-w-[200px]">Text Transcription</th>
                  <th className="px-3 py-3 min-w-[180px]">Action Taken</th>
                  <th className="px-3 py-3 whitespace-nowrap w-[120px]">Action Date</th>
                  <th className="px-3 py-3 whitespace-nowrap w-[100px]">Time Taken</th>
                  <th className="px-3 py-3 whitespace-nowrap w-[120px]">Department</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((ticket, index) => (
                  <tr key={ticket.id} className="hover:bg-sky-50/50 transition-colors group">
                    <td className="px-3 py-4 text-slate-700 font-medium text-sm">
                      {index + 1}
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700 ring-1 ring-green-200 group-hover:ring-green-300">
                        {ticket.mobile}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-slate-700 text-xs">
                      {ticket.dateTime}
                    </td>
                    <td className="px-3 py-4">
                      <audio
                        controls
                        preload="none"
                        controlsList="nodownload"
                        className="max-w-[160px] h-7 rounded-md ring-1 ring-slate-200 bg-white/80"
                      >
                        <source src={ticket.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </td>
                    <td className="px-3 py-4">
                      <p className="text-slate-700 text-xs leading-relaxed line-clamp-2">
                        {ticket.transcription}
                      </p>
                    </td>
                    <td className="px-3 py-4">
                      <p className="text-slate-700 text-xs leading-relaxed line-clamp-2">
                        {ticket.actionTaken}
                      </p>
                    </td>
                    <td className="px-3 py-4 text-slate-700 text-xs">
                      {ticket.actionTakenDate}
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200 group-hover:ring-blue-300">
                        {ticket.timeTaken}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-purple-50 px-2 py-1 text-[10px] font-semibold text-purple-700 ring-1 ring-purple-200 group-hover:ring-purple-300">
                        {ticket.department}
                      </span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center">
                      <div className="mx-auto max-w-md">
                        <p className="text-slate-600">
                          No completed tickets match your search. Try a different query.
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
              Showing {filtered.length} of {sampleCompletedTickets.length}{" "}
              entries
            </span>
            {(activeTicketFilter?.ticketNos?.length || fromDate || toDate) && (
              <span className="text-sky-600">
                (Filtered from {sampleCompletedTickets.length} total)
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white ring-1 ring-slate-200 hover:ring-slate-300 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-lg px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 hover:brightness-110 shadow"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompletedTickets;
