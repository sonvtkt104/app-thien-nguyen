import "../donation.css"
import { Button, Col, Input, Row, Modal, Image   } from 'antd'
import {EyeOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

import React, { useState, useEffect, useRef, useMemo} from 'react'
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
        // getApp("abc123").then(res=> dispatch(getMyDonation(res.data)))
        setDonations(myDonation)
        setSearcheddata(myDonation[segment])
    },[segment, dataDetail])
    
    // const myDonation = useSelector((state) => state.donation.myDonation)
    // // console.log(myDonation)

    // // console.log(dataDetail)

    // useEffect(()=> {
    //     setDonations(myDonation)
    //     setSearcheddata(myDonation[segment])
    // },[myDonation])

    const myDonation = useMemo(() => {
      return {
        "waitConfirmation": [
          {
            "id": "6",
            "idDonor": "abcd12345",
            "status": "Đợi xác nhận",
            "name": "Sách vở 2",
            "donationAddress": "Hà Nam",
            "donationObject": "Trẻ em khó khăn",
            "donorName": "Khuất Văn Hải",
            "phone": "0123456789",
            "address": "Xuân Thủy Cầu Giấy Hà Nội",
            "date": "03/12/2023",
            "description": "Sách vở cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          },
          {
            "id": "7",
            "idDonor": "abcd12345",
            "status": "Đợi xác nhận",
            "name": "Quần áo 3",
            "donationAddress": "Nam Định",
            "donationObject": "Trẻ em vùng cao",
            "donorName": "Khuất Văn Hải",
            "phone": "0123456789",
            "address": "Cầu Giấy Hà Nội",
            "date": "03/12/2023",
            "description": "Quần áo cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          }
        ],
        "confirmed": [
          {
            "id": "8",
            "idDonor": "abcd12345",
            "status": "Đã xác nhận",
            "name": "Giày dép",
            "donationAddress": "Hà Giang",
            "donationObject": "Gia đình khó khăn",
            "donorName": "Nguyễn Xuân Sơn",
            "phone": "0123456789",
            "address": "Đống Đa Hà Nội",
            "date": "05/07/2022",
            "description": "Giày dép cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          },
          {
            "id": "9",
            "idDonor": "abcd12345",
            "status": "Đã xác nhận",
            "name": "Đồ dùng học tập",
            "donationAddress": "Hà Tĩnh",
            "donationObject": "Học sinh khó khăn",
            "donorName": "Nguyễn Bá Tiên",
            "phone": "0123456789",
            "address": "Đội Cấn Hà Nội",
            "date": "21/08/2021",
            "description": "Đồ dùng học tập đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          },
          {
            "id": "13",
            "idDonor": "abcd12345",
            "status": "Đã xác nhận",
            "name": "Balo",
            "donationAddress": "Quảng Ninh",
            "donationObject": "Trẻ em vùng cao",
            "donorName": "Khuất Văn Hải",
            "phone": "0123456789",
            "address": "Cầu Giấy Hà Nội",
            "date": "25/02/2020",
            "description": "Balo đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          }
        ],
        "received": [
          {
            "id": "10",
            "idDonor": "abcd12345",
            "status": "Đã nhận",
            "name": "Mì tôm",
            "donationAddress": "Bắc Kạn",
            "donationObject": "Vùng gặp thiên tai",
            "donorName": "Trịnh Hoàng",
            "phone": "0123456789",
            "address": "Hào Nam Hà Nội",
            "date": "03/12/2023",
            "description": "Quần áo cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          },
          {
            "id": "11",
            "idDonor": "abcd12345",
            "status": "Đã nhận",
            "name": "Máy tính",
            "donationAddress": "Cao Bằng",
            "donationObject": "Trường học",
            "donorName": "Lê Mạnh Linh",
            "phone": "0123456789",
            "address": "Xuân Thủy Hà Nội",
            "date": "30/08/2022",
            "description": "Máy tính cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          }
        ],
        "donated": [
          {
            "id": "12",
            "idDonor": "abcd12345",
            "status": "Đã quyên góp",
            "name": "Vật dụng cá nhân",
            "donationAddress": "Hải Phòng",
            "donationObject": "Gia đình khó khăn",
            "donorName": "Lê Văn Kiên",
            "phone": "0123456789",
            "address": "Ngã Tư Sở Hà Nội",
            "date": "18/04/2020",
            "description": "Vật dụng cá nhân đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          }
        ],
        "cancel": [
          {
            "id": "14",
            "idDonor": "abcd12345",
            "status": "Hủy",
            "name": "Sách vở 6",
            "donationAddress": "Hà Nam",
            "donationObject": "Trẻ em khó khăn",
            "donorName": "Khuất Văn Hải",
            "phone": "0123456789",
            "address": "Cầu Giấy Hà Nội",
            "date": "03/12/2023",
            "description": "Sách vở cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          },
          {
            "id": "15",
            "idDonor": "abcd12345",
            "status": "Từ chối xác nhận",
            "name": "Sách vở 7",
            "donationAddress": "Hà Nam",
            "donationObject": "Trẻ em khó khăn",
            "donorName": "Khuất Văn Hải",
            "phone": "0123456789",
            "address": "Cầu Giấy Hà Nội",
            "date": "03/12/2023",
            "description": "Sách vở cũ đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng đã phân loại và gấp gon gàng",
            "images": [
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
              "https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500"
            ]
          }
        ]
      }
    },[])
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
            // dataIndex: "contactInfo",
            render: (rowData) => {
              return (
                <div key={rowData.id}>{rowData.phone}, {rowData.address}</div>
              )
            }
        },
        {
            key: "7",
            title: "Trạng thái",
            dataIndex: "status",
        },
        {
            key: "8", 
            title: "Chuyển trạng thái tiếp theo",
            align: 'center',
            render: (rowData) => {
                return (
                    <div key={rowData.id}>
                      <Button 
                        type="primary" 
                        disabled={segment === "confirmed" || segment === "received" ? false : true}
                        onClick={() => {
                            let data = {}
                            if(segment === "confirmed") {
                                data = {...myDonation, "confirmed": [...myDonation.confirmed.filter(donation=> donation.id !== rowData.id)],
                                     "received": [{...rowData, status:"Đã nhận"}, ...myDonation.received]}

                            }

                            if(segment === "received") {
                                data = {...myDonation, "received": [...myDonation.received.filter(donation=> donation.id !== rowData.id)],
                                     "donated": [{...rowData, status:"Đã quyên góp"}, ...myDonation.donated]}

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
                    </div>
                )
            }
        },
        {
            key: "9",
            title: "Hành động",
            align: 'center',
            render: (rowData) => {
                return (
                    <div key={rowData.id}>
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
                        
                    </div>
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
                donation.phone.toLowerCase().includes(value.toLowerCase()) ||
                donation.address.toLowerCase().includes(value.toLowerCase()) ||
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
                    className="mdn-segmenttedApp"
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