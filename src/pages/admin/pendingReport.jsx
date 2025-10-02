import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Helper to generate ISO timestamp for N days ago
const daysAgo = (n) =>
  new Date(Date.now() - n * 24 * 60 * 60 * 1000).toISOString();

// Sample pending tickets across departments (replace with API data later)
const samplePendingTickets = [
  // Marine Operations
  {
    id: 1,
    mobile: "+91 98765 43210",
    department: "Marine Operations",
    createdAt: daysAgo(1),
  },
  {
    id: 2,
    mobile: "+91 91234 56789",
    department: "Marine Operations",
    createdAt: daysAgo(2),
  },
  {
    id: 3,
    mobile: "+91 90000 00000",
    department: "Marine Operations",
    createdAt: daysAgo(5),
  },
  {
    id: 4,
    mobile: "+91 95555 12345",
    department: "Marine Operations",
    createdAt: daysAgo(9),
  },

  // Port Security
  {
    id: 5,
    mobile: "+91 98888 87654",
    department: "Port Security",
    createdAt: daysAgo(0),
  },
  {
    id: 6,
    mobile: "+91 97777 11111",
    department: "Port Security",
    createdAt: daysAgo(6),
  },
  {
    id: 7,
    mobile: "+91 96666 22222",
    department: "Port Security",
    createdAt: daysAgo(12),
  },
  {
    id: 8,
    mobile: "+91 95555 33333",
    department: "Port Security",
    createdAt: daysAgo(35),
  },

  // Environmental Control
  {
    id: 9,
    mobile: "+91 94444 44444",
    department: "Environmental Control",
    createdAt: daysAgo(4),
  },
  {
    id: 10,
    mobile: "+91 93333 55555",
    department: "Environmental Control",
    createdAt: daysAgo(16),
  },
  {
    id: 11,
    mobile: "+91 92222 66666",
    department: "Environmental Control",
    createdAt: daysAgo(29),
  },

  // Navigation Services
  {
    id: 12,
    mobile: "+91 91111 77777",
    department: "Navigation Services",
    createdAt: daysAgo(3),
  },
  {
    id: 13,
    mobile: "+91 90000 88888",
    department: "Navigation Services",
    createdAt: daysAgo(7),
  },
  {
    id: 14,
    mobile: "+91 89999 99999",
    department: "Navigation Services",
    createdAt: daysAgo(14),
  },

  // Emergency Response
  {
    id: 15,
    mobile: "+91 88888 11111",
    department: "Emergency Response",
    createdAt: daysAgo(8),
  },
  {
    id: 16,
    mobile: "+91 87777 22222",
    department: "Emergency Response",
    createdAt: daysAgo(31),
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
  const created = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = Math.max(0, now - created);
  return Math.floor(diffMs / (24 * 60 * 60 * 1000));
};

const PendingReport = () => {
  const navigate = useNavigate();
  const rows = useMemo(() => {
    const byDepartment = new Map();

    for (const t of samplePendingTickets) {
      const dept = t.department || "Unknown";
      const age = getAgeInDays(t.createdAt);
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
              Pending Report
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Aggregated pending grievances by department and age buckets.
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-700">
            <span className="inline-flex items-center rounded-lg bg-red-50 px-3 py-1.5 font-semibold text-red-700 ring-1 ring-red-200">
              Total Pending: {grandTotal}
            </span>
            <span className="inline-flex items-center rounded-lg bg-sky-50 px-3 py-1.5 font-semibold text-sky-700 ring-1 ring-sky-200">
              Departments: {rows.length}
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
                      <td className="px-4 py-4 text-slate-700 font-medium bg-white">
                        {index + 1}
                      </td>
                      <td className="px-4 py-4 bg-white">
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
                            No pending tickets found.
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
                      Total Pending
                    </th>
                    {BUCKETS.map((b) => (
                      <th key={b.key} className="px-4 py-3 whitespace-nowrap">
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
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-blue-700 ring-1 ring-blue-200 group-hover:ring-blue-300">
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
                          <td key={b.key} className="px-4 py-4" title={title}>
                            {count > 0 ? (
                              <button
                                type="button"
                                onClick={() =>
                                  navigate("/grievances/pending", {
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
                                className={`${commonClasses} bg-red-50 text-red-700 ring-red-200 hover:ring-red-300 hover:brightness-105 active:scale-[0.98]`}
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
                        <span className="inline-flex items-center rounded-lg bg-blue-50 px-2.5 py-1 text:[11px] font-semibold text-blue-700 ring-1 ring-blue-200">
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
          \n+ {/* Mobile Table Layout - All columns visible */}
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
                  <th className="px-3 py-3 whitespace-nowrap w-[100px]">
                    Total Pending
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
                      <span className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200 group-hover:ring-blue-300">
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
                                navigate("/grievances/pending", {
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
                              className={`${commonClasses} bg-red-50 text-red-700 ring-red-200 hover:ring-red-300 hover:brightness-105 active:scale-[0.98]`}
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
                      <span className="inline-flex items-center rounded-lg bg-blue-50 px-2 py-1 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200">
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
                          No pending tickets found.
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
            Showing {rows.length} departments, {grandTotal} total pending
            tickets
          </p>
        </div>
      </div>
    </section>
  );
};

export default PendingReport;
