import API from "./axios";

// Get all doctors (with filters)
export const getDoctors = (params = {}) => {
    return API.get('/doctors/all', { params });
};

export const updateDoctor = (id, data) => {
    return API.patch(`/doctors/${id}`, data)
}

// Get single doctor by ID
export const getDoctorById = (id) => {
    return API.get(`/doctors/${id}`);
};

// Delete doctor (Admin)
export const deleteDoctor = (id) => {
    return API.delete(`/doctors/${id}`);
};


export const getMySlots = () => {
    return API.get(`/slots/my-slots`)
};
export const toggleAvailability = (available) => {
    return API.patch(`/slots/toggle-availability`, { available })
};
export const updateSlots = (day, slots) => {
    return API.patch(`/slots/update-slots`, { day, slots })
};
