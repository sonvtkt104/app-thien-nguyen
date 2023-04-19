import { Button, Col, Input, Row, Modal, Image, Table   } from 'antd'
import {EyeOutlined, PhoneOutlined, SearchOutlined} from '@ant-design/icons';

import React, { useState, useEffect, useMemo} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TableApp } from "../../../../components/TableApp"
import ModalDetail from '../ModalDetail';
import { PageLayout } from '../../../../components';

import { getDonation } from '../../../../redux/donationSlice'
import { getDonations, updateDonationByID, postDonation } from './DonationService'
import { updateDonationPostUser } from '../../../client/MyAccount/MyAccountService';


function Donation() {
    const dispatch = useDispatch()
    
    const [donations, setDonations] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    const [searchedData, setSearcheddata] = useState([])
    const [reloadData, setReloadData] = useState({})
    
    const [requestList, setRequestList] = useState([])


    useEffect(()=> {
        // getDonations().then(res=> dispatch(getDonation(res.data)) )
        getDonations().then(res=> {
            console.log(res.data)
            setDonations(res.data.filter(data => data.status === "public"))
            setSearcheddata(res.data.filter(data => data.status === "public"))})
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
            // dataIndex: "contactInfo",
            render: (rowData) => {
              // console.log(rowData)
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
                // console.log(rowData)
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
                            style={rowData.listRequest?.reduce((arr,data) => [...arr, data.id], []).includes("abc123") ? {
                              opacity:"0.4",
                              // pointerEvents: "none",
                              cursor:"no-drop",
                            } : null
                            }
                            onClick={rowData.listRequest?.reduce((arr,data) => [...arr, data.id], []).includes("abc123") ? () => false : ()=> {
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
                //update trang thai phone
                setReloadData({})
                rowData.listRequest = [...rowData.listRequest, {status: "Đợi xác nhận", id: "abc123", name: "Áo ấm cho em" }]
                console.log(rowData)
                updateDonationByID(rowData.id, rowData)
                    .then(res => {
                        console.log(res)
                        // const dataPostDonationContact = {...rowData, status:"Đợi xác nhận",idOrganization: "abc123", organizationReceived: "Áo ấm cho em"}
                        // delete dataPostDonationContact.id
                        // postDonation(dataPostDonationContact)
                        // .then(res => console.log(res))
                    })

                
                //update trang thai ben danh sach bai dang
                // const dataUpdateDonationPostUser = {...rowData, listRequest: [...rowData.listRequest, {id: "abc123", name: "Áo ấm cho em" }]}
                const dataUpdateDonationPostUser = {...rowData, status:"Chưa nhận" }
                const idUpdateDonationPostUser = rowData.idPost
                delete dataUpdateDonationPostUser.id
                delete dataUpdateDonationPostUser.idPost
                updateDonationPostUser(idUpdateDonationPostUser,dataUpdateDonationPostUser).then(res => console.log(res))


                //them vao mydonation
                // const dataPostDonationContact = {...rowData, status:"Đợi xác nhận",idOrganization: "abc123"}
                // delete dataPostDonationContact.id
                // postDonation(dataPostDonationContact)
                //   .then(res => console.log(res))


                // console.log("haha")
                // console.log(idUpdateDonationPostUser)
                // console.log(dataUpdateDonationPostUser)


                
                // rowData.idPost = rowData.id
                // rowData.status = "Đợi xác nhận"
                // delete rowData.id
                // rowData.idOrganization = "abc123"

                // console.log("lien he")
                // console.log("rowData", rowData)
                // console.log("dataPostDonationContact", dataPostDonationContact)


                // them vao xac nhan
                // const add = () => {
                //   const data = {}
                //   data.idDonor = rowData.idDonor
                //   data.idPost = rowData.idPost
                //   data.name = rowData.name
                //   data.listRequest = [{id: "abc123", name: "Áo ấm cho em" }]
                //   console.log("them moi", data)
                //   postRequestList(data).then(res => console.log(res))
                // }
                // if (requestList.length === 0) {
                //     add()
                // } else {
                //     let isFind = false
                //     let dataUpdate = {}
                //     requestList.map(request => {
                //         if (request.idPost === rowData.idPost) {
                //           // request.listRequest.push({id: "abc12345", name: "Áo ấm cho em" })
                //           dataUpdate = request
                //           isFind = true
                //         }
                //     })

                //     if (!isFind) {
                //       add()
                //     } else {
                //       // console.log("update", requestList)
                //       dataUpdate.listRequest.push({id: "abc123", name: "Áo ấm cho em" })
                //       console.log("update", dataUpdate)
                //       updateRequestList(dataUpdate.id, dataUpdate).then(res => console.log(res))
                //     }
            
                // }
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