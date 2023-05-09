import axios from "axios";
import { getTokenFromCookies } from "./pages/Authentication/HandleUserInfomation";

let instance = axios.create({
  headers: {
    Authorization: `Bearer ${getTokenFromCookies()}`,
  },
});

export default instance;
