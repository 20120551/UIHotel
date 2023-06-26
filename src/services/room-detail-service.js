import axios, { privateAxios } from "@lib/axios";

export const getAll = async function () {
    console.log("make request to endpoint: ", `/RoomDetail`);
    const roomDetails = await axios.get(`/RoomDetail`);
    return roomDetails.data;
}

export const getByID = async function ({ index }) {
    console.log("make request to endpoint: ", `/RoomDetail/id?id=${index}`);
    const roomDetail = await privateAxios.get(`RoomDetail/by-id?id=${index}`);
    return roomDetail.data;
}
export const removeRoomDetail = async function ({id}) {
    const roomDetail = await privateAxios.delete(`/RoomDetail?id=${id}`);
    return roomDetail.data;
}

export const addRoomDetail = async function (payload) {
    const roomDetail = await privateAxios.post(`/RoomDetail`, {
        ...payload
    });
    return roomDetail.data;
}


// export const addHotelService = async function ({ roomDetailId, serviceId }) {
//     const roomDetail = await privateAxios.post(`/Detail/${roomDetailId}/service/${serviceId}`);
//     return roomDetail.data;
// }

