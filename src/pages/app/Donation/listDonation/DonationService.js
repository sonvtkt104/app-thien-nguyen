import axios from "axios";

const API = "http://localhost:5555/data"

export const getDonations = async () => {
    var url = API;
    return await axios.get(url)
};

export const  addDonation = async (data) => {
    var url = API;
    return await axios.post(url,data);
  };

export const updateDonation = async (id, data) => {
    var url = API + "/" + id;
    return await axios.put(url,data);
};

export const  deleteDonation = async (id) => {
    var url = API + "/" + id;
    return await axios.delete(url);
};