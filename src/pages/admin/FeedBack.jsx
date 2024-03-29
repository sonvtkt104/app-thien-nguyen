import { useState } from "react";
import Manage from "./Manage";
import "./FeedBack.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, Space, Table } from "antd";
import { getAllFeedbacks, sendFeedbackToUser } from "./AdminService";
import { useEffect } from "react";
import { setMessages } from "../../redux/adminSlice";
import { TableApp } from "../../components/TableApp/index";

const FeedBack = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState("");
  const [idSend, setIdSend] = useState(null);
  const messages = useSelector((state) => state.admin.messages).map((item) => ({
    id: item?.id,
    message: item?.message,
    reply: item?.reply,
    UserSendId: item?.userAccount.id,
    UserSendUserName: item?.userAccount?.name,
    UserSendRoleId: item?.userAccount?.roleId,
    timeCreate: item?.timeCreate?.slice(0, 10)
      ? item?.timeCreate?.slice(0, 10)
      : "Không có",
    timeReply: item?.timeReply?.slice(0, 10)
      ? item?.timeReply?.slice(0, 10)
      : "Không có",
  }));

  const handleResponseUser = async () => {
    setOpen(false);
    setMes("");

    const data = await sendFeedbackToUser({
      content: mes,
      user_id_receive: idSend,
    });

    (async () => {
      const messages = await getAllFeedbacks();
      dispatch(setMessages(messages));
    })();
  };

  useEffect(() => {
    (async () => {
      const messages = await getAllFeedbacks();
      console.log(messages);
      dispatch(setMessages(messages));
    })();
    return () => {};
  }, []);

  const columns = [
    {
      title: "Người gửi",
      dataIndex: "UserSendUserName",
      key: "UserSendUserName",
      align: "top",
    },
    {
      title: "Kiểu người gửi",
      key: "UserSendRoleId",
      render: (_, record) => (
        <p>
          {record.UserSendRoleId === 2
            ? "Người dùng"
            : record.UserSendRoleId === 3
            ? "Tổ chức"
            : ""}
        </p>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "message",
      key: "content",
      width: "20%",
    },
    {
      title: "Phản hồi",
      key: "content",
      render: (_, record) => (
        <p>
          {record && record.reply ? (
            record.reply
          ) : (
            <p style={{ color: "#e03131" }}>Chưa xử lý</p>
          )}
        </p>
      ),
      width: "20%",
    },
    {
      title: "Thời gian gửi",
      dataIndex: "timeCreate",
      key: "timeCreate",
    },
    {
      title: "Thời gian phản hồi",
      dataIndex: "timeReply",
      key: "timeReply",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setOpen(true);
              setIdSend(record.id);
            }}
          >
            Gửi phản hồi
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Manage>
      <div className="main-feedback">
        <h2 className="header-title">Quản lý thông báo</h2>

        <div className="list">
          <TableApp
            dataSource={messages}
            columns={columns}
            // pagination={false}
            pagination={{
              defaultPageSize: 4,
              showSizeChanger: true,
              pageSizeOptions: ["6", "8"],
            }}
          />

          <Modal
            title="Gửi Phản hồi cho người dùng"
            open={open}
            onCancel={() => setOpen(false)}
            footer={null}
            centered
          >
            <Input.TextArea
              onChange={(event) => setMes(event.target.value)}
              style={{ marginTop: "10px" }}
              rows={4}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={() => handleResponseUser()}
                style={{ width: "140px", marginTop: "20px" }}
              >
                Gửi
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </Manage>
  );
};

export default FeedBack;
