import { useEffect, useState } from "react";
import { deleteDoctor, getDoctors, updateDoctor } from "../api/doctorApi";

export default function ManageDoctors() {
    const [doctors, setDoctors] = useState([]);
    const [search, setSearch] = useState("");
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        specialty: "",
        experience: "",
        qualification: "",
        fee: "",
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const res = await getDoctors();
        setDoctors(res.data.doctors);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this doctor?")) return;
        await deleteDoctor(id);
        fetchDoctors();
    };

    const handleEdit = (doctor) => {
        setEditingDoctor(doctor);
        setFormData({
            name: doctor.name,
            specialty: doctor.specialty,
            experience: doctor.experience,
            qualification: doctor.qualification,
            fee: doctor.fee,
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await updateDoctor(editingDoctor._id, formData)
            setEditingDoctor(null);
            fetchDoctors();
        } catch (error) {
            console.error(error);
            alert("Update failed");
        } finally {
            setLoading(false);
        }
    };

    const filtered = doctors.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
        || doc.specialty.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen">

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold mb-1 text-blue-800 text-center">Manage Doctors</h2>
                    <p className="text-gray-600 mt-3 text-lg">View, search, and manage all doctors in your system</p>
                </div>

                <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <input
                        type="text"
                        placeholder="Search Doctor's Name and Specialty ..."
                        className="border border-cyan-300 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 px-4 py-2 rounded-lg shadow-sm w-full md:w-1/3 transition"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-xl shadow-lg overflow-hidden">
                        <thead className="bg-cyan-500 text-white uppercase text-sm tracking-wider">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Specialty</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Experience</th>
                                <th className="py-3 px-4 text-left">Fee</th>
                                <th className="py-3 px-4 text-left">Rating</th>
                                <th className="py-3 px-4 text-left">Status</th>
                                <th className="py-3 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filtered.map((doc) => (
                                <tr
                                    key={doc._id}
                                    className="border-b hover:bg-cyan-50 transition cursor-pointer"
                                >
                                    <td className="py-3 px-6">{doc.name}</td>
                                    <td className="py-3 px-6">{doc.specialty}</td>
                                    <td className="py-3 px-6">{doc.userId?.email}</td>
                                    <td className="py-3 px-6">{doc.experience}</td>
                                    <td className="py-3 px-4">৳ {doc.fee}</td>
                                    <td className="py-3 px-4">
                                        ⭐ {doc.rating || "N/A"}
                                    </td>
                                    <td className="py-3 px-4">
                                        {doc.available ? (
                                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                                Available
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                                                Unavailable
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 flex justify-center gap-2">
                                        <button
                                            onClick={() => handleEdit(doc)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-sm transition"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(doc._id)}
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

            {/* Edit Modal */}
            {editingDoctor && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">

                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 flex justify-between items-center">
                            <h3 className="text-white text-xl font-semibold">
                                Edit Doctor Profile
                            </h3>
                            <button
                                onClick={() => setEditingDoctor(null)}
                                className="text-white text-2xl leading-none hover:opacity-80"
                            >
                                ×
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleUpdate} className="p-6 space-y-4">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Doctor Name"
                                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400"
                                    required
                                />

                                <input
                                    type="text"
                                    name="specialty"
                                    value={formData.specialty}
                                    onChange={handleChange}
                                    placeholder="Specialty"
                                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400"
                                    required
                                />

                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    onChange={handleChange}
                                    placeholder="Experience (e.g. 3 years)"
                                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400"
                                    required
                                />

                                <input
                                    type="text"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    placeholder="Qualification"
                                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400"
                                    required
                                />

                                <input
                                    type="number"
                                    name="fee"
                                    value={formData.fee}
                                    onChange={handleChange}
                                    placeholder="Consultation Fee (৳)"
                                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400"
                                    required
                                />

                                <input
                                    type="number"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    placeholder="Rating (0–5)"
                                    step="0.1"
                                    className="border px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400"
                                />
                            </div>

                            {/* Availability */}
                            <div>
                                <label className="text-sm font-medium text-gray-600 mb-1 block">
                                    Availability Status
                                </label>
                                <select
                                    name="available"
                                    value={formData.available}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            available: e.target.value === "true",
                                        })
                                    }
                                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-cyan-400"
                                >
                                    <option value="true">Available</option>
                                    <option value="false">Unavailable</option>
                                </select>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => setEditingDoctor(null)}
                                    className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium hover:opacity-90"
                                >
                                    {loading ? "Updating..." : "Save Changes"}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
