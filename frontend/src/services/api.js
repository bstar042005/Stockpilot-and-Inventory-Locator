import axios from "axios";

const API = axios.create({
  baseURL: "https://stockpilot-and-inventory-locator-sq.vercel.app/api"
});

export default API;