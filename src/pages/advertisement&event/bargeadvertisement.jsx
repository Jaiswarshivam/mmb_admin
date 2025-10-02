import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X, Search, Filter } from "lucide-react";

const initialData = [
	{
		id: 1,
		srNo: 1,
		location: "Bandra Worli Sea Link Jetty",
		portLimit: "Bandra Port",
		agency: "M/s. Zen Media LLP",
		revenue: {
			"2019-2020": 0,
			"2020-2021": 671784,
			"2021-2022": 554121,
			"2022-2023": 609444,
			"2023-2024": 670383,
			"2024-2025": 2458900
		},
		outstanding: 4964632
	},
	{
		id: 2,
		srNo: 2,
		location: "Juhu To Versova Koliwad Beach",
		portLimit: "Bandra Port",
		agency: "M/s. Zen Media LLP",
		revenue: {
			"2019-2020": 0,
			"2020-2021": 260997,
			"2021-2022": 287049,
			"2022-2023": 315747,
			"2023-2024": 347280,
			"2024-2025": 1273604
		},
		outstanding: 2484677
	},
	{
		id: 3,
		srNo: 3,
		location: "Bandra Worli Seaface",
		portLimit: "Bandra Port",
		agency: "M/s. Zen Media LLP",
		revenue: {
			"2019-2020": 115090,
			"2020-2021": 1043988,
			"2021-2022": 1148340,
			"2022-2023": 736848,
			"2023-2024": 0,
			"2024-2025": 0
		},
		outstanding: 3044266
	}
];

const revenueYears = [
	"2019-2020",
	"2020-2021",
	"2021-2022",
	"2022-2023",
	"2023-2024",
	"2024-2025"
];

const BargeAdvertisement = () => {
	const [query, setQuery] = useState("");
	const [data, setData] = useState(initialData);
	const [editingId, setEditingId] = useState(null);
	const [editData, setEditData] = useState({});
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	// Filter logic: Search by Location Name
	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return data;
		return data.filter((row) =>
			row.location.toLowerCase().includes(q)
		);
	}, [query, data]);

	// Calculate totals for each year and outstanding
	const totals = useMemo(() => {
		const totalObj = {};
		revenueYears.forEach(year => {
			totalObj[year] = filtered.reduce((sum, row) => sum + (row.revenue[year] || 0), 0);
		});
		totalObj.outstanding = filtered.reduce((sum, row) => sum + (row.outstanding || 0), 0);
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
	const DeleteConfirmationModal = ({ show, onClose, onConfirm, location }) => {
		if (!show) return null;
		return (
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
				<div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
					<h2 className="text-lg font-bold mb-2">Delete Row</h2>
					<p className="mb-4">Are you sure you want to delete <span className="font-semibold">{location}</span>?</p>
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
					BARGE ADVERTISEMENT
				</h1>
			</div>
			<div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
				<div className="relative flex-1 max-w-md">
					<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Search by Location Name"
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
							<th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300">SR. NO.</th>
							<th className="px-4 py-3 whitespace-nowrap w-[220px] border border-slate-300">LOCATION NAME</th>
							<th className="px-4 py-3 whitespace-nowrap w-[120px] border border-slate-300">PORT LIMIT</th>
							<th className="px-4 py-3 whitespace-nowrap w-[180px] border border-slate-300">AGENCY NAME</th>
							<th className="px-4 py-3 text-center border border-slate-300" colSpan={revenueYears.length}>REVENUE RECEIVED</th>
							<th className="px-4 py-3 whitespace-nowrap w-[120px] border border-slate-300">Outstanding Amount</th>
							<th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300">Actions</th>
						</tr>
						<tr className="bg-slate-100">
							<th className="px-4 py-3 border border-slate-300"></th>
							<th className="px-4 py-3 border border-slate-300"></th>
							<th className="px-4 py-3 border border-slate-300"></th>
							<th className="px-4 py-3 border border-slate-300"></th>
							{revenueYears.map(year => (
								<th key={year} className="px-4 py-3 text-center border border-slate-300">{year}</th>
							))}
							<th className="px-4 py-3 border border-slate-300"></th>
							<th className="px-4 py-3 border border-slate-300"></th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{filtered.map((row, idx) => (
							<tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
								<td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">{row.srNo}</td>
								<td className="px-4 py-3 border border-slate-300 font-medium text-slate-700">
									{editingId === row.id ? (
										<input type="text" value={editData.location} onChange={e => setEditData(prev => ({ ...prev, location: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300" />
									) : row.location}
								</td>
								<td className="px-4 py-3 border border-slate-300 text-center">
														{editingId === row.id ? (
															<input type="text" value={editData.portLimit} onChange={e => setEditData(prev => ({ ...prev, portLimit: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
														) : (
															<span className="text-black">{row.portLimit}</span>
														)}
								</td>
								<td className="px-4 py-3 border border-slate-300 text-center">
														{editingId === row.id ? (
															<input type="text" value={editData.agency} onChange={e => setEditData(prev => ({ ...prev, agency: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
														) : (
															<span className="text-black">{row.agency}</span>
														)}
								</td>
								{revenueYears.map(year => (
									<td key={year} className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
										{editingId === row.id ? (
											<input type="number" value={editData.revenue?.[year] ?? row.revenue[year]} onChange={e => setEditData(prev => ({ ...prev, revenue: { ...prev.revenue, [year]: e.target.value } }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
										) : row.revenue[year]}
									</td>
								))}
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.id ? (
										<input type="number" value={editData.outstanding ?? row.outstanding} onChange={e => setEditData(prev => ({ ...prev, outstanding: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300 text-center" />
									) : row.outstanding}
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
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">Total</td>
							<td className="px-4 py-3 text-slate-900 font-bold border border-slate-300" colSpan={3}></td>
							{revenueYears.map(year => (
								<td key={year} className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals[year]}</td>
							))}
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{totals.outstanding}</td>
							<td className="px-4 py-3 text-center border border-slate-300"></td>
						</tr>
						{filtered.length === 0 && (
							<tr>
								<td colSpan={7 + revenueYears.length} className="px-4 py-8 text-center bg-white">
									<div className="mx-auto max-w-md">
										<p className="text-slate-600">
											No locations match your search. Try a different query.
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
							Showing {filtered.length} of {data.length} locations
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
				location={data.find(d => d.id === deleteId)?.location || 'this location'}
			/>
		</div>
	);
};

export default BargeAdvertisement;
