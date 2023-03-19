import axios from "axios";

const API = "http://localhost:9999/data"

export const getCharity = async () => {
    var url = API;
    return await axios.get(url)
};
