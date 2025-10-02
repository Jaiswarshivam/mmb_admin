import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X, Search, Filter } from "lucide-react";

const initialData = [
  { id: 1, srNo: 1, route: "Maintenance Dredging at Navigation Channel of Mandwa, Dist. Raigad.", frequency: "Yearly", "2022-23-cum": "1,43,124", "2022-23-amt": 4.74, "2023-24-cum": "2,35,820", "2023-24-amt": 7.64, "2024-25-cum": "1,90,562", "2024-25-amt": 5.82 },
  { id: 2, srNo: 2, route: "Maintenance Dredging at Navigation Channel of Karanja, Dist. Raigad.", frequency: "Every Two Years", "2022-23-cum": "1,38,974", "2022-23-amt": 4.59, "2023-24-cum": "-----", "2023-24-amt": "", "2024-25-cum": "71,921", "2024-25-amt": 2 },
  { id: 3, srNo: 3, route: "Maintenance Dredging at Navigation Channel of Mora, Dist. Raigad.", frequency: "Every Two Years", "2022-23-cum": "1,18,927", "2022-23-amt": 4.06, "2023-24-cum": "-----", "2023-24-amt": "", "2024-25-cum": "1,12,076", "2024-25-amt": 3.76 },
  { id: 4, srNo: 4, route: "Maintenance Dredging at Navigation Channel of Marve, Dist.Mumbai Suburban", frequency: "Yearly", "2022-23-cum": "20,950", "2022-23-amt": 1.01, "2023-24-cum": "17,000", "2023-24-amt": 0.82, "2024-25-cum": "14,000", "2024-25-amt": 0.68 },
  { id: 5, srNo: 5, route: "Maintenance Dredging at Navigation Channel of Gorai, Dist.Mumbai Suburban", frequency: "Yearly", "2022-23-cum": "20,750", "2022-23-amt": 1.00, "2023-24-cum": "6,500", "2023-24-amt": 0.31, "2024-25-cum": "18,000", "2024-25-amt": 0.88 },
  { id: 6, srNo: 6, route: "Maintenance Dredging at Navigation Channel of Revas, Dist. Raigad.", frequency: "Every Two Years", "2022-23-cum": "9,250", "2022-23-amt": 0.44, "2023-24-cum": "25,150", "2023-24-amt": 1.12, "2024-25-cum": "-----", "2024-25-amt": "" },
  { id: 7, srNo: 7, route: "Maintenance Dredging at Navigation Channel of Bhaynder - Vasai, Dist. Palghar", frequency: "-----", "2022-23-cum": "-----", "2022-23-amt": "", "2023-24-cum": "49,525", "2023-24-amt": 2.4, "2024-25-cum": "44,250", "2024-25-amt": 2.15 },
  { id: 8, srNo: 8, route: "Maintenance Dredging at Navigation Channel of Khawadeshwari - Narangi, Dist. Palghar.", frequency: "Yearly", "2022-23-cum": "-----", "2022-23-amt": "", "2023-24-cum": "-----", "2023-24-amt": "", "2024-25-cum": "20,250", "2024-25-amt": 0.98 }
];

const yearColumns = [
  { year: "2022-23", cum: "2022-23-cum", amt: "2022-23-amt" },
  { year: "2023-24", cum: "2023-24-cum", amt: "2023-24-amt" },
  { year: "2024-25", cum: "2024-25-cum", amt: "2024-25-amt" }
];

const totalRow = {
  srNo: "Total Quantity & Total Expenditure",
  route: "",
  frequency: "",
  "2022-23-cum": "4,51,975",
  "2022-23-amt": 15.84,
  "2023-24-cum": "3,33,995",
  "2023-24-amt": 12.29,
  "2024-25-cum": "4,71,059",
  "2024-25-amt": 16.48
};

const PWTRouteWiseDredging = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Filter logic: Search by Route
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => row.route.toLowerCase().includes(q));
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
  const DeleteConfirmationModal = ({ show, onClose, onConfirm, route }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
          <h2 className="text-lg font-bold mb-2">Delete Row</h2>
          <p className="mb-4">Are you sure you want to delete <span className="font-semibold">{route}</span>?</p>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-slate-200 text-slate-700">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white">Delete</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2 ">
          PWT Route Wise Dredging
        </h1>
      </div>
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Route"
            className="w-full rounded-xl text-slate-700 border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            {filtered.length}/{data.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300 hover:text-slate-700"
            disabled
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left align-middle min-w-[1200px] border border-slate-300">
          <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">Sr No</th>
              <th className="px-4 py-3 whitespace-nowrap w-[400px] border border-slate-300">PWT Route</th>
              <th className="px-4 py-3 whitespace-nowrap w-[180px] border border-slate-300">Required Dredging Frequency (In Year)</th>
              {yearColumns.map((col) => (
                <th key={col.year + "-cum"} className="px-4 py-3 text-center border border-slate-300" colSpan={2}>FY {col.year}</th>
              ))}
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
            </tr>
            <tr className="bg-slate-100">
              <th className="px-4 py-3 border border-slate-300"></th>
              <th className="px-4 py-3 border border-slate-300"></th>
              <th className="px-4 py-3 border border-slate-300"></th>
              {yearColumns.map((col) => (
                <>
                  <th key={col.year + "-cum"} className="px-4 py-3 text-center border border-slate-300">Quantity In Cum</th>
                  <th key={col.year + "-amt"} className="px-4 py-3 text-center border border-slate-300">Amount Rs. In Cr.</th>
                </>
              ))}
              <th className="px-4 py-3 border border-slate-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.map((row, idx) => (
              <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                <td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">{row.srNo}</td>
                <td className="px-4 py-3 border border-slate-300 font-medium text-slate-700">
                  {editingId === row.id ? (
                    <input type="text" value={editData.route} onChange={e => setEditData(prev => ({ ...prev, route: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300" />
                  ) : row.route}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center">
                  {editingId === row.id ? (
                    <input type="text" value={editData.frequency} onChange={e => setEditData(prev => ({ ...prev, frequency: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : (
                    <span className="text-black">{row.frequency}</span>
                  )}
                </td>
                {yearColumns.map((col) => (
                  <>
                    <td key={col.cum} className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                      {editingId === row.id ? (
                        <input type="text" value={editData[col.cum] ?? row[col.cum]} onChange={e => setEditData(prev => ({ ...prev, [col.cum]: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                      ) : row[col.cum]}
                    </td>
                    <td key={col.amt} className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                      {editingId === row.id ? (
                        <input type="number" value={editData[col.amt] ?? row[col.amt]} onChange={e => setEditData(prev => ({ ...prev, [col.amt]: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                      ) : row[col.amt]}
                    </td>
                  </>
                ))}
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
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">Total</td>
              <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300"></td>
              <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300"></td>
              {yearColumns.map((col) => (
                <>
                  <td key={col.cum + "-total"} className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow[col.cum]}</td>
                  <td key={col.amt + "-total"} className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow[col.amt]}</td>
                </>
              ))}
              <td className="px-4 py-3 text-center border border-slate-300"></td>
            </tr>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4 + yearColumns.length * 2} className="px-4 py-8 text-center bg-white">
                  <div className="mx-auto max-w-md">
                    <p className="text-slate-600">
                      No routes match your search. Try a different query.
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
              Showing {filtered.length} of {data.length} routes
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
        route={data.find(d => d.id === deleteId)?.route || 'this route'}
      />
    </div>
  );
};

export default PWTRouteWiseDredging;
