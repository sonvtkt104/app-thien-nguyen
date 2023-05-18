import { useState } from "react";
import Manage from "./Manage";
import classes from "./CampaignStar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, Space, Table } from "antd";
import { getAllMessages, sendMessageToUser } from "./AdminService";
import { useEffect } from "react";
import { setMessages } from "../../redux/adminSlice";

const CampaignStar = () => {
  const [open, setOpen] = useState(false);
  const [mes, setMes] = useState("");
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.admin.messages).map((item) => ({
    id: item.id,
    content: item.content,
    UserSendId: item.userIdSend.id,
    UserSendUserName: item.userIdSend.userName,
    UserReceiveId: item.userIdReceive.id,
    UserReceiveUserName: item.userIdReceive.userName,
  }));

  const handleResponseUser = async (value) => {
    setOpen(false);
    const data = await sendMessageToUser({
      content: mes,
      user_id_receive: value,
    });
  };

  useEffect(() => {
    (async () => {
      const messages = await getAllMessages();
      dispatch(setMessages(messages));
    })();
    return () => {};
  }, []);

  const columns = [
    {
      title: "Tên người gửi",
      dataIndex: "UserSendUserName",
      key: "UserSendUserName",
    },
    {
      title: "Tên người nhận",
      dataIndex: "UserReceiveUserName",
      key: "UserReceiveUserName",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => setOpen(true)}>
            Gửi thông báo đến người dùng
          </Button>
          <Modal
            title="Gửi thông báo cho người dùng"
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
                onClick={() => handleResponseUser(record.UserSendId)}
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
        <h2 className={classes["header-title"]}>Cuộc vận động nổi bật</h2>

        <div className={classes.list}>
          <Table dataSource={messages} columns={columns} pagination={false} />
        </div>
      </div>
    </Manage>
  );
};

export default CampaignStar;
