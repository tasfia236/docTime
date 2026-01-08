import { useEffect, useState } from "react"
import { deleteUser, getPatients } from "../api/userApi"

export default function Patients() {
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")


    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const res = await getPatients();
                setUsers(res.data.users); // safe to call here
            } catch (err) {
                console.error("Failed to fetch patients:", err);
            }
        };

        fetchPatients(); // call the async function
    }, []);

    const filtered = users.filter(u =>
        u.phone?.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this patient?")) return
        await deleteUser(id)
    }


    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold mb-1 text-blue-800 text-center">Manage Patients</h2>
                    <p className="text-gray-600 mt-3 text-lg">View, search, and manage all doctors in your system</p>
                </div>

                <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search Patient's Contact Number ..."
                        className="border border-cyan-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 px-4 py-2 rounded-lg shadow-sm w-full md:w-1/3 transition"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                        <thead className="bg-cyan-500 text-white uppercase text-sm tracking-wider">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Number</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filtered.map((patient) => (
                                <tr
                                    key={patient._id}
                                    className="border-b hover:bg-cyan-50 transition cursor-pointer"
                                >
                                    <td className="py-3 px-6">{patient.name}</td>
                                    <td className="py-3 px-6">{patient.phone}</td>
                                    <td className="py-3 px-6">{patient.email}</td>
                                    <td className="py-3 px-6 flex justify-center gap-2">
                                        <button
                                            onClick={() => handleDelete(patient._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full text-sm transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}
