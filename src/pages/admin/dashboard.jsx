import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  Building2,
  AlertTriangle,
  Users,
  Activity,
  BarChart3,
  Ship,
  Shield,
  Leaf,
  Navigation,
  Zap,
  Eye,
  Target,
  Calendar,
  ArrowUpRight,
  Filter,
  X,
} from "lucide-react";

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample data - replace with API calls later
  const stats = {
    totalTickets: 156,
    pendingTickets: 23,
    completedTickets: 133,
    totalDepartments: 5,
    avgResponseTime: "2.4 h",
    thisMonthCompleted: 45,
    thisMonthPending: 8,
    completionRate: 85,
    responseEfficiency: 92,
  };

  const departmentStats = [
    {
      name: "Marine Operations",
      pending: 8,
      completed: 52,
      total: 60,
      efficiency: 87,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      icon: Ship,
    },
    {
      name: "Port Security",
      pending: 6,
      completed: 38,
      total: 44,
      efficiency: 86,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: Shield,
    },
    {
      name: "Environmental Control",
      pending: 4,
      completed: 28,
      total: 32,
      efficiency: 88,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      icon: Leaf,
    },
  ];

  const recentActivity = [
    {
      id: 2,
      action: "New grievance reported from MV Ocean Star",
      time: "15 minutes ago",
      type: "new",

      department: "Port Security",
    },
    {
      id: 4,
      action: "Department assignment updated",
      time: "2 hours ago",
      type: "update",

      department: "Navigation Services",
    },
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const clearDateFilter = () => {
    setFromDate("");
    setToDate("");
    setShowDateFilter(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <header className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 text-base">
              Welcome back! Here's your comprehensive overview of maritime
              operations.
            </p>
          </div>
          <div className="text-right space-y-2">
            <div className="text-2xl font-bold text-slate-900 font-mono">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>

        {/* Date Filter Section */}
        <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
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
                onClick={clearDateFilter}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-slate-600 hover:text-slate-700 hover:bg-slate-50"
                title="Clear date filter"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {(fromDate || toDate) && (
            <div className="text-xs text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              Date range: {fromDate || "Any"} to {toDate || "Any"}
            </div>
          )}
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
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Tickets */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm">
              <BarChart3 className="h-6 w-6" />
            </div>
            <TrendingUp className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">
              Total Grievances
            </p>
            <p className="text-3xl font-bold text-indigo-600">
              {stats.totalTickets}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span>All time operations</span>
            </div>
          </div>
        </div>

        {/* Pending Tickets */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-red-600 text-white shadow-sm">
              <Clock className="h-6 w-6" />
            </div>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">
              Pending Grievances
            </p>
            <p className="text-3xl font-bold text-red-600">
              {stats.pendingTickets}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <span>Require attention</span>
            </div>
          </div>
        </div>

        {/* Completed Tickets */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm">
              <CheckCircle className="h-6 w-6" />
            </div>
            <TrendingUp className="h-5 w-5 text-sky-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">
              Completed Grievances
            </p>
            <p className="text-3xl font-bold text-sky-600">
              {stats.completedTickets}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-sky-500"></div>
              <span>Successfully resolved</span>
            </div>
          </div>
        </div>

        {/* Total Departments */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm">
              <Building2 className="h-6 w-6" />
            </div>
            <Users className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">Departments</p>
            <p className="text-3xl font-bold text-emerald-600">
              {stats.totalDepartments}
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span>Active operations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Charts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance Chart - Redesigned with Better Styling */}
        <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              Department Performance
            </h3>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 px-2 py-1 bg-red-50 rounded-full border border-red-200">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span className="text-red-700 font-medium hidden sm:inline">
                  Pending
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-sky-50 rounded-full border border-sky-200">
                <div className="w-2 h-2 rounded-full bg-sky-500"></div>
                <span className="text-sky-700 font-medium hidden sm:inline">
                  Completed
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {departmentStats.map((dept, index) => {
              const IconComponent = dept.icon;
              const pendingPercent = (dept.pending / dept.total) * 100;
              const completedPercent = (dept.completed / dept.total) * 100;

              return (
                <div
                  key={index}
                  className="group p-3 sm:p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`p-2 sm:p-3 rounded-xl ${dept.bgColor} ${dept.borderColor} border-2 shadow-sm group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 text-xs sm:text-sm">
                          {dept.name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base sm:text-lg font-bold text-slate-900">
                        {dept.total}
                      </div>
                      <div className="text-xs text-slate-500">
                        Total Tickets
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="w-full bg-slate-200 rounded-full h-3 sm:h-4 overflow-hidden mb-2 sm:mb-3 shadow-inner">
                    <div className="flex h-full">
                      <div
                        className="bg-gradient-to-r from-red-400 to-red-500 transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${pendingPercent}%` }}
                      ></div>
                      <div
                        className="bg-gradient-to-r from-sky-400 to-sky-500 transition-all duration-1000 ease-out shadow-sm"
                        style={{ width: `${completedPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Enhanced Stats */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm text-red-700 font-semibold bg-red-50 px-2 py-1 rounded-lg border border-red-200">
                        {dept.pending} pending
                      </span>
                      <span className="text-xs sm:text-sm text-sky-700 font-semibold bg-sky-50 px-2 py-1 rounded-lg border border-sky-200">
                        {dept.completed} completed
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      {Math.round(completedPercent)}% complete
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Overview Chart with Enhanced Design */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              Monthly Overview
            </h3>
            <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-600">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Last 6 Months</span>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            {/* Completion Rate with Circular Progress */}
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24">
                <svg className="w-20 h-20 sm:w-24 sm:h-24 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-slate-200"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 30}`}
                    strokeDashoffset={`${
                      2 *
                      Math.PI *
                      30 *
                      (1 -
                        stats.thisMonthCompleted /
                          (stats.thisMonthCompleted + stats.thisMonthPending))
                    }`}
                    className="text-green-500 transition-all duration-1000 ease-out"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute lg:top-3 lg:right-2.5 inset-0 flex items-center justify-center">
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    {Math.round(
                      (stats.thisMonthCompleted /
                        (stats.thisMonthCompleted + stats.thisMonthPending)) *
                        100
                    )}
                    %
                  </div>
                </div>
              </div>
              <div className="text-base sm:text-lg font-semibold text-slate-700 mt-2">
                Completion Rate
              </div>
            </div>

            {/* Monthly Stats with Enhanced Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                  {stats.thisMonthCompleted}
                </div>
                <div className="text-xs sm:text-sm text-green-700 font-medium">
                  Completed
                </div>
                <div className="text-xs text-green-600 mt-1">This Month</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-200 hover:shadow-md transition-all duration-300">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">
                  {stats.thisMonthPending}
                </div>
                <div className="text-xs sm:text-sm text-red-700 font-medium">
                  Pending
                </div>
                <div className="text-xs text-red-600 mt-1">This Month</div>
              </div>
            </div>

            {/* Response Time with Enhanced Design */}
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-sky-50 to-blue-50 rounded-xl border border-sky-200 hover:shadow-md transition-all duration-300">
              <div className="text-sm sm:text-lg font-semibold text-sky-700 mb-2">
                ⚡ Average Response Time
              </div>
              <div className="text-lg sm:text-2xl font-bold text-sky-600">
                {stats.avgResponseTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Recent Activity */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">
            Recent Activity
          </h3>
          <div className="flex items-center gap-2 px-2 sm:px-3 py-1.5 bg-slate-100 rounded-lg">
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-slate-600" />
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Live Updates
            </span>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div
                className={`p-2 sm:p-2.5 rounded-full transition-all duration-300 group-hover:scale-110 ${
                  activity.type === "completed"
                    ? "bg-green-100 text-green-600 group-hover:bg-green-200"
                    : activity.type === "new"
                    ? "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                    : activity.type === "action"
                    ? "bg-red-100 text-red-600 group-hover:bg-red-200"
                    : "bg-purple-100 text-purple-600 group-hover:bg-purple-200"
                }`}
              >
                {activity.type === "completed" ? (
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : activity.type === "new" ? (
                  <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : activity.type === "action" ? (
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                ) : (
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-semibold text-slate-900 group-hover:text-slate-800 transition-colors truncate">
                  {activity.action}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mt-1">
                  <p className="text-xs text-slate-500">{activity.time}</p>
                  <span className="hidden sm:inline text-xs text-slate-400">
                    •
                  </span>
                  <span className="text-xs text-slate-600 font-medium truncate">
                    {activity.department}
                  </span>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
