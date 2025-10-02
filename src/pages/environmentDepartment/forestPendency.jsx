import React, { useMemo, useState } from "react";
import { Filter, Search, Edit2, Trash2, Save, X, Plus, MoreHorizontal } from "lucide-react";

// Placeholder for an image icon. Since we cannot rely on external assets
// I'll replace the image tag with the lucide Search icon for consistency.
const SearchIconComponent = ({ className }) => <Search className={className} />;

// --- Initial Data based on the uploaded "7. Forest Pendency" image ---
const initialData = [
  { id: 1, srNo: 1, district: "Palghar", pendingProposal: 1, upto3: "", threeSix: "", sixNine: "", nineTwelve: "", twelveOne: 1, oneTwo: "", moreTwo: "" },
  { id: 2, srNo: 2, district: "Thane", pendingProposal: 1, upto3: "", threeSix: "", sixNine: "", nineTwelve: "", twelveOne: 1, oneTwo: "", moreTwo: "" },
  { id: 3, srNo: 3, district: "", pendingProposal: 1, upto3: "", threeSix: "", sixNine: "", nineTwelve: "", twelveOne: 1, oneTwo: "", moreTwo: "" },
  { id: 4, srNo: 4, district: "", pendingProposal: 1, upto3: "", threeSix: "", sixNine: "", nineTwelve: "", twelveOne: 1, oneTwo: "", moreTwo: "" },
];

// Columns for the pendency timeline (Kept original structure as it matches the image)
const defaultColumns = [
  { key: 'upto3', label: 'Upto 3 months', type: 'number' },
  { key: 'threeSix', label: '3-6 Months', type: 'number' },
  { key: 'sixNine', label: '6-9 Months', type: 'number' },
  { key: 'nineTwelve', label: '9-12 Months', type: 'number' },
  { key: 'twelveOne', label: '12 months – 1 year', type: 'number' },
  { key: 'oneTwo', label: '1-2 year', type: 'number' },
  { key: 'moreTwo', label: 'More than 2 years', type: 'number' }
];

const ForestPendency = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(defaultColumns);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddRowModal, setShowAddRowModal] = useState(false);
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [newColumn, setNewColumn] = useState({ label: '', type: 'number' });
  const [nextId, setNextId] = useState(initialData.length + 1);

  // Filter logic: Search by District Name
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
      // Pending proposal total
      totals.pendingProposal = (totals.pendingProposal || 0) + (parseInt(row.pendingProposal, 10) || 0);

      // Pendency timeline totals
      columns.forEach(col => {
        // Use parseInt() for aggregation
        totals[col.key] = (totals[col.key] || 0) + (parseInt(row[col.key], 10) || 0);
      });
      return totals;
    }, {
      pendingProposal: 0,
      ...columns.reduce((acc, col) => ({ ...acc, [col.key]: 0 }), {})
    });
  }, [data, columns]);

  // --- CRUD Operations ---

  const handleEdit = (id) => {
    const row = data.find(item => item.id === id);
    setEditingId(id);
    setEditData({ ...row });
  };

  const handleSave = () => {
    // Ensure data is cleaned/validated before saving
    const cleanedEditData = { ...editData };

    // Clean and ensure all numeric fields are treated as numbers (or empty string if not provided)
    const numericFields = ['pendingProposal', ...columns.map(c => c.key)];
    numericFields.forEach(field => {
        cleanedEditData[field] = cleanedEditData[field] === "" ? "" : parseInt(cleanedEditData[field], 10) || 0;
    });
    
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
    // Filter out the deleted row and re-calculate Sr. No.
    setData(prevData => prevData.filter(item => item.id !== deleteId).map((item, index) => ({
      ...item,
      srNo: index + 1 // Recalculate Sr. No.
    })));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleInputChange = (field, value) => {
    // Allow empty string for number fields so user can clear input
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new row
  const handleAddRow = () => {
    const newId = nextId;
    const newSrNo = data.length + 1;
    
    // Construct new row data, ensuring numeric fields are parsed
    const newRow = {
      id: newId,
      srNo: newSrNo,
      district: newRowData.district || "New District",
      pendingProposal: parseInt(newRowData.pendingProposal, 10) || 0,
      // Initialize dynamic columns
      ...columns.reduce((acc, col) => ({ ...acc, [col.key]: parseInt(newRowData[col.key], 10) || "" }), {})
    };

    setData(prevData => [...prevData, newRow]);
    setNextId(prev => prev + 1);
    setNewRowData({});
    setShowAddRowModal(false);
  };

  // Add new column logic
  const handleAddColumn = () => {
    if (newColumn.label.trim()) {
      const newKey = newColumn.label.toLowerCase().replace(/\s+/g, '');
      const newCol = {
        key: newKey,
        label: newColumn.label,
        type: newColumn.type
      };

      setColumns(prev => [...prev, newCol]);

      // Add the new column to all existing rows
      setData(prevData =>
        prevData.map(row => ({
          ...row,
          [newKey]: "" // Initialize new column data as empty
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
        delete newRow[columnKey];
        return newRow;
      })
    );
  };
  
  
  // --- Modal Components ---

  const DeleteConfirmationModal = ({ show, onClose, onConfirm, districtName }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
        <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl scale-100">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <Trash2 className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Delete District Entry</h3>
              <p className="text-sm text-slate-600">This action cannot be undone.</p>
            </div>
          </div>
          <p className="text-slate-700 mb-6 pl-12">
            Are you sure you want to delete the entry for **{districtName}** from the Forest Pendency table?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
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
          7. Forest Pendency
        </h1>
        <p className="text-slate-600">
          Track pending forest proposals across different districts and their pendency timelines.
        </p>
      </div>

      {/* Search and Action Row */}
      <div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <SearchIconComponent className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
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

        {/* Action Buttons: Add Row and Filters */}
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
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
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
              {filtered.map((row, idx) => (
                <tr key={row.id} className={
                  `transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}
                >
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
                        value={editData.pendingProposal ?? row.pendingProposal}
                        onChange={(e) => handleInputChange('pendingProposal', e.target.value)}
                        className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center"
                        aria-label="Edit Pending Proposals"
                      />
                    ) : (
                      <span className="font-semibold">
                        {row.pendingProposal || 0}
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
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">Total</td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">{data.length} districts</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{calculatedTotals.pendingProposal}</td>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{calculatedTotals[col.key] || '-'}</td>
                ))}
                <td className="px-4 py-3 text-center border border-slate-300">{/* Empty cell for actions column */}</td>
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
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
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
      
      {/* Modals */}
      
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        districtName={data.find(d => d.id === deleteId)?.district || 'this district'}
      />

    </div>
  );
};

export default ForestPendency;