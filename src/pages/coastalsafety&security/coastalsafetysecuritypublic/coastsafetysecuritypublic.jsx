import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X, Search, Filter } from "lucide-react";

const initialData = [
  { id: 1, srNo: 1, name: "Marine Terminal Facility, Konkan LNG Ltd., Anjanvel Guhagar, Ratnagiri", cargo: "EXIM", category: "A", isps: "Yes", compliance: "2", status: "Functional" },
  { id: 2, srNo: 2, name: "Port Facility Adani Thermal Power Station, Dahanu, Palghar", cargo: "EXIM", category: "A", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 3, srNo: 3, name: "JSW Dharamtar, Dolvi Raigad", cargo: "EXIM", category: "B", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 4, srNo: 4, name: "Dharamtar Port. PNP jetty Shabaj, Tal. Alibag, Raigad", cargo: "EXIM", category: "B", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 5, srNo: 5, name: "Redi Port Pvt. Ltd., Vengurla, Sindhudurg", cargo: "EXIM", category: "B", isps: "Yes", compliance: "2", status: "Functional" },
  { id: 6, srNo: 6, name: "JSW Steel Salav Port, Revadanda, Raigad", cargo: "EXIM", category: "B", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 7, srNo: 7, name: "JSW Jaigarh Port Pvt. Ltd. Jaigarh, Ratnagiri", cargo: "EXIM", category: "A", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 8, srNo: 8, name: "Finolex Terminal, Ratnagiri Port PVC Plant, Ranpar, Ratnagiri", cargo: "EXIM", category: "A", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 9, srNo: 9, name: "Karanja Terminal & Logistics Pvt. Ltd., Tal-Uran, Raigad", cargo: "EXIM", category: "A", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 10, srNo: 10, name: "Dighi Port Ltd., Raigad", cargo: "EXIM", category: "C", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 11, srNo: 11, name: "Indo Energy International Ltd., Raigad", cargo: "EXIM", category: "C", isps: "In Process", compliance: "-", status: "Functional" },
  { id: 12, srNo: 12, name: "Angre Port Pvt. Ltd. Jaigad, Ratnagiri", cargo: "EXIM", category: "A", isps: "Yes", compliance: "1", status: "Functional" },
  { id: 13, srNo: 13, name: "Infrastructure Logistics Pvt. Ltd., Umroli, Bankot, Ratnagiri", cargo: "EXIM", category: "C", isps: "In Process", compliance: "-", status: "Functional" },
  { id: 14, srNo: 14, name: "Yogayatan Ports PVTLTD.", cargo: "-", category: "C", isps: "Yes", compliance: "2", status: "-" },
  { id: 15, srNo: 15, name: "Ulwa-Belapur Port (Ambuja Cement), Navi Mumbai", cargo: "Coastal Cargo", category: "C", isps: "In Process", compliance: "-", status: "Functional" },
  { id: 16, srNo: 16, name: "Ultra Tech Cement, Pvt. Ltd. Navi Mumbai", cargo: "Coastal Cargo", category: "C", isps: "In Process", compliance: "-", status: "Functional" }
];

const CoastSafetySecurityPublic = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Filter logic: Search by Port Name
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => row.name.toLowerCase().includes(q));
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
  const DeleteConfirmationModal = ({ show, onClose, onConfirm, name }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
          <h2 className="text-lg font-bold mb-2">Delete Row</h2>
          <p className="mb-4">Are you sure you want to delete <span className="font-semibold">{name}</span>?</p>
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
          MAHARASHTRA MARITIME BOARD<br />ISPS COMPLIANCE STATUS
        </h1>
      </div>
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by Port Name"
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
              <th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">SR.NO.</th>
              <th className="px-4 py-3 whitespace-nowrap w-[400px] border border-slate-300">NAME OF PORTS</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] border border-slate-300">TYPE OF CARGO HANDLING</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] border border-slate-300">CATEGORY</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] border border-slate-300">ISPS (YES/NO)</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] border border-slate-300">LEVEL OF COMPLIANCE</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] border border-slate-300">STATUS</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filtered.map((row, idx) => (
              <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                <td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">{row.srNo}</td>
                <td className="px-4 py-3 border border-slate-300 font-medium text-slate-700">
                  {editingId === row.id ? (
                    <input type="text" value={editData.name} onChange={e => setEditData(prev => ({ ...prev, name: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300" />
                  ) : row.name}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center">
                  {editingId === row.id ? (
                    <input type="text" value={editData.cargo} onChange={e => setEditData(prev => ({ ...prev, cargo: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : (
                    <span className="text-black">{row.cargo}</span>
                  )}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center">
                  {editingId === row.id ? (
                    <input type="text" value={editData.category} onChange={e => setEditData(prev => ({ ...prev, category: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : (
                    <span className="text-black">{row.category}</span>
                  )}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center">
                  {editingId === row.id ? (
                    <input type="text" value={editData.isps} onChange={e => setEditData(prev => ({ ...prev, isps: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : (
                    <span className={`font-semibold ${row.isps === 'Yes' ? 'bg-green-200 text-green-800 px-2 py-1 rounded' : row.isps === 'In Process' ? 'bg-yellow-200 text-yellow-800 px-2 py-1 rounded' : 'bg-red-200 text-red-800 px-2 py-1 rounded'}`}>{row.isps}</span>
                  )}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center">
                  {editingId === row.id ? (
                    <input type="text" value={editData.compliance} onChange={e => setEditData(prev => ({ ...prev, compliance: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : (
                    <span className="font-semibold text-black">{row.compliance !== undefined && row.compliance !== null && row.compliance !== "" ? row.compliance : '-'}</span>
                  )}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center">
                  {editingId === row.id ? (
                    <input type="text" value={editData.status} onChange={e => setEditData(prev => ({ ...prev, status: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : (
                    <span className="font-semibold text-black">{row.status !== undefined && row.status !== null && row.status !== "" ? row.status : '-'}</span>
                  )}
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center bg-white">
                  <div className="mx-auto max-w-md">
                    <p className="text-slate-600">
                      No ports match your search. Try a different query.
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
              Showing {filtered.length} of {data.length} ports
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
        name={data.find(d => d.id === deleteId)?.name || 'this port'}
      />
    </div>
  );
};

export default CoastSafetySecurityPublic;
