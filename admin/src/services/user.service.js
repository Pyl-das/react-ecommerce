import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL+"api/admin/";

const getAdminBoard = () => {
  return axios.get(API_URL + "dashboard", { headers: authHeader() });
};

const userService = {
  getAdminBoard
};

export default userService