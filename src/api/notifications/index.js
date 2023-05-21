import axios from "axios";
import { URL_API_HOANG } from "../../constants";
import { getTokenFromCookies } from "../../pages/Authentication/HandleUserInfomation";

const token = getTokenFromCookies()

export const userGetNotification = async () => {
    const res = await axios({
        method: 'GET',
        url: URL_API_HOANG + '/charity/notification/get-receive-by-user',
        headers: {
            Token: getTokenFromCookies() || ""
        }
    });

    return res
}