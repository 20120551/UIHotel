import { privateAxios }from "@lib/axios"

export const getThisMonth = async function () {
    console.log("make request to endpoint: ", `/RoomOccupancy`);
    const roomDetails = await privateAxios.get(`/RoomOccupancy`);
    return roomDetails.data;
}


export const getByMonth = async function ({month,year}) {
    console.log("make request to endpoint: ", `/RoomOccupancy/${month}/${year}`);
    const roomDetails = await privateAxios.get(`/RoomOccupancy/${month}/${year}`);
    return roomDetails.data;
}
