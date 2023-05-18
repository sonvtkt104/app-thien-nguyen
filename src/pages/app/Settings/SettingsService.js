import axios from "axios";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";

const token = getTokenFromCookies()
const headers = {
    headers: {
        "Authorization": `Bearer ${token}`,
    },
}

export const forgetPassword = async (user) => {
    const url = "http://localhost:8080/forget-password?userName=" + user
    return await axios.post(url, headers)
}

export const resetCode = async (data) => {
    const url = "http://localhost:8080/reset-code"
    return await axios.post(url, data, headers)
}

export const resetPassword= async (data) => {
    const url = "http://localhost:8080/reset-password"
    return await axios.post(url, data, headers)
}
