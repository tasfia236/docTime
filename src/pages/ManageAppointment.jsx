import { Calendar, Clock } from "lucide-react";
import { getAppointments, updateAppointment } from "../api/appointmentApi";
import { useEffect, useState } from "react";

export default function ManageAppointment() {
    const [appointments, setAppointments] = useState([])
    const [filter, setFilter] = useState("")
    const [count, setCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAppointments()
            // wrap state updates in setTimeout 0
            setTimeout(() => {
                setCount(res.data.count)
                setAppointments(res.data.appointments)
            }, 0)
        }

        fetchData()
    }, [])

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateAppointment(id, status);
        } catch (err) {
            console.error(err.response?.data?.message || err.message);
        }
    };


    const filtered = filter
        ? appointments.filter(a => a.status === filter)
        : appointments

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
                        Manage Appointments
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg">
                        Review, approve, and manage patient appointments efficiently
                    </p>
                </div>

                {/* Appointment List */}
                <div className="bg-white  rounded-3xl shadow-xl p-8 mt-6">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Total Appointments: {count}
                        </h2>
                        <div>
                            <select onChange={e => setFilter(e.target.value)}
                                className="w-full px-4 py-2 border rounded-xl">
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {filtered.map((patient) => (
                            <div
                                key={patient._id}
                                className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition bg-gradient-to-r from-white to-blue-50"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                                    {/* Patient Info */}
                                    <div className="flex items-center gap-5">
                                        <img
                                            src={`https://images.unsplash.com/photo-${1500000000000 + patient.id * 100000000}?w=80&h=80&fit=crop`}
                                            alt={patient.patientName}
                                            className="w-16 h-16 rounded-full border-2 border-blue-500"
                                        />
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800">
                                                {patient.patientName}
                                            </h3>
                                            <p className="text-sm text-gray-600">{patient.phone}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {patient.doctorName} - {patient.specialty}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Appointment Info */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} />
                                            <span>12 Jan 2026</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} />
                                            <span>10:30 AM</span>
                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`px-4 py-1 rounded-full text-sm font-semibold ${patient.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : patient.status === "confirmed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : patient.status === "completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {patient.status}
                                        </span>

                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-3">
                                        {patient.status === "pending" && (
                                            <>
                                                <button
                                                    onClick={() =>
                                                        handleStatusUpdate(patient._id, "confirmed")
                                                    }
                                                    className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
                                                >
                                                    Approve
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleStatusUpdate(patient._id, "cancelled")
                                                    }
                                                    className="bg-red-100 text-red-600 px-5 py-2 rounded-xl hover:bg-red-200"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}

                                        {patient.status === "confirmed" && (
                                            <button
                                                onClick={() =>
                                                    handleStatusUpdate(patient._id, "completed")
                                                }
                                                className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700"
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </div>


                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

