import React, { useState } from 'react';
import { Calendar, Clock, User, Download, Filter } from 'lucide-react';
import { appointments } from '../mockData';

const Appointments = () => {
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const filteredAppointments = appointments.filter(apt => {
        if (filter === 'all') return true;
        return apt.status === filter;
    });

    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
        if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
        return 0;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
                <p className="text-gray-600 mt-2">Manage and track all your medical appointments</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-wrap gap-3">
                        {['all', 'upcoming', 'completed', 'cancelled'].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-full capitalize ${filter === status
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center space-x-4">
                        <Filter className="text-gray-400" />
                        <select
                            className="border rounded-lg px-4 py-2"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="date">Sort by Date</option>
                            <option value="doctor">Sort by Doctor</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Appointments List */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                {sortedAppointments.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No appointments found</p>
                    </div>
                ) : (
                    <div className="divide-y">
                        {sortedAppointments.map((appointment) => (
                            <div key={appointment.id} className="p-6 hover:bg-gray-50">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="flex items-start space-x-4">
                                        <div className={`p-3 rounded-full ${appointment.status === 'completed'
                                                ? 'bg-green-100 text-green-600'
                                                : 'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            <Calendar />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{appointment.doctorName}</h3>
                                            <p className="text-primary">{appointment.specialty}</p>
                                            <div className="flex items-center mt-2 text-gray-600">
                                                <Clock className="mr-2" />
                                                <span>{appointment.date} at {appointment.time}</span>
                                            </div>
                                            {appointment.symptoms && (
                                                <p className="mt-2 text-gray-700">
                                                    <span className="font-medium">Symptoms:</span> {appointment.symptoms}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end space-y-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${appointment.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : appointment.status === 'upcoming'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                        </span>

                                        <div className="flex space-x-3">
                                            <button className="flex items-center space-x-2 text-primary hover:text-secondary">
                                                <User />
                                                <span>View Details</span>
                                            </button>
                                            {appointment.prescription && (
                                                <button className="flex items-center space-x-2 text-green-600 hover:text-green-800">
                                                    <Download />
                                                    <span>Prescription</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-800">Appointment Tips</h3>
                    <ul className="mt-3 space-y-2 text-blue-700">
                        <li>• Arrive 15 minutes before your appointment</li>
                        <li>• Bring your ID and insurance card</li>
                        <li>• Prepare a list of symptoms and questions</li>
                    </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h3 className="font-bold text-green-800">Need to Cancel?</h3>
                    <p className="mt-2 text-green-700">
                        Please cancel at least 24 hours in advance to avoid cancellation fees.
                    </p>
                    <button className="mt-4 text-green-600 hover:text-green-800 font-medium">
                        Cancel Appointment
                    </button>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                    <h3 className="font-bold text-purple-800">Emergency?</h3>
                    <p className="mt-2 text-purple-700">
                        For medical emergencies, call 911 immediately or visit the nearest emergency room.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Appointments;