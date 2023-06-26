import axios from "@lib/axios"

export const getAll = async function () {
    const response = await axios.get("/roomdetail");
    return response?.data;
}