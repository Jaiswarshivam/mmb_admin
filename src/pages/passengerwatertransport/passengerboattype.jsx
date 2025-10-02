import React, { useState, useMemo } from "react";
import { Search, Filter, Edit2, Trash2, X, Check } from 'lucide-react';

// Data extracted from the provided images (all rows combined)
const initialData = [
	// Pink section
	{ id: 1, srNo: 1, route: "Versova to Madh", passenger: 8, roPax: 0, usageTotal: 8, mono: 8, catamaran: 0, designTotal: 8, fiber: 16, steel: 1, wooden: 7, materialTotal: 8 },
	{ id: 2, srNo: 2, route: "Marve to Manori", passenger: 4, roPax: 0, usageTotal: 4, mono: 4, catamaran: 0, designTotal: 4, fiber: 0, steel: 2, wooden: 2, materialTotal: 4 },
	{ id: 3, srNo: 3, route: "Gorai to Borivli", passenger: 4, roPax: 0, usageTotal: 4, mono: 4, catamaran: 0, designTotal: 4, fiber: 0, steel: 1, wooden: 3, materialTotal: 4 },
	{ id: 4, srNo: 4, route: "Borivli to Esselworld", passenger: 7, roPax: 0, usageTotal: 7, mono: 7, catamaran: 0, designTotal: 7, fiber: 2, steel: 0, wooden: 5, materialTotal: 7 },
	{ id: 5, srNo: 5, route: "Arnala to Arnala Killa", passenger: 2, roPax: 0, usageTotal: 2, mono: 2, catamaran: 0, designTotal: 2, fiber: 0, steel: 0, wooden: 2, materialTotal: 2 },
	{ id: 6, srNo: 6, route: "Narangi to kharvadeshvari", passenger: 2, roPax: 0, usageTotal: 2, mono: 2, catamaran: 0, designTotal: 2, fiber: 0, steel: 0, wooden: 2, materialTotal: 2 },
	// Green section
	{ id: 7, srNo: 7, route: "New Ferry Wharf to Mora", passenger: 19, roPax: 0, usageTotal: 19, mono: 19, catamaran: 0, designTotal: 19, fiber: 0, steel: 0, wooden: 19, materialTotal: 19 },
	{ id: 8, srNo: 8, route: "New Ferry Wharf to Rewas", passenger: 0, roPax: 0, usageTotal: 0, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 0, wooden: 0, materialTotal: 0 },
	{ id: 9, srNo: 9, route: "Gateway of India to Elephanta", passenger: 92, roPax: 0, usageTotal: 92, mono: 90, catamaran: 2, designTotal: 92, fiber: 2, steel: 0, wooden: 90, materialTotal: 92 },
	{ id: 10, srNo: 10, route: "Gateway of India to Mandwa", passenger: 5, roPax: 0, usageTotal: 5, mono: 5, catamaran: 0, designTotal: 5, fiber: 0, steel: 5, wooden: 0, materialTotal: 5 },
	{ id: 11, srNo: 11, route: "Karanja to Rewas", passenger: 3, roPax: 0, usageTotal: 3, mono: 3, catamaran: 0, designTotal: 3, fiber: 2, steel: 1, wooden: 0, materialTotal: 3 },
	{ id: 12, srNo: 12, route: "Mora to Sasoondock", passenger: 1, roPax: 0, usageTotal: 1, mono: 1, catamaran: 0, designTotal: 1, fiber: 0, steel: 1, wooden: 0, materialTotal: 1 },
	{ id: 13, srNo: 13, route: "Ferry wharf to Mandwa (M2M)", passenger: 1, roPax: 1, usageTotal: 1, mono: 0, catamaran: 1, designTotal: 1, fiber: 0, steel: 1, wooden: 0, materialTotal: 1 },
	{ id: 14, srNo: 14, route: "Belapur to Elephanta", passenger: 0, roPax: 0, usageTotal: 0, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 0, wooden: 0, materialTotal: 0 },
	{ id: 15, srNo: 15, route: "Belapur to Nerul Vashi/harbour", passenger: 2, roPax: 0, usageTotal: 2, mono: 2, catamaran: 0, designTotal: 2, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	{ id: 16, srNo: 16, route: "Vasai to Bhayender", passenger: 0, roPax: 2, usageTotal: 2, mono: 2, catamaran: 0, designTotal: 2, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	{ id: 17, srNo: 17, route: "CIDCO PWT (Nerul) to Elephanta", passenger: 1, roPax: 0, usageTotal: 1, mono: 1, catamaran: 0, designTotal: 1, fiber: 0, steel: 1, wooden: 0, materialTotal: 1 },
	{ id: 18, srNo: 18, route: "New Ferry Wharf to CIDCO PWT (Nerul)", passenger: 0, roPax: 0, usageTotal: 0, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 0, wooden: 0, materialTotal: 0 },
	{ id: 19, srNo: 19, route: "CIDCO PWT (Nerul) to Mandwa", passenger: 0, roPax: 0, usageTotal: 0, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 0, wooden: 0, materialTotal: 0 },
	// Blue section
	{ id: 20, srNo: 20, route: "Thal to Khanderi", passenger: 3, roPax: 0, usageTotal: 3, mono: 0, catamaran: 0, designTotal: 0, fiber: 1, steel: 0, wooden: 2, materialTotal: 3 },
	{ id: 21, srNo: 21, route: "Rajpuri to janjira killa", passenger: 15, roPax: 0, usageTotal: 15, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 15, wooden: 0, materialTotal: 15 },
	{ id: 22, srNo: 22, route: "Murud bunder to Janjira killa", passenger: 9, roPax: 0, usageTotal: 9, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 9, wooden: 0, materialTotal: 9 },
	{ id: 23, srNo: 23, route: "Khora bunder to kasa killa", passenger: 0, roPax: 0, usageTotal: 0, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 0, wooden: 0, materialTotal: 0 },
	{ id: 24, srNo: 24, route: "Dighi to Agardanda RO-RO", passenger: 2, roPax: 0, usageTotal: 2, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	{ id: 25, srNo: 25, route: "Dighi to Janjira Killa", passenger: 2, roPax: 0, usageTotal: 2, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	// Yellow section
	{ id: 26, srNo: 26, route: "Hatis to Tonde", passenger: 1, roPax: 0, usageTotal: 1, mono: 0, catamaran: 0, designTotal: 0, fiber: 1, steel: 0, wooden: 0, materialTotal: 1 },
	{ id: 27, srNo: 27, route: "Jaigad to Tavasal", passenger: 1, roPax: 0, usageTotal: 1, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 1, wooden: 0, materialTotal: 1 },
	{ id: 28, srNo: 28, route: "Kudli to Jambhari", passenger: 2, roPax: 0, usageTotal: 2, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	{ id: 29, srNo: 29, route: "Navanagar to Katele", passenger: 2, roPax: 0, usageTotal: 2, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	{ id: 30, srNo: 30, route: "Padave to Satiwade", passenger: 2, roPax: 0, usageTotal: 2, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	{ id: 31, srNo: 31, route: "Dabhol to Dhopave", passenger: 1, roPax: 0, usageTotal: 1, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 1, wooden: 0, materialTotal: 1 },
	{ id: 32, srNo: 32, route: "Dabhol to Veldur", passenger: 1, roPax: 0, usageTotal: 1, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 1, wooden: 0, materialTotal: 1 },
	{ id: 33, srNo: 33, route: "Dabhol to Navanagar", passenger: 2, roPax: 0, usageTotal: 2, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 2, wooden: 0, materialTotal: 2 },
	{ id: 34, srNo: 34, route: "Veshvi to Bagmandla", passenger: 1, roPax: 0, usageTotal: 1, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 1, wooden: 0, materialTotal: 1 },
	// Pink section (bottom)
	{ id: 35, srNo: 35, route: "Malvan Jetty to Sindhudurg Killa", passenger: 78, roPax: 0, usageTotal: 78, mono: 0, catamaran: 0, designTotal: 0, fiber: 4, steel: 0, wooden: 74, materialTotal: 78 },
	{ id: 36, srNo: 36, route: "Padmgad Dandi to sindhudurg killa", passenger: 3, roPax: 0, usageTotal: 3, mono: 0, catamaran: 0, designTotal: 0, fiber: 0, steel: 3, wooden: 0, materialTotal: 3 },
];

const columns = [
	{ key: 'srNo', label: 'Sr. No.', type: 'number', width: 'w-16' },
	{ key: 'route', label: 'Route', type: 'text', width: 'w-64' },
	// Boats as per Usage
	{ key: 'passenger', label: 'Passenger', type: 'number', group: 'usage' },
	{ key: 'roPax', label: 'Ro-Pax', type: 'number', group: 'usage' },
	{ key: 'usageTotal', label: 'Total', type: 'number', group: 'usage' },
	// Boats as per Design
	{ key: 'mono', label: 'Mono Hull', type: 'number', group: 'design' },
	{ key: 'catamaran', label: 'Catamaran', type: 'number', group: 'design' },
	{ key: 'designTotal', label: 'Total', type: 'number', group: 'design' },
	// Boats as per Built Material
	{ key: 'fiber', label: 'Fiber', type: 'number', group: 'material' },
	{ key: 'steel', label: 'Steel', type: 'number', group: 'material' },
	{ key: 'wooden', label: 'Wooden', type: 'number', group: 'material' },
	{ key: 'materialTotal', label: 'Total', type: 'number', group: 'material' },
];

// Row background color: alternate white and sky-50/40 like vesselregistration1.jsx
const getRowBg = (idx) => (idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40');

const PassengerBoatType = () => {
	const [query, setQuery] = useState("");
	const [showFilters, setShowFilters] = useState(false);
	const [data, setData] = useState(initialData);
	const [editingId, setEditingId] = useState(null);
	const [editData, setEditData] = useState({});
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	// Filter logic
	const filtered = useMemo(() => {
		if (!query) return data;
		const lowerQuery = query.toLowerCase();
		return data.filter(item => item.route.toLowerCase().includes(lowerQuery));
	}, [query, data]);

	// Totals
	const totals = useMemo(() => {
		const t = {};
		columns.forEach(col => {
			if (col.type === 'number') {
				t[col.key] = data.reduce((acc, curr) => acc + (Number(curr[col.key]) || 0), 0);
			}
		});
		return t;
	}, [data]);

	// CRUD
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

	const handleInputChange = (field, value) => {
		if (editingId) {
			const newEditData = { ...editData, [field]: value };
			// Update totals for grouped columns
			if (["passenger", "roPax"].includes(field)) {
				newEditData.usageTotal = Number(newEditData.passenger || 0) + Number(newEditData.roPax || 0);
			}
			if (["mono", "catamaran"].includes(field)) {
				newEditData.designTotal = Number(newEditData.mono || 0) + Number(newEditData.catamaran || 0);
			}
			if (["fiber", "steel", "wooden"].includes(field)) {
				newEditData.materialTotal = Number(newEditData.fiber || 0) + Number(newEditData.steel || 0) + Number(newEditData.wooden || 0);
			}
			setEditData(newEditData);
		}
	};

	return (
		<div className="max-w-7xl mx-auto p-6">
			<div className="mb-6">
				<h1 className="text-2xl font-bold text-slate-900 mb-2">Passenger Water Transport - Boat Types</h1>
				<p className="text-slate-600">Route-wise summary of boat types as per usage, design, and built material.</p>
			</div>

			{/* Search and Filters */}
			<div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
				<div className="relative flex-1 max-w-md">
					<input
						type="text"
						placeholder="Search by Route..."
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
										<table className="w-full text-left align-middle min-w-[1200px] border border-slate-300">
											<thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
												<tr>
													<th rowSpan={2} className="px-4 py-3 border border-slate-300 text-left align-middle">Sr. No.</th>
													<th rowSpan={2} className="px-4 py-3 border border-slate-300 text-left align-middle">Route</th>
													<th colSpan={3} className="px-4 py-3 border border-slate-300 text-center">Boats as per Usage</th>
													<th colSpan={3} className="px-4 py-3 border border-slate-300 text-center">Boats as per Design</th>
													<th colSpan={4} className="px-4 py-3 border border-slate-300 text-center">Boats as per Built Material</th>
													<th rowSpan={2} className="px-4 py-3 border border-slate-300 text-center align-middle">Actions</th>
												</tr>
												<tr>
													<th className="px-4 py-2 border border-slate-300 text-center">Passenger</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Ro-Pax</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Total</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Mono Hull</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Catamaran</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Total</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Fiber</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Steel</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Wooden</th>
													<th className="px-4 py-2 border border-slate-300 text-center">Total</th>
												</tr>
											</thead>
											<tbody className="bg-white">
																		{filtered.map((row, idx) => (
																			<tr key={row.id} className={`transition-colors group ${getRowBg(idx)} hover:bg-sky-50/70`}>
														{columns.map(col => (
															<td key={col.key} className={`px-4 py-3 border border-slate-300 ${col.type === 'number' ? 'text-center' : 'text-left'} text-black`}>
																{editingId === row.id ? (
																	<input
																		type={col.type}
																		value={editData[col.key] !== undefined ? editData[col.key] : row[col.key]}
																		onChange={e => handleInputChange(col.key, e.target.value)}
																		className={`w-full px-2 py-1 text-sm border border-black rounded bg-white text-black ${col.type === 'number' ? 'text-center' : 'text-left'}`}
																		disabled={col.key === 'usageTotal' || col.key === 'designTotal' || col.key === 'materialTotal'}
																	/>
																) : (
																	<span className="text-black">{String(row[col.key])}</span>
																)}
															</td>
														))}
														<td className="px-4 py-3 border border-slate-300 text-center">
															{editingId === row.id ? (
																<div className="flex items-center justify-center gap-2">
																	<button onClick={handleSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"><Check className="h-4 w-4" /></button>
																	<button onClick={handleCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"><X className="h-4 w-4" /></button>
																</div>
															) : (
																<div className="flex items-center justify-center gap-2">
																	<button onClick={() => handleEdit(row.id)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"><Edit2 className="h-4 w-4" /></button>
																	<button onClick={() => handleDelete(row.id)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
																</div>
															)}
														</td>
													</tr>
												))}
												{/* Totals Row */}
												<tr className="font-bold bg-slate-100">
													<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300" colSpan={2}>Total</td>
													{columns.slice(2).map(col => (
														<td key={col.key} className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals[col.key]}</td>
													))}
													<td className="px-4 py-3 text-center border border-slate-300"></td>
												</tr>
												{filtered.length === 0 && (
													<tr>
														<td colSpan={columns.length + 1} className="px-4 py-8 text-center bg-white">
															<div className="mx-auto max-w-md">
																<p className="text-slate-600">No route matches your search. Try a different query.</p>
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

export default PassengerBoatType;
