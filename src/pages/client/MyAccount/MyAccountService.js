import axios from "axios";

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


//api tai khoan
export const getUserByID = async (id) => {
    var url = "http://localhost:4444/data" + "/" + id;
    return await axios.get(url)
}

export const updateUser = async (id, data) => {
    var url = "http://localhost:4444/data" + "/" + id;
    return await axios.put(url, data)
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


