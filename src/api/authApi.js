import API from "./axios";

// Register API
export const registerUser = (data) => {
    return API.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: data.userType,          // IMPORTANT

        // doctor-only fields
        specialty: data.specialty,
        experience: data.experience,
        qualification: data.qualification,
        fee: Number(data.fee),

        availableSlots: data.availableSlots
    });
};

// Login API
export const loginUser = (data) => {
    return API.post("/auth/login", {
        phone: data.phone,            // backend uses phone
        password: data.password,
    });
};
