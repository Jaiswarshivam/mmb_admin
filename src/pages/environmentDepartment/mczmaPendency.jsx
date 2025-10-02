import React, { useMemo, useState } from "react";
import { Filter, Edit2, Trash2, Save, X, Plus, MoreHorizontal } from "lucide-react";
import searchIcon from "../../assets/icons/searchTic.svg";
// Assuming searchIcon is a placeholder for an icon or local asset. Keeping it as a comment since the original import path is broken.
// import searchIcon from "../../assets/icons/searchTic.svg";

// --- New Initial Data based on the uploaded image ---
const initialData = [
  { id: 1, srNo: 1, district: "Thane", pendingProposal: 5, upto3: 5, threeSix: "", sixNine: "", nineTwelve: "", twelveOne: "", oneTwo: "", moreTwo: "" },
  { id: 2, srNo: 2, district: "Sindhudurg", pendingProposal: 0, upto3: 0, threeSix: "", sixNine: "", nineTwelve: "", twelveOne: "", oneTwo: "", moreTwo: "" },
  { id: 3, srNo: 3, district: "Raigad", pendingProposal: 1, upto3: 1, threeSix: "", sixNine: "", nineTwelve: "", twelveOne: "", oneTwo: "", moreTwo: "" },
  { id: 4, srNo: 4, district: "Ratnagiri", pendingProposal: 1, upto3: 1, threeSix: "", sixNine: "", nineTwelve: "", twelveOne: "", oneTwo: "", moreTwo: "" },
  { id: 5, srNo: 5, district: "Palghr", pendingProposal: 0, upto3: 0, threeSix: "", sixNine: "", nineTwelve: "", twelveOne: "", oneTwo: "", moreTwo: "" },
  { id: 6, srNo: 6, district: "Mumbai suburban and district", pendingProposal: 0, upto3: 0, threeSix: "", sixNine: "", nineTwelve: "", twelveOne: "", oneTwo: "", moreTwo: "" },
];
// Next ID starts after the initial data's max ID
const initialNextId = initialData.length + 1;

// Timeline columns are the same as the original request
const defaultColumns = [
  { key: 'upto3', label: 'Upto 3 months', type: 'number' },
  { key: 'threeSix', label: '3-6 Months', type: 'number' },
  { key: 'sixNine', label: '6-9 Months', type: 'number' },
  { key: 'nineTwelve', label: '9-12 Months', type: 'number' },
  { key: 'twelveOne', label: '12 months – 1 year', type: 'number' },
  { key: 'oneTwo', label: '1-2 year', type: 'number' },
  { key: 'moreTwo', label: 'More than 2 years', type: 'number' }
];

const MCZMAPendency = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(defaultColumns);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // Removed Add Row and Add Column logic

  // Filter logic: search by District name
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) =>
      row.district.toLowerCase().includes(q)
    );
  }, [query, data]);

  // Calculate totals dynamically
  const calculatedTotals = useMemo(() => {
    return data.reduce((totals, row) => {
      // Sum the main column
      totals.pendingProposal += row.pendingProposal;

      // Sum all dynamic columns
      columns.forEach(col => {
        // Ensure the value is treated as a number, defaulting to 0 if not present or empty string
        const value = parseInt(row[col.key], 10) || 0;
        totals[col.key] = (totals[col.key] || 0) + value;
      });
      return totals;
    }, {
      pendingProposal: 0,
      ...columns.reduce((acc, col) => ({ ...acc, [col.key]: 0 }), {})
    });
  }, [data, columns]);

  // Handle edit functions
  const handleEdit = (id) => {
    const row = data.find(item => item.id === id);
    setEditingId(id);
    setEditData({ ...row });
  };

  const handleSave = () => {
    // Input validation/cleaning before saving
    const cleanedEditData = { ...editData };
    columns.forEach(col => {
        // Convert input values to numbers, or keep them as empty strings if blank
        cleanedEditData[col.key] = cleanedEditData[col.key] === "" ? "" : parseInt(cleanedEditData[col.key], 10) || 0;
    });

    // Update pendingProposal as well
    cleanedEditData.pendingProposal = parseInt(cleanedEditData.pendingProposal, 10) || 0;

    setData(prevData =>
      prevData.map(item =>
        item.id === editingId ? { ...item, ...cleanedEditData } : item
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
    setData(prevData => prevData.filter(item => item.id !== deleteId).map((item, index) => ({
      ...item,
      srNo: index + 1 // Recalculate Sr. No. after deletion
    })));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value // Store value as string initially for text inputs, numbers for number inputs (or can keep as string until save)
    }));
  };

  // Add new row
  const handleAddRow = () => {
    const newId = nextId;
    const newSrNo = data.length + 1;
    
    // Create a base new row object
    const newRow = {
      id: newId,
      srNo: newSrNo,
      district: newRowData.district || "New District",
      pendingProposal: parseInt(newRowData.pendingProposal, 10) || 0,
      ...columns.reduce((acc, col) => ({ ...acc, [col.key]: newRowData[col.key] || "" }), {})
    };

    setData(prevData => [...prevData, newRow].map((item, index) => ({
        ...item,
        srNo: index + 1 // Ensure Sr. No. is always correct
    })));
    setNextId(prev => prev + 1);
    setNewRowData({});
    setShowAddRowModal(false);
  };
  
  // Add new column
  const handleAddColumn = () => {
    if (newColumn.label.trim()) {
      // Use a clean key (e.g., 'newcolumn')
      const newKey = newColumn.label.toLowerCase().replace(/[^a-z0-9]/g, '');
      const newCol = {
        key: newKey,
        label: newColumn.label,
        type: newColumn.type
      };
      
      setColumns(prev => [...prev, newCol]);
      
      // Add the new column to all existing rows with an empty string value
      setData(prevData =>
        prevData.map(row => ({
          ...row,
          [newKey]: "" // Initialize to empty string
        }))
      );
      
      setNewColumn({ label: '', type: 'number' });
      setShowAddColumnModal(false);
    }
  };

  // Delete column
  const handleDeleteColumn = (columnKey) => {
    setColumns(prev => prev.filter(col => col.key !== columnKey));
    setData(prevData =>
      prevData.map(row => {
        const newRow = { ...row };
        delete newRow[columnKey]; // Remove the column property from each row
        return newRow;
      })
    );
  };

  // Modal Component (for Add Row)
  const AddRowModal = ({ show, onClose, onSave, newRowData, setNewRowData, columns }) => {
    if (!show) return null;

    const handleNewRowInputChange = (field, value) => {
      setNewRowData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Add New District Row</h3>
            <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
          </div>

          <div className="space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">District Name</label>
              <input
                type="text"
                value={newRowData.district || ''}
                onChange={(e) => handleNewRowInputChange('district', e.target.value)}
                placeholder="e.g., Alibag"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Pending Proposals</label>
              <input
                type="number"
                value={newRowData.pendingProposal || ''}
                onChange={(e) => handleNewRowInputChange('pendingProposal', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <p className="text-sm font-semibold pt-2 text-slate-800 border-t mt-4">Pendency Timeline Values</p>
            {columns.map((col) => (
              <div key={col.key}>
                <label className="block text-sm font-medium text-slate-700 mb-1">{col.label}</label>
                <input
                  type={col.type}
                  value={newRowData[col.key] || ''}
                  onChange={(e) => handleNewRowInputChange(col.key, e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Enter count"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1 inline-block" />
              Add Row
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Modal Component (for Add Column)
  const AddColumnModal = ({ show, onClose, onSave, newColumn, setNewColumn }) => {
    if (!show) return null;

    const handleColumnInputChange = (field, value) => {
      setNewColumn(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Add New Column</h3>
            <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
          </div>

          <div className="space-y-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Column Header Label</label>
              <input
                type="text"
                value={newColumn.label}
                onChange={(e) => handleColumnInputChange('label', e.target.value)}
                placeholder="e.g., 2-3 Years"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data Type</label>
              <select
                value={newColumn.type}
                onChange={(e) => handleColumnInputChange('type', e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-sky-500 focus:border-sky-500 bg-white"
              >
                <option value="number">Number (Count)</option>
                <option value="text">Text (Notes)</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">Timeline columns should generally be 'Number'.</p>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={!newColumn.label.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors disabled:bg-sky-400"
            >
              <Plus className="h-4 w-4 mr-1 inline-block" />
              Add Column
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
  <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          2. MCZMA Pendency
        </h1>
        <p className="text-slate-600">
          Track pending proposals across different districts and their pendency timelines.
        </p>
      </div>

      {/* Search and Filter Row */}
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          {/* Using Lucide Search icon instead of imported local file */}
         <img
                    src={searchIcon}
                    alt="search"
                    className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2"
                  />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by District Name"
            className="w-full rounded-xl text-slate-700 border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
            {filtered.length}/{data.length}
          </span>
        </div>
        

        {/* Action Buttons */}
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

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Search className="h-4 w-4" />
            <span>Additional filters will be available here</span>
          </div>
        </div>
      )}

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
            <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Sr. No.</th>
                <th className="px-4 py-3 whitespace-nowrap w-[200px] border border-slate-300">District</th>
                <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Pending proposal</th>
                <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300" colSpan={columns.length}>Pendency timeline</th>
                <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
              </tr>
              <tr className="bg-slate-100">
                <th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300"></th>
                <th className="px-4 py-3 whitespace-nowrap w-[200px] border border-slate-300"></th>
                <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300"></th>
                {columns.map((col) => (
                  <th key={col.key} className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300 relative group">
                    {col.label}
                    <button
                      onClick={() => handleDeleteColumn(col.key)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete column"
                    >
                      ×
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-sky-50/50 transition-colors group">
                  <td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">
                    {row.srNo}
                  </td>
                  <td className="px-4 py-3 border border-slate-300">
                    {editingId === row.id ? (
                      <input
                        type="text"
                        value={editData.district}
                        onChange={(e) => setEditData(prev => ({ ...prev, district: e.target.value }))}
                        className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
                        aria-label="Edit District Name"
                      />
                    ) : (
                      <span className="text-slate-700 font-medium">
                        {row.district}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-700 text-center border border-slate-300">
                    {editingId === row.id ? (
                      <input
                        type="number"
                        value={editData.pendingProposal}
                        onChange={(e) => handleInputChange('pendingProposal', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center"
                        aria-label="Edit Pending Proposals"
                      />
                    ) : (
                      <span className="font-semibold">
                        {row.pendingProposal}
                      </span>
                    )}
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-slate-700 text-center border border-slate-300">
                      {editingId === row.id ? (
                        <input
                          type={col.type}
                          value={editData[col.key] || ""}
                          onChange={(e) => handleInputChange(col.key, e.target.value)}
                          className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center"
                          aria-label={`Edit ${col.label}`}
                        />
                      ) : (
                        row[col.key] ? (
                          <span className="font-semibold text-green-700">
                            {row[col.key]}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )
                      )}
                    </td>
                  ))}
                  <td className="px-4 py-3 text-center border border-slate-300">
                    {editingId === row.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={handleSave}
                          className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                          title="Save"
                        >
                          <Save className="h-4 w-4" />
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Cancel"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {/* Total Row */}
              <tr className="font-bold bg-slate-100">
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                  Total
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">
                  {data.length} districts
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                  {calculatedTotals.pendingProposal}
                </td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                    {calculatedTotals[col.key] || "-"}
                  </td>
                ))}
                <td className="px-4 py-3 text-center border border-slate-300">
                  {/* Empty cell for actions column */}
                </td>
              </tr>

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4 + columns.length} className="px-4 py-8 text-center bg-white">
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

        {/* Table Footer (Pagination/Info) */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Showing {filtered.length} of {data.length} districts
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


      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl scale-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Delete District Entry</h3>
                <p className="text-sm text-slate-600">This action will permanently remove the selected district's data.</p>
              </div>
            </div>
            <p className="text-slate-700 mb-6 pl-12">
              Are you sure you want to delete the entry for **{data.find(d => d.id === deleteId)?.district || 'this district'}** from the MCZMA Pendency table?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MCZMAPendency;
