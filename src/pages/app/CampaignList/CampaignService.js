import axios from "axios";

// http://localhost:8089/charity/address/provinces
// http://localhost:8089/charity/address/districts-in-province?province-code=20
// http://localhost:8089/charity/address/wards-in-districts?district-code=178
// http://localhost:8089/charity/access/token
// http://localhost:8089/charity/campaign/get-all
// http://localhost:8089/charity/campaign/get-by-condition?campaign-id=1&organization-id=1&organization-name=abc&campaign-name=abc&region=abc&campaign-type=abc&target-object=abc&status=abc
// http://localhost:8089/charity/campaign/add-campaign
// http://localhost:8089/charity/campaign/update-campaign
// http://localhost:8089/charity/campaign/delete-campaign?campaign-id=1
let campaignService = {
    getAllCampaign() {
        return axios.get('/charity/address/provinces').then(res => res.data); 
    },
    getAllRegion() {
        return axios.get('/charity/address/provinces').then(res => res.data); 
    },
    accessToken() {
        return axios.post('/charity/access/token', {
            headers: {
              "Content-Type": "application/json"
            },
            data: {
                user_id: 2,
                token: 'abcd'
            }
          })
    },
    getAll() {
        return axios.get('/charity/campaign/get-all')
    }
    
}

export default campaignService;