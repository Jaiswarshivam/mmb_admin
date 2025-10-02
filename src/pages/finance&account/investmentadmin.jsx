import React, { useState, useMemo } from "react";
import { Filter, Edit2, Trash2, Save, X } from "lucide-react";
import searchIcon from "../../assets/icons/searchTic.svg";


const initialData = [
  { id: 1, srNo: 1, bank: "Maharashtra Gramin Bank", amount: 155.0 },
  { id: 2, srNo: 2, bank: "Bank of Maharashtra", amount: 425.01 },
  { id: 3, srNo: 3, bank: "Bank of India", amount: 260.0 },
  { id: 4, srNo: 4, bank: "Punjab National Bank", amount: 80.0 },
  { id: 5, srNo: 5, bank: "State Bank of India", amount: 90.25 },
  { id: 6, srNo: 6, bank: "Canara Bank", amount: 275.0 },
  { id: 7, srNo: 7, bank: "AU Small Finance Bank", amount: 30.0 },
];

const getTotal = (data) => {
  return data.reduce((sum, row) => sum + (parseFloat(row.amount) || 0), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const InvestmentAdmin = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Filter logic: Search by Bank Name
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      row.bank.toLowerCase().includes(q)
    );
  }, [query, data]);

  // --- CRUD Operations ---
  const handleEdit = (id) => {
    const row = data.find((item) => item.id === id);
    setEditingId(id);
    setEditData({ ...row });
  };

  const handleSave = () => {
    setData((prevData) =>
      prevData.map((item) =>
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

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setData((prevData) =>
      prevData.filter((item) => item.id !== deleteId).map((item, index) => ({
        ...item,
        srNo: index + 1
      }))
    );
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // --- Modal Component ---
  const DeleteConfirmationModal = ({ show, onClose, onConfirm, bank }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
          <h2 className="text-lg font-bold mb-2">Delete Row</h2>
          <p className="mb-4 text-black">Are you sure you want to delete <span className="font-semibold">{bank}</span>?</p>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-slate-200 text-slate-700">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
          </div>
        </div>
      </div>
    );
  };

  return (
  <div className="max-w-3xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Maharashtra Maritime Board Investment Details as on September 2025
        </h1>
        <p className="text-center text-slate-700 font-semibold">(Rs. In crore)</p>
      </div>

      {/* Search and Filter Row */}
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <img
            src={searchIcon}
            alt="search"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Bank Name"
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
            <span className="inline-flex"><Filter className="h-4 w-4" /></span>
            <span>Additional filters will be available here</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left align-middle min-w-[600px] border border-slate-300">
          <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">Sr No</th>
              <th className="px-4 py-3 whitespace-nowrap w-[300px] border border-slate-300">Name of Bank</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Amount</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.map((row, idx) => (
              <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                <td className="px-4 py-3 text-black font-medium text-center border border-slate-300">{row.srNo}</td>
                <td className="px-4 py-3 border border-slate-300 font-medium text-black">
                  {editingId === row.id ? (
                    <input type="text" value={editData.bank} onChange={e => setEditData(prev => ({ ...prev, bank: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300" />
                  ) : row.bank}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.amount} onChange={e => setEditData(prev => ({ ...prev, amount: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300">
                  {editingId === row.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={handleSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors" title="Save"><Save className="h-4 w-4" /></button>
                      <button onClick={handleCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors" title="Cancel"><X className="h-4 w-4" /></button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(row.id)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors" title="Edit"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => handleDelete(row.id)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            <tr className="font-bold bg-slate-100">
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300"></td>
              <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">Total Investment</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{getTotal(filtered)}</td>
              <td className="px-4 py-3 text-center border border-slate-300"></td>
            </tr>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center bg-white">
                  <div className="mx-auto max-w-md">
                    <p className="text-slate-600">
                      No banks match your search. Try a different query.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Showing {filtered.length} of {data.length} banks
            </span>
            {query && (
              <span className="text-sky-600">
                (Filtered from {data.length} total)
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
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        bank={data.find(d => d.id === deleteId)?.bank || 'this bank'}
      />
    </div>
  );
};

export default InvestmentAdmin;
