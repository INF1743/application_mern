import axios from "axios";

export const api = axios.create({
  baseURL: "https://chelsea-coaching-backend.onrender.com/api",
});

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
  else delete api.defaults.headers.Authorization;
};
