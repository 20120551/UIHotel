import axios from "@lib/axios"

export const createCard = async (payload) => {
    const response = await axios.post("/reservation", payload);
    return response.data;
}