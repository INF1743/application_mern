import axios from "axios";
 
export const api = axios.create({

  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api"

});
 
export const setAuthToken = (token) => {

  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;

  else delete api.defaults.headers.Authorization;

};

 