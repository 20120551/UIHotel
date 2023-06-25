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

export const updateRoomRegulationstatus = async function ({ roomRegulationId }) {
    const roomRegulation = await privateAxios.put(`/Regulation/${roomRegulationId}`);
    return roomRegulation.data;
}