import { URL_API_KIEN, URL_API_HOANG } from "../../constants";
import axios from "axios";
import { getTokenFromCookies } from "../../pages/Authentication/HandleUserInfomation";

const token = getTokenFromCookies()

export const getAllCharities = async () => {
    const res = await axios({
        method: 'GET',
        url: URL_API_KIEN + '/charity/all',
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return res
}

export const getInfoCharity = async (charityId) => {
    const res = await axios({
        method: 'GET',
        url: URL_API_KIEN + '/charity/' + charityId,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return res
}

export const setFollowCharity = async (userId, charityId, isFollow) => {
    const res = await axios({
        method: 'POST',
        url: URL_API_KIEN + '/user/charity-follow/change-status',
        data: {
            userId: userId,
            charityId: charityId,
            isFollow: isFollow ? true : false
        },
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return res
}

export const getCharityFollow = async (userId) => {
    const res = await axios({
        method: 'GET',
        url: URL_API_KIEN + '/user/charity-follow/' + userId,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return res
}

export const getTopCharity = async () => {
    const res = await axios({
        method: 'GET',
        url: URL_API_KIEN + '/charity/top-charity',
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });

    return res
}