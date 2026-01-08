import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, X, Clock, Star, DollarSign, Stethoscope, Calendar, User } from "lucide-react";
import API from "../api/axios";

const defaultQuestions = [
    "What doctors are available?",
    "Tell me about Dr. Tasfia",
    "How much is consultation fee?",
    "Book appointment with cardiologist",
    "Show all specialists",
];


const Chatbot = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: "bot",
            text: "Hello 👋! I'm your medical assistant. How can I help you today?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [doctorDetails, setDoctorDetails] = useState(null);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const sendMessage = async (msg) => {
        if (!msg.trim()) return;

        const userMessage = {
            sender: "user",
            text: msg,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);
        setDoctorDetails(null);

        try {
            const res = await API.post("/chat", { message: msg });
            setIsTyping(false);

            const botMessage = {
                sender: "bot",
                text: res.data.reply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                doctor: res.data.doctor
            };

            setMessages(prev => [...prev, botMessage]);

            if (res.data.doctor) {
                setDoctorDetails(res.data.doctor);
            }
        } catch (error) {
            console.error(error)
            setIsTyping(false);
            const errorMessage = {
                sender: "bot",
                text: "Sorry, I'm having trouble connecting. Please try again.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(true)}
                className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 ${open ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                    } bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600 active:scale-95`}
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            {/* Chat Window */}
            <div className={`fixed bottom-0 right-0 z-50 transition-all duration-300 ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}>
                <div className="relative bottom-20 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="font-bold text-lg">Medical Assistant</h2>
                                    <p className="text-sm text-blue-100">Ask about appointments & doctors</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
                        <QuickActions sendMessage={sendMessage} />

                        {/* Messages */}
                        <div className="space-y-4">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.sender === "user"
                                        ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                                        : "bg-gradient-to-r from-blue-600 to-cyan-600"
                                        }`}>
                                        {msg.sender === "user" ? (
                                            <User className="w-4 h-4 text-white" />
                                        ) : (
                                            <MessageCircle className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div className={`max-w-[70%] ${msg.sender === "user" ? "items-end" : ""}`}>
                                        <div className={`p-4 rounded-2xl ${msg.sender === "user"
                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-tr-none"
                                            : "bg-gradient-to-r from-gray-100 to-white border border-gray-200 text-gray-800 rounded-tl-none"
                                            }`}>
                                            <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                                        </div>
                                        <span className="text-xs text-gray-500 mt-1 block px-1">
                                            {msg.timestamp}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Doctor Details Card */}
                            {doctorDetails && <DoctorCard doctor={doctorDetails} sendMessage={sendMessage} />}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-cyan-600">
                                        <MessageCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-gradient-to-r from-gray-100 to-white border border-gray-200 p-4 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Suggested Questions */}
                    <div className="border-t bg-gray-50 p-3">
                        <div className="text-xs text-gray-500 mb-2 px-1">Quick questions:</div>
                        <div className="flex flex-wrap gap-2">
                            {defaultQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(q)}
                                    className="px-3 py-2 bg-white border border-blue-200 text-blue-700 rounded-full text-xs hover:bg-blue-50 hover:border-blue-300 transition whitespace-nowrap"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-4 bg-white">
                        <div className="flex gap-2">
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                                className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                disabled={isTyping}
                            />
                            <button
                                onClick={() => sendMessage(input)}
                                disabled={isTyping || !input.trim()}
                                className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-3 rounded-xl hover:from-blue-700 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 px-1">
                            Press Enter to send • Shift+Enter for new line
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/20 z-40"
                    onClick={() => setOpen(false)}
                />
            )}
        </>
    );
};


const DoctorCard = ({ doctor, sendMessage }) => (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4 my-3">
        <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-blue-900">{doctor.name}</h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="text-xs font-medium">4.8</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <Stethoscope className="w-4 h-4" />
                    <span>{doctor.specialty}</span>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">${doctor.fee}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>Available</span>
                    </div>
                </div>
                <button
                    onClick={() => sendMessage(`Book appointment with ${doctor.name}`)}
                    className="mt-3 w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
                >
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Book Appointment
                </button>
            </div>
        </div>
    </div>
);

const QuickActions = ({ sendMessage }) => (
    <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {[
            { icon: <User className="w-4 h-4" />, text: "Find Doctors", action: "Find available doctors" },
            { icon: <Calendar className="w-4 h-4" />, text: "Book Now", action: "Book appointment" },
            { icon: <DollarSign className="w-4 h-4" />, text: "Fees", action: "Consultation fees" },
            { icon: <Clock className="w-4 h-4" />, text: "Slots", action: "Available slots" },
        ].map((item, index) => (
            <button
                key={index}
                onClick={() => sendMessage(item.action)}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-blue-200 rounded-full text-blue-700 text-sm font-medium whitespace-nowrap hover:bg-blue-50 transition"
            >
                {item.icon}
                {item.text}
            </button>
        ))}
    </div>
);


export default Chatbot;