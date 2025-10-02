import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X, Search, Filter } from "lucide-react";

const initialData = [
  { id: 1, srNo: 1, postName: "Class I", totalCadres: 22, sanctionedPosts: 40, regularPosts: 15, deputedPosts: 12, contractualPosts: 0, totalFilled: 27, totalVacant: 13 },
  { id: 2, srNo: 2, postName: "Class II", totalCadres: 7, sanctionedPosts: 26, regularPosts: 15, deputedPosts: 1, contractualPosts: 0, totalFilled: 16, totalVacant: 10 },
  { id: 3, srNo: 3, postName: "Class III", totalCadres: 26, sanctionedPosts: 260, regularPosts: 111, deputedPosts: 7, contractualPosts: 3, totalFilled: 121, totalVacant: 139 },
  { id: 4, srNo: 4, postName: "Class IV", totalCadres: 5, sanctionedPosts: 199, regularPosts: 60, deputedPosts: 0, contractualPosts: 4, totalFilled: 64, totalVacant: 135 }
];

const totalRow = {
  srNo: "Grand Total",
  postName: "",
  totalCadres: 60,
  sanctionedPosts: 525,
  regularPosts: 201,
  deputedPosts: 20,
  contractualPosts: 7,
  totalFilled: 228,
  totalVacant: 297
};

const SummaryPublic = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

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
  const DeleteConfirmationModal = ({ show, onClose, onConfirm, postName }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
          <h2 className="text-lg font-bold mb-2">Delete Row</h2>
          <p className="mb-4">Are you sure you want to delete <span className="font-semibold">{postName}</span>?</p>
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
        <h1 className="text-2xl font-bold text-slate-900 mb-2 ">Summary(Public)</h1>
      </div>
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left align-middle min-w-[1200px] border border-slate-300">
          <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">Sl. No.</th>
              <th className="px-4 py-3 whitespace-nowrap w-[200px] border border-slate-300">Post Name</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Total Cadres</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Total Sanctioned Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300" colSpan={3}>Total Filled Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Total Filled Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Total Vacant Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
            </tr>
            <tr className="bg-slate-100">
              <th className="px-4 py-3 border border-slate-300"></th>
              <th className="px-4 py-3 border border-slate-300"></th>
              <th className="px-4 py-3 border border-slate-300"></th>
              <th className="px-4 py-3 border border-slate-300"></th>
              <th className="px-4 py-3 text-center border border-slate-300">Regular Posts</th>
              <th className="px-4 py-3 text-center border border-slate-300">Deputed Posts</th>
              <th className="px-4 py-3 text-center border border-slate-300">Contractual Posts</th>
              <th className="px-4 py-3 text-center border border-slate-300"></th>
              <th className="px-4 py-3 text-center border border-slate-300"></th>
              <th className="px-4 py-3 border border-slate-300"></th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((row, idx) => (
              <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                <td className="px-4 py-3 text-black font-medium text-center border border-slate-300">{row.srNo}</td>
                <td className="px-4 py-3 border border-slate-300 font-medium text-black">
                  {editingId === row.id ? (
                    <input type="text" value={editData.postName} onChange={e => setEditData(prev => ({ ...prev, postName: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300" />
                  ) : row.postName}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.totalCadres} onChange={e => setEditData(prev => ({ ...prev, totalCadres: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 text-center" />
                  ) : row.totalCadres}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.sanctionedPosts} onChange={e => setEditData(prev => ({ ...prev, sanctionedPosts: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 text-center" />
                  ) : row.sanctionedPosts}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.regularPosts} onChange={e => setEditData(prev => ({ ...prev, regularPosts: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 text-center" />
                  ) : row.regularPosts}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.deputedPosts} onChange={e => setEditData(prev => ({ ...prev, deputedPosts: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 text-center" />
                  ) : row.deputedPosts}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.contractualPosts} onChange={e => setEditData(prev => ({ ...prev, contractualPosts: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-yellow-100 focus:border-yellow-300 text-center" />
                  ) : row.contractualPosts}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.totalFilled} onChange={e => setEditData(prev => ({ ...prev, totalFilled: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-green-100 focus:border-green-300 text-center" />
                  ) : (
                    <span className="bg-green-100 text-black px-2 py-1 rounded font-semibold">{row.totalFilled}</span>
                  )}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.totalVacant} onChange={e => setEditData(prev => ({ ...prev, totalVacant: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-red-100 focus:border-red-300 text-center" />
                  ) : (
                    <span className="bg-red-100 text-black px-2 py-1 rounded font-semibold">{row.totalVacant}</span>
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
            <tr className="font-bold bg-slate-100">
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.srNo}</td>
              <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300"></td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.totalCadres}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.sanctionedPosts}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.regularPosts}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.deputedPosts}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.contractualPosts}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.totalFilled}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.totalVacant}</td>
              <td className="px-4 py-3 text-center border border-slate-300"></td>
            </tr>
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Showing {data.length} posts
            </span>
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
        postName={data.find(d => d.id === deleteId)?.postName || 'this post'}
      />
    </div>
  );
};

export default SummaryPublic;
