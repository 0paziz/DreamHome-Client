import axios from "axios";

const api = axios.create({
  baseURL: "https://dreamhomes-backend-3mbn.onrender.com/api",
});

export default api;
