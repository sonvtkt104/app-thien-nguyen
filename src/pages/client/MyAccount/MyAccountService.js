import axios from "axios";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";
//api xac nhan
// export const getRequestList = async () => {
//     var url = "http://localhost:7777/data";
//     return await axios.get(url)
// };

// export const postRequestList = async (data) => {
//     var url = "http://localhost:7777/data";
//     return await axios.post(url,data)
// };

// export const updateRequestList = async (id,data) => {
//     var url = "http://localhost:7777/data" + "/" + id;
//     return await axios.put(url, data)
// };

const token = getTokenFromCookies()
const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

//api tai khoan
export const getCurrentUser = async () => {
    var url = "http://localhost:8080/user/current-user";
    return await axios.get(url, headers)
}

export const updateUser = async (id, data) => {
    var url = "http://localhost:8080/setting/user-normal/edit-info" + "/" + id;
    return await axios.put(url, data, headers)
}




//API bai dang
export const getDonationPostUser = async () => {
    var url = "http://localhost:1111/data";
    return await axios.get(url)
}

export const createDonationPostUser = async (data) => {
    var url = "http://localhost:1111/data";
    return await axios.post(url, data)
}

export const updateDonationPostUser = async (id, data) => {
    var url = "http://localhost:1111/data" + "/" + id;
    return await axios.put(url, data)
}

export const deleteDonationPostUser = async (id) => {
    var url = "http://localhost:1111/data" + "/" + id;
    return await axios.delete(url)
}



//api address

export const getListProvince = async () => {
    var url = "http://localhost:8089/charity/address/provinces";
    return await axios.get(url);
};
export const getListDistrictByID = async (id) => {
    var url = `http://localhost:8089/charity/address/districts-in-province?province-code=${id}`;
    return await axios.get(url);
};


export const getListWardByID = async (id) => {
    var url = `http://localhost:8089/charity/address/wards-in-districts?district-code=${id}`;
    return await axios.get(url);
};


//updatepassword

export const updatePassWord = async (id, data) => {
    var url = "http://localhost:8080/setting/user/edit-password" + "/" + id;
    return await axios.put(url, data, headers)
} 
