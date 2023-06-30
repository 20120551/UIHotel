import { privateAxios, createPrivateAxios } from "@lib/axios";

export const getServiceByCategory = async ({ categoryId }) => {
  const response = await createPrivateAxios().get(
    `/service/search?category=${categoryId}`
  );
  return response?.data;
};

export const getAllServices = async () => {
  const respone = await privateAxios.get("/service");
  return respone?.data;
};

export const addService = async (payload) => {
  const respone = await privateAxios.post("/service", {
    ...payload,
  });
  return respone?.data;
};

export const searchForService = async ({ value, category }) => {
  const respone = await privateAxios.get(
    `service/search?value=${value}&category=${category}`
  );
  return respone?.data;
};
