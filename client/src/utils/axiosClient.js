import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://bg-remover-nine-nu.vercel.app",
  withCredentials: true,
});

export default axiosClient;