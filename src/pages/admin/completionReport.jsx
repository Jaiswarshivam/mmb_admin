import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Helper to generate ISO timestamp for N days ago from completion date
const daysAgo = (n) =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

// Sample completed tickets across departments (replace with API data later)
const sampleCompletedTickets = [
  // Marine Operations
  {
    id: 1,
    mobile: "+91 98765 43210",
    department: "Marine Operations",
    completedAt: daysAgo(1),
  },
  {
    id: 2,
    mobile: "+91 91234 56789",
    department: "Marine Operations",
    completedAt: daysAgo(2),
  },
  {
    id: 3,
    mobile: "+91 90000 00000",
    department: "Marine Operations",
    completedAt: daysAgo(4),
  },
  {
    id: 4,
    mobile: "+91 95555 12345",
    department: "Marine Operations",
    completedAt: daysAgo(8),
  },
  {
    id: 5,
    mobile: "+91 98888 87654",
    department: "Marine Operations",
    completedAt: daysAgo(12),
  },

  // Port Security
  {
    id: 6,
    mobile: "+91 97777 11111",
    department: "Port Security",
    completedAt: daysAgo(0),
  },
  {
    id: 7,
    mobile: "+91 96666 22222",
    department: "Port Security",
    completedAt: daysAgo(3),
  },
  {
    id: 8,
    mobile: "+91 95555 33333",
    department: "Port Security",
    completedAt: daysAgo(6),
  },
  {
    id: 9,
    mobile: "+91 94444 44444",
    department: "Port Security",
    completedAt: daysAgo(10),
  },
  {
    id: 10,
    mobile: "+91 93333 55555",
    department: "Port Security",
    completedAt: daysAgo(18),
  },
  {
    id: 11,
    mobile: "+91 92222 66666",
    department: "Port Security",
    completedAt: daysAgo(25),
  },
  {
    id: 12,
    mobile: "+91 91111 77777",
    department: "Port Security",
    completedAt: daysAgo(35),
  },

  // Environmental Control
  {
    id: 13,
    mobile: "+91 90000 00000",
    department: "Environmental Control",
    completedAt: daysAgo(1),
  },
  {
    id: 14,
    mobile: "+91 89999 99999",
    department: "Environmental Control",
    completedAt: daysAgo(5),
  },
  {
    id: 15,
    mobile: "+91 88888 11111",
    department: "Environmental Control",
    completedAt: daysAgo(14),
  },
  {
    id: 16,
    mobile: "+91 87777 22222",
    department: "Environmental Control",
    completedAt: daysAgo(22),
  },
  {
    id: 17,
    mobile: "+91 91111 77777",
    department: "Environmental Control",
    completedAt: daysAgo(32),
  },

  // Navigation Services
  {
    id: 18,
    mobile: "+91 90000 88888",
    department: "Navigation Services",
    completedAt: daysAgo(2),
  },
  {
    id: 19,
    mobile: "+91 89999 99999",
    department: "Navigation Services",
    completedAt: daysAgo(4),
  },
  {
    id: 20,
    mobile: "+91 98888 87654",
    department: "Navigation Services",
    completedAt: daysAgo(7),
  },
  {
    id: 21,
    mobile: "+91 97777 11111",
    department: "Navigation Services",
    completedAt: daysAgo(11),
  },
  {
    id: 22,
    mobile: "+91 96666 22222",
    department: "Navigation Services",
    completedAt: daysAgo(20),
  },

  // Emergency Response
  {
    id: 23,
    mobile: "+91 95555 33333",
    department: "Emergency Response",
    completedAt: daysAgo(0),
  },
  {
    id: 24,
    mobile: "+91 94444 44444",
    department: "Emergency Response",
    completedAt: daysAgo(3),
  },
  {
    id: 25,
    mobile: "+91 93333 55555",
    department: "Emergency Response",
    completedAt: daysAgo(9),
  },
  {
    id: 26,
    mobile: "+91 92222 66666",
    department: "Emergency Response",
    completedAt: daysAgo(16),
  },
  {
    id: 27,
    mobile: "+91 91111 77777",
    department: "Emergency Response",
    completedAt: daysAgo(28),
  },
  {
    id: 28,
    mobile: "+91 90000 00000",
    department: "Emergency Response",
    completedAt: daysAgo(40),
  },
];

const BUCKETS = [
  { key: "0-3", label: "0-3 Days", inBucket: (d) => d >= 0 && d <= 3 },
  { key: "3-7", label: "3-7 Days", inBucket: (d) => d > 3 && d <= 7 },
  { key: "7-15", label: "7-15 Days", inBucket: (d) => d > 7 && d <= 15 },
  { key: "15-30", label: "15-30 Days", inBucket: (d) => d > 15 && d <= 30 },
  { key: ">30", label: ">30 Days", inBucket: (d) => d > 30 },
];

const getAgeInDays = (iso) => {
  const completed = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - completed);
  return Math.floor(diffMs / (24 * 60 * 60 * 1000));
};

const CompletionReport = () => {
  const navigate = useNavigate();
  const rows = useMemo(() => {
    const byDepartment = new Map();

    for (const t of sampleCompletedTickets) {
      const dept = t.department || "Unknown";
      const age = getAgeInDays(t.completedAt);
      const bucketKey = BUCKETS.find((b) => b.inBucket(age))?.key || "0-3";

      if (!byDepartment.has(dept)) {
        byDepartment.set(dept, {
          department: dept,
          total: 0,
          buckets: {
            "0-3": [],
            "3-7": [],
            "7-15": [],
            "15-30": [],
            ">30": [],
          },
        });
      }

      const entry = byDepartment.get(dept);
      entry.total += 1;
      entry.buckets[bucketKey].push(t.mobile);
    }

    return Array.from(byDepartment.values()).sort((a, b) =>
      a.department.localeCompare(b.department)
    );
  }, []);

  const grandTotal = useMemo(
    () => rows.reduce((acc, r) => acc + r.total, 0),
    [rows]
  );

  const bucketTotals = useMemo(() => {
    const totals = {
      "0-3": 0,
      "3-7": 0,
      "7-15": 0,
      "15-30": 0,
      ">30": 0,
    };
    for (const row of rows) {
      for (const b of BUCKETS) {
        totals[b.key] += row.buckets[b.key].length;
      }
    }
    return totals;
  }, [rows]);

  return (
    <section className="space-y-4">
      <header className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-5 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Completion Report
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Aggregated completed grievances by department and completion age
              buckets.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="inline-flex items-center rounded-lg bg-green-50 px-3 py-1.5 font-semibold text-green-700 ring-1 ring-green-200">
              Total Completed: {grandTotal}
            </span>
            <span className="inline-flex items-center rounded-lg bg-sky-50 px-3 py-1.5 font-semibold text-sky-700 ring-1 ring-sky-200">
              Department: {(() => {
                try {
                  const user = JSON.parse(localStorage.getItem("user") || "null");
                  return user && user.department ? user.department : rows.length;
                } catch {
                  return rows.length;
                }
              })()}
            </span>
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-0 shadow-sm overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(14,165,233,0.05),transparent_60%)] pointer-events-none" />

          {/* Dual Table Layout - Fixed (up to Department) + Scrollable (rest) */}
          <div className="hidden md:flex">
            {/* Fixed Columns Table - Completely Frozen */}
            <div className="flex-shrink-0 bg-white border-r-2 border-slate-300 relative z-50 shadow-xl">
              <table className="w-full text-left align-middle">
                <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap w-[80px]">
                      Sr. No.
                    </th>
                    <th className="px-4 py-3 whitespace-nowrap w-[260px]">
                      Department
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((row, index) => (
                    <tr
                      key={row.department}
                      className="hover:bg-sky-50/50 transition-colors group"
                    >
                      <td className="px-4 py-6 text-slate-700 font-medium bg-white">
                        {index + 1}
                      </td>
                      <td className="px-4 py-6 bg-white">
                        <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-200 group-hover:ring-sky-300">
                          {row.department}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {rows.length === 0 && (
                    <tr>
                      <td
                        colSpan={2}
                        className="px-4 py-8 text-center bg-white"
                      >
                        <div className="mx-auto max-w-md">
                          <p className="text-slate-600">
                            No completed tickets found.
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Scrollable Columns Table - Goes Behind Fixed */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden pb-2 glow-scrollbar relative z-10">
              <table className="min-w-[900px] w-full text-left align-middle">
                <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">
                      Completed Tickets
                    </th>
                    {BUCKETS.map((b) => (
                      <th key={b.key} className="px-4 py-2 whitespace-nowrap">
                        {b.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rows.map((row) => (
                    <tr
                      key={row.department}
                      className="hover:bg-sky-50/50 transition-colors group"
                    >
                      <td className="px-4 py-6">
                        <span className="inline-flex items-center rounded-lg bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700 ring-1 ring-green-200 group-hover:ring-green-300">
                          {row.total}
                        </span>
                      </td>
                      {BUCKETS.map((b) => {
                        const tickets = row.buckets[b.key];
                        const count = tickets.length;
                        const title = count > 0 ? tickets.join(", ") : "";
                        const commonClasses =
                          "inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-semibold ring-1";
                        return (
                          <td key={b.key} className="px-4 py-3" title={title}>
                            {count > 0 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  navigate("/reports/completed", {
                                    state: {
                                      filterTicketNos: tickets,
                                      filterMeta: {
                                        department: row.department,
                                        bucket: b.key,
                                        label: b.label,
                                      },
                                    },
                                  })
                                }
                                className={`${commonClasses} bg-blue-50 text-blue-700 ring-blue-200 hover:ring-blue-300 hover:brightness-105 active:scale-[0.98] transition cursor-pointer`}
                              >
                                {count}
                              </button>
                            ) : (
                              <span
                                className={`${commonClasses} bg-slate-50 text-slate-500 ring-slate-200`}
                              >
                                {count}
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  {rows.length > 0 && (
                    <tr className="bg-slate-50/70">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-lg bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700 ring-1 ring-green-200">
                          {grandTotal}
                        </span>
                      </td>
                      {BUCKETS.map((b) => (
                        <td key={b.key} className="px-4 py-3">
                          <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-700 ring-1 ring-slate-300">
                            {bucketTotals[b.key]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  )}
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
                  <th className="px-3 py-3 whitespace-nowrap w-[200px]">
                    Department
                  </th>
                  <th className="px-3 py-3 whitespace-nowrap w-[140px]">
                    Completed Tickets
                  </th>
                  {BUCKETS.map((b) => (
                    <th
                      key={b.key}
                      className="px-3 py-3 whitespace-nowrap w-[80px]"
                    >
                      {b.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, index) => (
                  <tr
                    key={row.department}
                    className="hover:bg-sky-50/50 transition-colors group"
                  >
                    <td className="px-3 py-4 text-slate-700 font-medium text-sm">
                      {index + 1}
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-white px-2 py-1 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-200 group-hover:ring-sky-300">
                        {row.department}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700 ring-1 ring-green-200 group-hover:ring-green-300">
                        {row.total}
                      </span>
                    </td>
                    {BUCKETS.map((b) => {
                      const tickets = row.buckets[b.key];
                      const count = tickets.length;
                      const title = count > 0 ? tickets.join(", ") : "";
                      const commonClasses =
                        "inline-flex items-center rounded-lg px-2 py-1 text-[10px] font-semibold ring-1";
                      return (
                        <td key={b.key} className="px-3 py-4" title={title}>
                          {count > 0 ? (
                            <button
                              type="button"
                              onClick={() =>
                                navigate("/reports/completed", {
                                  state: {
                                    filterTicketNos: tickets,
                                    filterMeta: {
                                      department: row.department,
                                      bucket: b.key,
                                      label: b.label,
                                    },
                                  },
                                })
                              }
                              className={`${commonClasses} bg-blue-50 text-blue-700 ring-blue-200 hover:ring-blue-300 hover:brightness-105 active:scale-[0.98] transition cursor-pointer`}
                            >
                              {count}
                            </button>
                          ) : (
                            <span
                              className={`${commonClasses} bg-slate-50 text-slate-500 ring-slate-200`}
                            >
                              {count}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {rows.length > 0 && (
                  <tr className="bg-slate-50/70">
                    <td className="px-3 py-4 text-slate-700 font-medium text-sm">
                      Total
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-300">
                        All
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center rounded-lg bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700 ring-1 ring-green-200">
                        {grandTotal}
                      </span>
                    </td>
                    {BUCKETS.map((b) => (
                      <td key={b.key} className="px-3 py-4">
                        <span className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-700 ring-1 ring-slate-300">
                          {bucketTotals[b.key]}
                        </span>
                      </td>
                    ))}
                  </tr>
                )}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center">
                      <div className="mx-auto max-w-md">
                        <p className="text-slate-600">
                          No completed tickets found.
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
          <p className="text-xs text-slate-500">
            Showing {rows.length} departments, {grandTotal} total completed
            tickets
          </p>
        </div>
      </div>
    </section>
  );
};

export default CompletionReport;
