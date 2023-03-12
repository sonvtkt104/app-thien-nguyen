import { Button, Col, Input, Row, Table, Modal, Image   } from 'antd'
import {EyeOutlined} from '@ant-design/icons';

import React, { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getDonation } from '../../../redux/donationSlice'
import { getDonations } from './DonationService'

import { TableApp } from "../../../components/TableApp"
import { DetailIcon } from '../../../components/Icon/DetailIcon'
import ModalDetail from './ModalDetail';

function Donation() {
    const dispatch = useDispatch()
    
    const [donations, setDonations] = useState([])
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    
    useEffect(()=> {
        getDonations().then(res=> dispatch(getDonation(res.data.filter(donation => donation.status === 1))) )
    },[])
    // console.log(getDonations())
    const listdonation = useSelector((state) => state.donation.donation)
    
    useEffect(()=> {
        setDonations(listdonation)
    },[listdonation])

    console.log(donations)
    const handleCloseModalDetail = () => {
        setOpenModalDetail(false)
        setDataDetail({})
    }

    const columns = [
        {
          key: "1",
          title: "Tên",
          dataIndex: "name",
          // render: (id) => <p>{id === 1 ? "mot": id === 2 ? "hai" : "ba"}</p>
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
            title: "Chi tiết",
            align: 'center',
            render: (rowData) => {
                return (
                    <EyeOutlined
                        style={{ fontSize: '16px', color: 'green'}}
                        onClick={()=> {
                            setOpenModalDetail(true)
                            setDataDetail(rowData)
                        }}
                    />
                )
            }
        },
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
    
    return (
        <>
            <TableApp
                title="Danh sách" columns={columns} dataSource={donations}
            />
            {
                openModalDetail && <ModalDetail 
                                        dataDetail={dataDetail}
                                        handleCloseModalDetail={handleCloseModalDetail}
                                    />
            }
            

        </>

    )
}


export default Donation