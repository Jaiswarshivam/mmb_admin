import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X, Filter } from "lucide-react";
import searchIcon from "../../assets/icons/searchTic.svg";

// Data from both images, combined as a single table
const initialData = [
  { id: 1, srNo: 1, vessel: "Catamaran", reg2022: 1, reg2023: 0, reg2024: 0, total: 3 },
  { id: 2, srNo: 2, vessel: "Cutter Suction Dredger", reg2022: 0, reg2023: 0, reg2024: 4, total: 19 },
  { id: 3, srNo: 3, vessel: "Dredger", reg2022: 6, reg2023: 0, reg2024: 2, total: 32 },
  { id: 4, srNo: 4, vessel: "Dumb Barge", reg2022: 36, reg2023: 61, reg2024: 27, total: 367 },
  { id: 5, srNo: 5, vessel: "Ferry Boat", reg2022: 1, reg2023: 2, reg2024: 0, total: 13 },
  { id: 6, srNo: 6, vessel: "Floating Crane", reg2022: 0, reg2023: 0, reg2024: 0, total: 1 },
  { id: 7, srNo: 7, vessel: "Floating Dry Dock", reg2022: 0, reg2023: 0, reg2024: 0, total: 2 },
  { id: 8, srNo: 8, vessel: "Grab Dredger", reg2022: 3, reg2023: 0, reg2024: 2, total: 8 },
  { id: 9, srNo: 9, vessel: "Hopper barge", reg2022: 1, reg2023: 4, reg2024: 5, total: 27 },
  { id: 10, srNo: 10, vessel: "House Boat", reg2022: 0, reg2023: 1, reg2024: 2, total: 11 },
  { id: 11, srNo: 11, vessel: "Jackup Barge", reg2022: 0, reg2023: 0, reg2024: 0, total: 6 },
  { id: 12, srNo: 12, vessel: "Jet Boat", reg2022: 0, reg2023: 0, reg2024: 0, total: 1 },
  { id: 13, srNo: 13, vessel: "Jet Ski", reg2022: 41, reg2023: 19, reg2024: 28, total: 244 },
  { id: 14, srNo: 14, vessel: "Modular Dumb Barge", reg2022: 0, reg2023: 0, reg2024: 0, total: 1 },
  { id: 15, srNo: 15, vessel: "Mooring Boat", reg2022: 0, reg2023: 4, reg2024: 0, total: 6 },
  { id: 16, srNo: 16, vessel: "Motor Boat", reg2022: 53, reg2023: 59, reg2024: 49, total: 799 },
  { id: 17, srNo: 17, vessel: "Motor Launch", reg2022: 21, reg2023: 16, reg2024: 28, total: 631 },
  { id: 18, srNo: 18, vessel: "Motor Tanker", reg2022: 3, reg2023: 2, reg2024: 3, total: 39 },
  { id: 19, srNo: 19, vessel: "Motor Tug", reg2022: 12, reg2023: 11, reg2024: 13, total: 233 },
  { id: 20, srNo: 20, vessel: "Motor Vessel", reg2022: 29, reg2023: 9, reg2024: 14, total: 514 },
  { id: 21, srNo: 21, vessel: "Pilot Boat", reg2022: 0, reg2023: 0, reg2024: 0, total: 1 },
  { id: 22, srNo: 22, vessel: "Pilot Launch", reg2022: 0, reg2023: 0, reg2024: 0, total: 11 },
  { id: 23, srNo: 23, vessel: "Pontoon", reg2022: 6, reg2023: 1, reg2024: 5, total: 43 },
  { id: 24, srNo: 24, vessel: "Sailing Boat", reg2022: 1, reg2023: 0, reg2024: 0, total: 9 },
  { id: 25, srNo: 25, vessel: "Sand Vessel", reg2022: 7, reg2023: 0, reg2024: 0, total: 30 },
  { id: 26, srNo: 26, vessel: "Speed Boat", reg2022: 93, reg2023: 96, reg2024: 74, total: 872 },
  { id: 27, srNo: 27, vessel: "Water Sports Boat", reg2022: 6, reg2023: 11, reg2024: 5, total: 49 },
];

const totals = {
  reg2022: 320,
  reg2023: 296,
  reg2024: 261,
  total: 3972,
};

const VesselRegistration1 = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Search/filter logic
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      row.vessel.toLowerCase().includes(q)
    );
  }, [query, data]);

  // Edit logic
  const handleEdit = (id) => {
    const row = data.find((item) => item.id === id);
    setEditingId(id);
    setEditData({ ...row });
  };
  const handleSave = () => {
    setData((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, ...editData } : item
      )
    );
    setEditingId(null);
    setEditData({});
  };
  const handleCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // Delete logic
  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    setData((prev) => prev.filter((item) => item.id !== deleteId).map((item, idx) => ({ ...item, srNo: idx + 1 })));
    setShowDeleteModal(false);
    setDeleteId(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Vessel Registration - Port Group wise</h1>
        <p className="text-slate-700 font-semibold">(All years, as per vessel type)</p>
      </div>
      {/* Search and Filter Row */}
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <img src={searchIcon} alt="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Vessel Type"
            className="w-full rounded-xl text-slate-700 border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            {filtered.length}/{data.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
              showFilters
                ? "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
                : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300 hover:text-slate-700"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Filter className="h-4 w-4" />
            <span>Additional filters will be available here</span>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left align-middle min-w-[900px] border border-slate-300">
          <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 border border-slate-300">Sr. No.</th>
              <th className="px-4 py-3 border border-slate-300">Type of Vessel</th>
              <th className="px-4 py-3 border border-slate-300">2022 - 2023</th>
              <th className="px-4 py-3 border border-slate-300">2023 - 2024</th>
              <th className="px-4 py-3 border border-slate-300">2024 - 2025</th>
              <th className="px-4 py-3 border border-slate-300">Total registered as of today</th>
              <th className="px-4 py-3 border border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.map((row, idx) => (
              <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                <td className="px-4 py-3 text-black text-center border border-slate-300">{row.srNo}</td>
                <td className="px-4 py-3 border border-slate-300 text-black">
                  {editingId === row.id ? (
                    <input type="text" value={editData.vessel} onChange={e => setEditData(prev => ({ ...prev, vessel: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                  ) : row.vessel}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.reg2022} onChange={e => setEditData(prev => ({ ...prev, reg2022: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.reg2022}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.reg2023} onChange={e => setEditData(prev => ({ ...prev, reg2023: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.reg2023}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.reg2024} onChange={e => setEditData(prev => ({ ...prev, reg2024: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.reg2024}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.total} onChange={e => setEditData(prev => ({ ...prev, total: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.total}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300">
                  {editingId === row.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={handleSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"><Save className="h-4 w-4" /></button>
                      <button onClick={handleCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(row.id)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(row.id)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            <tr className="font-bold bg-slate-100">
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300"></td>
              <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">Grand Total</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals.reg2022}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals.reg2023}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals.reg2024}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals.total}</td>
              <td className="px-4 py-3 text-center border border-slate-300"></td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl scale-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Delete Entry</h3>
                <p className="text-sm text-slate-600">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-slate-700 mb-6 pl-12">
              Are you sure you want to delete this entry from the Vessel Registration table?
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={cancelDelete} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VesselRegistration1;
