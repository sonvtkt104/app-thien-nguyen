import classes from "./ManageHeader.module.css";
import { useSelector } from "react-redux";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import {
  handleLogout,
  getUserInfomationFromCookies,
} from "../Authentication/HandleUserInfomation";
import { useNavigate } from "react-router-dom";

const ManageHeader = () => {
  const username = useSelector((state) => state.app.username);
  const user = getUserInfomationFromCookies();
  const navigate = useNavigate();
  const handleUserLogout = () => {
    handleLogout();

    navigate("../login");
  };

  const items = [
    {
      key: "4",
      danger: true,
      label: <span onClick={handleUserLogout}>Đăng xuất</span>,
    },
  ];

  return (
    <header className={classes.header}>
      <div className={classes["user-information"]}>
        <p className={classes["user-name"]}>{username}</p>

        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {user && user.Name}

              <img
                className={classes["img-header"]}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/640px-Facebook_Logo_%282019%29.png"
                alt="image user"
              />
              {/* <DownOutlined /> */}
            </Space>
          </a>
        </Dropdown>
      </div>
    </header>
  );
};

export default ManageHeader;
