import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Stethoscope } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/useAuth";
import { LiaAnkhSolid } from "react-icons/lia";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const { token, userRole, logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/");
    };

    const roleMenus = {
        patient: [
            { name: "Book Appointment", path: "/book-appointment/:doctorId" },
            { name: "My Appointments", path: "/appointments/:id" },
        ],
        doctor: [
            { name: "Schedule", path: "/schedule" },
            { name: "Appointments", path: "/doctor-appointments" },
        ],
        receptionist: [
            { name: "Appointments", path: "/manage-appointment" },
            { name: "Patients", path: "/patients" },
        ],
        admin: [
            { name: "Manage Doctors", path: "/manage-doctors" },
            { name: "Appointments", path: "/manage-appointment" },
            { name: "Patients", path: "/patients" },
        ],
    };

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <Stethoscope className="w-8 h-8 text-blue-600 drop-shadow-sm" />
                        <span className="text-2xl font-bold text-gray-800">
                            Doc<span className="text-blue-600">Time</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <>
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/doctors-schedule" className="nav-link">Doctors</Link>

                        </>

                        {token &&
                            roleMenus[userRole]?.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="nav-link"
                                >
                                    {item.name}
                                </Link>
                            ))}

                        {!token ? (
                            <>
                                <Link to="/login" className="btn-primary">
                                    Login
                                </Link>
                                <Link to="/register" className="btn-secondary">
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="btn-danger"
                            >
                                Logout
                            </button>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button className="p-2 rounded-md hover:bg-cyan-50 transition"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6 text-blue-600" /> : <Menu className="w-6 h-6 text-blue-600" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t rounded-b-lg shadow-lg px-6 py-4 space-y-4 transition-transform duration-300">
                    <div className="flex flex-col space-y-3">

                        {/* Public Links */}
                        <>
                            <Link
                                to="/"
                                className="block text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-cyan-50 transition"
                            >
                                Home
                            </Link>
                            <Link
                                to="/doctors-schedule"
                                className="block text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-cyan-50 transition"
                            >
                                Doctors
                            </Link>
                        </>

                        {/* Role-Based Links */}
                        {token &&
                            roleMenus[userRole]?.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="block text-gray-700 font-medium px-3 py-2 rounded-lg hover:bg-cyan-50 transition"
                                >
                                    {item.name}
                                </Link>
                            ))}

                        {/* Auth Buttons */}
                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block w-full text-center border border-blue-600 text-blue-600 px-3 py-2 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
