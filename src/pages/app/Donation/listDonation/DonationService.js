import axios from "axios";

//api donation
export const getDonations = async () => {
    var url = "http://localhost:22222/data";
    return await axios.get(url)
};

export const postDonation = async (data) => {
    var url = "http://localhost:22222/data";
    return await axios.post(url,data)
};

export const updateDonationByID = async (id,data) => {
    var url = "http://localhost:22222/data" + "/" + id;
    return await axios.put(url,data)
};

export const deleteDonationByID = async (id) => {
    var url = "http://localhost:22222/data" + "/" + id;
    return await axios.delete(url)
};


//api contact

// export const postDonationContact = async (data) => {
//     var url = "http://localhost:3333/data";
//     return await axios.post(url,data)
// };

