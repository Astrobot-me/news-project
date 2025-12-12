import axios from "axios";
import store from "@/store/store";
import { BASE_URL } from "@/constant";

const modifiedAxios = axios.create({
  baseURL: BASE_URL,  
});

modifiedAxios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.userData?.userToken || localStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default modifiedAxios;
