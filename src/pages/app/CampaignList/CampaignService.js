import axios from "axios";

// http://localhost:8089/charity/address/provinces
// http://localhost:8089/charity/address/districts-in-province?province-code=20
// http://localhost:8089/charity/address/wards-in-districts?district-code=178

let campaignService = {
    getAllCampaign() {
        return axios.get('/charity/address/provinces').then(res => res.data); 
    },
    getAllRegion() {
        return axios.get('/charity/address/provinces').then(res => res.data); 
    },
    
}

export default campaignService;