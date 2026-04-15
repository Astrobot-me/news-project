import axios from "axios";
import { BASE_URL } from "@/constant";

const modifiedAxios = axios.create({
  baseURL: BASE_URL, 
  withCredentials : true  
});



export const simpleAxios = axios.create({ 
  baseURL: BASE_URL, 
  withCredentials : true 
});

export default modifiedAxios;
