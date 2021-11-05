import axios from 'axios'


const baseURL = process.env.REACT_APP_BASE_URL || `http://localhost:8080/api/`

const api = axios.create({
    baseURL
})

export const getAllReservation = async (id) => {
    return await api.get(`/reservation/`);
};

export const getReservationById = async (id) => {
    return await api.get(`/reservation/${id}`);
};

export const updateReservationById = async (reservationId, userId, roomPrice, inputReservationDate) => {
    return await api.put(`/reservation/update/${reservationId}/${userId}/${roomPrice}`, inputReservationDate);
};

export const createReservation = async (reservationData, userId, roomPrice) => {
    return await api.post(`/reservation/${userId}/${roomPrice}`, reservationData);
}

export const cancelReservationById = async (id, userId) => {
    return await api.put(`/reservation/cancel/${id}/${userId}`);
};