import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import save from "../../assets/icons/done.svg";

const ActionTaken = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);
  const [actionTaken, setActionTaken] = useState("");
  const [department, setDepartment] = useState("");
  const [boatNumber, setBoatNumber] = useState("");
  const [feedback, setFeedback] = useState("");

  // Dummy data for departments and boat numbers
  const departments = [
    { id: 1, name: "Marine Operations", code: "MO" },
    { id: 2, name: "Port Security", code: "PS" },
    { id: 3, name: "Environmental Control", code: "EC" },
    { id: 4, name: "Navigation Services", code: "NS" },
    { id: 5, name: "Emergency Response", code: "ER" },
  ];

  const boatNumbers = {
    "Marine Operations": ["MO-001", "MO-002", "MO-003", "MO-004"],
    "Port Security": ["PS-001", "PS-002", "PS-003"],
    "Environmental Control": ["EC-001", "EC-002"],
    "Navigation Services": ["NS-001", "NS-002", "NS-003"],
    "Emergency Response": ["ER-001", "ER-002", "ER-003"],
  };

  // Dummy RPO and Terminal data (in real app, this would come from backend)
  const getRPOAndTerminal = (dept, boat) => {
    if (!dept || !boat) return { rpo: "", terminal: "" };

    // Dummy mapping - in real app this would be API call
    const dummyData = {
      "Marine Operations": {
        "MO-001": { rpo: "RPO-001", terminal: "Terminal A" },
        "MO-002": { rpo: "RPO-002", terminal: "Terminal B" },
        "MO-003": { rpo: "RPO-003", terminal: "Terminal C" },
        "MO-004": { rpo: "RPO-004", terminal: "Terminal D" },
      },
      "Port Security": {
        "PS-001": { rpo: "RPO-005", terminal: "Terminal E" },
        "PS-002": { rpo: "RPO-006", terminal: "Terminal F" },
        "PS-003": { rpo: "RPO-007", terminal: "Terminal G" },
      },
      "Environmental Control": {
        "EC-001": { rpo: "RPO-008", terminal: "Terminal H" },
        "EC-002": { rpo: "RPO-009", terminal: "Terminal I" },
      },
      "Navigation Services": {
        "NS-001": { rpo: "RPO-010", terminal: "Terminal J" },
        "NS-002": { rpo: "RPO-011", terminal: "Terminal K" },
        "NS-003": { rpo: "RPO-012", terminal: "Terminal L" },
      },
      "Emergency Response": {
        "ER-001": { rpo: "RPO-013", terminal: "Terminal M" },
        "ER-002": { rpo: "RPO-014", terminal: "Terminal N" },
        "ER-003": { rpo: "RPO-015", terminal: "Terminal O" },
      },
    };

    return dummyData[dept]?.[boat] || { rpo: "", terminal: "" };
  };

  useEffect(() => {
    // Get grievance data from navigation state
    if (location.state?.grievance) {
      setGrievance(location.state.grievance);
    } else {
      // If no grievance data, redirect back to pending page
      navigate("/grievances/pending");
    }
  }, [location.state, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically send the action data to your backend
    const actionData = {
      grievanceId: grievance.id,
      mobileNumber: grievance.mobile,
      actionTaken,
      department,
      boatNumber,
      feedback,
      timestamp: new Date().toISOString(),
    };

    console.log("Action taken:", actionData);

    // Show success message and redirect
    alert("Action taken successfully!");
    navigate("/grievances/pending");
  };

  const handleCancel = () => {
    navigate("/grievances/pending");
  };

  const handleDepartmentChange = (selectedDept) => {
    console.log("Department selected:", selectedDept);
    console.log("Available boat numbers:", boatNumbers[selectedDept]);
    setDepartment(selectedDept);
    setBoatNumber(""); // Reset boat number when department changes
  };

  if (!grievance) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-slate-600">Loading grievance details...</p>
        </div>
      </div>
    );
  }

  const { rpo, terminal } = getRPOAndTerminal(department, boatNumber);

  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Take Action on Grievance
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Review details and take appropriate action
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-lg bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-700 ring-1 ring-sky-200">
              {grievance.mobile}
            </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Action Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Action Taken *
                </label>
                <textarea
                  value={actionTaken}
                  onChange={(e) => setActionTaken(e.target.value)}
                  rows={4}
                  placeholder="Describe the action taken to resolve this grievance..."
                  required
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition resize-none text-slate-700"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition text-slate-700 hover:border-sky-300"
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Boat Number *
                  </label>
                  <select
                    value={boatNumber}
                    onChange={(e) => {
                      console.log("Boat number selected:", e.target.value);
                      setBoatNumber(e.target.value);
                    }}
                    required
                    disabled={!department}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition disabled:bg-slate-50 disabled:cursor-not-allowed hover:border-sky-300 text-slate-700"
                  >
                    <option value="" className="text-slate-700">
                      {" "}
                      Select Boat Number
                    </option>
                    {department &&
                      boatNumbers[department] &&
                      boatNumbers[department].map((boat) => (
                        <option
                          key={boat}
                          value={boat}
                          className="text-slate-700"
                        >
                          {boat}
                        </option>
                      ))}
                  </select>
                  {department && !boatNumbers[department] && (
                    <p className="text-xs text-red-500 mt-1">
                      No boat numbers available for this department
                    </p>
                  )}
                </div>
              </div>

              {/* RPO and Terminal Display */}
              {(rpo || terminal) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      RPO
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {rpo}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                      Terminal
                    </p>
                    <p className="text-sm font-semibold text-slate-700">
                      {terminal}
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Feedback
                </label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={3}
                  placeholder="Enter any additional feedback or notes..."
                  className="w-full rounded-lg border text-slate-700 border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-100 focus:border-sky-300 transition resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 text-white px-6 py-2.5 text-sm font-semibold shadow hover:bg-sky-700 active:scale-[0.98] transition"
                >
                  <img src={save} alt="action" className="h-4 w-4" />
                  Save Action
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-lg border border-slate-200 bg-white text-slate-700 px-6 py-2.5 text-sm font-semibold hover:bg-slate-50 active:scale-[0.98] transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Grievance Information */}
        <div className="space-y-6">
          {/* Audio Player */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Audio Recording
            </h3>
            <audio
              controls
              preload="none"
              className="w-full h-12 rounded-lg ring-1 ring-slate-200 bg-white/80"
            >
              <source src={grievance.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Transcription */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Transcription
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {grievance.transcription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActionTaken;
