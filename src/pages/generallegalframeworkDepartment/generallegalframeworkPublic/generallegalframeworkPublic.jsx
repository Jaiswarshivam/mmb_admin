import React, { useState } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";

const initialCourtCasesData = [
	{ srNo: 1, department: "Planning", supreme: 4, high: 12, ngt: 1, industrial: 0, district: 5 },
	{ srNo: 2, department: "Traffic", supreme: 0, high: 1, ngt: 0, industrial: 0, district: 0 },
	{ srNo: 3, department: "Revenue", supreme: 0, high: 8, ngt: 0, industrial: 0, district: 27 },
	{ srNo: 4, department: "Engineering", supreme: 2, high: 9, ngt: 1, industrial: 0, district: 2 },
	{ srNo: 5, department: "Accounts", supreme: 0, high: 0, ngt: 0, industrial: 1, district: 0 },
	{ srNo: 6, department: "Administration", supreme: 0, high: 1, ngt: 0, industrial: 0, district: 1 },
	{ srNo: 7, department: "CSSO", supreme: 0, high: 1, ngt: 0, industrial: 0, district: 0 },
	{ srNo: 8, department: "Hydrographer", supreme: 0, high: 8, ngt: 0, industrial: 0, district: 0 },
	{ srNo: 9, department: "ADB", supreme: 0, high: 0, ngt: 1, industrial: 0, district: 0 },
];

const totalRow = {
	srNo: "TOTAL",
	department: "",
	supreme: 6,
	high: 40,
	ngt: 3,
	industrial: 1,
	district: 35,
};

const GeneralLegalFrameworkPublicTable = () => {
	const [data, setData] = useState(initialCourtCasesData);
	const [searchTerm, setSearchTerm] = useState("");
	const [showFilter, setShowFilter] = useState(false);
	const filteredData = data.filter(row =>
		row.department.toLowerCase().includes(searchTerm.toLowerCase())
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
					Public Dashboard
				</h1>
				<div className="text-base font-semibold text-slate-800 mb-1">Department - Law Branch</div>
				<p className="text-slate-600 font-medium">
					LIST OF ONGOING COURT CASES (Department wise)
				</p>
			</div>

			{/* Search and Filter Bar */}
			<div className="flex flex-wrap items-center justify-between mb-4 gap-2">
				<div className="flex items-center gap-2 w-full sm:w-auto">
					<input
						type="text"
						placeholder="Search by Department Name"
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
							<th className="px-4 py-3 whitespace-nowrap w-[60px] text-center border border-slate-300" rowSpan={2}>Sr No</th>
							<th className="px-4 py-3 whitespace-nowrap w-[220px] border border-slate-300" rowSpan={2}>Department</th>
							<th className="px-4 py-3 text-center border border-slate-300" colSpan={5}>Court</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300" rowSpan={2}>Actions</th>
						</tr>
						<tr className="bg-slate-100">
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Supreme Court</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">High Court</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">National Green</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">Industrial</th>
							<th className="px-4 py-3 whitespace-nowrap w-[80px] text-center border border-slate-300">District Level</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{filteredData.map((row, idx) => (
							<tr key={row.srNo} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
								<td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">{row.srNo}</td>
								<td className="px-4 py-3 border border-slate-300 font-medium text-slate-700">
									{editingId === row.srNo ? (
										<input type="text" value={editRow.department} onChange={e => handleInputChange('department', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
									) : row.department}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.supreme} onChange={e => handleInputChange('supreme', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.supreme}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.high} onChange={e => handleInputChange('high', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.high}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.ngt} onChange={e => handleInputChange('ngt', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.ngt}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.industrial} onChange={e => handleInputChange('industrial', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.industrial}
								</td>
								<td className="px-4 py-3 text-center border border-slate-300 font-semibold text-slate-900">
									{editingId === row.srNo ? (
										<input type="number" value={editRow.district} onChange={e => handleInputChange('district', e.target.value)} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
									) : row.district}
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
							<td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">{filteredData.length} departments</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.supreme) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.high) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.ngt) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.industrial) || 0), 0)}</td>
							<td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{filteredData.reduce((sum, r) => sum + (parseInt(r.district) || 0), 0)}</td>
							<td className="px-4 py-3 text-center border border-slate-300">{/* No actions for total row */}</td>
						</tr>
						{filteredData.length === 0 && (
							<tr>
								<td colSpan={8} className="px-4 py-8 text-center">
									<div className="mx-auto max-w-md">
										<p className="text-slate-600">
											No departments match your search. Try a different query.
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
							Showing {filteredData.length} of {data.length} departments
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
							Are you sure you want to delete this row from the Ongoing Court Cases table?
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

export default GeneralLegalFrameworkPublicTable;
