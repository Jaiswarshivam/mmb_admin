import React, { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
  Save,
} from "lucide-react";

// Initial data based on the provided image
const initialData = [
  {
    id: 1,
    srNo: 1,
    portGroup: "Bandra",
    route: "Versova to Madh",
    portLimit: "Versova",
    operators: 2,
    passengerBoats: 8,
    roPaxBoats: 0,
    totalBoats: 8,
    y2022_23: 8099632,
    y2023_24: 8137343,
    y2024_25: 8304336,
  },
  {
    id: 2,
    srNo: 2,
    portGroup: "",
    route: "Marve to Manori",
    portLimit: "Manori",
    operators: 1,
    passengerBoats: 4,
    roPaxBoats: 0,
    totalBoats: 4,
    y2022_23: 1114737,
    y2023_24: 1064269,
    y2024_25: 1070138,
  },
  {
    id: 3,
    srNo: 3,
    portGroup: "",
    route: "Gorai to Borivali",
    portLimit: "Manori",
    operators: 1,
    passengerBoats: 4,
    roPaxBoats: 0,
    totalBoats: 4,
    y2022_23: 1948748,
    y2023_24: 2095709,
    y2024_25: 2522231,
  },
  {
    id: 4,
    srNo: 4,
    portGroup: "",
    route: "Borivli to Esselworld",
    portLimit: "Manori",
    operators: 1,
    passengerBoats: 7,
    roPaxBoats: 0,
    totalBoats: 7,
    y2022_23: 1049326,
    y2023_24: 1162262,
    y2024_25: 891489,
  },
  {
    id: 5,
    srNo: 5,
    portGroup: "",
    route: "Arnala to Arnala Killa",
    portLimit: "Arnala - Datiware",
    operators: 2,
    passengerBoats: 2,
    roPaxBoats: 0,
    totalBoats: 2,
    y2022_23: 64153,
    y2023_24: 74917,
    y2024_25: 60358,
  },
  {
    id: 6,
    srNo: 6,
    portGroup: "",
    route: "Narangi to Kharwadeshwari",
    portLimit: "Arnala - Datiware",
    operators: 1,
    passengerBoats: 0,
    roPaxBoats: 2,
    totalBoats: 2,
    y2022_23: 0,
    y2023_24: 0,
    y2024_25: 0,
  },
  {
    id: 7,
    srNo: 7,
    portGroup: "Mora",
    route: "New Ferry Wharf to Mora",
    portLimit: "Karanja",
    operators: 1,
    passengerBoats: 19,
    roPaxBoats: 0,
    totalBoats: 19,
    y2022_23: 425978,
    y2023_24: 344824,
    y2024_25: 201922,
  },
  {
    id: 8,
    srNo: 8,
    portGroup: "",
    route: "New Ferry Wharf to Rewas",
    portLimit: "Karanja",
    operators: 0,
    passengerBoats: 0,
    roPaxBoats: 0,
    totalBoats: 0,
    y2022_23: 86453,
    y2023_24: 76953,
    y2024_25: 60785,
  },
  {
    id: 9,
    srNo: 9,
    portGroup: "",
    route: "Gateway of India to Elephanta",
    portLimit: "Mora",
    operators: 2,
    passengerBoats: 92,
    roPaxBoats: 0,
    totalBoats: 92,
    y2022_23: 1074360,
    y2023_24: 849483,
    y2024_25: 767014,
  },
  {
    id: 10,
    srNo: 10,
    portGroup: "",
    route: "Gateway of India to Mandwa",
    portLimit: "Mandwa",
    operators: 4,
    passengerBoats: 5,
    roPaxBoats: 0,
    totalBoats: 5,
    y2022_23: 1353185,
    y2023_24: 1499167,
    y2024_25: 1356754,
  },
  {
    id: 11,
    srNo: 11,
    portGroup: "",
    route: "Karanja to Rewas",
    portLimit: "Karanja",
    operators: 3,
    passengerBoats: 3,
    roPaxBoats: 0,
    totalBoats: 3,
    y2022_23: 308642,
    y2023_24: 338958,
    y2024_25: 339953,
  },
  {
    id: 12,
    srNo: 12,
    portGroup: "",
    route: "Mora to Sasoondock",
    portLimit: "Mora",
    operators: 1,
    passengerBoats: 1,
    roPaxBoats: 0,
    totalBoats: 1,
    y2022_23: 22698,
    y2023_24: 23146,
    y2024_25: 16684,
  },
  {
    id: 13,
    srNo: 13,
    portGroup: "",
    route: "Ferry wharf to Mandwa (M2M)",
    portLimit: "Mandwa",
    operators: 1,
    passengerBoats: 0,
    roPaxBoats: 1,
    totalBoats: 1,
    y2022_23: 747088,
    y2023_24: 676811,
    y2024_25: 766775,
  },
  {
    id: 14,
    srNo: 14,
    portGroup: "",
    route: "Belapur to Elephanta",
    portLimit: "Ulwa Belapur -Panvel",
    operators: 1,
    passengerBoats: 0,
    roPaxBoats: 0,
    totalBoats: 0,
    y2022_23: 5018,
    y2023_24: 1890,
    y2024_25: 0,
  },
  {
    id: 15,
    srNo: 15,
    portGroup: "",
    route: "Belapur to Nerul Vashi/harbour",
    portLimit: "Ulwa Belapur -Panvel",
    operators: 1,
    passengerBoats: 2,
    roPaxBoats: 0,
    totalBoats: 2,
    y2022_23: 12168,
    y2023_24: 16458,
    y2024_25: 13679,
  },
  {
    id: 16,
    srNo: 16,
    portGroup: "",
    route: "Vasai to Bhayender",
    portLimit: "Bassein (Vasai)",
    operators: 1,
    passengerBoats: 0,
    roPaxBoats: 2,
    totalBoats: 2,
    y2022_23: 14278,
    y2023_24: 44849,
    y2024_25: 276032,
  },
  {
    id: 17,
    srNo: 17,
    portGroup: "",
    route: "CIDCO PWT (Nerul) to Elephanta",
    portLimit: "Ulwa Belapur -Panvel",
    operators: 1,
    passengerBoats: 1,
    roPaxBoats: 0,
    totalBoats: 1,
    y2022_23: 0,
    y2023_24: 0,
    y2024_25: 0,
  },
  {
    id: 18,
    srNo: 18,
    portGroup: "",
    route: "New Ferry Wharf to CIDCO PWT (Nerul)",
    portLimit: "Ulwa Belapur -Panvel",
    operators: 0,
    passengerBoats: 0,
    roPaxBoats: 0,
    totalBoats: 0,
    y2022_23: 0,
    y2023_24: 0,
    y2024_25: 0,
  },
  {
    id: 19,
    srNo: 19,
    portGroup: "",
    route: "CIDCO PWT (Nerul) to Mandwa",
    portLimit: "Ulwa Belapur -Panvel",
    operators: 0,
    passengerBoats: 0,
    roPaxBoats: 0,
    totalBoats: 0,
    y2022_23: 0,
    y2023_24: 0,
    y2024_25: 0,
  },
  {
    id: 20,
    srNo: 20,
    portGroup: "",
    route: "Rajpuri Thal to Khanderi",
    portLimit: "Thal - Rewas",
    operators: 2,
    passengerBoats: 3,
    roPaxBoats: 0,
    totalBoats: 3,
    y2022_23: 1430,
    y2023_24: 1595,
    y2024_25: 2085,
  },
  {
    id: 21,
    srNo: 21,
    portGroup: "",
    route: "Rajpuri to janjira killa",
    portLimit: "Murud -Janjira",
    operators: 3,
    passengerBoats: 15,
    roPaxBoats: 0,
    totalBoats: 15,
    y2022_23: 210708,
    y2023_24: 187054,
    y2024_25: 177181,
  },
  {
    id: 22,
    srNo: 22,
    portGroup: "",
    route: "Murud bunder to Janjira killa",
    portLimit: "Murud -Janjira",
    operators: 5,
    passengerBoats: 9,
    roPaxBoats: 0,
    totalBoats: 9,
    y2022_23: 71776,
    y2023_24: 76403,
    y2024_25: 74390,
  },
  {
    id: 23,
    srNo: 23,
    portGroup: "",
    route: "Khora bunder to kasa killa",
    portLimit: "Murud -Janjira",
    operators: 3,
    passengerBoats: 0,
    roPaxBoats: 0,
    totalBoats: 0,
    y2022_23: 914,
    y2023_24: 277,
    y2024_25: 1136,
  },
  {
    id: 24,
    srNo: 24,
    portGroup: "",
    route: "Dighi to Agardanda RO-RO",
    portLimit: "Murud -Janjira",
    operators: 2,
    passengerBoats: 0,
    roPaxBoats: 2,
    totalBoats: 2,
    y2022_23: 254976,
    y2023_24: 266919,
    y2024_25: 276773,
  },
  {
    id: 25,
    srNo: 25,
    portGroup: "",
    route: "Dighi to Janjira Killa",
    portLimit: "Murud -Janjira",
    operators: 1,
    passengerBoats: 2,
    roPaxBoats: 0,
    totalBoats: 2,
    y2022_23: 27733,
    y2023_24: 36556,
    y2024_25: 34233,
  },
  {
    id: 26,
    srNo: 26,
    portGroup: "Ratnagiri",
    route: "Hatis to Tonde",
    portLimit: "Jaigad",
    operators: 1,
    passengerBoats: 1,
    roPaxBoats: 0,
    totalBoats: 1,
    y2022_23: 2100,
    y2023_24: 5200,
    y2024_25: 5300,
  },
  {
    id: 27,
    srNo: 27,
    portGroup: "",
    route: "Jaigad to Tavasal",
    portLimit: "Jaigad",
    operators: 1,
    passengerBoats: 0,
    roPaxBoats: 1,
    totalBoats: 1,
    y2022_23: 159362,
    y2023_24: 167962,
    y2024_25: 178212,
  },
  {
    id: 28,
    srNo: 28,
    portGroup: "",
    route: "Kudli to Jambhari",
    portLimit: "Jaigad",
    operators: 2,
    passengerBoats: 2,
    roPaxBoats: 0,
    totalBoats: 2,
    y2022_23: 21216,
    y2023_24: 12720,
    y2024_25: 12366,
  },
  {
    id: 29,
    srNo: 29,
    portGroup: "",
    route: "Navanagar to Katele",
    portLimit: "Jaigad",
    operators: 2,
    passengerBoats: 2,
    roPaxBoats: 0,
    totalBoats: 2,
    y2022_23: 1557,
    y2023_24: 1212,
    y2024_25: 774,
  },
  {
    id: 30,
    srNo: 30,
    portGroup: "",
    route: "Padave to Satiwade",
    portLimit: "Jaigad",
    operators: 2,
    passengerBoats: 2,
    roPaxBoats: 0,
    totalBoats: 2,
    y2022_23: 7219,
    y2023_24: 4315,
    y2024_25: 3233,
  },
  {
    id: 31,
    srNo: 31,
    portGroup: "",
    route: "Dabhol to Dhopave",
    portLimit: "Dabhol",
    operators: 1,
    passengerBoats: 0,
    roPaxBoats: 1,
    totalBoats: 1,
    y2022_23: 243769,
    y2023_24: 259799,
    y2024_25: 247190,
  },
  {
    id: 32,
    srNo: 32,
    portGroup: "",
    route: "Dabhol to Veldur",
    portLimit: "Dabhol",
    operators: 1,
    passengerBoats: 1,
    roPaxBoats: 0,
    totalBoats: 1,
    y2022_23: 16792,
    y2023_24: 11892,
    y2024_25: 13759,
  },
  {
    id: 33,
    srNo: 33,
    portGroup: "",
    route: "Dabhol to Navanagar",
    portLimit: "Dabhol",
    operators: 2,
    passengerBoats: 2,
    roPaxBoats: 0,
    totalBoats: 2,
    y2022_23: 43015,
    y2023_24: 37370,
    y2024_25: 37188,
  },
  {
    id: 34,
    srNo: 34,
    portGroup: "",
    route: "Veshvi to Bagmandla",
    portLimit: "Bankot",
    operators: 1,
    passengerBoats: 0,
    roPaxBoats: 1,
    totalBoats: 1,
    y2022_23: 157026,
    y2023_24: 164122,
    y2024_25: 157460,
  },
  {
    id: 35,
    srNo: 35,
    portGroup: "Vengurla",
    route: "Malvan Jetty to Sindhudurg Killa",
    portLimit: "Malvan",
    operators: 10,
    passengerBoats: 78,
    roPaxBoats: 0,
    totalBoats: 78,
    y2022_23: 321343,
    y2023_24: 378387,
    y2024_25: 507915,
  },
  {
    id: 36,
    srNo: 36,
    portGroup: "",
    route: "Padmgad Dandi to sindhudurg killa",
    portLimit: "Malvan",
    operators: 3,
    passengerBoats: 3,
    roPaxBoats: 0,
    totalBoats: 3,
    y2022_23: 6966,
    y2023_24: 0,
    y2024_25: 0,
  },
];

const PassengerRoute = () => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddRowModal, setShowAddRowModal] = useState(false);
  const [newRowData, setNewRowData] = useState({});
  const [nextId, setNextId] = useState(initialData.length + 1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return data;
    return data.filter((row) => row.route.toLowerCase().includes(q));
  }, [query, data]);

  const totals = useMemo(() => {
    return data.reduce(
      (acc, row) => {
        acc.operators += Number(row.operators) || 0;
        acc.passengerBoats += Number(row.passengerBoats) || 0;
        acc.roPaxBoats += Number(row.roPaxBoats) || 0;
        acc.totalBoats += Number(row.totalBoats) || 0;
        acc.y2022_23 += Number(row.y2022_23) || 0;
        acc.y2023_24 += Number(row.y2023_24) || 0;
        acc.y2024_25 += Number(row.y2024_25) || 0;
        return acc;
      },
      {
        operators: 0,
        passengerBoats: 0,
        roPaxBoats: 0,
        totalBoats: 0,
        y2022_23: 0,
        y2023_24: 0,
        y2024_25: 0,
      }
    );
  }, [data]);

  const handleEdit = (id) => {
    const row = data.find((r) => r.id === id);
    setEditingId(id);
    setEditData({ ...row });
  };
  const handleSave = () => {
    setData((prev) =>
      prev.map((r) => (r.id === editingId ? { ...r, ...editData } : r))
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
    setData((prev) => prev.filter((r) => r.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">
          Passenger Water Transport - Routes
        </h1>
        {/* <button
          onClick={() => setShowAddRowModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={16} /> Add Route
        </button> */}
      </div>

      <div className="mb-4 flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search routes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 border rounded-md"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-4 py-2 border rounded-md flex items-center gap-2 ${
            showFilters ? "bg-blue-50 border-blue-300" : "bg-white"
          }`}
        >
          <Filter size={16} /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Filter className="h-4 w-4" />
            <span>Additional filters will be available here</span>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left align-middle min-w-[800px] border border-slate-300">
            <thead className="bg-gradient-to-r from-[#dcf2ff] to-sky-100/70 text-slate-700 text-xs uppercase tracking-wide">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap border border-slate-300">
                  Sr. No.
                </th>
                <th className="px-4 py-3 whitespace-nowrap border border-slate-300">
                  Port Group
                </th>
                <th className="px-4 py-3 whitespace-nowrap border border-slate-300">
                  Route
                </th>
                <th className="px-4 py-3 whitespace-nowrap border border-slate-300">
                  Port Limit
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center border border-slate-300">
                  No. of operator
                </th>
                <th
                  colSpan={3}
                  className="px-4 py-3 whitespace-nowrap text-center border border-slate-300"
                >
                  No. of Boats
                </th>
                <th
                  colSpan={3}
                  className="px-4 py-3 whitespace-nowrap text-center border border-slate-300"
                >
                  Passenger Handling Data
                </th>
                <th className="px-4 py-3 whitespace-nowrap text-center border border-slate-300">
                  Actions
                </th>
              </tr>
              <tr>
                <th className="px-4 py-2 border border-slate-300"></th>
                <th className="px-4 py-2 border border-slate-300"></th>
                <th className="px-4 py-2 border border-slate-300"></th>
                <th className="px-4 py-2 border border-slate-300"></th>
                <th className="px-4 py-2 border border-slate-300"></th>
                <th className="px-4 py-2 text-center border border-slate-300">
                  Passenger
                </th>
                <th className="px-4 py-2 text-center border border-slate-300">
                  Ro-Pax
                </th>
                <th className="px-4 py-2 text-center border border-slate-300">
                  Total
                </th>
                <th className="px-4 py-2 text-center border border-slate-300">
                  2022-23
                </th>
                <th className="px-4 py-2 text-center border border-slate-300">
                  2023-24
                </th>
                <th className="px-4 py-2 text-center border border-slate-300">
                  2024-25
                </th>
                <th className="px-4 py-2 border border-slate-300"></th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((row, idx) => {
                console.log("rowData", row)
                return (
                  <tr
                    key={row.id}
                    className={`transition-colors group ${
                      idx % 2 === 0 ? "bg-white" : "bg-sky-50/40"
                    } hover:bg-sky-50/70`}
                  >
                    <td className="px-4 py-3 text-slate-700 font-medium text-center border border-slate-300">
                      {row.srNo}
                    </td>
                    <td className="px-4 py-3 border border-slate-300">
                      {row.portGroup}
                    </td>
                    <td className="px-4 py-3 border border-slate-300">
                      {editingId === row.id ? (
                        <input
                          type="text"
                          value={editData.route}
                          onChange={(e) =>
                            setEditData((prev) => ({
                              ...prev,
                              route: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 text-sm border rounded bg-white text-black focus:ring-2 focus:ring-sky-100 focus:border-sky-300"
                        />
                      ) : (
                        <span className="text-slate-700 font-medium">
                          {row.route}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 border border-slate-300">
                      {row.portLimit}
                    </td>
                    <td className="px-4 py-3 text-center border border-slate-300">
                      {row.operators}
                    </td>
                    <td className="px-4 py-3 text-center border border-slate-300">
                      {row.passengerBoats}
                    </td>
                    <td className="px-4 py-3 text-center border border-slate-300">
                      {row.roPaxBoats}
                    </td>
                    <td className="px-4 py-3 text-center border border-slate-300">
                      {row.totalBoats}
                    </td>
                    <td className="px-4 py-3 text-right border border-slate-300">
                      {row.y2022_23.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right border border-slate-300">
                      {row.y2023_24.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right border border-slate-300">
                      {row.y2024_25.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-center border border-slate-300">
                      {editingId === row.id ? (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={handleSave}
                            className="p-1 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(row.id)}
                            className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}

              <tr className="font-bold bg-slate-100">
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                  Total
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300"></td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300">
                  {data.length} routes
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold border border-slate-300"></td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                  {totals.operators}
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                  {totals.passengerBoats}
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                  {totals.roPaxBoats}
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold text-center border border-slate-300">
                  {totals.totalBoats}
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold text-right border border-slate-300">
                  {totals.y2022_23.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold text-right border border-slate-300">
                  {totals.y2023_24.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-slate-900 font-bold text-right border border-slate-300">
                  {totals.y2024_25.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center border border-slate-300"></td>
              </tr>

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center bg-white">
                    <div className="mx-auto max-w-md">
                      <p className="text-slate-600">
                        No routes match your search. Try a different query.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50 rounded-b-lg">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>
              Showing {filtered.length} of {data.length} routes
            </span>
            {query && <span className="text-sky-600"> (Filtered)</span>}
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

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl scale-100">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash2 className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Delete Route
                </h3>
                <p className="text-sm text-slate-600">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <p className="text-slate-700 mb-6 pl-12">
              Are you sure you want to delete this route?
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

export default PassengerRoute;
