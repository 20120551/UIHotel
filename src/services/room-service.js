import axios, {createPrivateAxios } from "@lib/axios";

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
  const createAxios = createPrivateAxios();
  const response = await createAxios.get(
    `/room?page=${page}&pageSize=${pageSize}`
  );
  return response?.data;
};

export const addRoom = async function (payload) {
  const createAxios = createPrivateAxios();
  const roomDetail = await createAxios.post(`/room`, {
    ...payload,
  });
  return roomDetail.data;
};
export const deleteRoom = async (id) => {
  const createAxios = createPrivateAxios();
  const response = await createAxios.delete(`/room?id=${id}`);
  return response?.data;
};

export const editRoom = async (payload) => {
  const createAxios = createPrivateAxios();
  const roomDetail = await createAxios.put(`/room`, {
    ...payload,
  });
};
