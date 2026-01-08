import { Calendar, ChevronDown, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";
import ScheduleModal from "../components/ScheduleModal";

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [scheduleModal, setScheduleModal] = useState(false)

    useEffect(() => {
        fetchDoctors("all");
    }, []);

    useEffect(() => {
        if (selectedSpecialty) {
            fetchDoctors(selectedSpecialty);
        }
    }, [selectedSpecialty]);

    const fetchDoctors = async (specialty) => {
        try {
            setLoading(true);
            const res = await getDoctors({ specialty });
            const doctorsData = res.data.doctors || [];

            setDoctors(doctorsData);

            if (specialty === "all") {
                const uniqueSpecialties = Array.from(
                    new Set(doctorsData.map((d) => d.specialty))
                );
                setSpecialties(uniqueSpecialties);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const showModal = (schedule) => {
        setSelectedDoctor(schedule);
        setScheduleModal(true)
    }

    const cancelModal = () => {
        setScheduleModal(false)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-800">
                        Doctors' Schedule
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg">
                        Find the right doctor, choose a convenient date and time, and book instantly.
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-3xl shadow-lg mb-12">
                    {/* Specialty */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Filter By Specialty</label>
                        <select
                            className="w-full px-4 py-2 border rounded-xl"
                            value={selectedSpecialty}
                            onChange={(e) => setSelectedSpecialty(e.target.value)}
                        >
                            <option value="">All Specialties</option>

                            {specialties.map((specialty) => (
                                <option key={specialty} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                {loading && <p className="text-center">Loading...</p>}

                {/* Doctors Schedule */}
                <div className=" grid grid-cols-2 gap-10">
                    {doctors.map((schedule, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                        >
                            {/* Doctor Header */}
                            <div className="bg-gradient-to-r from-cyan-100 to-blue-50 p-6 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={`https://images.unsplash.com/photo-${index % 2 === 0 ? "1622253692010" : "1622253692016"}-333f2da6031d?w=80&h=80&fit=crop`}
                                        alt={schedule.doctorName}
                                        className="w-20 h-20 rounded-full border-2 border-white shadow-md"
                                    />
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">{schedule.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-blue-600 font-medium">{schedule.specialty}</span>
                                            <span className="bg-green-100 animate-pulse text-green-800 text-xs px-2 py-1 rounded-full">
                                                {schedule.experience} • Fee ৳{schedule.fee}
                                            </span>
                                        </div>

                                        {/* Ratings */}
                                        <div className="flex mt-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < Math.round(schedule.rating)
                                                        ? "text-yellow-400"
                                                        : "text-gray-300"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => showModal(schedule)}
                                    className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-medium">
                                    <Calendar size={16} />
                                    {/* Create model and show details with slots in saparate component- when i click view schedule  */}
                                    View Schedule
                                    <ChevronDown size={16} />
                                </button>
                            </div>

                            {/* Slots */}
                            {/* <div className="p-6 flex flex-wrap gap-3">
                                {schedule.availableSlots?.map(day =>
                                    day.slots.map((slot, i) => (
                                        <button
                                            key={i}
                                            className="px-4 py-2 border rounded-full text-blue-600 hover:bg-blue-100"
                                        >
                                            {day.day} • {slot}
                                        </button>
                                    ))
                                )}
                            </div> */}
                        </div>
                    ))}
                </div>
                <ScheduleModal
                    open={scheduleModal}
                    doctor={selectedDoctor}
                    onClose={cancelModal}
                />
            </div>
        </div>
    );
};

export default Doctors;
