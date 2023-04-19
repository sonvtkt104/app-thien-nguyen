import "./css/Confirmation.css"
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { TableApp } from "../../../components";
import { Button, Table, Modal } from "antd";
import { getDonations } from "../../app/Donation/listDonation/DonationService";
import { getDonationPostUser, updateDonationPostUser } from "./MyAccountService";
import { updateDonationByID, deleteDonationByID } from "../../app/Donation/listDonation/DonationService";
import axios from "axios";


function Confirmation() {

  const [requestList, setRequestList] = useState([])
  const [dataRow, setDataRow] = useState({})
  const [donations, setDonations] = useState([])

  useEffect(() => {
    getDonationPostUser().then(res => setRequestList(res.data.filter(data => data.idDonor === "abcd12345" &&
      data.status === "Chưa nhận" &&
      data.listRequest.length !== 0)))

  }, [dataRow])

  useEffect(() => {
    getDonations().then(res => {
      setDonations(res.data)
    })
  }, [])


  // console.log(requestList)
  // console.log(donations)
  // console.log(dataRow)

  const handleConfirmation = (rowData, row) => {
    Modal.confirm({
      title: `Bạn có chắc chắn, bạn muốn xác nhận cho tổ chức  ${row.name}?`,
      cancelText: "Quay lại",
      okText: "Có",
      okType: "danger",
      centered: "true",
      onCancel:() => {
        console.log("quay lai")
        setDataRow({})
      },
      onOk: async () => {
        setDataRow({})
        console.log(rowData)
        console.log(row)

        // console.log("update bai dang", rowData)
        updateDonationPostUser(rowData.id, { ...rowData, idOrganization: row.id, organizationReceived: row.name, listRequest: [], status: "Đã nhận" })
          .then(res => console.log(res))

        const dataUpdateDonationByID = { ...rowData}
        const idUpdateDonationByID = rowData.id + "or"
        dataUpdateDonationByID.idPost = rowData.id
        dataUpdateDonationByID.status = "private" 
        dataUpdateDonationByID.listRequest = rowData.listRequest.map(data => {
          return data.id === row.id ? {...data, status: "Đã xác nhận"} : {...data, status: "Bị hủy"}
        })
        dataUpdateDonationByID.idOrganization = row.id
        dataUpdateDonationByID.organizationReceived = row.name
        delete dataUpdateDonationByID.id

        console.log(idUpdateDonationByID)
        console.log(dataUpdateDonationByID)

        updateDonationByID(idUpdateDonationByID, dataUpdateDonationByID).then(res => console.log(res))

      }
    });

  }

  const columns = [
    {
      key: "1",
      title: "Tên",
      // dataIndex: "name",
      render: (rowData) => {
        return <div className="cm-name" key={rowData.id}>{rowData.name}</div>
      },
      align: 'center',
    },
    {
      key: "2",
      title: "Tổ chức muốn Xác nhận",
      align: 'center',
      render: (rowData) => {
        // console.log(rowData)
        return (
          rowData.listRequest.map((row, index) => {
            return (
              <div
                key={index}
                className="cm-border-or"

              >
                {row.name}
              </div>
            )
          })
        )
      }
    },
    {
      key: "3",
      title: "Hành động",
      align: 'center',
      render: (rowData) => {
        // console.log(rowData)
        return (
          rowData.listRequest.map((row, index) => {
            return (
              <div className="cm-border-action" key={index}>
                <Button
                  type="primary"
                  size="middle"
                  onClick={() => {
                    handleConfirmation(rowData, row)
                    setDataRow(row)
                  }}
                // key={index}
                >
                  Xác nhận
                </Button>
              </div>
            )
          })
        )
      }
    },
  ]


  return (
    <SideBar>
      <div className="cm-container" >
        <Table
          className="cm-table"
          bordered
          rowKey={(rowdata) => rowdata.id}
          columns={columns}
          dataSource={requestList}
          // dataSource={requestListTest}
          pagination={false}
        />
      </div>
    </SideBar>
  )
}

export default Confirmation