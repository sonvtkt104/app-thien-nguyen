import "../donation.css"
import { Button, Col, Input, Row, Modal, Image   } from 'antd'
import {EyeOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

import React, { useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonation, getMyDonation, updateMyDonation } from '../../../../redux/donationSlice'
import { getDonations } from '../listDonation/DonationService'
import { getApp, updateApp } from './MyDonationService';

import { TableApp } from "../../../../components/TableApp"
import { SegmentedApp } from "../../../../components/SegmentedApp"
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon"
import ModalDetail from '../ModalDetail';
import { PageLayout } from '../../../../components';



function MyDonation() {
    const dispatch = useDispatch()
    
    const [segment, setSegment] = useState("waitConfirmation")
    const [donations, setDonations] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [searchedData, setSearcheddata] = useState([])

    
    useEffect(()=> {
        getApp("abc123").then(res=> dispatch(getMyDonation(res.data)))
    },[segment, dataDetail])
    
    const myDonation = useSelector((state) => state.donation.myDonation)
    // console.log(myDonation)

    // console.log(dataDetail)

    useEffect(()=> {
        setDonations(myDonation)
        setSearcheddata(myDonation[segment])
    },[myDonation])

  


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
                        disabled={segment === "confirmed" || segment === "received" ? false : true}
                        onClick={() => {
                            let data = {}
                            if(segment === "confirmed") {
                                data = {...myDonation, "confirmed": [...myDonation.confirmed.filter(donation=> donation.id !== rowData.id)],
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
                            <EyeOutlined
                                className="donation-detail"
                                onClick={()=> {
                                    setOpenModalDetail(true)
                                    setDataDetail(rowData)
                                }}
                            />
                        {
                            segment === "cancel" ? 
                                <DeleteOutlined 
                                    className= "dnt-delete"
                                    onClick={() => {
                                        onDeleteDonation(rowData)
                                    }}
                                />
                            : null
                        }
                        
                    </>
                )
            }
        }
    ];

    const onDeleteDonation = (rowData) => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn xóa bản ghi này?`,
            okText: "Có",
            cancelText: "Quay lại",
            okType: "danger",
            onOk: () => {
                console.log("xoa xoa")
            }
        });
    };
    
    const globalSearch = (value) => {
        const filteredData = donations[segment].filter((donation) => {
            return (
                donation.name.toLowerCase().includes(value.toLowerCase()) ||
                donation.donationAddress.toLowerCase().includes(value.toLowerCase()) ||
                donation.contactInfo.toLowerCase().includes(value.toLowerCase()) ||
                donation.date.toLowerCase().includes(value.toLowerCase()) ||
                donation.donorName.toLowerCase().includes(value.toLowerCase()) ||
                donation.donationObject.toLowerCase().includes(value.toLowerCase())
            )
        })
        setSearcheddata(filteredData)
    }

    return (
        <PageLayout>  
            <div className="mdn-segmented">
                <SegmentedApp
                    value={segment}
                    options={[{label: "Đợi xác nhận", value: "waitConfirmation"}, {label: "Đã xác nhận", value: "confirmed" }, {label: "Đã nhận", value: "received" }, {label: "Đã quyên góp", value: "donated" }, {label: "Bị hủy", value: "cancel" }]}
                    onChange={(value) => {
                        setSegment(value)
                    }}
                />
            </div>
            <div className="mdn-modal">
                <div className="mdn-header">
                    <h2  className="mdn-title">Quyên góp của tôi</h2>
                    <Input.Search
                            placeholder="Tìm kiếm..."
                            allowClear 
                            onSearch={(value) => {
                                globalSearch(value)
                            }} 
                            onChange={(e) => {
                                globalSearch(e.target.value)
                            }}
                            className='mdb-input-search'
                        /> 
                </div>
                <TableApp
                    rowKey={(rowdata)=> rowdata.id} 
                    columns={segment === "cancel" ? columns.filter(column => column.key !== "8") :   (segment === "confirmed" || segment === "received" ?  columns.filter(column => column.key !== "7") : columns.filter(column => column.key !== "7" && column.key !== "8"))}
                    // columns={segment === "confirmed" || segment === "received" ? columns : columns.filter(column => column.key !== "8")}
                    // columns={columns}
                    dataSource={searchedData}
                />
             </div>
            {
                openModalDetail && <ModalDetail 
                                        dataDetail={dataDetail}
                                        handleCloseModalDetail={handleCloseModalDetail}
                                    />
            }

        </PageLayout>

    )
}


export default MyDonation