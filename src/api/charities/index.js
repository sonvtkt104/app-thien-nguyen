import { URL_API_KIEN, URL_API_HOANG } from "../../constants";
import axios from "axios";
import { getTokenFromCookies } from "../../pages/Authentication/HandleUserInfomation";

const token = getTokenFromCookies()

export const getInfoCharityCurrent = async () => {
    const res = await axios({
        method: 'GET',
        url: URL_API_KIEN + '/user/current-user',
        headers: {
            Authorization: `Bearer ${token}`,
          },
    });

    return res
}