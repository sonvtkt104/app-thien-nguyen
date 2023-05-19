import Manage from "./Manage";
import classes from "./ManageUser.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Space, Table } from "antd";
import { changeUserStatus, getAllUsers } from "./AdminService";
import { setUsers } from "../../redux/adminSlice";
import { useEffect } from "react";

const ManageUser = () => {
  const users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const resData = await getAllUsers();
      dispatch(setUsers(resData.data));
    })();
    return () => {};
  }, []);

  const handleBanUser = async (value) => {
    const data = await changeUserStatus({
      id: value,
      status: true,
    });

    if (data?.isSuccess) {
      (async () => {
        const resData = await getAllUsers();
        dispatch(setUsers(resData.data));
      })();
    }
  };

  const handleUnBanUser = async (value) => {
    const data = await changeUserStatus({
      id: value,
      status: false,
    });

    console.log(data);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Trạng thái",
      key: "isLocked",
      render: (_, record) => (
        <p>{record.isLocked === false ? "Không khóa" : "Bị khóa"}</p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    // {
    //   title: "Phường/Xã",
    //   dataIndex: "address",
    //   key: "address",
    // },
    {
      title: "Quận/Huyện",
      dataIndex: "ward",
      key: "ward",
    },
    {
      title: "Tỉnh/Thành phố",
      dataIndex: "province",
      key: "province",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className={classes["user-button"]}
            onClick={() => handleBanUser(record.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={classes["user-icon-ban"]}
              fill={record.isLocked === false ? "#f03e3e" : "#ffe3e3"}
            >
              <path d="M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
            </svg>
          </button>
          <button
            className={classes["user-button"]}
            onClick={() => handleUnBanUser(record.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className={classes["user-icon-un-ban"]}
              fill={record.isLocked === true ? "#4263eb" : "#bac8ff"}
            >
              <path d="M224 64c-44.2 0-80 35.8-80 80v48H384c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80V144C80 64.5 144.5 0 224 0c57.5 0 107 33.7 130.1 82.3c7.6 16 .8 35.1-15.2 42.6s-35.1 .8-42.6-15.2C283.4 82.6 255.9 64 224 64zm32 320c17.7 0 32-14.3 32-32s-14.3-32-32-32H192c-17.7 0-32 14.3-32 32s14.3 32 32 32h64z" />
            </svg>
          </button>
        </Space>
      ),
    },
  ];

  return (
    <Manage>
      <div className={classes.main}>
        <h2 className={classes.titleCharity}>Người dùng</h2>

        <div className={classes.list}>
          <div className={classes["user-list"]}>
            <Table
              dataSource={users}
              columns={columns}
              // pagination={false}
              pagination={{
                defaultPageSize: 6,
                showSizeChanger: true,
                pageSizeOptions: ["8", "10"],
              }}
            />
          </div>
        </div>
      </div>
    </Manage>
  );
};

export default ManageUser;
