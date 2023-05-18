import { useEffect, useRef, useState } from "react";
import Manage from "./Manage";
import classes from "./ManageCVD.module.css";
import { Select, Table, Modal, Button, Space, Row, Col, Image } from "antd";
import { useSelector } from "react-redux";

const ManageCVD = () => {
  const charity = useSelector((state) => state.admin.users).filter((item) => {
    const { charityId } = item;
    return charityId;
  });

  const optionCharity =
    charity.length === 0
      ? []
      : [
          ...charity.map((item) => ({
            value: item.charityId,
            label: item.name,
          })),
        ];

  const campaignsList = useSelector((state) => state.admin.campaigns);
  const hanleOnchangeSearch = (value) => {};

  return (
    <Manage>
      <div className={classes.main}>
        <div className={classes.headerCharity}>
          <h2 className={classes.titleCharity}>Tổ chức</h2>

          <Select
            showSearch
            style={{
              width: 300,
              // height: 60,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={optionCharity}
            onChange={(value) => hanleOnchangeSearch(value)}
          />
        </div>

        <Row>
          <Col span={12}>
            <h3>Thông tin của tổ chức</h3>
          </Col>

          <Col span={12}>
            <h3>Xác minh tổ chức</h3>

            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              <Image
                width={200}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </div>
            <Button>Xác minh tổ chức</Button>
          </Col>
        </Row>
      </div>
    </Manage>
  );
};

export default ManageCVD;
