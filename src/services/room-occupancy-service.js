import { privateAxios }from "@lib/axios"

export const getThisMonth = async function () {
    console.log("make request to endpoint: ", `/RoomOccupancy`);
    const roomDetails = await privateAxios.get(`/RoomOccupancy`);
    return roomDetails.data;
}


