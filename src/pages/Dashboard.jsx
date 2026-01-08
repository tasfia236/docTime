import React from 'react';
import { Calendar, Clock, Users, Activity } from 'lucide-react';
import { doctors, appointments, notifications } from '../mockData';
import DoctorCard from '../components/DoctorCard';

const Dashboard = () => {
    const stats = [
        { title: 'Upcoming Appointments', value: '3', icon: <Calendar />, color: 'bg-blue-100 text-blue-600' },
        { title: 'Doctors Available', value: doctors.length.toString(), icon: <Users />, color: 'bg-green-100 text-green-600' },
        { title: 'Pending Prescriptions', value: '2', icon: <Activity />, color: 'bg-yellow-100 text-yellow-600' },
        { title: 'Hours Saved', value: '24', icon: <Clock />, color: 'bg-purple-100 text-purple-600' },
    ];

    const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{stat.title}</p>
                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Appointments */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Upcoming Appointments</h2>
                            <button className="text-primary hover:text-secondary font-medium">
                                View All
                            </button>
                        </div>
                        <div className="space-y-4">
                            {upcomingAppointments.map((appointment) => (
                                <div key={appointment.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h3 className="font-semibold">{appointment.doctorName}</h3>
                                            <p className="text-gray-600">{appointment.specialty}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">{appointment.date}</p>
                                            <p className="text-gray-600">{appointment.time}</p>
                                        </div>
                                    </div>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className={`px-3 py-1 rounded-full text-sm ${appointment.status === 'completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {appointment.status}
                                        </span>
                                        <button className="text-primary hover:text-secondary font-medium">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Doctors */}
                    <div className="bg-white rounded-xl shadow p-6 mt-6">
                        <h2 className="text-xl font-bold mb-6">Recommended Doctors</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {doctors.slice(0, 2).map((doctor) => (
                                <DoctorCard key={doctor.id} doctor={doctor} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div>
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-bold mb-6">Notifications</h2>
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 rounded-lg border-l-4 ${notification.read
                                            ? 'border-l-gray-300 bg-gray-50'
                                            : 'border-l-primary bg-blue-50'
                                        }`}
                                >
                                    <p className="text-gray-800">{notification.message}</p>
                                    <p className="text-gray-500 text-sm mt-2">{notification.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-xl shadow p-6 mt-6">
                        <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
                        <div className="space-y-3">
                            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-secondary transition-colors">
                                Book New Appointment
                            </button>
                            <button className="w-full border border-primary text-primary py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
                                View Medical History
                            </button>
                            <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                                Download Prescription
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;