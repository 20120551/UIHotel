import axios from "axios";
const API_URL = "https://roomee.eastasia.cloudapp.azure.com/api";

export const privateAxios = axios.create({
  baseURL: API_URL,
  // withCredentials: true,
  headers: {
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem("accessToken") || "{}").accessToken || ""
    }`,
  },
});

export const createPrivateAxios = () => {
  return axios.create({
    baseURL: API_URL,
    // withCredentials: true,
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("accessToken") || "{}").accessToken ||
        ""
      }`,
    },
  });
};

export default axios.create({
  baseURL: API_URL,
});
