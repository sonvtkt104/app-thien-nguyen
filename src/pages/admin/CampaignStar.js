import { useState } from "react";
import Manage from "./Manage";
import classes from "./CampaignStar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, Space, Table } from "antd";
import { getAllFeedbacks, sendFeedbackToUser } from "./AdminService";
import { useEffect } from "react";
import { setMessages } from "../../redux/adminSlice";

const CampaignStar = () => {
  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.admin.messages).map((item) => ({
    id: item.id,
    message: item.message,
    reply: item.reply,
    UserSendId: item.userAccount.id,
    UserSendUserName: item.userAccount.userName,
    UserSendRoleId: item.userAccount.roleId,
  }));

  const handleResponseUser = async (value) => {
    setOpen(false);
    setMes("");
    const data = await sendFeedbackToUser({
      content: mes,
      user_id_receive: value,
    });

    (async () => {
      const messages = await getAllFeedbacks();
      dispatch(setMessages(messages));
    })();
  };

  useEffect(() => {
    (async () => {
      const messages = await getAllFeedbacks();
      dispatch(setMessages(messages));
    })();
    return () => {};
  }, []);

  const columns = [
    {
      title: "Tên người gửi",
      dataIndex: "UserSendUserName",
      key: "UserSendUserName",
      align: "top",
    },
    {
      title: "Kiểu người gửi",
      key: "UserSendRoleId",
      render: (_, record) => (
        <p>
          {record.UserSendId === 1
            ? "Admin"
            : record.UserSendId === 2
            ? "Người dùng"
            : "Tổ chức"}
        </p>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      key: "content",
      width: "30%",
    },
    {
      title: "Thông báo",
      key: "content",
      render: (_, record) => (
        <p>
          {record && record.reply ? (
            record.reply
          ) : (
            <p style={{ color: "#f03e3e" }}>Chưa xử lý</p>
          )}
        </p>
      ),
      width: "30%",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => setOpen(true)}>
            Gửi lại phản hồi
          </Button>
          <Modal
            title="Gửi lại thông báo cho người dùng"
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
          >
            <Input
              onChange={(event) => setMes(event.target.value)}
              style={{ marginTop: "10px" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => handleResponseUser(record.id)}
                style={{ width: "140px", marginTop: "20px" }}
              >
                Gửi
              </Button>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  return (
    <Manage>
      <div className={classes.main}>
        <h2 className={classes["header-title"]}>Quản lý thông báo</h2>

        <div className={classes.list}>
          <Table
            dataSource={messages}
            columns={columns}
            // pagination={false}
            pagination={{
              defaultPageSize: 4,
              showSizeChanger: true,
              pageSizeOptions: ["6", "8"],
            }}
          />
        </div>
      </div>
    </Manage>
  );
};

export default CampaignStar;
