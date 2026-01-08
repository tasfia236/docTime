import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit } from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, New York, NY',
        dateOfBirth: '1990-05-15',
        bloodGroup: 'O+',
        allergies: 'Penicillin, Peanuts',
        emergencyContact: '+1 (555) 987-6543'
    });

    const medicalHistory = [
        { date: '2024-01-10', doctor: 'Dr. Sarah Johnson', diagnosis: 'Hypertension', prescription: 'Lisinopril' },
        { date: '2023-11-15', doctor: 'Dr. Michael Chen', diagnosis: 'Migraine', prescription: 'Sumatriptan' },
        { date: '2023-09-20', doctor: 'Dr. Emily Williams', diagnosis: 'Annual Checkup', prescription: 'None' }
    ];

    const handleSave = () => {
        setIsEditing(false);
        // Save data to backend here
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-600 mt-2">Manage your personal and medical information</p>
                </div>
                <button
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors font-medium flex items-center"
                >
                    <Edit className="mr-2" />
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <div className="flex items-center space-x-4 mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200"
                                alt="Profile"
                                className="w-24 h-24 rounded-full border-4 border-white shadow"
                            />
                            <div>
                                <h2 className="text-2xl font-bold">{userData.name}</h2>
                                <p className="text-gray-600">Patient ID: PAT001234</p>
                                <p className="text-green-600 font-medium">Active Member</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: <Mail />, label: 'Email', value: userData.email, field: 'email' },
                                { icon: <Phone />, label: 'Phone', value: userData.phone, field: 'phone' },
                                { icon: <MapPin />, label: 'Address', value: userData.address, field: 'address' },
                                { icon: <Calendar />, label: 'Date of Birth', value: userData.dateOfBirth, field: 'dateOfBirth' },
                                { icon: <User />, label: 'Blood Group', value: userData.bloodGroup, field: 'bloodGroup' },
                                { icon: <User />, label: 'Emergency Contact', value: userData.emergencyContact, field: 'emergencyContact' },
                            ].map((item) => (
                                <div key={item.field}>
                                    <label className="block text-gray-500 text-sm mb-1">{item.label}</label>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={item.value}
                                            onChange={(e) => setUserData({ ...userData, [item.field]: e.target.value })}
                                            className="w-full p-2 border rounded-lg"
                                        />
                                    ) : (
                                        <p className="font-medium">{item.value}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <label className="block text-gray-500 text-sm mb-1">Allergies</label>
                            {isEditing ? (
                                <textarea
                                    value={userData.allergies}
                                    onChange={(e) => setUserData({ ...userData, allergies: e.target.value })}
                                    className="w-full p-2 border rounded-lg"
                                    rows="2"
                                />
                            ) : (
                                <p className="font-medium">{userData.allergies}</p>
                            )}
                        </div>
                    </div>

                    {/* Medical History */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="text-xl font-bold mb-6">Medical History</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="text-left py-3">Date</th>
                                        <th className="text-left py-3">Doctor</th>
                                        <th className="text-left py-3">Diagnosis</th>
                                        <th className="text-left py-3">Prescription</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {medicalHistory.map((record, index) => (
                                        <tr key={index} className="border-b hover:bg-gray-50">
                                            <td className="py-3">{record.date}</td>
                                            <td className="py-3">{record.doctor}</td>
                                            <td className="py-3">{record.diagnosis}</td>
                                            <td className="py-3">{record.prescription}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Insurance Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow p-6">
                        <h3 className="font-bold mb-4">Insurance Information</h3>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm opacity-90">Provider</p>
                                <p className="font-bold">BlueCross BlueShield</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-90">Policy Number</p>
                                <p className="font-bold">BCBS123456789</p>
                            </div>
                            <div>
                                <p className="text-sm opacity-90">Expiry Date</p>
                                <p className="font-bold">Dec 31, 2024</p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-xl shadow p-6">
                        <h3 className="font-bold mb-6">Health Stats</h3>
                        <div className="space-y-4">
                            {[
                                { label: 'Last BP Reading', value: '120/80', status: 'normal' },
                                { label: 'Weight', value: '75 kg', status: 'normal' },
                                { label: 'Height', value: '178 cm', status: 'normal' },
                                { label: 'BMI', value: '23.7', status: 'normal' },
                            ].map((stat) => (
                                <div key={stat.label} className="flex justify-between items-center">
                                    <span className="text-gray-600">{stat.label}</span>
                                    <div className="flex items-center">
                                        <span className="font-bold mr-2">{stat.value}</span>
                                        <span className={`px-2 py-1 rounded-full text-xs ${stat.status === 'normal'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                            }`}>
                                            {stat.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Emergency Info */}
                    <div className="bg-red-50 border border-red-200 rounded-xl shadow p-6">
                        <h3 className="font-bold text-red-800 mb-4">Emergency Information</h3>
                        <p className="text-red-700 mb-4">
                            In case of emergency, this information will be shared with medical personnel.
                        </p>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-red-600">Emergency Contact</p>
                                <p className="font-bold">{userData.emergencyContact}</p>
                            </div>
                            <div>
                                <p className="text-sm text-red-600">Primary Physician</p>
                                <p className="font-bold">Dr. Sarah Johnson</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;