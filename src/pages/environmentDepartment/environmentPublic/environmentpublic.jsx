import React, { useState } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";

const initialClearanceData = [
  { srNo: 1, clearance: "Environment Clearance", y2019: "", y2020: "", y2021: "", y2223: "", y2324: "", y2425: "2", y2526: "2", total: "2" },
  { srNo: 2, clearance: "CRZ Clearance", y2019: "24", y2020: "7", y2021: "15", y2223: "36", y2324: "2", y2425: "3", y2526: "21", total: "108" },
  { srNo: 3, clearance: "MPCB Consent to establish", y2019: "", y2020: "", y2021: "", y2223: "", y2324: "", y2425: "6", y2526: "6", total: "6" },
  { srNo: 4, clearance: "High Court Clearance", y2019: "3", y2020: "1", y2021: "4", y2223: "1", y2324: "", y2425: "", y2526: "", total: "9" },
  { srNo: 5, clearance: "ASI NOC granted", y2019: "1", y2020: "1", y2021: "1", y2223: "", y2324: "", y2425: "", y2526: "", total: "3" },
  { srNo: 6, clearance: "Forest NOC", y2019: "", y2020: "1", y2021: "2", y2223: "", y2324: "", y2425: "", y2526: "", total: "3" },
  { srNo: 7, clearance: "ESZ NOC", y2019: "", y2020: "", y2021: "", y2223: "", y2324: "", y2425: "2", y2526: "3", total: "3" },
  { srNo: 8, clearance: "Fire NOC", y2019: "", y2020: "1", y2021: "", y2223: "", y2324: "", y2425: "", y2526: "", total: "1" },
];

const totalRow = {
  srNo: "Total",
  clearance: "",
  y2019: "25",
  y2020: "7",
  y2021: "20",
  y2223: "39",
  y2324: "8",
  y2425: "3",
  y2526: "32",
  total: "134"
};

const EnvironmentPublicTable = () => {
  const [data, setData] = useState(initialClearanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  // Filtered data based on search
  const filteredData = data.filter(row =>
    row.clearance.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals for filtered data
  const totalRow = {
    srNo: 'Total',
    clearance: `${filteredData.length} clearances`,
    y2019: filteredData.reduce((sum, r) => sum + (parseInt(r.y2019) || 0), 0),
    y2020: filteredData.reduce((sum, r) => sum + (parseInt(r.y2020) || 0), 0),
    y2021: filteredData.reduce((sum, r) => sum + (parseInt(r.y2021) || 0), 0),
    y2223: filteredData.reduce((sum, r) => sum + (parseInt(r.y2223) || 0), 0),
    y2324: filteredData.reduce((sum, r) => sum + (parseInt(r.y2324) || 0), 0),
    y2425: filteredData.reduce((sum, r) => sum + (parseInt(r.y2425) || 0), 0),
    y2526: filteredData.reduce((sum, r) => sum + (parseInt(r.y2526) || 0), 0),
    total: filteredData.reduce((sum, r) => sum + (parseInt(r.total) || 0), 0),
  };
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [deleteId, setDeleteId] = useState(null);

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
					Public Dashboard
				</h1>
				<p className="text-slate-600">
					 Environment related Permissions granted for MMB’s Infrastructure Projects:
				</p>
			</div>

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by Clearance Name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-[260px] px-4 py-2 border border-slate-300 rounded-lg text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
          />
          <span className="text-slate-500 text-sm font-medium">{filteredData.length}/{data.length}</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-sky-50 transition-colors"
          onClick={() => setShowFilter(f => !f)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-5.414 5.414A1 1 0 0015 12.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 16.118V12.414a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" /></svg>
          Filters
        </button>
      </div>
      {/* Filter Modal Placeholder */}
      {showFilter && (
        <div className="mb-4 p-4 bg-sky-50 border border-sky-200 rounded-lg text-slate-700">
          <span className="font-semibold">Filter options coming soon...</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow border border-slate-200 overflow-x-auto">
        <table className="w-full text-left align-middle min-w-[900px] border border-slate-300">
          <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">Sr. No.</th>
              <th className="px-4 py-3 whitespace-nowrap w-[220px] border border-slate-300">Clearance granted</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">2019-20</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">2020-21</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">2021-22</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">22-23</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">23-24</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">24-25</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">25-26</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Total</th>
              <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredData.map((row, idx) => (
              <tr key={row.srNo} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                <td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">{row.srNo}</td>
                <td className="px-4 py-3 border border-slate-300 font-medium text-slate-700">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.clearance} onChange={e => handleInputChange('clearance', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                  ) : row.clearance}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.y2019} onChange={e => handleInputChange('y2019', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.y2019}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.y2020} onChange={e => handleInputChange('y2020', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.y2020}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.y2021} onChange={e => handleInputChange('y2021', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.y2021}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.y2223} onChange={e => handleInputChange('y2223', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.y2223}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.y2324} onChange={e => handleInputChange('y2324', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.y2324}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.y2425} onChange={e => handleInputChange('y2425', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.y2425}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.y2526} onChange={e => handleInputChange('y2526', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                  ) : row.y2526}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300 font-bold text-slate-900">
                  {editingId === row.srNo ? (
                    <input type="text" value={editRow.total} onChange={e => handleInputChange('total', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center font-bold" />
                  ) : row.total}
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
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.srNo}</td>
              <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">{totalRow.clearance}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.y2019}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.y2020}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.y2021}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.y2223}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.y2324}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.y2425}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.y2526}</td>
              <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totalRow.total}</td>
              <td className="px-4 py-3 text-center border border-slate-300">{/* No actions for total row */}</td>
            </tr>
          </tbody>
        </table>
        {/* Table Footer (Pagination/Info) */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Showing {filteredData.length} of {data.length} clearances
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
              Are you sure you want to delete this row from the Environment Permissions table?
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

export default EnvironmentPublicTable;
