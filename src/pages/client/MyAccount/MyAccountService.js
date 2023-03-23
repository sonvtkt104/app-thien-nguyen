import axios from "axios";

const API = "http://localhost:9999/data"

export const getRequestListByID = async (id) => {
    var url = API + "/" + id;
    return await axios.get(url)
};
