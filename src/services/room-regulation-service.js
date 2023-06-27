import { privateAxios } from "@lib/axios";

export const getAll = async function () {
    console.log("make request to endpoint: ", `/Regulation`);
    const roomRegulations = await privateAxios.get(`/regulation`);
    return roomRegulations.data;
}

export const getByID = async function ({ index }) {
    console.log("make request to endpoint: ", `/Regulation/id?id=${index}`);
    const roomRegulation = await privateAxios.get(`Regulation/id?id=${index}`);
    return roomRegulation.data;
}
export const removeRoomRegulation = async function ({id}) {
    const roomRegulation = await privateAxios.delete(`/Regulation?id=${id}`);
    return roomRegulation.data;
}

export const addRoomRegulation = async function (payload) {
    const roomRegulation = await privateAxios.post(`/Regulation`, {
        ...payload
    });
    return roomRegulation.data;
}


// export const addHotelService = async function ({ roomRegulationId, serviceId }) {
//     const roomRegulation = await privateAxios.post(`/Regulation/${roomRegulationId}/service/${serviceId}`);
//     return roomRegulation.data;
// }

export const updateRoomRegulation = async function ({ roomRegulationId },payload) {
    const roomRegulation = await privateAxios.put(`/Regulation/${roomRegulationId}`,{
        ...payload
    });
    return roomRegulation.data;
}