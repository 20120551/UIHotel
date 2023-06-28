import axios, { privateAxios } from "@lib/axios";

export const getStaffInfo = async ({ id }) => {
  const response = await axios.get(`/room/detail?id=${id}`);
  return response?.data;
};
// export const GetAllStaffs = async ({ page, pageSize }) => {
//   const response = await privateAxios.get(`/user`);
//   return response?.data;
// };

export const GetAllStaffs = async () => {
  const response = await privateAxios.get(`/user`);
  return response?.data;
};

export const createStaff = async function (payload) {
  console.log(payload);
  const roomDetail = await privateAxios.post(`/room`, {
    ...payload,
  });
  return roomDetail.data;
};
