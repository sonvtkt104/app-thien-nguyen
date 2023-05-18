import { Button, Col, Input, Row, Modal, Image, Table   } from 'antd'
import {EyeOutlined, PhoneOutlined, SearchOutlined} from '@ant-design/icons';

import React, { useState, useEffect, useMemo} from 'react'

import { TableApp } from "../../../../components/TableApp"
import ModalDetail from '../ModalDetail';
import { PageLayout } from '../../../../components';
import { getDonationPostUser, updateDonationPostUser, getCurrentUser } from '../../../client/MyAccount/MyAccountService';
import { getUserInfomationFromCookies, getInfoOfUserFromCookies } from '../../../Authentication/HandleUserInfomation';
import { toast } from "react-toastify";
import { useSelector } from "react-redux"

function Donation() {
    const { infoUser } = useSelector(state => state?.app)

    const [donations, setDonations] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [searchedData, setSearcheddata] = useState([])
    const [reloadData, setReloadData] = useState({})
    const [infoCurrent, setInfoCurrent] = useState()
    
    // console.log(getUserInfomationFromCookies)

    useEffect(() => {
        getCurrentUser().then(res => {
            setInfoCurrent(res?.data.data)
        })
    },[])
    
    useEffect(()=> {
        getDonationPostUser().then(res => {
            console.log(res.data)
            setDonations(res.data.filter(data => data.status === "Chưa nhận"))
            setSearcheddata(res.data.filter(data => data.status === "Chưa nhận"))
        })
    },[reloadData])

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
            render: (rowData) => {
              return (
                <p key={rowData.id}>{rowData.phone}, {rowData.address}</p>
              )
            }
        },
        {
            key: "7",
            title: "Hành động",
            align: 'center',
            render: (rowData) => {
                return (
                    <div key={rowData.id}>
                        <EyeOutlined
                            title='Xem chi tiet'
                            className='donation-detail'
                            onClick={()=> {
                                console.log(rowData)
                                setOpenModalDetail(true)
                                setDataDetail(rowData)
                            }}
                        />
                        <PhoneOutlined 
                            className='donation-phone'
                            style={rowData.listRequest?.reduce((arr,data) => [...arr, data.id], []).includes(getInfoOfUserFromCookies()?.charityId) ? {
                              opacity:"0.4",
                              // pointerEvents: "none",
                              cursor:"no-drop",
                            } : null
                            }
                            onClick={rowData.listRequest?.reduce((arr,data) => [...arr, data.id], []).includes(getInfoOfUserFromCookies()?.charityId) ? () => false : ()=> {
                                setReloadData(rowData)
                                console.log(rowData)
                                onContact(rowData)
                            }}
                        />
                    </div>
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
                rowData.listRequest = [...rowData.listRequest, {status: "Đợi xác nhận", id: getInfoOfUserFromCookies()?.charityId, name: getInfoOfUserFromCookies()?.name }]
                
                const dataUpdateDonationPostUser = {...rowData}
                delete dataUpdateDonationPostUser.organizationReceived
                delete dataUpdateDonationPostUser.donorName
                delete dataUpdateDonationPostUser.phone
                delete dataUpdateDonationPostUser.province
                delete dataUpdateDonationPostUser.ward
                delete dataUpdateDonationPostUser.district
                delete dataUpdateDonationPostUser.address
                console.log(dataUpdateDonationPostUser)
                updateDonationPostUser(dataUpdateDonationPostUser).then(res => {
                    if(res?.status === 200) {
                        toast.success("Liên hệ thành công thành công!")
                        setReloadData({})
                    } else {
                        toast.error("Hệ thống lỗi, xin thử lại sau!")
                    }
                })


            }
        });
    };
    const globalSearch = (value) => {
        const filteredData = donations.filter((donation) => {
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
        <PageLayout keyActive='donation'>
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