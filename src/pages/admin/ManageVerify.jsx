import { useEffect, useRef, useState } from "react";
import Manage from "./Manage";
import classes from "./ManageVerify.module.css";
import {
  Select,
  Table,
  Modal,
  Button,
  Space,
  Row,
  Col,
  Image,
  List,
  Input,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { changeVerified, getListVerified, notifyToUser } from "./AdminService";
import { setListVerifies } from "../../redux/adminSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { TableApp } from "../../components/TableApp/index";
import { getUserInfomationFromCookies } from "../Authentication/HandleUserInfomation";

const ManageVerify = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idShowCharityFile, setIdShowCharityFile] = useState(null);
  const [idCharitySend, setIdCharitySend] = useState(null);
  const [isModalDenyOpen, setIsModalDenyOpen] = useState(false);
  const [isModalSuccsssOpen, setIsSuccssDenyOpen] = useState(false);
  const [messageToCharity, setMessageToCharity] = useState("");
  const [messageSuccessToCharity, setMessageSuccessToCharity] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isLoadingDeny, setIsloadingDeny] = useState(false);

  const charities = useSelector((state) => state.admin.users).filter((item) => {
    const { charityId } = item;
    return charityId;
  });
  const verifies = useSelector((state) => state.admin.listVerifies);

  const showModalFile = (charityId) => {
    setIsModalOpen(true);
    setIdShowCharityFile(charityId);
  };

  const handleAnnouceToUser = async (message) => {
    const data = {
      message: message,
      create: getUserInfomationFromCookies().Id,
      receive: idCharitySend,
    };

    const response = await notifyToUser(data);
  };

  const handleVerifyCharity = async (charityId) => {
    setIsSuccssDenyOpen(false);
    const data = {
      charityId: idCharitySend,
      isAccepted: true,
    };

    setIsloading(true);

    const response = await changeVerified(data);

    setIsloading(false);
    handleAnnouceToUser(messageSuccessToCharity);
    if (response.isSuccess) {
      (async () => {
        const resData = await getListVerified();
        dispatch(setListVerifies(resData.data));
      })();
      toast.success("Xác minh tổ chức thành công");
    }
  };

  const handDenyVerifyCharity = (charityId) => {
    setIsModalDenyOpen(true);
    setIdCharitySend(charityId);
  };

  const handVerifyCharity = (charityId) => {
    setIsSuccssDenyOpen(true);
    setIdCharitySend(charityId);
  };

  const hanleDenySendToBackend = async () => {
    setIsModalDenyOpen(false);
    const data = {
      charityId: idCharitySend,
      isAccepted: false,
      message: messageToCharity,
    };

    setIsloadingDeny(true);

    const response = await changeVerified(data);

    setIsloadingDeny(false);
    handleAnnouceToUser(messageToCharity);
    if (response.isSuccess) {
      (async () => {
        const resData = await getListVerified();
        dispatch(setListVerifies(resData.data));
      })();
      toast.success("Từ xác minh tổ chức thành công");
    }
  };

  const columns = [
    {
      title: "Tên tổ chức",
      dataIndex: "charityName",
      key: "charityName",
    },
    {
      title: "Cấp tích xanh",
      key: "isVerified",
      render: (_, record) => (
        <p>
          {record.isVerified === 0
            ? "Chưa cấp"
            : record.isVerified === 1
            ? "Chờ xác minh"
            : record.isVerified === 2
            ? "Đã cấp"
            : "Bị Hủy"}
        </p>
      ),
    },
    {
      title: "Trang chủ",
      key: "charityId",
      render: (_, record) => (
        <Link
          to={`/profile-charity/${record.charityId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Link tới trang charity
        </Link>
      ),
    },
    {
      title: "File xác minh",
      render: (_, record) => (
        <Button onClick={() => showModalFile(record.charityId)}>
          Bấm vào để mở
        </Button>
      ),
      key: "img",
    },
    {
      title: "Cấp Tích xanh",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className={classes["user-button"]}
            onClick={() => handVerifyCharity(record.charityId)}
            loading={isLoading}
          >
            Cấp
          </Button>

          <Button
            type="primary"
            danger
            className={classes["user-button"]}
            onClick={() => handDenyVerifyCharity(record.charityId)}
            loading={isLoadingDeny}
          >
            Từ chối
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      const resData = await getListVerified();
      dispatch(setListVerifies(resData.data ? resData.data : []));
    })();
    return () => {};
  }, []);

  return (
    <Manage>
      <div className={classes.main}>
        <div className={classes.headerCharity}>
          <h2 className={classes.titleCharity}>Cấp tích xanh cho tổ chức</h2>
        </div>

        <TableApp
          dataSource={verifies}
          columns={columns}
          // pagination={false}
          pagination={{
            defaultPageSize: 4,
            showSizeChanger: true,
            pageSizeOptions: ["8", "10"],
          }}
        />
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            title="Xác minh tổ chức"
            footer={null}
            onCancel={() => setIsModalOpen(false)}
            width={800}
            centered
          >
            <p>
              {verifies &&
                verifies.filter(
                  (item) => item.charityId === idShowCharityFile
                )[0].messageToAdmin}
            </p>

            <h4 style={{ marginTop: "12px", fontSize: "16px" }}>
              Các hình ảnh
            </h4>

            <div style={{ display: "flex", gap: "20px" }}>
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) =>
                    console.log(
                      `current index: ${current}, prev index: ${prev}`
                    ),
                }}
              >
                {verifies
                  .filter((item) => item.charityId === idShowCharityFile)[0]
                  .charityFile.split(", ")
                  .map((item) => (
                    <Image width={200} height={200} src={item} />
                  ))}
              </Image.PreviewGroup>
            </div>
          </Modal>
        )}

        {isModalDenyOpen && (
          <Modal
            open={isModalDenyOpen}
            title="Từ chối xác minh tổ chức"
            footer={null}
            onCancel={() => setIsModalDenyOpen(false)}
          >
            <Input.TextArea
              rows={4}
              onChange={(event) => setMessageToCharity(event.target.value)}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12px",
              }}
            >
              <Button
                onClick={() => hanleDenySendToBackend()}
                type="primary"
                danger
              >
                Gửi
              </Button>
            </div>
          </Modal>
        )}
        {isModalSuccsssOpen && (
          <Modal
            open={isModalSuccsssOpen}
            title="Xác minh tổ chức"
            footer={null}
            onCancel={() => setIsSuccssDenyOpen(false)}
          >
            <Input.TextArea
              rows={4}
              onChange={(event) =>
                setMessageSuccessToCharity(event.target.value)
              }
            />

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "12px",
              }}
            >
              <Button onClick={() => handleVerifyCharity()} type="primary">
                Gửi
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </Manage>
  );
};

export default ManageVerify;
