import axios from "axios";
const API_URL = 'http://localhost:5000/api';

export const privateAxios = axios.create({
    baseURL: API_URL,
    // withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`
    }
})

export default axios.create({
    baseURL: API_URL
})
