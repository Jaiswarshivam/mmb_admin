import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X, Filter } from "lucide-react";
import searchIcon from "../../../assets/icons/searchTic.svg";

const initialData = [
  { id: 1, year: "2020-21", proposed: 27, completed: 17, percent: 63 },
  { id: 2, year: "2021-22", proposed: 23, completed: 20, percent: 87 },
  { id: 3, year: "2022-23", proposed: 19, completed: 18, percent: 95 },
  { id: 4, year: "2023-24", proposed: 23, completed: 18, percent: 78 },
  { id: 5, year: "2024-25", proposed: 40, completed: 20, percent: 50 },
];

const HydrographyPublic = () => {
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
      row.year.toLowerCase().includes(q)
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
    setData((prev) => prev.filter((item) => item.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  // Totals
  const totals = useMemo(() => {
    return data.reduce(
      (acc, row) => {
        acc.proposed += Number(row.proposed) || 0;
        acc.completed += Number(row.completed) || 0;
        return acc;
      },
      { proposed: 0, completed: 0 }
    );
  }, [data]);

  return (
    <div className="max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Year wise Hydrographic Survey Programme Status</h1>
      </div>
      {/* Search and Filter Row */}
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <img src={searchIcon} alt="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Year"
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
        <table className="w-full text-left align-middle min-w-[700px] border border-slate-300">
          <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 border border-slate-300">Year</th>
              <th className="px-4 py-3 border border-slate-300">Proposed No. of Survey Places</th>
              <th className="px-4 py-3 border border-slate-300">Completed No. of Survey Places</th>
              <th className="px-4 py-3 border border-slate-300">Percentage %</th>
              <th className="px-4 py-3 border border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.map((row, idx) => (
              <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                <td className="px-4 py-3 text-black text-center border border-slate-300">{row.year}</td>
                <td className="px-4 py-3 border border-slate-300 text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.proposed} onChange={e => setEditData(prev => ({ ...prev, proposed: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.proposed}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-black text-center">
                  {editingId === row.id ? (
                    <input type="number" value={editData.completed} onChange={e => setEditData(prev => ({ ...prev, completed: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.completed}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-black text-center">
                  {editingId === row.id ? (
                    <input type="number" value={editData.percent} onChange={e => setEditData(prev => ({ ...prev, percent: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.percent}
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
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">Total</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals.proposed}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals.completed}</td>
              <td className="px-4 py-3 border border-slate-300"></td>
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
              Are you sure you want to delete this entry from the Hydrographic Survey table?
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

export default HydrographyPublic;
