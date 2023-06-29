import axios, { pub, privateAxios } from "@lib/axios";

export const getFreeRooms = async ({ type, from, to }) => {
  const response = await axios.get(
    `/reservation/free-rooms-list?type=${type}&fromDateStr=${from}&toDateStr=${to}`
  );
  return response?.data;
};

export const getRoomDetail = async ({ id }) => {
  const response = await axios.get(`/room/detail?id=${id}`);
  return response?.data;
};
export const GetAllRooms = async ({ page, pageSize }) => {
  const response = await privateAxios.get(
    `/room?page=${page}&pageSize=${pageSize}`
  );
  return response?.data;
};

export const addRoom = async function (payload) {
  const roomDetail = await privateAxios.post(`/room`, {
    ...payload,
  });
  return roomDetail.data;
};
export const deleteRoom = async (id) => {
  const response = await privateAxios.delete(`/room?id=${id}`);
  return response?.data;
};

export const editRoom = async (payload) => {
  console.log(payload);
  const roomDetail = await privateAxios.put(`/room`, {
    ...payload,
  });
};
