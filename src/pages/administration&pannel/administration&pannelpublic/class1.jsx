import React, { useState } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";

const initialData = [
  { id: 1, srNo: 1, postName: "Chief Executive Officer", sanctioned: 1, regular: 0, deputed: 1, contractual: 0, filled: 1, vacant: 0 },
  { id: 2, srNo: 2, postName: "Chief Port Officer", sanctioned: 1, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 1 },
  { id: 3, srNo: 3, postName: "Hydrographer", sanctioned: 1, regular: 0, deputed: 1, contractual: 0, filled: 1, vacant: 0 },
  { id: 4, srNo: 4, postName: "Nautical Advisor", sanctioned: 1, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 1 },
  { id: 5, srNo: 5, postName: "General Manager (Business Development)", sanctioned: 1, regular: 1, deputed: 0, contractual: 0, filled: 1, vacant: 0 },
  { id: 6, srNo: 6, postName: "Chief Engineer", sanctioned: 1, regular: 0, deputed: 1, contractual: 0, filled: 1, vacant: 0 },
  { id: 7, srNo: 7, postName: "Marine Engineer & Chief Surveyor", sanctioned: 1, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 1 },
  { id: 8, srNo: 8, postName: "Coastal Safety & Security Officer", sanctioned: 1, regular: 0, deputed: 0, contractual: 1, filled: 1, vacant: 0 },
  { id: 9, srNo: 9, postName: "Financial Controller-cum-Chief Accounts Officer", sanctioned: 1, regular: 0, deputed: 0, contractual: 1, filled: 1, vacant: 0 },
  { id: 10, srNo: 10, postName: "Superintending Engineer", sanctioned: 1, regular: 0, deputed: 0, contractual: 1, filled: 1, vacant: 0 },
  { id: 11, srNo: 11, postName: "Senior Administrative Officer", sanctioned: 1, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 1 },
  { id: 12, srNo: 12, postName: "Executive Engineer", sanctioned: 3, regular: 2, deputed: 1, contractual: 0, filled: 3, vacant: 0 },
  { id: 13, srNo: 13, postName: "Deputy Marine Engineer & Chief Surveyor", sanctioned: 1, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 1 },
  { id: 14, srNo: 14, postName: "Surveyor", sanctioned: 4, regular: 3, deputed: 0, contractual: 0, filled: 3, vacant: 1 },
  { id: 15, srNo: 15, postName: "Port Officer", sanctioned: 6, regular: 3, deputed: 0, contractual: 0, filled: 3, vacant: 3 },
  { id: 16, srNo: 16, postName: "Deputy Collector", sanctioned: 1, regular: 0, deputed: 1, contractual: 0, filled: 1, vacant: 0 },
  { id: 17, srNo: 17, postName: "Deputy Town Planner, Urban Planner/Assistant Director in Urban Planning", sanctioned: 1, regular: 0, deputed: 0, contractual: 1, filled: 1, vacant: 0 },
  { id: 18, srNo: 18, postName: "Deputy Engineer", sanctioned: 8, regular: 5, deputed: 3, contractual: 0, filled: 8, vacant: 0 },
  { id: 19, srNo: 19, postName: "Accounts Officer (Assistant Director)", sanctioned: 1, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 1 },
  { id: 20, srNo: 20, postName: "Tahsildar", sanctioned: 1, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 1 },
  { id: 21, srNo: 21, postName: "Deputy Water Surveyor (Assistant)", sanctioned: 2, regular: 0, deputed: 0, contractual: 0, filled: 0, vacant: 2 },
  { id: 22, srNo: 22, postName: "Electronic & Electrical Officer", sanctioned: 1, regular: 1, deputed: 0, contractual: 0, filled: 1, vacant: 0 }
];

const totalRow = {
  srNo: 22,
  postName: "Total Class I Posts",
  sanctioned: 40,
  regular: 15,
  deputed: 11,
  contractual: 0,
  filled: 26,
  vacant: 14
};

const Class1 = () => {
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
        <h1 className="text-2xl font-bold text-slate-900 mb-2 ">Status of Posts - Class I</h1>
      </div>
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
          <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">Sl. No.</th>
              <th className="px-4 py-3 whitespace-nowrap w-[300px] border border-slate-300">Post Name</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Sanctioned Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300" colSpan={3}>Filled Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Total Filled Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Vacant Posts</th>
              <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
            </tr>
            <tr className="bg-slate-100">
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
                    <input type="text" value={editData.postName} onChange={e => setEditData(prev => ({ ...prev, postName: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300" />
                  ) : row.postName}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.sanctioned} onChange={e => setEditData(prev => ({ ...prev, sanctioned: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : row.sanctioned}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.regular} onChange={e => setEditData(prev => ({ ...prev, regular: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : row.regular}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.deputed} onChange={e => setEditData(prev => ({ ...prev, deputed: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : row.deputed}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.contractual} onChange={e => setEditData(prev => ({ ...prev, contractual: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
                  ) : row.contractual}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.filled} onChange={e => setEditData(prev => ({ ...prev, filled: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-green-100 focus:border-green-300 text-center" />
                  ) : (
                    <span className="bg-green-100 text-black px-2 py-1 rounded font-semibold">{row.filled}</span>
                  )}
                </td>
                <td className="px-4 py-3 border border-slate-300 text-center text-black">
                  {editingId === row.id ? (
                    <input type="number" value={editData.vacant} onChange={e => setEditData(prev => ({ ...prev, vacant: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-red-100 focus:border-red-300 text-center" />
                  ) : (
                    <span className="bg-red-100 text-black px-2 py-1 rounded font-semibold">{row.vacant}</span>
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
              <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">{totalRow.postName}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.sanctioned}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.regular}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.deputed}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.contractual}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.filled}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.vacant}</td>
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

export default Class1;
