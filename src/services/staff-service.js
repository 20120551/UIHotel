import axios, { privateAxios, createPrivateAxios } from "@lib/axios";

export const GetAllStaffs = async ({ page, pageSize }) => {
  const response = await privateAxios.get(
    `/user?page=${page}&pageSize=${pageSize}`
  );
  return response?.data;
};

export const createStaff = async function (payload) {
  const response = await privateAxios.post(`/user`, {
    ...payload,
  });
  return response?.data;
};

export const getStaffInfo = async (id) => {
  const response = await privateAxios.get(`/user/${id}`);
  return response?.data;
};

export const changePassWord = async (id, pwd) => {
  console.log(id + " " + pwd);
  const response = await privateAxios.put(`/user/admin`, {
    id: id,
    newPassword: pwd,
  });
  return response?.data;
};

export const deleteStaff = async (id) => {
  const response = await privateAxios.delete(`/user?id=${id}`);
  return response?.data;
};
