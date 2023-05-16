import { URL_API_KIEN, URL_API_HOANG } from '../../constants'
import axios from 'axios'
import { getTokenFromCookies } from '../../pages/Authentication/HandleUserInfomation';

export const getAllCampaignsClient = async () =>  {
    const res = await axios({
        method: 'GET',
        url: URL_API_HOANG + '/charity/campaign/get-all',
        headers: {
            Token: ''
        }
    });

    return res
}

export const getCampaignFollow = async () => {
    const res = await axios({
        method: 'GET',
        url: URL_API_HOANG + '/charity/campaign/user-get-followed-campaign',
        headers: {
            Token: getTokenFromCookies() || ""
        }
    })

    return res
}

export const setUserFollowCampaign = async (campaignId) => {
    const res = await axios({
        method: 'POST',
        url: URL_API_HOANG + '/charity/campaign/user-follow-campaign?campaign-id=' + campaignId,
        headers: {
            Token: getTokenFromCookies() || ""
        }
    });

    return res
}

export const setUserUnFollowCampaign = async (campaignId) => {
    const res = await axios({
        method: 'DELETE',
        url: URL_API_HOANG + '/charity/campaign/user-unfollow-campaign?campaign-id=' + campaignId,
        headers: {
            Token: getTokenFromCookies() || ""
        }
    });

    return res
}
