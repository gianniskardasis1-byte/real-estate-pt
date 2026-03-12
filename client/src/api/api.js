import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

// Residency endpoints
export const getAllResidencies = () => api.get('/residency/allresidencies');
export const getResidency = (id) => api.get(`/residency/${id}`);
export const createResidency = (data) => api.post('/residency/create', { data });

// User endpoints
export const registerUser = (userData) => api.post('/user/register', userData);
export const bookVisit = (id, data) => api.post(`/user/bookVisit/${id}`, data);
export const cancelBooking = (id, data) => api.post(`/user/cancelBooking/${id}`, data);
export const addFavourite = (rid, data) => api.post(`/user/addFavourite/${rid}`, data);
export const getAllFavourites = (data) => api.post('/user/allFavourites', data);
export const getAllBookings = (data) => api.post('/user/allBookings', data);
