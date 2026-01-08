import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";

import ProtectedRoute from "./routes/ProtectedRoute";
import ManageAppointment from "./pages/ManageAppointment";
import DoctorAppointments from "./pages/DoctorAppointments";
import Patients from "./pages/Patients";
import Schedule from "./pages/Schedule";
import MyAppointments from "./pages/MyAppointments";
import ManageDoctors from "./pages/ManageDoctors";
import Doctors from "./pages/Doctors";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctors-schedule" element={<Doctors />} />

        {/* PATIENT ROUTES */}
        <Route
          path="/book-appointment/:doctorId"
          element={
            <ProtectedRoute allowedRoles={["patient"]}>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route path="/appointments/:id" element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAppointments />
          </ProtectedRoute>
        } />



        {/* RECEPTIONIST ROUTES */}
        <Route
          path="/manage-appointment"
          element={
            <ProtectedRoute allowedRoles={["receptionist", "admin"]}>
              <ManageAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <ProtectedRoute allowedRoles={["receptionist", "admin"]}>
              <Patients />
            </ProtectedRoute>
          }
        />



        {/* DOCTOR ROUTES */}
        <Route
          path="/schedule"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <Schedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor-appointments"
          element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />



        {/* Admin */}
        <Route
          path="/manage-doctors"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ManageDoctors />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />
      <Chatbot />
      {/* <button className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-500 
text-white p-4 rounded-full shadow-xl">
        <BsChat className="w-5 h-5" />
      </button> */}
    </BrowserRouter >
  );
}

export default App;
