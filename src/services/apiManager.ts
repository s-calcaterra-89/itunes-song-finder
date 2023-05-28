import axios from "axios";
import { ITUNES_API_BASE_URL } from "../constants/itunes";

const apiManager = axios.create({
  baseURL: ITUNES_API_BASE_URL,
  timeout: 30000,
});

export default apiManager;
