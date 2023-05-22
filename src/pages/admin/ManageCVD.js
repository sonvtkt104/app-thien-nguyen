import { useEffect, useRef, useState } from "react";
import Manage from "./Manage";
import classes from "./ManageCVD.module.css";
import { Select, Table, Modal, Button, Space, Row, Col, Image } from "antd";
import { useSelector } from "react-redux";

const ManageCVD = () => {
  const charities = useSelector((state) => state.admin.users).filter((item) => {
    const { charityId } = item;
    return charityId;
  });

  console.log(charities);

  const columns = [
    {
      title: "Tên tổ chức",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Cấp tích xanh",
      key: "isVerified",
      render: (_, record) => (
        <p>{record.isVerified === 0 ? "Chưa cấp" : "Cấp rồi"}</p>
      ),
    },
    {
      title: "Trang chủ",
      key: "charityId",
      render: (_, record) => (
        <a href={`/profile-charity/${record.charityId}`}>
          Link tới trang charity
        </a>
      ),
    },
    {
      title: "Hình ảnh",
      render: (_, record) => <Button>Mở Hình ảnh</Button>,
      key: "img",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className={classes["user-button"]}
            // onClick={() => handleBanUser(record.id)}
          >
            Cấp tích xanh
          </button>
        </Space>
      ),
    },
  ];

  return (
    <Manage>
      <div className={classes.main}>
        <div className={classes.headerCharity}>
          <h2 className={classes.titleCharity}>Cấp tích xanh cho tổ chức</h2>
        </div>

        <Table
          dataSource={charities}
          columns={columns}
          // pagination={false}
          pagination={{
            defaultPageSize: 6,
            showSizeChanger: true,
            pageSizeOptions: ["8", "10"],
          }}
        />
      </div>
    </Manage>
  );
};

export default ManageCVD;
