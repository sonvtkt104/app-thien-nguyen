import axios from "../../CustomAxios";
import { getTokenFromCookies } from "../Authentication/HandleUserInfomation";
import { toast } from "react-toastify";

export const getAllUsers = async () => {
  try {
    const response = await fetch("http://localhost:8080/account/all", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookies()}`,
        Token: `Bearer ${getTokenFromCookies()}`,
      },
    });

    const dataUsers = await response.json();

    toast.success("Lấy tất cả người dùng thành công");
    return dataUsers;
  } catch (error) {
    toast.error("Lấy tất cả người dùng thất bại");
  }

  // return axios.get("http://localhost:8080/user/all").then((res) => res.data);
  // return axios.get("http://localhost:8080/account/all").then((res) => res.data);
};

export const changeUserStatus = async (data) => {
  const response = await fetch("http://localhost:8080/account/change-status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenFromCookies()}`,
      Token: `Bearer ${getTokenFromCookies()}`,
    },
  });

  const message = await response.json();

  toast.success("Khóa hoặc mở khóa người dùng thành công");
  return message;

  // return axios
  //   .post("http://localhost:8080/user/change-status", data)
  //   .then((res) => res.data);
};

export const getAllCampaigns = async () => {
  toast.success("Lấy tất cả cuộc vận động thành công");

  return axios
    .get("http://localhost:8089/charity/campaign/get-all")
    .then((res) => res.data);
};

export const changeStarStatus = async (data) => {
  toast.success("Thay đổi trường status thành công");

  return axios
    .post("http://localhost:8089/charity/campaign/update-campaign", data)
    .then((res) => res.data);
};

export const getAllMessages = async () => {
  const response = await fetch(
    "http://localhost:8089/charity/message/get-receive",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookies()}`,
        Token: getTokenFromCookies(),
      },
    }
  );

  toast.success("Lấy tất cả thông báo thành công");
  return await response.json();
};

export const sendMessageToUser = async (data) => {
  const response = await fetch(
    "http://localhost:8089/charity/message/add-message",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenFromCookies()}`,
        Token: getTokenFromCookies(),
      },
      body: JSON.stringify({
        content: data.content,
        user_id_receive: data.user_id_receive,
      }),
    }
  );

  toast.success("Gửi thông báo thành công");
  return await response.json();
};
