import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Calendar, Stethoscope } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { registerUser } from '../api/authApi';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        userType: 'patient',
        specialty: '',
        experience: '',
        qualification: '',
        fee: '',
        availableSlots: []
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'];


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registerUser(formData);
            toast.success("Registration successful");
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold flex gap-2 justify-center">
                        <Stethoscope className="h-12 w-12 text-primary-600" />
                        <p>Doc<span className="text-blue-600">Time</span></p>
                    </h1>
                    <p className="text-gray-600 mt-2">Your trusted healthcare partner</p>

                </div>


                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-center">Create Account</h2>
                    <p className="text-md text-center mb-8">Join DocTime today</p>
                    <form onSubmit={handleSubmit} className="card space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Register as
                            </label>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, userType: 'patient' })}
                                    className={`flex-1 py-2 rounded-lg border ${formData.userType === 'patient' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300'}`}
                                >
                                    Patient
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, userType: 'doctor' })}
                                    className={`flex-1 py-2 rounded-lg border ${formData.userType === 'doctor' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300'}`}
                                >
                                    Doctor
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Create a password"
                                    required
                                    minLength="6"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field pl-10"
                                    placeholder="Enter your phone number"
                                    required
                                />
                            </div>
                        </div>

                        {formData.userType === 'doctor' && (
                            <>
                                {/* Specialty */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Specialty</label>
                                    <select
                                        name="specialty"
                                        value={formData.specialty}
                                        onChange={handleChange}
                                        className="input-field"
                                        required
                                    >
                                        <option value="">Select Specialty</option>
                                        <option value="Medicine">Medicine</option>
                                        <option value="Cardiologist">Cardiologist</option>
                                        <option value="Neurologist">Neurologist</option>
                                        <option value="Pediatrician">Pediatrician</option>
                                        <option value="Orthopedic">Orthopedic</option>
                                        <option value="Dermatologist">Dermatologist</option>
                                        <option value="Psychiatrist">Psychiatrist</option>
                                        <option value="General">General</option>
                                    </select>
                                </div>

                                {/* Experience */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Experience</label>
                                    <input
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="e.g. 5 years"
                                        required
                                    />
                                </div>

                                {/* Qualification */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Qualification</label>
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={formData.qualification}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="MBBS, FCPS"
                                        required
                                    />
                                </div>

                                {/* Fee */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Consultation Fee</label>
                                    <input
                                        type="number"
                                        name="fee"
                                        value={formData.fee}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="500"
                                        required
                                    />
                                </div>

                                {/* Available Slots */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Available Days</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {days.map(day => (
                                            <label key={day} className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.availableSlots.some(d => d.day === day)}
                                                    onChange={(e) => {
                                                        let updatedSlots = [...formData.availableSlots];

                                                        if (e.target.checked) {
                                                            updatedSlots.push({ day, slots: [] });
                                                        } else {
                                                            updatedSlots = updatedSlots.filter(d => d.day !== day);
                                                        }

                                                        setFormData({ ...formData, availableSlots: updatedSlots });
                                                    }}
                                                />
                                                <span>{day}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {formData.availableSlots.map((dayObj, index) => (
                                    <div key={dayObj.day} className="mt-4">
                                        <p className="font-medium mb-2">{dayObj.day} Slots</p>

                                        <div className="grid grid-cols-3 gap-2">
                                            {timeSlots.map(time => (
                                                <label key={time} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={dayObj.slots.includes(time)}
                                                        onChange={(e) => {
                                                            const updated = [...formData.availableSlots];

                                                            if (e.target.checked) {
                                                                updated[index].slots.push(time);
                                                            } else {
                                                                updated[index].slots =
                                                                    updated[index].slots.filter(t => t !== time);
                                                            }

                                                            setFormData({ ...formData, availableSlots: updated });
                                                        }}
                                                    />
                                                    <span>{time}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                            </>
                        )}


                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="text-center">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6 mb-8">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default Register;