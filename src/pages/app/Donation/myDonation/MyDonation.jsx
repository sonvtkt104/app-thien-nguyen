import "../donation.css"
import { Button, Col, Input, Row, Modal, Image } from 'antd'
import { EyeOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { TableApp } from "../../../../components/TableApp"
import { SegmentedApp } from "../../../../components/SegmentedApp"
import { RemoveIcon } from "../../../../components/Icon/RemoveIcon"
import ModalDetail from '../ModalDetail';
import { PageLayout } from '../../../../components';

import { getDonation, getMyDonation, updateMyDonation } from '../../../../redux/donationSlice'
import { getDonations, updateDonationByID } from '../listDonation/DonationService'
import { updateDonationPostUser } from "../../../client/MyAccount/MyAccountService";


function MyDonation() {
  const dispatch = useDispatch()

  const [segment, setSegment] = useState("Yêu cầu xác nhận")
  const [donations, setDonations] = useState([])
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [dataDetail, setDataDetail] = useState({})
  const [reloadData, setReloadData] = useState({})
  const [searchedData, setSearcheddata] = useState([])
  const [myDonation, setMydonation] = useState([])


  const getDataDonation = () => {
    getDonations().then(res => {
      // console.log(res.data)
      setDonations(res.data.filter(data => {
        return data.listRequest.some(value =>
          value.id === "abc123"
        )
      }))
      // setSearcheddata(res.data.filter(data => {
      //   return data.listRequest.some(value =>
      //     value.id === "abc123" && value.status === segment
      //   )
      // }))
    })
  }

  useEffect(() => {
    getDataDonation()
  }, [reloadData])

  // console.log(donations)
  console.log(dataDetail)
  useEffect(() => {
    // getApp("abc123").then(res=> dispatch(getMyDonation(res.data)))
    setDonations(donations)
    // setSearcheddata(myDonation[segment])
    setSearcheddata(() => donations?.filter(data => {
      return data.listRequest.some(value => value.id === "abc123" && value.status === segment)
    }))
  }, [segment, dataDetail])

  useEffect(() => {
    setDataDetail({})
  }, [segment])

  useEffect(() => {
    setDonations(donations)
    setSearcheddata(() => donations?.filter(data => {
      return data.listRequest.some(value => value.id === "abc123" && value.status === segment)
    }))
  }, [donations])




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
    // {
    //     key: "7",
    //     title: "Trạng thái",
    //     dataIndex: "status",
    // },
    {
      key: "8",
      title: segment === "Yêu cầu xác nhận" ? "Xác nhận yêu cầu" : "Chuyển trạng thái tiếp theo",
      align: 'center',
      render: (rowData) => {
        return (
          <div key={rowData.id}>
            {
              segment === "Yêu cầu xác nhận" ? <div style={{ display: "flex", justifyContent: "center" }}><Button
                type="primary"
                style={{ marginRight: 10 }}
                danger
                onClick={() => {
                  const action = "Từ chối"
                  // onRefuse(rowData, action)
                  onVerifRequest(rowData, action)
                }}
              >
                Từ chối
              </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    const action = "Xác nhận"
                    // onConfirm(rowData, action)
                  onVerifRequest(rowData, action)
                  }}
                >
                  Xác nhận
                </Button>
              </div> : <Button
                type="primary"
                // disabled={segment === "Đã xác nhận" || segment === "Đã nhận" ? false : true}
                onClick={() => {
                  // if (segment === "Đã xác nhận") {
                  //   rowData.listRequest = rowData.listRequest.map(data => {
                  //     return data.id === rowData.idOrganization ? { ...data, status: "Đã nhận" } : { ...data}
                  //   })
                  // } else if (segment === "Đã nhận") {
                  //   rowData.listRequest = rowData.listRequest.map(data => {
                  //     return data.id === rowData.idOrganization ? { ...data, status: "Đã quyên góp" } : { ...data}
                  //   })
                  // }

                  rowData.listRequest = rowData.listRequest.map(data => {
                    return data.id === rowData.idOrganization ? { ...data, status: segment === "Đã xác nhận" ? "Đã nhận" : "Đã quyên góp" } : { ...data }
                  })

                  console.log(rowData)
                  setDataDetail(rowData)
                  updateDonationByID(rowData.id, rowData)
                    .then(res => console.log(res))
                }}
              >
                Chuyển
              </Button>
            }
          </div>
        )
      }
    },
    // {
    //   key: "8",
    //   title: "Chuyển trạng thái tiếp theo",
    //   align: 'center',
    //   render: (rowData) => {
    //     return (
    //       <div key={rowData.id}>
    //         <Button
    //           type="primary"
    //           disabled={segment === "Đã xác nhận" || segment === "Đã nhận" ? false : true}
    //           onClick={() => {
    //             if (segment === "Đã xác nhận") {
    //               rowData.status = "Đã nhận"
    //             } else if (segment === "Đã nhận") {
    //               rowData.status = "Đã quyên góp"
    //             }
    //             console.log(rowData)
    //             setDataDetail(rowData)
    //             updateDonationByID(rowData.id, rowData)
    //               .then(res => console.log(res))
    //           }}
    //         >
    //           Chuyển
    //         </Button>
    //       </div>
    //     )
    //   }
    // },
    {
      key: "9",
      title: "Hành động",
      align: 'center',
      render: (rowData) => {
        return (
          <div key={rowData.id}>
            <EyeOutlined
              className="donation-detail"
              onClick={() => {
                setOpenModalDetail(true)
                setDataDetail(rowData)
              }}
            />
            {
              segment === "Bị hủy" || segment === "Đợi xác nhận" ?
                <DeleteOutlined
                  className="dnt-delete"
                  onClick={() => {
                    // const action = ""
                    setReloadData(rowData)
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
      onCancel:() => {setDataDetail({})},
      onOk: () => {
        setReloadData({})
        console.log("xoa xoa")
        console.log(segment)
        console.log(rowData)

        const idUpdateDonationByID = rowData.id
        const dataUpdateDonationByID = {...rowData}
        dataUpdateDonationByID.listRequest = rowData.listRequest.filter(data => data.id !== "abc123")

        const idUpdateDonationPostUser = rowData.idPost
        const dataUpdateDonationPostUser = {...rowData}
        dataUpdateDonationPostUser.listRequest = [...dataUpdateDonationByID.listRequest]
        // dataUpdateDonationPostUser.status =  "Chưa nhận"
        delete dataUpdateDonationPostUser.id
        delete dataUpdateDonationPostUser.idPost

        if(segment === "Đợi xác nhận") {
          dataUpdateDonationPostUser.status =  "Chưa nhận"
          // const idUpdateDonationByID = rowData.id
          // const dataUpdateDonationByID = {...rowData}


          // dataUpdateDonationByID.listRequest = rowData.listRequest.filter(data => data.id !== "abc123")
          // dataUpdateDonationPostUser.listRequest = rowData.listRequest.filter(data => data.id !== "abc123")


          // console.log(dataUpdateDonationByID)
          // updateDonationByID(idUpdateDonationByID, dataUpdateDonationByID)
          //   .then(res => console.log(res))

          // const idUpdateDonationPostUser = rowData.idPost
          // const dataUpdateDonationPostUser = {...rowData}
          // dataUpdateDonationPostUser.status =  "Chưa nhận"
          // delete dataUpdateDonationPostUser.id
          // delete dataUpdateDonationPostUser.idPost
          // console.log(dataUpdateDonationPostUser)
          // updateDonationPostUser(idUpdateDonationPostUser, dataUpdateDonationPostUser).then(res => console.log(res))
        } else {
          let isTrue = rowData.listRequest.some(data => data.status === "Đã xác nhận")
          // dataUpdateDonationByID.listRequest = rowData.listRequest.filter(data => data.id !== "abc123")

          // dataUpdateDonationPostUser.listRequest = [...dataUpdateDonationByID.listRequest]
          console.log(isTrue)
          dataUpdateDonationPostUser.status = isTrue ? "Đã nhận" : "Từ chối nhận"
          
        }
        console.log(idUpdateDonationByID)
        console.log(dataUpdateDonationByID)
        console.log(idUpdateDonationPostUser)
        console.log(dataUpdateDonationPostUser)

        updateDonationByID(idUpdateDonationByID, dataUpdateDonationByID)
            .then(res => console.log(res))
        updateDonationPostUser(idUpdateDonationPostUser, dataUpdateDonationPostUser).then(res => console.log(res))
        
      }
    });
  };
  
  const onVerifRequest = (rowData, action) => {
    console.log(rowData)
    console.log(action)
    setDataDetail(rowData)
    // rowData.listRequest[0].status = "Bị hủy"
    rowData.listRequest = rowData.listRequest.map(data => {
      return data.id === rowData.idOrganization ? { ...data, status: action === "Từ chối" ? "Bị hủy" : "Đã xác nhận" } : { ...data }
    })
    // rowData.idOrganization = null
    // rowData.organizationReceived = null
    console.log("Từ chối", rowData)

    updateDonationByID(rowData.id, rowData)
      .then(res => console.log(res))

    const idUpdateDonationPostUser = rowData.idPost
    const dataUpdateDonationPostUser = { ...rowData, status: action === "Từ chối" ? "Từ chối nhận" : "Đã nhận" }
    // dataUpdateDonationPostUser.listRequest = []
    // dataUpdateDonationPostUser.idOrganization = null
    // dataUpdateDonationPostUser.organizationReceived = null
    delete dataUpdateDonationPostUser.id
    delete dataUpdateDonationPostUser.idPost
    console.log(dataUpdateDonationPostUser)
    updateDonationPostUser(idUpdateDonationPostUser, dataUpdateDonationPostUser).then(res => console.log(res))
  }

  const globalSearch = (value) => {
    const filteredData = donations.filter(data => {
      return data.listRequest.some(value => value.id === "abc123" && value.status === segment)
    }).filter((donation) => {
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
    <PageLayout keyActive="my-donation">
      <div className="mdn-segmented">
        <SegmentedApp
          className="mdn-segmenttedApp"
          value={segment}
          // options={[{label: "Đợi xác nhận", value: "waitConfirmation"}, {label: "Đã xác nhận", value: "confirmed" }, {label: "Đã nhận", value: "received" }, {label: "Đã quyên góp", value: "donated" }, {label: "Bị hủy", value: "cancel" }]}
          options={[{ label: "Yêu cầu xác nhận", value: "Yêu cầu xác nhận" }, { label: "Đợi xác nhận", value: "Đợi xác nhận" }, { label: "Đã xác nhận", value: "Đã xác nhận" }, { label: "Đã nhận", value: "Đã nhận" }, { label: "Đã quyên góp", value: "Đã quyên góp" }, { label: "Bị hủy", value: "Bị hủy" }]}
          onChange={(value) => {
            setSegment(value)
          }}
        />
      </div>
      <div className="mdn-modal">
        <div className="mdn-header">
          <h2 className="mdn-title">{segment === "Yêu cầu xác nhận" ? "Danh sách yêu cầu bạn xác nhận" : "Quyên góp của tôi"}</h2>
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
          rowKey={(rowdata) => rowdata.id}
          // columns={segment === "cancel" ? columns.filter(column => column.key !== "8") :   (segment === "confirmed" || segment === "received" ?  columns.filter(column => column.key !== "7") : columns.filter(column => column.key !== "7" && column.key !== "8"))}
          columns={segment === "Đã xác nhận" || segment === "Đã nhận" || segment === "Yêu cầu xác nhận" ? columns : columns.filter(column => column.key !== "8")}
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