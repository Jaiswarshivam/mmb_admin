import React, { useState } from "react";
import { Edit2, Trash2, Save, X, Search, Filter } from "lucide-react";

const initialCourtStatusData = [
	{ srNo: 1, court: "Supreme Court", total: 6, gov: 0, priv: 2, notAppointed: 4, filed: "", pending: "" },
	{ srNo: 2, court: "High Court", total: 40, gov: 6, priv: 27, notAppointed: 7, filed: "", pending: "" },
	{ srNo: 3, court: "National Green Tribunal", total: 3, gov: 0, priv: 2, notAppointed: 1, filed: "", pending: "" },
	{ srNo: 4, court: "Industrial Tribunal", total: 1, gov: 0, priv: 1, notAppointed: 0, filed: "", pending: "" },
	{ srNo: 5, court: "District Level Court", total: 35, gov: 30, priv: 4, notAppointed: 1, filed: "", pending: "" },
];

const totalRow = {
	srNo: "Total",
	court: "",
	total: 85,
	gov: 36,
	priv: 36,
	notAppointed: 13,
	filed: "",
	pending: "",
};

const CourtCaseStatus = () => {
	const [data, setData] = useState(initialCourtStatusData);
	const [searchTerm, setSearchTerm] = useState("");
	const [showFilter, setShowFilter] = useState(false);
	const filteredData = data.filter(row =>
		row.court.toLowerCase().includes(searchTerm.toLowerCase())
	);
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
				 2. LIST OF ONGOING COURT CASES (Status)
				</h1>
			</div>

			{/* Search and Filter Bar */}
			<div className="mb-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
				<div className="relative flex-1 max-w-md">
					<Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
					<input
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}
						placeholder="Search by Court Name"
						className="w-full rounded-xl text-slate-700 border border-slate-200 bg-white px-10 py-2 text-sm outline-none focus:ring-4 focus:ring-sky-100 focus:border-sky-300 transition"
					/>
					<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
						{filteredData.length}/{data.length}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={() => setShowFilter(f => !f)}
						className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
							showFilter
								? "bg-sky-50 text-sky-700 ring-1 ring-sky-200"
								: "bg-white text-slate-600 ring-1 ring-slate-200 hover:ring-slate-300 hover:text-slate-700"
						}`}
					>
						<Filter className="h-4 w-4" />
						Filters
					</button>
				</div>
			</div>
			{showFilter && (
				<div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
					<div className="flex items-center gap-2 text-sm text-slate-600">
						<Search className="h-4 w-4" />
						<span>Additional filters will be available here</span>
					</div>
				</div>
			)}

			<div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
				<table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
					<thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
						<tr>
							<th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300" rowSpan={2}>Sr No</th>
							<th className="px-4 py-3 whitespace-nowrap w-[220px] border border-slate-300" rowSpan={2}>Court</th>
							<th className="px-4 py-3 whitespace-nowrap w-[120px] text-center border border-slate-300" rowSpan={2}>Total No. of Cases</th>
							<th className="px-4 py-3 text-center border border-slate-300" colSpan={3}>Advocate Appointment</th>
							<th className="px-4 py-3 text-center border border-slate-300" colSpan={2}>MMB Reply/ Say</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300" rowSpan={2}>Actions</th>
						</tr>
						<tr className="bg-slate-100">
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Government</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Private</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Not Appointed</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Filed</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Pending</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{filteredData.map((row, idx) => (
							<tr key={row.srNo} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
								<td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">{row.srNo}</td>
								<td className="px-4 py-3 border border-slate-300 font-medium text-slate-700">
									{editingId === row.srNo ? (
										<input type="text" value={editRow.court} onChange={e => handleInputChange('court', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
									) : row.court}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.total} onChange={e => handleInputChange('total', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.total}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.gov} onChange={e => handleInputChange('gov', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.gov}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.priv} onChange={e => handleInputChange('priv', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.priv}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.notAppointed} onChange={e => handleInputChange('notAppointed', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.notAppointed}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="text" value={editRow.filed} onChange={e => handleInputChange('filed', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.filed}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="text" value={editRow.pending} onChange={e => handleInputChange('pending', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.pending}
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
							<td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">{filteredData.length} courts</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.total) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.gov) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.priv) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.notAppointed) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (r.filed ? 1 : 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (r.pending ? 1 : 0), 0)}</td>
							<td className="px-4 py-3 text-center border border-slate-300">{/* No actions for total row */}</td>
						</tr>
						{filteredData.length === 0 && (
							<tr>
								<td colSpan={9} className="px-4 py-8 text-center">
									<div className="mx-auto max-w-md">
										<p className="text-slate-600">
											No courts match your search. Try a different query.
										</p>
									</div>
								</td>
							</tr>
						)}
					</tbody>
				</table>
				{/* Table Footer (Pagination/Info) */}
				<div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
					<div className="flex items-center gap-2 text-xs text-slate-500">
						<span>
							Showing {filteredData.length} of {data.length} courts
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
							Are you sure you want to delete this row from the Court Cases Status table?
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

export default CourtCaseStatus;
