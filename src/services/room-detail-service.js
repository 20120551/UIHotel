import axios, { createPrivateAxios } from "@lib/axios";

export const getAll = async function () {
    console.log("make request to endpoint: ", `/RoomDetail`);
    const roomDetails = await axios.get(`/RoomDetail`);
    return roomDetails.data;
}

export const getByID = async function ({ index }) {
    console.log("make request to endpoint: ", `/RoomDetail/by-id?id=${index}`);
    const roomDetail = await createPrivateAxios().get(`RoomDetail/by-id?id=${index}`);
    return roomDetail.data;
}
export const removeRoomDetail = async function ({ id }) {
    const roomDetail = await createPrivateAxios().delete(`/RoomDetail?id=${id}`);
    return roomDetail.data;
}

export const addRoomDetail = async function (payload) {
    const roomDetail = await createPrivateAxios().post(`/RoomDetail`, {
        ...payload
    });
    return roomDetail.data;
}

export const updateRoomDetail = async function (payload) {
    const roomDetail = await createPrivateAxios().put(`/RoomDetail`, {
        ...payload
    });
    return roomDetail.data;
}

// export const addHotelService = async function ({ roomDetailId, serviceId }) {
//     const roomDetail = await createPrivateAxios().post(`/Detail/${roomDetailId}/service/${serviceId}`);
//     return roomDetail.data;
// }

