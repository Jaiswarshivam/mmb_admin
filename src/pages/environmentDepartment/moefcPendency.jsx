import React, { useState } from "react";
import { Edit2, Trash2, Save, X, Search } from "lucide-react";

const initialData = [
  { srNo: 1, district: "Thane", proposals: 0, upto3: 0, m3_6: "", m6_9: "", m9_12: "", m12_1y: "", m1_2y: "", m2y: "" },
  { srNo: 2, district: "Ratnagiri", proposals: 4, upto3: 4, m3_6: "", m6_9: "", m9_12: "", m12_1y: "", m1_2y: "", m2y: "" },
  { srNo: 3, district: "Mumbai", proposals: 0, upto3: 0, m3_6: "", m6_9: "", m9_12: "", m12_1y: "", m1_2y: "", m2y: "" },
  { srNo: 4, district: "Sindhudurg", proposals: 1, upto3: 1, m3_6: "", m6_9: "", m9_12: "", m12_1y: "", m1_2y: "", m2y: "" },
  { srNo: 5, district: "Raigad", proposals: 2, upto3: 2, m3_6: "", m6_9: "", m9_12: "", m12_1y: "", m1_2y: "", m2y: "" },
  { srNo: 6, district: "Palghar", proposals: 1, upto3: 1, m3_6: "", m6_9: "", m9_12: "", m12_1y: "", m1_2y: "", m2y: "" },
];

const MOEFCCPendencyTable = () => {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  // Filtered data based on search
  const filteredData = data.filter(row =>
    row.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals for filtered data
  const totalRow = {
    srNo: "Total",
    district: "",
    proposals: filteredData.reduce((sum, r) => sum + (parseInt(r.proposals) || 0), 0),
    upto3: filteredData.reduce((sum, r) => sum + (parseInt(r.upto3) || 0), 0),
    m3_6: "",
    m6_9: "",
    m9_12: "",
    m12_1y: "",
    m1_2y: "",
    m2y: "",
  };

  const handleEdit = (id) => {
    const row = data.find(r => r.srNo === id);
    setEditingId(id);
    setEditRow({ ...row });
  };

  const handleSave = () => {
    setData(prev => prev.map(r => r.srNo === editingId ? { ...editRow } : r));
    setEditingId(null);
    setEditRow({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditRow({});
  };

  const handleDelete = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    setData(prev => prev.filter(r => r.srNo !== deleteId));
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setDeleteId(null);
  };

  const handleInputChange = (field, value) => {
    setEditRow(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          5. MOEFCC Pendency
        </h1>
        <p className="text-slate-600">
          Track pending proposals across different districts and their pendency timelines.
        </p>
      </div>
      {/* Search and Filter Row */}
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by District Name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full rounded-xl text-slate-700 border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
            {filteredData.length}/{data.length}
          </span>
        </div>
        <button
          type="button"
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
            showFilter
              ? "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
              : "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300 hover:text-slate-700"
          }`}
          onClick={() => setShowFilter(f => !f)}
        >
          <Search className="h-4 w-4 text-sky-600" />
          Filters
        </button>
      </div>
      {showFilter && (
        <div className="mb-4 p-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-700">
          <span className="font-semibold">Filter options coming soon...</span>
        </div>
      )}
      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
            <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300" rowSpan={2}>Sr. No.</th>
                <th className="px-4 py-3 whitespace-nowrap w-[180px] border border-slate-300" rowSpan={2}>District</th>
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300" rowSpan={2}>Pending proposals</th>
                <th className="px-4 py-3 text-center border border-slate-300" colSpan={7}>Pendency timeline</th>
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300" rowSpan={2}>Actions</th>
              </tr>
              <tr className="bg-slate-100">
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Upto 3 months</th>
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">3-6 Months</th>
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">6-9 Months</th>
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">9-12 Months</th>
                <th className="px-4 py-3 whitespace-nowrap w-[110px] text-center border border-slate-300">12 months – 1 year</th>
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">1-2 year</th>
                <th className="px-4 py-3 whitespace-nowrap w-[110px] text-center border border-slate-300">More than 2 years</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData.map((row, idx) => (
                <tr key={row.srNo} className={`hover:bg-sky-50/50 transition-colors group`}>
                  <td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300 text-base">{row.srNo}</td>
                  <td className="px-4 py-3 border border-slate-300 font-medium text-slate-700 text-base">
                    {editingId === row.srNo ? (
                      <input type="text" value={editRow.district} onChange={e => handleInputChange('district', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                    ) : row.district}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.proposals} onChange={e => handleInputChange('proposals', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.proposals}
                  </td>
                  <td className={`px-4 py-3 text-center border border-slate-300 font-semibold text-base ${row.upto3 > 0 ? 'text-green-600' : 'text-slate-900'}`}> 
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.upto3} onChange={e => handleInputChange('upto3', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : (row.upto3 > 0 ? <span className="font-bold">{row.upto3}</span> : <span className="text-slate-400">-</span>)}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900 text-base">
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.m3_6} onChange={e => handleInputChange('m3_6', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : (row.m3_6 !== "" ? row.m3_6 : <span>-</span>)}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.m6_9} onChange={e => handleInputChange('m6_9', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : (row.m6_9 !== "" ? row.m6_9 : <span>-</span>)}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.m9_12} onChange={e => handleInputChange('m9_12', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : (row.m9_12 !== "" ? row.m9_12 : <span>-</span>)}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.m12_1y} onChange={e => handleInputChange('m12_1y', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : (row.m12_1y !== "" ? row.m12_1y : <span>-</span>)}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.m1_2y} onChange={e => handleInputChange('m1_2y', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : (row.m1_2y !== "" ? row.m1_2y : <span>-</span>)}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                    {editingId === row.srNo ? (
                      <input type="number" value={editRow.m2y} onChange={e => handleInputChange('m2y', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : (row.m2y !== "" ? row.m2y : <span>-</span>)}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300">
                    {editingId === row.srNo ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={handleSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors" title="Save"><Save className="h-4 w-4" /></button>
                        <button onClick={handleCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors" title="Cancel"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleEdit(row.srNo)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors" title="Edit"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleDelete(row.srNo)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-slate-100">
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">Total</td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300 text-base">{filteredData.length} districts</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.proposals}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.upto3}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.m3_6 !== "" ? totalRow.m3_6 : <span className="text-slate-400">-</span>}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.m6_9 !== "" ? totalRow.m6_9 : <span className="text-slate-400">-</span>}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.m9_12 !== "" ? totalRow.m9_12 : <span className="text-slate-400">-</span>}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.m12_1y !== "" ? totalRow.m12_1y : <span className="text-slate-400">-</span>}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.m1_2y !== "" ? totalRow.m1_2y : <span className="text-slate-400">-</span>}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300 text-base">{totalRow.m2y !== "" ? totalRow.m2y : <span className="text-slate-400">-</span>}</td>
                <td className="px-4 py-3 text-center border border-slate-300">{/* No actions for total row */}</td>
              </tr>
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center">
                    <div className="mx-auto max-w-md">
                      <p className="text-slate-600">
                        No districts match your search. Try a different query.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Table Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Showing {filteredData.length} of {data.length} districts
            </span>
            {searchTerm && (
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
      {/* Delete Confirmation Modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl scale-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Delete Row</h3>
                <p className="text-sm text-slate-600">This action will permanently remove the selected row.</p>
              </div>
            </div>
            <p className="text-slate-700 mb-6 pl-12">
              Are you sure you want to delete this row from the MOEFCC Pendency table?
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

export default MOEFCCPendencyTable;
