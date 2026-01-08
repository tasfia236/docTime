import { Bell, Calendar,  Clock, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import DoctorCard from "../components/DoctorCard";

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-cyan-600 to-blue-800 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-10">

                    {/* Text Content */}
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                            Easy Doctor Appointments <br /> & Management
                        </h1>
                        <p className="text-lg text-blue-100 mb-8">
                            Book doctor visits online, manage schedules, and get reminders —
                            quickly and hassle-free.
                        </p>

                        <div className="flex gap-4">
                            <Link to='/book-appointment' className="bg-green-500 hover:bg-green-600 transition px-7 py-3 rounded-lg font-semibold">
                                Book Appointment
                            </Link>
                            <Link
                                to={'/doctors-schedule'}
                                className="border border-white px-7 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition">
                                Find Doctor
                            </Link>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="md:w-1/2 flex justify-center">
                        <img
                            src="/images/banner.jpg"
                            alt="Doctor"
                            className="w-full max-w-md object-contain drop-shadow-xl"
                        />
                    </div>

                </div>
            </section>

            {/* How It Works */}
            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-14">
                        How It Works
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: Search, title: "Search Doctor", desc: "Find the right doctor by specialty or availability" },
                            { icon: Calendar, title: "Choose Date & Time", desc: "Select a convenient appointment slot" },
                            { icon: Clock, title: "Confirm Appointment", desc: "Instant booking confirmation" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-6 text-center shadow hover:shadow-xl transition transform hover:-translate-y-1"
                            >
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full opacity-20" />
                                    <div className="relative w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                        <item.icon size={36} className="text-white" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold mb-3">
                                    {i + 1}. {item.title}
                                </h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Our Doctors */}
            <DoctorCard />


            {/* Features */}
            <section className="bg-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: User,
                                title: "Book Online Easily",
                                desc: "Schedule appointments in just a few clicks",
                            },
                            {
                                icon: Calendar,
                                title: "Manage Appointments",
                                desc: "View, reschedule, or cancel bookings anytime",
                            },
                            {
                                icon: Bell,
                                title: "Get Smart Reminders",
                                desc: "Never miss an appointment with alerts",
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl p-8 shadow hover:shadow-xl transition relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />

                                <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                                    <feature.icon size={32} className="text-blue-600" />
                                </div>

                                <h3 className="text-xl font-semibold mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}

export default Home;