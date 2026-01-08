import API from "./axios"

export const bookAppointment = (data) =>
    API.post("/appointments", data)

export const getAppointments = () =>
    API.get("/appointments")

export const updateAppointment = (id, status) =>
    API.patch(`/appointments/${id}`, { status })

export const deleteAppointment = (id) =>
    API.delete(`/appointments/${id}`)
