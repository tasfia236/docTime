import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, User, Filter } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Booking = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [specialtyFilter, setSpecialtyFilter] = useState('all');
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [loading, setLoading] = useState(true);

    const specialties = ['All', 'Cardiology', 'Dermatology', 'Neurology', 'Pediatrics', 'Orthopedics', 'General Physician'];

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        filterDoctors();
    }, [searchTerm, specialtyFilter, doctors]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/doctors');
            setDoctors(response.data);
            setFilteredDoctors(response.data);
        } catch (error) {
            toast.error('Failed to fetch doctors');
        } finally {
            setLoading(false);
        }
    };

    const filterDoctors = () => {
        let filtered = [...doctors];

        if (searchTerm) {
            filtered = filtered.filter(doctor =>
                doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (specialtyFilter !== 'all') {
            filtered = filtered.filter(doctor => doctor.specialty === specialtyFilter);
        }

        setFilteredDoctors(filtered);
    };

    const handleBookAppointment = async () => {
        if (!selectedDoctor || !selectedDate || !selectedTime) {
            toast.error('Please select doctor, date and time');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const appointmentData = {
                doctorId: selectedDoctor._id,
                date: selectedDate,
                time: selectedTime,
                reason: 'General Checkup'
            };

            await axios.post('http://localhost:5000/api/appointments/book', appointmentData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success('Appointment booked successfully!');
            setSelectedDoctor(null);
            setSelectedDate('');
            setSelectedTime('');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Booking failed');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Appointment</h1>
            <p className="text-gray-600 mb-8">Find and book appointments with our specialist doctors</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Search & Doctor List */}
                <div className="lg:col-span-2">
                    {/* Search and Filter */}
                    <div className="card mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search doctors by name or specialty..."
                                    className="input-field pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <select
                                    className="input-field"
                                    value={specialtyFilter}
                                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                                >
                                    {specialties.map(spec => (
                                        <option key={spec} value={spec.toLowerCase()}>
                                            {spec}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Doctors List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading ? (
                            <div className="col-span-2 text-center py-12">Loading doctors...</div>
                        ) : filteredDoctors.length > 0 ? (
                            filteredDoctors.map(doctor => (
                                <div
                                    key={doctor._id}
                                    className={`card cursor-pointer transition-all duration-200 ${selectedDoctor?._id === doctor._id ? 'ring-2 ring-primary-500' : 'hover:shadow-lg'
                                        }`}
                                    onClick={() => setSelectedDoctor(doctor)}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
                                            {doctor.name.charAt(0)}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">Dr. {doctor.name}</h3>
                                            <p className="text-primary-600 font-medium">{doctor.specialty}</p>
                                            <div className="flex items-center text-gray-600 text-sm mt-2">
                                                <Clock className="h-4 w-4 mr-1" />
                                                <span>Experience: {doctor.experience} years</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm mt-1">
                                                <User className="h-4 w-4 mr-1" />
                                                <span>Available Today</span>
                                            </div>
                                            <p className="text-gray-700 mt-3">{doctor.bio || 'Specialist in their field with excellent patient reviews.'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-12 text-gray-500">
                                No doctors found matching your criteria
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Booking Form */}
                <div>
                    <div className="card sticky top-24">
                        <h2 className="text-xl font-semibold mb-6">Book Appointment</h2>

                        {selectedDoctor ? (
                            <>
                                <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                                    <h3 className="font-semibold">Selected Doctor</h3>
                                    <p className="text-primary-600">Dr. {selectedDoctor.name}</p>
                                    <p className="text-gray-600 text-sm">{selectedDoctor.specialty}</p>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Calendar className="inline h-4 w-4 mr-1" />
                                            Select Date
                                        </label>
                                        <input
                                            type="date"
                                            min={new Date().toISOString().split('T')[0]}
                                            value={selectedDate}
                                            onChange={(e) => setSelectedDate(e.target.value)}
                                            className="input-field"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            <Clock className="inline h-4 w-4 mr-1" />
                                            Select Time Slot
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'].map(time => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`py-2 rounded-lg border ${selectedTime === time
                                                            ? 'bg-primary-500 text-white border-primary-500'
                                                            : 'border-gray-300 hover:border-primary-500'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Reason for Visit
                                        </label>
                                        <textarea
                                            className="input-field"
                                            rows="3"
                                            placeholder="Briefly describe your symptoms or reason for appointment..."
                                        />
                                    </div>

                                    <button
                                        onClick={handleBookAppointment}
                                        className="w-full btn-primary py-3"
                                    >
                                        Confirm Appointment
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                <p>Select a doctor to book appointment</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;