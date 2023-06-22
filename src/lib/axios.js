import axios from "axios";
const API_URL = 'https://roomee.eastasia.cloudapp.azure.com';

const accessToken = localStorage.getItem("accessToken") || "";

export const privateAxios = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
})

export default axios.create({
    baseURL: API_URL
})
