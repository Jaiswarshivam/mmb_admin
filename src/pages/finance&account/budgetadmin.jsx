import React, { useState, useMemo } from "react";
import { Edit2, Trash2, Save, X } from "lucide-react";
import searchIcon from "../../assets/icons/searchTic.svg";

// --- Table 1: State Budget ---
const initialStateBudget = [
  { id: 1, srNo: 1, scheme: "Construction of Jetty (Sagarmala) State", head: "3051-1891", budget: 25.00, receipt: 0.00, expenditure: 0.00, balance: 0.00, percent: "0.00%" },
  { id: 2, srNo: 2, scheme: "Construction of flotting jetty and other facilities to Passenger", head: "3051-1835", budget: 272.00, receipt: 92.37, expenditure: 76.42, balance: 15.95, percent: "82.73%" },
  { id: 3, srNo: 3, scheme: "Construction of Roads & Railway tracks upto port and backwater", head: "3051-0768", budget: 100.00, receipt: 24.87, expenditure: 0.58, balance: 24.29, percent: "2.33%" },
  { id: 4, srNo: 4, scheme: "Capital Dredging at Ports", head: "3051-0732", budget: 35.00, receipt: 0.00, expenditure: 0.00, balance: 0.00, percent: "0.00%" },
  { id: 5, srNo: 5, scheme: "Asian Development Bank assisted sustainable coastal protection and management investment programme", head: "2711-0922", budget: 15.00, receipt: 0.00, expenditure: 0.00, balance: 0.00, percent: "0.00%" },
  { id: 6, srNo: 6, scheme: "Asian Development Bank assisted sustainable coastal protection and management investment programme", head: "2711-0976", budget: 25.00, receipt: 0.00, expenditure: 0.00, balance: 0.00, percent: "0.00%" },
  { id: 7, srNo: 7, scheme: "Hydrographic survey and other investigation", head: "3056-0055", budget: 10.00, receipt: 0.00, expenditure: 0.00, balance: 0.00, percent: "0.00%" },
  { id: 8, srNo: 8, scheme: "Purchase of flotilla", head: "3051-0741", budget: 2.00, receipt: 0.00, expenditure: 0.00, balance: 0.00, percent: "0.00%" },
];
const stateBudgetTotal = { budget: 484.00, receipt: 117.24, expenditure: 77.00, balance: 40.24, percent: "65.68%" };

// --- Table 2: MMB Budget ---
const initialMMBBudget = [
  { id: 1, srNo: 1, department: "Administration Department", head: "", budgetReceipt: 115.01, uptoAugReceipt: 29.98, budgetExpenditure: 120.33, uptoAugExpenditure: 26.32, percent: "21.87%" },
  { id: 2, srNo: 2, department: "Works Department", head: "", budgetReceipt: 1.20, uptoAugReceipt: 0.04, budgetExpenditure: 110.00, uptoAugExpenditure: 19.80, percent: "18.00%" },
  { id: 3, srNo: 3, department: "Marine Engineer Department", head: "", budgetReceipt: 0.60, uptoAugReceipt: 0.16, budgetExpenditure: 13.90, uptoAugExpenditure: 1.99, percent: "14.34%" },
  { id: 4, srNo: 4, department: "Hydrographer Department", head: "", budgetReceipt: 1.90, uptoAugReceipt: 0.70, budgetExpenditure: 5.00, uptoAugExpenditure: 2.25, percent: "44.97%" },
  { id: 5, srNo: 5, department: "Ports Department", head: "", budgetReceipt: 249.70, uptoAugReceipt: 94.63, budgetExpenditure: 1047.50, uptoAugExpenditure: 8.67, percent: "0.83%" },
  { id: 6, srNo: 6, department: "Environmental Department", head: "", budgetReceipt: 0.00, uptoAugReceipt: 0.00, budgetExpenditure: 0.00, uptoAugExpenditure: 0.00, percent: "0.00%" },
];
const mmbBudgetTotal = { budgetReceipt: 368.41, uptoAugReceipt: 125.53, budgetExpenditure: 1296.93, uptoAugExpenditure: 59.03, percent: "59.03%" };

// --- Table 3: Other Source ---
const initialOtherSource = [
  { id: 1, srNo: 1, scheme: "Construction of Ro Pax and Terminal at Mora, Dist Raigad. (Central Govt. Grant)", head: "Sagarmala", budget: 0.00, receipt: 8.81, expenditure: 0.00, balance: 0.00, percent: "0.00%" },
  { id: 2, srNo: 2, scheme: "Development of Fishing Port Jivana", head: "4405-3499", budget: 0.00, receipt: 12.00, expenditure: 12.00, balance: 0.00, percent: "100.00%" },
  { id: 3, srNo: 3, scheme: "Development of Fishing Port Harnai", head: "4405-3499", budget: 0.00, receipt: 10.00, expenditure: 10.00, balance: 0.00, percent: "100.00%" },
  { id: 4, srNo: 4, scheme: "Development of Fishing Port Sakhari Nate", head: "4405-3499", budget: 0.00, receipt: 10.00, expenditure: 10.00, balance: 0.00, percent: "100.00%" },
];

const BudgetAdmin = () => {
  // State Budget
  const [stateBudget, setStateBudget] = useState(initialStateBudget);
  const [stateEditingId, setStateEditingId] = useState(null);
  const [stateEditData, setStateEditData] = useState({});

  // MMB Budget
  const [mmbBudget, setMMBBudget] = useState(initialMMBBudget);
  const [mmbEditingId, setMMBEditingId] = useState(null);
  const [mmbEditData, setMMBEditData] = useState({});

  // Other Source
  const [otherSource, setOtherSource] = useState(initialOtherSource);
  const [otherEditingId, setOtherEditingId] = useState(null);
  const [otherEditData, setOtherEditData] = useState({});


  // --- CRUD for State Budget ---
  const handleStateEdit = (id) => {
    const row = stateBudget.find((item) => item.id === id);
    setStateEditingId(id);
    setStateEditData({ ...row });
  };
  const handleStateSave = () => {
    setStateBudget((prev) => prev.map((item) => item.id === stateEditingId ? { ...item, ...stateEditData } : item));
    setStateEditingId(null);
    setStateEditData({});
  };
  const handleStateCancel = () => {
    setStateEditingId(null);
    setStateEditData({});
  };
  // Delete logic for State Budget
  const [stateDeleteId, setStateDeleteId] = useState(null);
  const [showStateDeleteModal, setShowStateDeleteModal] = useState(false);
  const handleStateDelete = (id) => {
    setStateDeleteId(id);
    setShowStateDeleteModal(true);
  };
  const confirmStateDelete = () => {
    setStateBudget((prev) => prev.filter((item) => item.id !== stateDeleteId).map((item, idx) => ({ ...item, srNo: idx + 1 })));
    setShowStateDeleteModal(false);
    setStateDeleteId(null);
  };
  const cancelStateDelete = () => {
    setShowStateDeleteModal(false);
    setStateDeleteId(null);
  };

  // --- CRUD for MMB Budget ---
  const handleMMBEdit = (id) => {
    const row = mmbBudget.find((item) => item.id === id);
    setMMBEditingId(id);
    setMMBEditData({ ...row });
  };
  const handleMMBSave = () => {
    setMMBBudget((prev) => prev.map((item) => item.id === mmbEditingId ? { ...item, ...mmbEditData } : item));
    setMMBEditingId(null);
    setMMBEditData({});
  };
  const handleMMBCancel = () => {
    setMMBEditingId(null);
    setMMBEditData({});
  };
  // Delete logic for MMB Budget
  const [mmbDeleteId, setMMBDeleteId] = useState(null);
  const [showMMBDeleteModal, setShowMMBDeleteModal] = useState(false);
  const handleMMBDelete = (id) => {
    setMMBDeleteId(id);
    setShowMMBDeleteModal(true);
  };
  const confirmMMBDelete = () => {
    setMMBBudget((prev) => prev.filter((item) => item.id !== mmbDeleteId).map((item, idx) => ({ ...item, srNo: idx + 1 })));
    setShowMMBDeleteModal(false);
    setMMBDeleteId(null);
  };
  const cancelMMBDelete = () => {
    setShowMMBDeleteModal(false);
    setMMBDeleteId(null);
  };

  // --- CRUD for Other Source ---
  const handleOtherEdit = (id) => {
    const row = otherSource.find((item) => item.id === id);
    setOtherEditingId(id);
    setOtherEditData({ ...row });
  };
  const handleOtherSave = () => {
    setOtherSource((prev) => prev.map((item) => item.id === otherEditingId ? { ...item, ...otherEditData } : item));
    setOtherEditingId(null);
    setOtherEditData({});
  };
  const handleOtherCancel = () => {
    setOtherEditingId(null);
    setOtherEditData({});
  };
  // Delete logic for Other Source
  const [otherDeleteId, setOtherDeleteId] = useState(null);
  const [showOtherDeleteModal, setShowOtherDeleteModal] = useState(false);
  const handleOtherDelete = (id) => {
    setOtherDeleteId(id);
    setShowOtherDeleteModal(true);
  };
  const confirmOtherDelete = () => {
    setOtherSource((prev) => prev.filter((item) => item.id !== otherDeleteId).map((item, idx) => ({ ...item, srNo: idx + 1 })));
    setShowOtherDeleteModal(false);
    setOtherDeleteId(null);
  };
  const cancelOtherDelete = () => {
    setShowOtherDeleteModal(false);
    setOtherDeleteId(null);
  };

  // --- Table Renderers ---
  return (
    <div className="max-w-7xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Details of Sanctioned Grant, Receipt and Expenditure for the year of 2025-26</h1>
        <p className="text-slate-700 font-semibold">(Rupees in Crore)</p>
      </div>

      {/* Table 1: State Budget */}
      <div className="mb-10">
        <h2 className="font-bold text-lg text-slate-800 mb-2">I. State Budget</h2>
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
            <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 border border-slate-300">Sr.No</th>
                <th className="px-4 py-3 border border-slate-300">Name Of Scheme</th>
                <th className="px-4 py-3 border border-slate-300">Head</th>
                <th className="px-4 py-3 border border-slate-300">Budget 25-26</th>
                <th className="px-4 py-3 border border-slate-300">Receipt upto Aug 2025</th>
                <th className="px-4 py-3 border border-slate-300">Expenditure upto Aug 2025</th>
                <th className="px-4 py-3 border border-slate-300">Balance</th>
                <th className="px-4 py-3 border border-slate-300">Percentage</th>
                <th className="px-4 py-3 border border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {stateBudget.map((row, idx) => (
                <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                  <td className="px-4 py-3 text-black text-center border border-slate-300">{row.srNo}</td>
                  <td className="px-4 py-3 border border-slate-300 text-black">
                    {stateEditingId === row.id ? (
                      <input type="text" value={stateEditData.scheme} onChange={e => setStateEditData(prev => ({ ...prev, scheme: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                    ) : row.scheme}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-black">
                    {stateEditingId === row.id ? (
                      <input type="text" value={stateEditData.head} onChange={e => setStateEditData(prev => ({ ...prev, head: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                    ) : row.head}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {stateEditingId === row.id ? (
                      <input type="number" value={stateEditData.budget} onChange={e => setStateEditData(prev => ({ ...prev, budget: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.budget}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {stateEditingId === row.id ? (
                      <input type="number" value={stateEditData.receipt} onChange={e => setStateEditData(prev => ({ ...prev, receipt: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.receipt}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {stateEditingId === row.id ? (
                      <input type="number" value={stateEditData.expenditure} onChange={e => setStateEditData(prev => ({ ...prev, expenditure: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.expenditure}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {stateEditingId === row.id ? (
                      <input type="number" value={stateEditData.balance} onChange={e => setStateEditData(prev => ({ ...prev, balance: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.balance}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {stateEditingId === row.id ? (
                      <input type="text" value={stateEditData.percent} onChange={e => setStateEditData(prev => ({ ...prev, percent: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.percent}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300">
                    {stateEditingId === row.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={handleStateSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"><Save className="h-4 w-4" /></button>
                        <button onClick={handleStateCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleStateEdit(row.id)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleStateDelete(row.id)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-slate-100">
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300"></td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">Total</td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{stateBudgetTotal.budget}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{stateBudgetTotal.receipt}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{stateBudgetTotal.expenditure}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{stateBudgetTotal.balance}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{stateBudgetTotal.percent}</td>
                <td className="px-4 py-3 text-center border border-slate-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: MMB Budget */}
      <div className="mb-10">
        <h2 className="font-bold text-lg text-slate-800 mb-2">II. MMB Budget</h2>
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
            <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 border border-slate-300">Sr No</th>
                <th className="px-4 py-3 border border-slate-300">Department</th>
                <th className="px-4 py-3 border border-slate-300">Head</th>
                <th className="px-4 py-3 border border-slate-300">Budget 2025-26 Receipt</th>
                <th className="px-4 py-3 border border-slate-300">Upto Aug 2025 Receipt</th>
                <th className="px-4 py-3 border border-slate-300">Budget 2025-26 Expenditure</th>
                <th className="px-4 py-3 border border-slate-300">Upto Aug 2025 Expenditure</th>
                <th className="px-4 py-3 border border-slate-300">Percentage %</th>
                <th className="px-4 py-3 border border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {mmbBudget.map((row, idx) => (
                <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                  <td className="px-4 py-3 text-black text-center border border-slate-300">{row.srNo}</td>
                  <td className="px-4 py-3 border border-slate-300 text-black">
                    {mmbEditingId === row.id ? (
                      <input type="text" value={mmbEditData.department} onChange={e => setMMBEditData(prev => ({ ...prev, department: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                    ) : row.department}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-black">
                    {mmbEditingId === row.id ? (
                      <input type="text" value={mmbEditData.head} onChange={e => setMMBEditData(prev => ({ ...prev, head: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                    ) : row.head}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {mmbEditingId === row.id ? (
                      <input type="number" value={mmbEditData.budgetReceipt} onChange={e => setMMBEditData(prev => ({ ...prev, budgetReceipt: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.budgetReceipt}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {mmbEditingId === row.id ? (
                      <input type="number" value={mmbEditData.uptoAugReceipt} onChange={e => setMMBEditData(prev => ({ ...prev, uptoAugReceipt: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.uptoAugReceipt}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {mmbEditingId === row.id ? (
                      <input type="number" value={mmbEditData.budgetExpenditure} onChange={e => setMMBEditData(prev => ({ ...prev, budgetExpenditure: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.budgetExpenditure}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {mmbEditingId === row.id ? (
                      <input type="number" value={mmbEditData.uptoAugExpenditure} onChange={e => setMMBEditData(prev => ({ ...prev, uptoAugExpenditure: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.uptoAugExpenditure}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {mmbEditingId === row.id ? (
                      <input type="text" value={mmbEditData.percent} onChange={e => setMMBEditData(prev => ({ ...prev, percent: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.percent}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300">
                    {mmbEditingId === row.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={handleMMBSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"><Save className="h-4 w-4" /></button>
                        <button onClick={handleMMBCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleMMBEdit(row.id)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleMMBDelete(row.id)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-slate-100">
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300"></td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">Total</td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{mmbBudgetTotal.budgetReceipt}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{mmbBudgetTotal.uptoAugReceipt}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{mmbBudgetTotal.budgetExpenditure}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{mmbBudgetTotal.uptoAugExpenditure}</td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">{mmbBudgetTotal.percent}</td>
                <td className="px-4 py-3 text-center border border-slate-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 3: Other Source */}
      <div className="mb-10">
        <h2 className="font-bold text-lg text-slate-800 mb-2">III. Other Source</h2>
        <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-x-auto">
          <table className="w-full text-left align-middle min-w-[1000px] border border-slate-300">
            <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 border border-slate-300">Sr.No</th>
                <th className="px-4 py-3 border border-slate-300">Name Of Scheme</th>
                <th className="px-4 py-3 border border-slate-300">Head</th>
                <th className="px-4 py-3 border border-slate-300">Budget 25-26</th>
                <th className="px-4 py-3 border border-slate-300">Receipt upto Aug 2025</th>
                <th className="px-4 py-3 border border-slate-300">Expenditure upto Aug 2025</th>
                <th className="px-4 py-3 border border-slate-300">Balance</th>
                <th className="px-4 py-3 border border-slate-300">Percentage</th>
                <th className="px-4 py-3 border border-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {otherSource.map((row, idx) => (
                <tr key={row.id} className={`transition-colors group ${idx % 2 === 0 ? 'bg-white' : 'bg-sky-50/40'} hover:bg-sky-50/70`}>
                  <td className="px-4 py-3 text-black text-center border border-slate-300">{row.srNo}</td>
                  <td className="px-4 py-3 border border-slate-300 text-black">
                    {otherEditingId === row.id ? (
                      <input type="text" value={otherEditData.scheme} onChange={e => setOtherEditData(prev => ({ ...prev, scheme: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                    ) : row.scheme}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-black">
                    {otherEditingId === row.id ? (
                      <input type="text" value={otherEditData.head} onChange={e => setOtherEditData(prev => ({ ...prev, head: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black" />
                    ) : row.head}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {otherEditingId === row.id ? (
                      <input type="number" value={otherEditData.budget} onChange={e => setOtherEditData(prev => ({ ...prev, budget: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.budget}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {otherEditingId === row.id ? (
                      <input type="number" value={otherEditData.receipt} onChange={e => setOtherEditData(prev => ({ ...prev, receipt: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.receipt}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {otherEditingId === row.id ? (
                      <input type="number" value={otherEditData.expenditure} onChange={e => setOtherEditData(prev => ({ ...prev, expenditure: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.expenditure}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {otherEditingId === row.id ? (
                      <input type="number" value={otherEditData.balance} onChange={e => setOtherEditData(prev => ({ ...prev, balance: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.balance}
                  </td>
                  <td className="px-4 py-3 border border-slate-300 text-center text-black">
                    {otherEditingId === row.id ? (
                      <input type="text" value={otherEditData.percent} onChange={e => setOtherEditData(prev => ({ ...prev, percent: e.target.value }))} className="w-full px-2 py-1 text-sm border border-black rounded bg-white text-black text-center" />
                    ) : row.percent}
                  </td>
                  <td className="px-4 py-3 text-center border border-slate-300">
                    {otherEditingId === row.id ? (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={handleOtherSave} className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"><Save className="h-4 w-4" /></button>
                        <button onClick={handleOtherCancel} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => handleOtherEdit(row.id)} className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"><Edit2 className="h-4 w-4" /></button>
                        <button onClick={() => handleOtherDelete(row.id)} className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded" title="Delete"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-slate-100">
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300"></td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">Total</td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 border border-slate-300"></td>
                <td className="px-4 py-3 text-center border border-slate-300"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Modals */}
      {/* State Budget Delete Modal */}
      {showStateDeleteModal && (
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
              Are you sure you want to delete this entry from the State Budget table?
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={cancelStateDelete} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={confirmStateDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* MMB Budget Delete Modal */}
      {showMMBDeleteModal && (
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
              Are you sure you want to delete this entry from the MMB Budget table?
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={cancelMMBDelete} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={confirmMMBDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
      {/* Other Source Delete Modal */}
      {showOtherDeleteModal && (
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
              Are you sure you want to delete this entry from the Other Source table?
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={cancelOtherDelete} className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
              <button onClick={confirmOtherDelete} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetAdmin;
