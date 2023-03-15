import axios from "axios";

const API = "http://localhost:7777/data"

export const getApp = async (id) => {
    var url = API+ "/" + id;
    return await axios.get(url)
};

export const  addApp = async (data) => {
    var url = API;
    return await axios.post(url,data);
  };

export const updateApp = async (id, data) => {
    var url = API + "/" + id;
    return await axios.put(url,data);
};

export const  deleteApp = async (id) => {
    var url = API + "/" + id;
    return await axios.delete(url);
};