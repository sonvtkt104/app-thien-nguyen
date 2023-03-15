import { Button, Col, Input, Row, Modal, Image   } from 'antd'
import {EyeOutlined, PhoneOutlined} from '@ant-design/icons';

import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonation } from '../../../../redux/donationSlice'
import { getDonations } from './DonationService'

import { TableApp } from "../../../../components/TableApp"
import { DetailIcon } from '../../../../components/Icon/DetailIcon'
import ModalDetail from '../ModalDetail';
// import { Table } from "ant-table-extensions";
import { PageLayout } from '../../../../components';

function Donation() {
    const dispatch = useDispatch()
    
    const [donations, setDonations] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [openModalConfirm, setOpenModalConfirm] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    // const [searchedText, setSearchedText] = useState("")
    // const [searchedText1, setSearchedText1] = useState("")
    // const [searchedData, setSearcheddata] = useState([])
    
    useEffect(()=> {
        getDonations().then(res=> dispatch(getDonation(res.data)) )
    },[])
    const listdonation = useSelector((state) => state.donation.donation)
    // console.log(listdonation)
    
    useEffect(()=> {
        setDonations(listdonation)
    },[listdonation])

    // console.log(donations)
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
            title: "Thông tin liên hệ",
            dataIndex: "contactInfo",
        },
        {
            key: "7",
            title: "Hành động",
            align: 'center',
            render: (rowData) => {
                return (
                    <>
                        <EyeOutlined
                            title='Xem chi tiet'
                            className='donation-detail'
                            onClick={()=> {
                                setOpenModalDetail(true)
                                setDataDetail(rowData)
                            }}
                        />
                        <PhoneOutlined 
                            className='donation-phone'
                            onClick={()=> {
                                setOpenModalConfirm(true)
                                setDataDetail(rowData)
                            }}
                        />
                    </>
                )
            }
        }
        // {
        //   key: "6",
        //   title: "Actions",
        //   render: (record) => {
        //     return (
        //       <>
        //         <EditOutlined
        //           title="sua"
        //           onClick={() => {
        //             onEditStudent(record);
        //           }}
        //         />
        //         <DeleteOutlined
        //           onClick={() => {
        //             onDeleteStudent(record);
        //           }}
        //           style={{ color: "red", marginLeft: 12 }}
        //         />
        //       </>
        //     );
        //   },
        // },
      ];
    // console.log(dataDetail)
    // const globalSearch = () => {
    //     const filteredData = donations.filter((value) => {
    //         return (
    //             value.name.toLowerCase().includes(searchedText.toLowerCase()) ||
    //             value.donationObject.toLowerCase().includes(searchedText.toLowerCase())
    //         )
    //     })
    //     setSearcheddata(filteredData)
    // }
    return (
        <PageLayout>

            <div>  
                {/* <Input.Search
                    placeholder="Tìm kiếm..."
                    allowClear 
                    onSearch={(value) => {
                        setSearchedText(value)
                    }} 
                    onChange={(e) => {
                        setSearchedText(e.target.value)
                    }}
                    style={{ width: 200 }}
                />
                <Input.Search
                    placeholder="Tìm kiếm..."
                    onSearch={(value) => {
                        setSearchedText1(value)
                    }} 
                    onChange={(e) => {
                        setSearchedText1(e.target.value)
                    }}
                    style={{ width: 200 }}
                /> */}
                <TableApp
                    title="Danh sách" columns={columns} dataSource={donations}
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
                    okText="Liên hệ"
                >
                    <p>Bạn chắc chắn muốn liên hệ với {dataDetail.donorName}</p>
                </Modal>

                {
                    openModalDetail && <ModalDetail 
                                            dataDetail={dataDetail}
                                            handleCloseModalDetail={handleCloseModalDetail}
                                        />
                }
                

            </div>
        </PageLayout>

    )
}


export default Donation