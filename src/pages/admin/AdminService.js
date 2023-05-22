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
    return dataUsers;
  } catch (error) {
    toast.error("Lấy tất cả người dùng thất bại");
  }

  // return axios.get("http://localhost:8080/user/all").then((res) => res.data);
  // return axios.get("http://localhost:8080/account/all").then((res) => res.data);
};

export const changeUserStatus = async (data) => {
  try {
    const response = await fetch(
      "http://localhost:8080/account/change-status",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
          Token: `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify(data),
      }
    );

    const message = await response.json();

    toast.success("Khóa hoặc mở khóa người dùng thành công");
    return message;
  } catch (error) {
    toast.success("Khóa hoặc mở khóa người dùng thất bại");
  }
};

export const getListVerified = async () => {
  try {
    const response = await fetch(
      "http://localhost:8080/account/verified-list",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
          Token: `Bearer ${getTokenFromCookies()}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    toast.success("Khóa hoặc mở khóa người dùng thất bại");
  }
};

export const changeVerified = async (data) => {
  try {
    const response = await fetch(
      "http://localhost:8080/account/change-verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
          Token: `Bearer ${getTokenFromCookies()}`,
        },
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (error) {
    toast.success("Khóa hoặc mở khóa người dùng thất bại");
  }
};

export const getAllCampaigns = async () => {
  try {
    return axios
      .get("http://localhost:8089/charity/campaign/get-all")
      .then((res) => res.data);
  } catch (error) {
    toast.error("Lấy tất cả các cuộc vận động thất bại");
  }
};

export const changeStarStatus = async (data) => {
  return axios
    .post("http://localhost:8089/charity/campaign/update-campaign", data)
    .then((res) => res.data);
};

export const getAllMessages = async () => {
  try {
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
    return await response.json();
  } catch (error) {
    toast.error("Lấy tất cả thông báo thất bại");
  }
};

export const getAllFeedbacks = async () => {
  try {
    const response = await fetch(
      "http://localhost:8089/charity/feedback/get-feedback",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
          Token: getTokenFromCookies(),
        },
      }
    );
    return await response.json();
  } catch (error) {
    toast.error("Lấy tất cả thông báo thất bại");
  }
};

export const sendMessageToUser = async (data) => {
  try {
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
  } catch (error) {
    toast.error("Gửi thông báo thất bại");
  }
};

export const sendFeedbackToUser = async (data) => {
  try {
    const response = await fetch(
      "http://localhost:8089/charity/feedback/add-reply",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenFromCookies()}`,
          Token: getTokenFromCookies(),
        },
        body: JSON.stringify({
          message: data.content,
          feedback_id: data.user_id_receive,
        }),
      }
    );

    toast.success("Gửi thông báo thành công");
    return await response.json();
  } catch (error) {
    toast.error("Gửi thông báo thất bại");
  }
};
