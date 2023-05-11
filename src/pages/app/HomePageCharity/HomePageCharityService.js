// import axios from "axios";

// const API = "http://localhost:5555/data"

// export const getCharityByID = async (id) => {
//     var url = API + "/" + id;
//     return await axios.get(url)
// };

// export const updateCharity = async (id, data) => {
//     var url = API + "/" + id;
//     return await axios.put(url, data)
// };
import axios from "axios";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";

const token = getTokenFromCookies()
const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

//api tai khoan
export const getCurrentCharity = async () => {
    var url = "http://localhost:8080/user/current-user";
    return await axios.get(url, headers)
}

export const updateCharity = async (id, data) => {
    var url = "http://localhost:8080/setting/user-charity/edit-info" + "/" + id;
    return await axios.put(url, data, headers)
}
