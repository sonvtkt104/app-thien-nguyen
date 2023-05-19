import classes from "./ManageHeader.module.css";
import { useSelector } from "react-redux";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import {
  handleLogout,
  getUserInfomationFromCookies,
} from "../Authentication/HandleUserInfomation";
import { useNavigate } from "react-router-dom";
import Header from "../../components/PageLayout/Header";

const ManageHeader = () => {
  return <Header />;
};

export default ManageHeader;
