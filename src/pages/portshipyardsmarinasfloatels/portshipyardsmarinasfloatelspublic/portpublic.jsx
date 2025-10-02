import React, { useState, useMemo } from "react";
import { Search, Filter, Edit2, Trash2, X, Check, Save } from 'lucide-react';

const initialData = [
  { id: 1, status: "Operational", ports: 10, captiveJetties: 6, shipyards: 9, floatels: 1, grandTotal: 26 },
  { id: 2, status: "Approved- Not Operational", ports: 1, captiveJetties: 0, shipyards: 0, floatels: 2, grandTotal: 3 },
  { id: 3, status: "LoI Issued but Agreement Pending", ports: 6, captiveJetties: 2, shipyards: 6, floatels: 1, grandTotal: 15 },
  { id: 4, status: "LoI Pending", ports: 5, captiveJetties: 0, shipyards: 6, floatels: 1, grandTotal: 12 },
  { id: 5, status: "Agreement done but Project yet to Commission", ports: 3, captiveJetties: 2, shipyards: 3, floatels: 1, grandTotal: 9 },
];

const columnDefs = [
  { key: 'status', label: 'Status', type: 'text' },
  { key: 'ports', label: 'Ports', type: 'number' },
  { key: 'captiveJetties', label: 'Captive Jetties', type: 'number' },
  { key: 'shipyards', label: 'Shipyards', type: 'number' },
  { key: 'floatels', label: 'Floatels', type: 'number' },
  { key: 'grandTotal', label: 'Grand Total', type: 'number' },
];

const PortPublic = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
	// Removed add row state

  // Filter logic
  const filtered = useMemo(() => {
    if (!query) return data;
    const lowerQuery = query.toLowerCase();
    return data.filter(item => item.status.toLowerCase().includes(lowerQuery));
  }, [query, data]);

  // Calculate totals
  const totals = useMemo(() => {
    return data.reduce((acc, curr) => {
      acc.ports += Number(curr.ports) || 0;
      acc.captiveJetties += Number(curr.captiveJetties) || 0;
      acc.shipyards += Number(curr.shipyards) || 0;
      acc.floatels += Number(curr.floatels) || 0;
      acc.grandTotal += Number(curr.grandTotal) || 0;
      return acc;
    }, { ports: 0, captiveJetties: 0, shipyards: 0, floatels: 0, grandTotal: 0 });
  }, [data]);

  // CRUD Operations
  const handleEdit = (id) => {
    const item = data.find(d => d.id === id);
    setEditData(item);
    setEditingId(id);
  };

  const handleSave = () => {
    setData(data.map(item => item.id === editingId ? { ...item, ...editData } : item));
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
    setData(data.filter(item => item.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

	// Removed add row handlers

	const handleInputChange = (field, value) => {
		if (editingId) {
			const newEditData = { ...editData, [field]: value };
			if (field !== 'status') {
				const newTotal = Number(newEditData.ports || 0) + Number(newEditData.captiveJetties || 0) + Number(newEditData.shipyards || 0) + Number(newEditData.floatels || 0);
				newEditData.grandTotal = newTotal;
			}
			setEditData(newEditData);
		}
	};

  return (

	<div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Port, Shipyards, Marinas, Floatels (Public)</h1>
        <p className="text-slate-600">Status-wise summary of Ports, Captive Jetties, Shipyards, and Floatels.</p>
      </div>

			{/* Search and Filters */}
			<div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
				<div className="relative flex-1 max-w-md">
					<input
						type="text"
						placeholder="Search by Status..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						className="w-full rounded-xl text-slate-700 border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
					/>
					<Search className="absolute left-3 top-3 text-gray-400" size={16} />
					<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
						{filtered.length}/{data.length}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<button
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
				<table className="w-full text-left align-middle min-w-[900px] border border-slate-300">
					<thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
						<tr>
							{columnDefs.map(col => (
								<th key={col.key} className="px-4 py-3 border border-slate-300 text-left font-semibold">{col.label}</th>
							))}
							<th className="px-4 py-3 border border-slate-300 text-left font-semibold">Actions</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{filtered.map((row, idx) => (
							<tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
								{columnDefs.map(col => (
									<td key={col.key} className="px-4 py-3 border border-slate-300 text-left text-black">
										{editingId === row.id ? (
											<input
												type={col.type}
												value={editData[col.key] !== undefined ? editData[col.key] : row[col.key]}
												onChange={e => handleInputChange(col.key, e.target.value)}
												className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black"
											/>
										) : (
											<span className="text-black">{String(row[col.key])}</span>
										)}
									</td>
								))}
								<td className="px-4 py-3 border border-slate-300 text-left">
									{editingId === row.id ? (
										<div className="flex items-center gap-2">
											<button onClick={handleSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"><Check className="h-4 w-4" /></button>
											<button onClick={handleCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"><X className="h-4 w-4" /></button>
										</div>
									) : (
										<div className="flex items-center gap-2">
											<button onClick={() => handleEdit(row.id)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"><Edit2 className="h-4 w-4" /></button>
											<button onClick={() => handleDelete(row.id)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
										</div>
									)}
								</td>
							</tr>
						))}
						{/* Totals Row */}
						<tr className="font-bold bg-slate-100">
							<td className="px-4 py-3 text-slate-900 font-bold text-left border border-slate-300">Grand Total</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-left border border-slate-300">{totals.ports}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-left border border-slate-300">{totals.captiveJetties}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-left border border-slate-300">{totals.shipyards}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-left border border-slate-300">{totals.floatels}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-left border border-slate-300">{totals.grandTotal}</td>
							<td className="px-4 py-3 text-left border border-slate-300"></td>
						</tr>
						{filtered.length === 0 && (
							<tr>
								<td colSpan={columnDefs.length + 1} className="px-4 py-8 text-center bg-white">
									<div className="mx-auto max-w-md">
										<p className="text-slate-600">No status matches your search. Try a different query.</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
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
							<h3 className="text-lg font-semibold text-slate-900">Delete Entry</h3>
							<p className="text-sm text-slate-600">This action cannot be undone.</p>
						</div>
					</div>
					<p className="text-slate-700 mb-6 pl-12">
						Are you sure you want to delete this entry from the table?
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

export default PortPublic;