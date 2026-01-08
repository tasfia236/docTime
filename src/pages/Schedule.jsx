import { useEffect, useState } from "react";
import { getMySlots, toggleAvailability, updateSlots } from "../api/doctorApi";

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Schedule = () => {
    const [available, setAvailable] = useState(false);
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSlots();
    }, []);

    const fetchSlots = async () => {
        try {
            const res = await getMySlots();
            setAvailable(res.data.available);
            setSlots(res.data.slots || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleToggleAvailability = async () => {
        try {
            setLoading(true);
            const res = await toggleAvailability(!available);
            setAvailable(res.data.available);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSlotChange = (day, value) => {
        const newSlots = slots.map(d => d.day === day ? { ...d, slots: value.split(',').map(s => s.trim()) } : d);
        if (!newSlots.find(d => d.day === day)) {
            newSlots.push({ day, slots: value.split(',').map(s => s.trim()) });
        }
        setSlots(newSlots);
    };

    const handleSaveSlots = async () => {
        try {
            setLoading(true);
            for (let daySlot of slots) {
                await updateSlots(daySlot.day, daySlot.slots);
            }
            alert("Slots updated successfully!");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 min-h-screen mt-2">

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold mb-1 text-blue-800 text-center">Manage Slots</h2>
                    <p className="text-gray-600 mt-3 text-lg">View and manage availability and slots in your system</p>
                </div>

                <div className="bg-white  rounded-3xl shadow-xl p-8 mt-6">
                    <div className="flex items-center justify-end gap-4 mb-6">
                        <label className="font-medium">Available for appointments:</label>
                        <input
                            type="checkbox"
                            checked={available}
                            onChange={handleToggleAvailability}
                            disabled={loading}
                            className="w-6 h-6 cursor-pointer"
                        />
                    </div>

                    {available ? (
                        <div className="space-y-6">

                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-cyan-200 rounded-xl p-4">
                                <h4 className="text-lg font-semibold text-blue-700 mb-1">
                                    Weekly Availability Slots
                                </h4>
                                <p className="text-sm text-gray-600">
                                    Enter available time slots for each day (comma separated)
                                </p>
                            </div>

                            {daysOfWeek.map(day => {
                                const daySlot =
                                    slots.find(s => s.day === day) || { day, slots: [] };

                                return (
                                    <div
                                        key={day}
                                        className="bg-white border border-cyan-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
                                    >
                                        <label className="block text-sm font-semibold text-cyan-700 mb-2">
                                            {day}
                                        </label>

                                        <input
                                            type="text"
                                            value={daySlot.slots.join(", ")}
                                            onChange={(e) => handleSlotChange(day, e.target.value)}
                                            placeholder="e.g. 09:00 AM, 10:00 AM"
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                                        />
                                    </div>
                                );
                            })}

                            <button
                                onClick={handleSaveSlots}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 mt-4 rounded-xl text-lg font-semibold hover:opacity-90 disabled:opacity-60 transition"
                            >
                                {loading ? "Saving Slots..." : "Save Availability Slots"}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
                            <p className="text-yellow-700 font-medium">
                                Doctor is currently unavailable
                            </p>
                            <p className="text-sm text-yellow-600 mt-1">
                                Enable availability to manage weekly slots
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default Schedule;
