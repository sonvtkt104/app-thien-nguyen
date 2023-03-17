import axios from "axios";

const API = "http://localhost:8080"

let campaignService = {

    getAllCampaign() {
        return axios.get(API)
    },

    getCampaignById(campaignId) {
        return axios.post(`API?campaignId=${campaignId}`)
    }
}

export default {
    campaignService
}