import { createPrivateAxios } from "@lib/axios"

export const getThisMonthRevenue = async function () {
    console.log("make request to endpoint: ", `/RoomRevenue`);
    const roomDetails = await createPrivateAxios().get(`/RoomRevenue`);
    return roomDetails.data;
}


export const getRevenueByMonth = async function ({ month, year }) {
    console.log("make request to endpoint: ", `/RoomRevenue/${month}/${year}`);
    const roomDetails = await createPrivateAxios().get(`/RoomRevenue/${month}/${year}`);
    return roomDetails.data;
}