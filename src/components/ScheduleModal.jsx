import { X, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScheduleModal = ({ open, onClose, doctor }) => {
    const navigate = useNavigate();
    if (!open || !doctor) return null;

    const handleBook = (doctorId) => {
        navigate(`/book-appointment/${doctorId}`);
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-3">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-y-auto
                    max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">
                            {doctor.name}
                        </h2>
                        <p className="text-blue-100 text-sm">
                            {doctor.specialty} • {doctor.experience}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="text-white hover:opacity-80"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">

                    {/* Doctor Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-cyan-50 rounded-xl p-4">
                            <p className="text-gray-500">Qualification</p>
                            <p className="font-semibold">{doctor.qualification}</p>
                        </div>
                        <div className="bg-cyan-50 rounded-xl p-4">
                            <p className="text-gray-500">Consultation Fee</p>
                            <p className="font-semibold">৳ {doctor.fee}</p>
                        </div>
                    </div>

                    {/* Schedule */}
                    <div>
                        <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2 mb-4">
                            <Calendar size={18} />
                            Weekly Schedule
                        </h3>

                        {doctor.availableSlots?.length > 0 ? (
                            <div className="space-y-4">
                                {doctor.availableSlots.map((dayObj) => (
                                    <div
                                        key={dayObj._id}
                                        className="border border-cyan-200 rounded-xl p-4"
                                    >
                                        <p className="font-semibold text-cyan-700 mb-3">
                                            {dayObj.day}
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {dayObj.slots.map((slot, i) => (
                                                <button
                                                    key={i}
                                                    className="flex items-center gap-1 px-4 py-2 rounded-full border border-blue-300 text-blue-700 hover:bg-blue-100 transition text-sm"
                                                >
                                                    <Clock size={14} />
                                                    {slot}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">
                                No available slots for this doctor.
                            </p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                {doctor &&
                    <div className="p-5 border-t border-blue-600 flex justify-end gap-3
                sticky bottom-0 bg-white">
                        <button
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl border text-gray-600 hover:bg-gray-100"
                        >
                            Close
                        </button>

                        <button
                            onClick={() => handleBook(doctor._id)}
                            className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:opacity-90"
                        >
                            Book Appointment
                        </button>
                    </div>}
            </div>
        </div>
    );
};

export default ScheduleModal;
