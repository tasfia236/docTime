import API from "./axios"

export const getAllUsers = () => {
    return API.get('/user/all')
}

export const getPatients = () => {
    return API.get('/user/patients')
}
export const getProfile = () => {
    return API.get('/user/profile')
}

// Delete doctor (Admin)
export const deleteAccount = () => {
    return API.delete(`/user/account`);
};


export const deleteUser = (id) => {
    return API.delete(`/user/${id}`)
}