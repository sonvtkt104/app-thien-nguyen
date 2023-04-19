import axios from "axios";

const API = "http://localhost:5555/data"

export const getCharityByID = async (id) => {
    var url = API + "/" + id;
    return await axios.get(url)
};

export const updateCharity = async (id, data) => {
    var url = API + "/" + id;
    return await axios.put(url, data)
};

