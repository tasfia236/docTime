import { Link, useNavigate } from "react-router-dom";
import { getDoctors } from "../api/doctorApi";
import { useEffect, useState } from "react";

export default function DoctorCard() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleBook = (doctorId) => {
        navigate(`/book-appointment/${doctorId}`);
    };


    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const res = await getDoctors({
                specialty: 'all'
            });
            setDoctors(res.data.doctors);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gradient-to-b from-cyan-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-14">
                    Our Doctors
                </h2>

                {loading && <p className="text-center">Loading...</p>}

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                    {doctors.slice(0, 8).map((doctor) => (
                        <div
                            key={doctor._id}
                            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={doctor.image || 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop'}
                                    alt={doctor.name}
                                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <span className="absolute top-4 left-4 bg-cyan-600 text-white text-sm px-3 py-1 rounded-full">
                                    {doctor.specialty}
                                </span>
                            </div>

                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold mb-2">{doctor.name}</h3>
                                <p className="text-gray-500 mb-6">
                                    Trusted & Experienced Specialist
                                </p>

                                <button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-2 px-3 rounded-lg hover:opacity-90 transition font-semibold"
                                    onClick={() => handleBook(doctor._id)}
                                >
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to={'/doctors-schedule'}
                        className="border-2 border-blue-600 text-blue-600 px-10 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold">
                        View All Doctor's Schedule
                    </Link>
                </div>
            </div>
        </section>
    );
}
