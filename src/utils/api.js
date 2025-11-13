import axios from "axios";

const BASE =
  import.meta.env.VITE_API_BASE ||
  "https://moviemaster-pro-server-production.up.railway.app";

const api = axios.create({
  baseURL: BASE,
  timeout: 10000,
});

export default api;
