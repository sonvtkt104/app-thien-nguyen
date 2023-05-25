import { Button, Dropdown } from "antd";
import Header from "../../components/PageLayout/Header";
import "./ManageHeader.scss";
import { handleLogout } from "../Authentication/HandleUserInfomation";
import { useNavigate } from "react-router-dom";
const ManageHeader = () => {
  // return <Header />;
  const navigate = useNavigate();

  const items = [
    {
      key: "4",
      label: (
        <Button
          style={{
            border: "none",
            width: "200px",
            textAlign: "left",
            height: "40px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#38383a",
          }}
          className="button-header"
          onClick={() => {
            handleLogout();
            navigate("/login");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={{ width: "28px", height: "28px" }}
          >
            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
          Đăng xuất
        </Button>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#44B3CF",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingRight: "16px",
        position: "fixed",
        right: "0",
        left: "calc(100% / 6)",
        top: "0",
        zIndex: "1",
      }}
    >
      <Dropdown
        menu={{
          items,
        }}
      >
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
            fontSize: "16px",
            boxShadow: "none",
            color: "#38383a",
            fontWeight: "600",
          }}
        >
          Tài khoản
        </Button>
      </Dropdown>
    </div>
  );
};

export default ManageHeader;
