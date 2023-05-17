
import axios from "../../../CustomAxios"
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";

const token = getTokenFromCookies()
const headers = {
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  }

//api tai khoan
// export const getCurrentCharity = async () => {
//     var url = "http://localhost:8080/user/current-user";
//     return await axios.get(url, headers)
// }

// export const updateCharity = async (id, data) => {
//     var url = "http://localhost:8080/setting/user-charity/edit-info" + "/" + id;
//     return await axios.put(url, data, headers)
// }


// export const uploadImage = async (data) => {
//   var url = "http://localhost:8080/upload";
//   return await axios.post(url, data, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//       "Authorization": `Bearer ${token}`,
//     },
//   })
// }

export const getCurrentCharity = async () => {
  var url = "http://localhost:8080/account/current-user";
  return await axios.get(url)
}

export const updateCharity = async (id, data) => {
  var url = "http://localhost:8080/setting/user-charity/edit-info" + "/" + id;
  return await axios.put(url, data)
}


export const uploadImage = async (data) => {
var url = "http://localhost:8080/upload";
return await axios.post(url, data, {
  headers: {
    'Content-Type': 'multipart/form-data',
    "Authorization": `Bearer ${token}`,
  },
})
}