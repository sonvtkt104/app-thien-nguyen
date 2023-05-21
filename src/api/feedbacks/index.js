import axios from "axios";
import { URL_API_HOANG } from "../../constants";
import { getTokenFromCookies } from "../../pages/Authentication/HandleUserInfomation";

const token = getTokenFromCookies()

export const userPushFeedBack = async (message) => {
    const res = await axios({
        method: 'POST',
        url: URL_API_HOANG + '/charity/feedback/add-feedback',
        data: {
            message: message
        },
        headers: {
            Token: getTokenFromCookies() || ""
        }
    });

    return res
}