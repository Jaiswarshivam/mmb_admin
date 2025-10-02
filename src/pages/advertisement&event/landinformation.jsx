import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X, Search, Filter } from "lucide-react";

const initialData = [
	{ id: 1, srNo: 1, portGroup: "Bandra Group of Ports", jurisdictionParcel: 16, jurisdictionArea: 16.75, mmbParcel: 11, mmbArea: 15.27, balanceParcel: 5, balanceArea: 1.47 },
	{ id: 2, srNo: 2, portGroup: "Mora Group of Ports", jurisdictionParcel: 42, jurisdictionArea: 466.79, mmbParcel: 11, mmbArea: 9.19, balanceParcel: 31, balanceArea: 457.60 },
	{ id: 3, srNo: 3, portGroup: "Rajpuri Group of Ports", jurisdictionParcel: 36, jurisdictionArea: 82.83, mmbParcel: 28, mmbArea: 79.04, balanceParcel: 8, balanceArea: 3.79 },
	{ id: 4, srNo: 4, portGroup: "Ratnagiri Group of Ports", jurisdictionParcel: 42, jurisdictionArea: 39.26, mmbParcel: 33, mmbArea: 37.22, balanceParcel: 9, balanceArea: 2.04 },
	{ id: 5, srNo: 5, portGroup: "Vengurla Group of Ports", jurisdictionParcel: 80, jurisdictionArea: 16.83, mmbParcel: 60, mmbArea: 15.35, balanceParcel: 20, balanceArea: 1.48 }
];

const columns = [
	{ key: "portGroup", label: "Port Groups", width: "220px" },
	{ key: "jurisdictionParcel", label: "Parcel", group: "Land under Jurisdiction", width: "80px", type: "number" },
	{ key: "jurisdictionArea", label: "Area (Hectare)", group: "Land under Jurisdiction", width: "120px", type: "number" },
	{ key: "mmbParcel", label: "Parcel", group: "In MMB Name", width: "80px", type: "number" },
	{ key: "mmbArea", label: "Area (Hectare)", group: "In MMB Name", width: "120px", type: "number" },
	{ key: "balanceParcel", label: "Parcel", group: "Balance to be Transfer in", width: "80px", type: "number" },
	{ key: "balanceArea", label: "Area (Hectare)", group: "Balance to be Transfer in", width: "120px", type: "number" }
];

const groupHeaders = [
	{ label: "Port Groups", colSpan: 1 },
	{ label: "Land under Jurisdiction", colSpan: 2 },
	{ label: "In MMB Name", colSpan: 2 },
	{ label: "Balance to be Transfer in", colSpan: 2 }
];

const LandInformation = () => {
	const [query, setQuery] = useState("");
	const [data, setData] = useState(initialData);
	const [editingId, setEditingId] = useState(null);
	const [editData, setEditData] = useState({});
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	// Filter logic: Search by Port Group
	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return data;
		return data.filter((row) =>
			row.portGroup.toLowerCase().includes(q)
		);
	}, [query, data]);

	// Calculate totals for each column
	const totals = useMemo(() => {
		const totalObj = {};
		columns.forEach(col => {
			if (col.type === "number") {
				totalObj[col.key] = filtered.reduce((sum, row) => sum + (parseFloat(row[col.key]) || 0), 0);
			}
		});
		return totalObj;
	}, [filtered]);

	// --- CRUD Operations ---
	const handleEdit = (id) => {
		const row = data.find(item => item.id === id);
		setEditingId(id);
		setEditData({ ...row });
	};

	const handleSave = () => {
		setData(prevData =>
			prevData.map(item =>
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
		setData(prevData => prevData.filter(item => item.id !== deleteId).map((item, index) => ({
			...item,
			srNo: index + 1
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
			[field]: value
		}));
	};

	// --- Modal Component ---
	const DeleteConfirmationModal = ({ show, onClose, onConfirm, portGroup }) => {
		if (!show) return null;
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
				<div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
					<h2 className="text-lg font-bold mb-2">Delete Row</h2>
					<p className="mb-4">Are you sure you want to delete <span className="font-semibold">{portGroup}</span>?</p>
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
					LAND INFORMATION
				</h1>
			</div>
			<div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
				<div className="relative flex-1 max-w-md">
					<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by Port Group"
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
				<table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
					<thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
						<tr>
							<th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">Sr. No.</th>
							{groupHeaders.map((group, idx) => (
								<th key={group.label} className="px-4 py-3 text-center border border-slate-300" colSpan={group.colSpan}>{group.label}</th>
							))}
							<th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
						</tr>
						<tr className="bg-slate-100">
							<th className="px-4 py-3 border border-slate-300"></th>
							{columns.map((col, idx) => (
								<th key={col.key} className="px-4 py-3 text-center border border-slate-300" style={{ width: col.width }}>{col.label}</th>
							))}
							<th className="px-4 py-3 border border-slate-300"></th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{filtered.map((row, idx) => (
							<tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
								<td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">{row.srNo}</td>
								{columns.map(col => (
									<td key={col.key} className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
										{editingId === row.id ? (
											<input type={col.type || 'text'} value={editData[col.key] ?? row[col.key]} onChange={e => setEditData(prev => ({ ...prev, [col.key]: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
										) : row[col.key]}
									</td>
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
							{columns.map(col => (
								<td key={col.key} className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals[col.key]}</td>
							))}
							<td className="px-4 py-3 text-center border border-slate-300"></td>
						</tr>
						{filtered.length === 0 && (
							<tr>
								<td colSpan={2 + columns.length} className="px-4 py-8 text-center bg-white">
									<div className="mx-auto max-w-md">
										<p className="text-slate-600">
											No port groups match your search. Try a different query.
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
							Showing {filtered.length} of {data.length} port groups
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
				portGroup={data.find(d => d.id === deleteId)?.portGroup || 'this port group'}
			/>
		</div>
	);
};

export default LandInformation;
