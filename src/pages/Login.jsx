import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Stethoscope } from 'lucide-react';
import { loginUser } from '../api/authApi';
import { useAuth } from '../context/useAuth';
import toast from 'react-hot-toast';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser({ phone, password });

            login(data)

            navigate("/");

            toast.success("Login successful");

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold flex gap-2 justify-center">
                        <Stethoscope className="h-12 w-12 text-primary-600" />
                        <p>Doc<span className="text-blue-600">Time</span></p>
                    </h1>
                    <p className="text-gray-600 mt-2">Your trusted healthcare partner</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <h2 className="text-2xl font-bold text-center mb-8">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">Number</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter your number"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff /> : <Eye />}
                                </button>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <label className="flex items-center">
                                    <input type="checkbox" className="mr-2" />
                                    <span className="text-sm text-gray-600">Remember me</span>
                                </label>
                                <button type="button" className="text-sm text-primary hover:text-secondary">
                                    Forgot password?
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="block w-full text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t"></div>
                        <span className="px-4 text-gray-500">or</span>
                        <div className="flex-1 border-t"></div>
                    </div>



                    {/* Sign Up Link */}
                    <p className="text-center mt-8 text-gray-600">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="text-primary hover:text-secondary font-medium">
                            Sign up now
                        </Link >
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-sm mt-6">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
};

export default Login;