import { roomDetail } from "@constant/index";

export const getAll = payload => ({
    type: roomDetail.GET_ALL_ROOM_DETAIL,
    payload
})