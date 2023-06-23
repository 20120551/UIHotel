import axios from "axios";

// .env bị lỗi
const API_ENDPOINT = "http://localhost:5000/api";

const httpRequest = axios.create({
  baseURL: API_ENDPOINT,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export default httpRequest;
