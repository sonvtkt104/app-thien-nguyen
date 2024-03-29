import axios from "axios";
import { getTokenFromCookies } from "./pages/Authentication/HandleUserInfomation";

let instance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getTokenFromCookies()}`,
    Token: getTokenFromCookies(),
  },
});

export default instance;
