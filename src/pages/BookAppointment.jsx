import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { getDoctors } from "../api/doctorApi";
import { bookAppointment } from "../api/appointmentApi";

const BookAppointment = () => {
    const { doctorId } = useParams();
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [availableSlots, setAvailableSlots] = useState([]); // day + slots
    const [selectedTime, setSelectedTime] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getDoctors();
                const data = response.data.doctors || [];
                setDoctors(data);
                setLoading(false);

                // Auto-select doctor if doctorId exists
                if (doctorId) {
                    const exists = data.find(d => d._id === doctorId);
                    if (exists) setSelectedDoctor(doctorId);
                }
            } catch (error) {
                console.error("Failed to fetch doctors:", error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [doctorId]);

    // Update available slots when doctor changes
    useEffect(() => {
        setTimeout(() => {
            setSelectedTime('');
            if (!selectedDoctor) {
                setAvailableSlots([]);
                return;
            }

            const doctor = doctors.find(d => d._id === selectedDoctor);
            if (!doctor) return;

            const slots = doctor.availableSlots.flatMap(slotObj =>
                slotObj.slots.map(time => ({ day: slotObj.day, time }))
            );
            setAvailableSlots(slots);
        }, 0);
    }, [selectedDoctor, doctors]);

    

    const doctor = doctors.find(d => d._id === selectedDoctor);

    const handleConfirm = async () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            alert("Please select doctor, date, and time");
            return;
        }

        const [day, time] = selectedTime.split("|");

        try {
            await bookAppointment({
                doctorId: selectedDoctor,
                date: selectedDate,
                day,
                time
            });

            alert("Appointment booked successfully");

            setSelectedDate("");
            setSelectedTime("");
        } catch (error) {
            alert(error.response?.data?.message || "Booking failed");
        }
    };



    if (loading) return <p className="text-center mt-20 text-gray-500">Loading booking form...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-blue-700">
                        Book Your Doctor Appointment
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg">
                        Select a doctor, pick a date and time, and confirm your appointment quickly.
                    </p>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-10">

                    {/* Form Section */}
                    <div className="md:w-1/2 bg-white rounded-3xl shadow-2xl p-10 md:p-12 space-y-8">

                        {/* Select Doctor */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">Select Doctor</label>
                            <select
                                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-300 transition"
                                value={selectedDoctor}
                                onChange={e => setSelectedDoctor(e.target.value)}
                            >
                                <option value="">Choose a doctor...</option>
                                {doctors.map(doc => (
                                    <option key={doc._id} value={doc._id}>
                                        {doc.name} - {doc.specialty}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Select Time (Day + Slot) */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">Select Time</label>
                            <select
                                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-300 transition"
                                value={selectedTime}
                                onChange={e => setSelectedTime(e.target.value)}
                            >
                                <option value="">
                                    {availableSlots.length ? "Choose day & time..." : "No available slots"}
                                </option>
                                {availableSlots.map((slot, idx) => (
                                    <option key={idx} value={`${slot.day}|${slot.time}`}>
                                        {slot.day} - {slot.time}
                                    </option>
                                ))}
                            </select>
                        </div>


                        {/* Select Date */}
                        <div>
                            <label className="block text-base font-medium text-gray-700 mb-2">Select Date</label>
                            <input
                                type="date"
                                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-300 transition"
                                value={selectedDate}
                                onChange={e => setSelectedDate(e.target.value)}
                            />
                        </div>

                        {/* Confirm Button */}
                        <button
                            onClick={handleConfirm}
                            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-500 transition shadow-lg"
                        >
                            Confirm Appointment
                        </button>

                        {/* Doctor Info Card */}
                        {doctor && (
                            <div className="mt-8 bg-blue-50 p-6 rounded-xl shadow-inner">
                                <div className="flex items-center gap-4 mb-3">
                                    <img
                                        src={doctor.image || "/images/default-doctor.jpg"}
                                        alt={doctor.name}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                                    />
                                    <div>
                                        <h3 className="font-bold text-blue-700">{doctor.name}</h3>
                                        <p className="text-gray-600">{doctor.specialty}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={i < Math.floor(doctor.rating) ? "text-yellow-400" : "text-gray-300"}
                                        />
                                    ))}
                                    <span className="text-gray-600 text-sm">({doctor.reviews || 0} reviews)</span>
                                </div>
                                <p className="text-gray-700 mt-2">Experience: {doctor.experience}</p>
                                <p className="text-gray-700 mt-1">Qualification: {doctor.qualification}</p>
                                <p className="text-gray-700 mt-1">Fee: {doctor.fee} BDT</p>
                            </div>
                        )}

                    </div>

                    {/* Illustration Section */}
                    <div className="md:w-1/2 relative rounded-3xl overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 opacity-70"></div>
                        <div className="relative flex items-center justify-center h-full p-8">
                            <img
                                src="/images/booking.jpg"
                                alt="Doctor"
                                className="rounded-2xl shadow-2xl border-4 border-white object-cover w-full max-w-md"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BookAppointment;
