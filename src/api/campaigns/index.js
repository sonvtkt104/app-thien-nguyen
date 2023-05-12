import { URL_API_KIEN, URL_API_HOANG } from '../../constants'
import axios from 'axios'

export const getAllCampaignsClient = async () =>  {
    const res = await axios({
        method: 'GET',
        url: URL_API_HOANG + '/charity/campaign/get-all',
        headers: {
            Token: 'abcd'
        }
    });

    return res
}