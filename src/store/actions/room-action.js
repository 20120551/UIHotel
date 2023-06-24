import { room } from "@constant/index";

export const getFreeRooms = payload => ({
    type: room.GET_FREE_ROOMS,
    payload
})