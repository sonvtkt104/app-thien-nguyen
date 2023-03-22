import "./css/Confirmation.css"
import SideBar from "./SideBar";
import { getRequestListByID } from "./MyAccountService";
import { useEffect, useState } from "react";
import { TableApp } from "../../../components";
import { Button, Table } from "antd";


function Confirmation() {

    const [requestList, setRequestList] = useState([])
    const [dataRow, setDataRow] = useState({})

    // const getRequest = () => {
    //     getRequestList("abcd12345").then(res => setRequestList(res.data))
    // }

    useEffect(() => {
        getRequestListByID("abcd12345").then(res => setRequestList(res.data.notifyWaitConfirmation))
    },[])


    // console.log(requestList)
    // console.log(dataRow)

    const requestListTest = [
        {
          "id": "2",
          "name": "Quần áo",
          "requestList": [
            {
              "id": "abc123",
              "name": "Hội Từ thiện Minh Tâm Hà Nội"
            },
            {
              "id": "ab12",
              "name": "Tu thien Ho Chi Minh"
            },
            {
              "id": "ab123",
              "name": "Tu thien da Nang"
            }
          ]
        },
        {
          "id": "3",
          "name": "May tinh",
          "requestList": [
            {
              "id": "abc1234",
              "name": "Từ thiện Nam Dinh"
            },
            {
              "id": "ab124",
              "name": "Tu thien Ha Nam"
            }
          ]
        },
        {
          "id": "4",
          "name": "Quần áo",
          "requestList": [
            {
              "id": "abc123",
              "name": "Hội Từ thiện Minh Tâm Hà Nội"
            },
            {
              "id": "ab12",
              "name": "Tu thien Ho Chi Minh"
            },
            {
              "id": "ab123",
              "name": "Tu thien da Nang"
            }
          ]
        },
        {
          "id": "5",
          "name": "May tinh",
          "requestList": [
            {
              "id": "abc1234",
              "name": "Từ thiện Nam Dinh"
            },
            {
              "id": "ab124",
              "name": "Tu thien Ha Nam"
            }
          ]
        }
      ]

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
                    rowData.requestList.map((row, index)=> {
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
                    rowData.requestList.map((row, index) => {
                        return (
                            <div className="cm-border-action" key={index}>
                                <Button
                                    type="primary"
                                    size="middle"
                                    onClick={()=> {
                                        setDataRow(row)
                                        // setRequestList((requestList) => requestList.filter(row => row.id !== rowData.id))
                                        
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
                    rowKey={(rowdata)=> rowdata.id} 
                    columns={columns} 
                    // dataSource={requestList}
                    dataSource={requestListTest}
                    pagination={false}
                />
            </div>
        </SideBar>
    )
}

export default Confirmation