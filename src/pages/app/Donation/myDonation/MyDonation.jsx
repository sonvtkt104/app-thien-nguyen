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
import { getDonationPostUser, sendNotification, updateDonationPostUser } from "../../../client/MyAccount/MyAccountService";
import { getUserInfomationFromCookies, getInfoOfUserFromCookies } from "../../../Authentication/HandleUserInfomation";
import { toast } from "react-toastify";

function MyDonation() {
  const dispatch = useDispatch()
  
  console.log(getInfoOfUserFromCookies());
  const [segment, setSegment] = useState("Yêu cầu xác nhận")
  const [donations, setDonations] = useState([])
  const [openModalDetail, setOpenModalDetail] = useState(false)
  const [dataDetail, setDataDetail] = useState({})
  const [reloadData, setReloadData] = useState({})
  const [searchedData, setSearcheddata] = useState([])
  const [myDonation, setMydonation] = useState([])


  const getDataDonation = () => {
    getDonationPostUser().then(res => {
      setDonations(res.data.filter(data => {
        return data.listRequest.some(value =>
          value.id === getInfoOfUserFromCookies()?.charityId
        )
      }))
    })
  }

  useEffect(() => {
    getDataDonation()
  }, [reloadData])

  // console.log(donations)
  // console.log(dataDetail)
  useEffect(() => {
    setDonations(donations)
    setSearcheddata(() => donations?.filter(data => {
      return data.listRequest.some(value => value.id === getInfoOfUserFromCookies()?.charityId && value.status === segment)
    }))
  }, [segment, dataDetail])

  useEffect(() => {
    setDataDetail({})
  }, [segment])

  useEffect(() => {
    setDonations(donations)
    setSearcheddata(() => donations?.filter(data => {
      return data.listRequest.some(value => value.id === getInfoOfUserFromCookies()?.charityId && value.status === segment)
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
      width: 200,
      render: (rowData) => {
        return (
          <div key={rowData.id}>{`${rowData.phone}, ${rowData.ward}, ${rowData.district}, ${rowData.province}`}</div>
        )
      }
    },
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
                  onVerifRequest(rowData, action)
                }}
              >
                Từ chối
              </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    const action = "Xác nhận"
                    onVerifRequest(rowData, action)
                  }}
                >
                  Xác nhận
                </Button>
              </div> : <Button
                type="primary"
                onClick={() => {
                  rowData.listRequest = rowData.listRequest.map(data => {
                    return data.id === rowData.idOrganization ? { ...data, status: segment === "Đã xác nhận" ? "Đã nhận" : "Đã quyên góp" } : { ...data }
                  })

                  delete rowData.organizationReceived
                  delete rowData.donorName
                  delete rowData.phone
                  delete rowData.province
                  delete rowData.ward
                  delete rowData.district
                  delete rowData.address
                  if (rowData.idOrganization === null) {
                    delete rowData.idOrganization
                  }
                  if (rowData.idDonor === null) {
                    delete rowData.idDonor
                  }
                  console.log(rowData)
                  setDataDetail(rowData)

                  updateDonationPostUser(rowData)
                    .then(res => {
                      if (res?.status === 200) {
                        toast.success("Chuyển trạng thái thành công!")
                        if(rowData?.idDonor && segment === "Đã nhận") {
                          const dataSendNotification= {
                              "receive_user_id": rowData?.idDonor,
                              "created_user_id": getInfoOfUserFromCookies().id,
                              "message": `Tổ chức ${getInfoOfUserFromCookies()?.name} đã quyên góp thành công đồ ủng hộ "${rowData.name}" của bạn`
                            }
                          sendNotification(dataSendNotification).then(res => console.log(res))
                        }
                      } else {
                        toast.error("Hệ thống lỗi, xin thử lại sau!")
                      }
                    })
                }}
              >
                Chuyển
              </Button>
            }
          </div>
        )
      }
    },
    {
      key: "9",
      title: "Hành động",
      align: 'center',
      render: (rowData) => {
        console.log(rowData);
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
      onCancel: () => { setDataDetail({}) },
      onOk: () => {
        const dataUpdateDonationPostUser = { ...rowData }
        dataUpdateDonationPostUser.listRequest = rowData.listRequest.filter(data => data.id !== getInfoOfUserFromCookies()?.charityId)
        
        delete dataUpdateDonationPostUser.organizationReceived
        delete dataUpdateDonationPostUser.donorName
        delete dataUpdateDonationPostUser.phone
        delete dataUpdateDonationPostUser.province
        delete dataUpdateDonationPostUser.ward
        delete dataUpdateDonationPostUser.district
        delete dataUpdateDonationPostUser.address
        if (dataUpdateDonationPostUser.idOrganization === null) {
          delete dataUpdateDonationPostUser.idOrganization
        }
        if (dataUpdateDonationPostUser.idDonor === null) {
          delete dataUpdateDonationPostUser.idDonor
        }
        updateDonationPostUser(dataUpdateDonationPostUser).then(res => {
          if (res?.status === 200) {
            setReloadData({})
            toast.success("Đã xóa thành công!")
          } else {
            toast.error("Hệ thống lỗi, xin thử lại sau!")
          }
        })

      }
    });
  };

  const onVerifRequest = (rowData, action) => {
    // console.log(rowData)
    // console.log(action)
    setDataDetail(rowData)
    rowData.listRequest = rowData.listRequest.map(data => {
      return data.id === rowData.idOrganization ? { ...data, status: action === "Từ chối" ? "Bị hủy" : "Đã xác nhận" } : { ...data }
    })
    const dataUpdateDonationPostUser = { ...rowData, status: action === "Từ chối" ? "Từ chối nhận" : "Đã nhận" }

    // console.log(dataUpdateDonationPostUser)
    delete dataUpdateDonationPostUser.organizationReceived
    delete dataUpdateDonationPostUser.donorName
    delete dataUpdateDonationPostUser.phone
    delete dataUpdateDonationPostUser.province
    delete dataUpdateDonationPostUser.ward
    delete dataUpdateDonationPostUser.district
    delete dataUpdateDonationPostUser.address
    if (dataUpdateDonationPostUser.idOrganization === null) {
      delete dataUpdateDonationPostUser.idOrganization
    }
    if (dataUpdateDonationPostUser.idDonor === null) {
      delete dataUpdateDonationPostUser.idDonor
    }
    updateDonationPostUser(dataUpdateDonationPostUser).then(res => {
      if (res?.status === 200) {
        const message = action === "Từ chối" ? "Đã từ chối thành công!" : "Đã xác nhận thành công!"
        toast.success(message)
        const dataSendNotification= {
          "receive_user_id": rowData.idDonor,
          "created_user_id": getInfoOfUserFromCookies().id,
          "message": ""
        }
        if(action === "Từ chối") {
          dataSendNotification.message = `Tổ chức ${rowData.organizationReceived} đã từ chối bài đăng ủng hộ "${rowData.name}" của bạn`
        } else {
          dataSendNotification.message = `Tổ chức ${rowData.organizationReceived} đã xác nhận bài đăng ủng hộ "${rowData.name}" của bạn`
        }
        sendNotification(dataSendNotification).then(res => console.log(res))
      } else {
        toast.error("Hệ thống lỗi, xin thử lại sau!")
      }
    })
  }

  const globalSearch = (value) => {
    const filteredData = donations.filter(data => {
      return data.listRequest.some(value => value.id === getInfoOfUserFromCookies()?.charityId && value.status === segment)
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
          columns={segment === "Đã xác nhận" || segment === "Đã nhận" || segment === "Yêu cầu xác nhận" ? columns : columns.filter(column => column.key !== "8")}
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