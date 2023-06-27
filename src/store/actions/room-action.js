import { room } from "@constant/index";

export const getFreeRooms = (payload) => ({
  type: room.GET_FREE_ROOMS,
  payload,
});

export const getRoomDetail = (payload) => ({
  type: room.GET_ROOM_DETAIL,
  payload,
});
