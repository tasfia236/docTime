import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-cyan-700 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">DocTime</h3>
                        <p className="text-gray-300">
                            Your trusted partner in healthcare management. Book appointments easily and manage your health records.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
                            <li><a href="/doctors" className="text-gray-300 hover:text-white">Find Doctors</a></li>
                            <li><a href="/book-appointment" className="text-gray-300 hover:text-white">Book Appointment</a></li>
                            <li><a href="/login" className="text-gray-300 hover:text-white">Patient Login</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>support@doctime.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <span>123 Health St, Medical City</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Working Hours</h4>
                        <div className="flex items-center space-x-2 mb-2">
                            <Clock className="h-4 w-4" />
                            <span>Mon - Fri: 8:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Sat - Sun: 9:00 AM - 6:00 PM</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                    <p>&copy; {new Date().getFullYear()} DocTime. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;