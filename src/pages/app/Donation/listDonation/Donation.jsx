import { Button, Col, Input, Row, Modal, Image   } from 'antd'
import {EyeOutlined, PhoneOutlined, SearchOutlined} from '@ant-design/icons';

import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonation } from '../../../../redux/donationSlice'
import { getDonations } from './DonationService'

import { TableApp } from "../../../../components/TableApp"
import { DetailIcon } from '../../../../components/Icon/DetailIcon'
import ModalDetail from '../ModalDetail';
import { PageLayout } from '../../../../components';
import { Table, SearchTableInput } from "ant-table-extensions";



function Donation() {
    const dispatch = useDispatch()
    
    const [donations, setDonations] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [searchedData, setSearcheddata] = useState([])
    
    useEffect(()=> {
        getDonations().then(res=> dispatch(getDonation(res.data)) )
    },[])

    const listdonation = useSelector((state) => state.donation.donation)
    // console.log(listdonation)
    
    useEffect(()=> {
        setDonations(listdonation)
        setSearcheddata(listdonation)
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
                                onContact(rowData)
                            }}
                        />
                    </>
                )
            }
        }
      ];

    const onContact = (rowData) => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn liên hệ với ${rowData.donorName}?`,
            cancelText: "Quay lại",
            okText: "Có",
            okType: "danger",
            onOk: () => {
                console.log("lien he")
            }
        });
    };
    const globalSearch = (value) => {
        const filteredData = donations.filter((donation) => {
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
            <div className='dn-modal'>
                <div className='dn-modal-content'>
                    <div className='dn-header'>
                        <h2 className='dn-title'>Danh sánh quyên góp</h2>
                        <Input.Search
                            placeholder="Tìm kiếm..."
                            allowClear 
                            onSearch={(value) => {
                                globalSearch(value)
                            }} 
                            onChange={(e) => {
                                globalSearch(e.target.value)
                            }}
                            className= "db-input-search"
                        /> 
                    </div>
                    <TableApp
                        rowKey={(rowdata)=> rowdata.id} 
                        columns={columns} 
                        dataSource={searchedData}
                    />
                </div>

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