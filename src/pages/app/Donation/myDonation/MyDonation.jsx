import "../donation.css"
import { Button, Col, Input, Row, Table, Modal, Image   } from 'antd'
import {EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonation, getMyDonation, updateMyDonation } from '../../../../redux/donationSlice'
import { getDonations } from '../listDonation/DonationService'
import { getApp, updateApp } from './MyDonationService';

import { TableApp } from "../../../../components/TableApp"
import { SegmentedApp } from "../../../../components/SegmentedApp"
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon"
// import { Button } from '../../../components/Button';
import ModalDetail from '../ModalDetail';





function MyDonation() {
    const dispatch = useDispatch()
    
    const [segment, setSegment] = useState("waitConfirmation")
    const [donations, setDonations] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    // const [test, setTest] = useState(0)

    useEffect(()=> {
        getApp("abc123").then(res=> dispatch(getMyDonation(res.data)))
    },[segment, dataDetail])

    const myDonation = useSelector((state) => state.donation.myDonation)
    // console.log(dataDetail)


    useEffect(()=> {
        setDonations(myDonation)
        console.log("myDonation update")
    },[myDonation])

    // console.log("donations",donations)

    const handleCloseModalDetail = () => {
        setOpenModalDetail(false)
        setDataDetail({})
    }

    const columns = [
        {
          key: "1",
          title: "Tên",
          dataIndex: "name",
        },
        {
          key: "2",
          title: "Người ủng hộ",
          dataIndex: "donorName",
        },
        {
          key: "3",
          title: "Địa chỉ ủng hộ",
          dataIndex: "donationAddress",
        },
        {
          key: "4",
          title: "Đối tượng ủng hộ",
          dataIndex: "donationObject",
        },
        {
          key: "5",
          title: "Ngày đăng",
          dataIndex: "date",
        },
        {
            key: "6",
            title: "Liên hệ",
            dataIndex: "contactInfo",
        },
        {
            key: "7",
            title: "Trạng thái",
            dataIndex: "message",
        },
        {
            key: "8", 
            title: "Chuyển trạng thái tiếp theo",
            align: 'center',
            render: (rowData) => {
                return (
                    <Button 
                        type="primary" 
                        disabled={segment === "waitingReceive" || segment === "received" ? false : true}
                        onClick={() => {
                            let data = {}
                            if(segment === "waitingReceive") {
                                data = {...myDonation, "waitingReceive": [...myDonation.waitingReceive.filter(donation=> donation.id !== rowData.id)],
                                     "received": [{...rowData, message:"Đã nhận"}, ...myDonation.received]}

                            }

                            if(segment === "received") {
                                data = {...myDonation, "received": [...myDonation.received.filter(donation=> donation.id !== rowData.id)],
                                     "donated": [{...rowData, message:"Đã quyên góp"}, ...myDonation.donated]}

                            }
                            // test(data)
                            // setTest((test)=> {test++})
                            setDataDetail(rowData)
                            setDonations(data)
                            const id = "abc123"
                            const dataUpdate = {id: id, "myDonation": data}

                            updateApp(id,dataUpdate)
                            // getApp("abc123").then(res=> dispatch(getMyDonation(res.data)))
                            console.log(dataUpdate)
                            console.log(rowData)
                            console.log(myDonation)
                            console.log(segment) 
                        }}
                    >
                        Chuyển
                    </Button>
                    // segment === "waitConfirmation" || segment === "cancel" ? <Button type="primary" disabled>Chuyển</Button> : <Button type="primary">Chuyển</Button>
                )
            }
        },
        {
            key: "9",
            title: "Hành động",
            align: 'center',
            render: (rowData) => {
                return (
                    <>
                        {/* <span style={{ padding:"5px 4px" ,borderRadius:"50%", backgroundColor: "red"}}> */}
                            <EyeOutlined
                                className="donation-detail"
                                onClick={()=> {
                                    setOpenModalDetail(true)
                                    setDataDetail(rowData)
                                }}
                            />
                        {/* </span> */}
                        <DeleteOutlined 
                            className= "dnt-delete action-hover"
                            onClick={() => {
                                setOpenModalConfirm(true)
                                setDataDetail(rowData)
                            }}
                        />
                    </>
                )
            }
        }
      ];
    
    return (
        <>  
            <div style={{display:"flex",justifyContent: "center",alignItems: "center"}}>
                <SegmentedApp
                    style={{align:"center"}}
                    value={segment}
                    options={[{label: "Đợi xác nhận", value: "waitConfirmation"}, {label: "Đã xác nhận", value: "confirmed" }, {label: "Đã nhận", value: "received" }, {label: "Đã quyên góp", value: "donated" }, {label: "Bị hủy", value: "cancel" }]}
                    // options={["Đợi xác nhận","Chờ nhận", "Đã nhận", "Đã quyên góp", "Bị hủy"]}
                    onChange={(value) => {
                        setSegment(value)
                    }}
                />
            </div>
            <TableApp
                title="Danh sách" columns={columns} dataSource={donations[segment]}
            />
            <Modal
                title="Xác nhận"
                open={openModalConfirm}
                onCancel={()=> {
                    setOpenModalConfirm(false)
                }}
                onOk={() => {
                    setOpenModalConfirm(false)
        
                }}
                cancelText="Quay lại"
                okText="Xóa"
            >
                <p>Bạn chắc chắn muốn xóa bản ghi Quyên góp này của {dataDetail.donorName}</p>
            </Modal>
            {
                openModalDetail && <ModalDetail 
                                        dataDetail={dataDetail}
                                        handleCloseModalDetail={handleCloseModalDetail}
                                    />
            }

        </>

    )
}


export default MyDonation