import { createPrivateAxios } from "@lib/axios";

export const getAll = async function () {
    console.log("make request to endpoint: ", `/Regulation`);
    const roomRegulations = await createPrivateAxios().get(`/regulation`);
    return roomRegulations.data;
}

export const getByID = async function ({ index }) {
    console.log("make request to endpoint: ", `/Regulation/id?id=${index}`);
    const roomRegulation = await createPrivateAxios().get(`Regulation/id?id=${index}`);
    return roomRegulation.data;
}
export const removeRoomRegulation = async function ({ id }) {
    const roomRegulation = await createPrivateAxios().delete(`/Regulation?id=${id}`);
    return roomRegulation.data;
}

export const addRoomRegulation = async function (payload) {
    const roomRegulation = await createPrivateAxios().post(`/Regulation`, {
        ...payload
    });
    return roomRegulation.data;
}


// export const addHotelService = async function ({ roomRegulationId, serviceId }) {
//     const roomRegulation = await createPrivateAxios().post(`/Regulation/${roomRegulationId}/service/${serviceId}`);
//     return roomRegulation.data;
// }

export const updateRoomRegulation = async function ({ roomRegulationId }, payload) {
    const roomRegulation = await createPrivateAxios().put(`/Regulation/${roomRegulationId}`, {
        ...payload
    });
    return roomRegulation.data;
}