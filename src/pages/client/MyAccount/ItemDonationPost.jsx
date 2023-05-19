import "./css/ItemDonationPost.css"
import { Button, Image, Popover, Modal } from "antd"
import React, { useEffect, useState } from 'react';
import ModalDetail from "../../app/Donation/ModalDetail";
import { MoreOutlined, FrownOutlined, SmileOutlined, HeartFilled, WhatsAppOutlined, StarFilled } from '@ant-design/icons';
import { deleteDonationPostUser, deleteDonationPostUserDonor, deleteDonationPostUserRequest, getAllCharity, updateDonationPostUser } from "./MyAccountService";
import { toast } from "react-toastify";

function ItemDonationPost({ data, handleOpenModal, getListDonation, handleReload }) {
    // console.log(getListDonation)
    const [visible, setVisible] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    // console.log(dataDetail)
    const [openPopover, setOpenPopover] = useState(true);

    const handleCloseModalDetail = () => {
        setOpenModalDetail(false)
        // setDataDetail({})
    }


    const onDeleteDonation = (data) => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn xóa bản ghi này?`,
            okText: "Có",
            cancelText: "Quay lại",
            okType: "danger",
            onOk: () => {
                // console.log(data)
                if (data.status === "Chờ xác nhận") {
                    deleteDonationPostUser(data.id).then(res => {
                        if(res?.status === 200) {
                            getListDonation();
                            toast.success("Xóa bài đăng ủng hộ thành công!")
                        } else {
                            toast.error("Hệ thống lỗi, xin thử lại sau!")
                        }
                    })
                    .catch(error => {
                        toast.error("Hệ thống lỗi, xin thử lại sau!")
                    })
                } else if (data.status === "Chưa nhận") {
                    if (data.listRequest.length === 0) {
                        // updateDonationPostUser(data.id, {...data, idDonor: null}).then(res => {
                        //     getListDonation()
                        //     console.log(res)
                        // })
                        deleteDonationPostUser(data.id).then(res => {
                            if(res?.status === 200) {
                                getListDonation();
                                toast.success("Xóa bài đăng ủng hộ thành công!")
                            } else {
                                toast.error("Hệ thống lỗi, xin thử lại sau!")
                            }
                        })
                    } else {
                        const newListRequest = data.listRequest = data.listRequest.map(data => {
                            return { ...data, status: "Bị hủy" }
                        })
                        console.log(data);
                        deleteDonationPostUserRequest(data.id, newListRequest).then(res => {
                            if(res?.status === 200) {
                                getListDonation();
                                toast.success("Xóa bài đăng ủng hộ thành công!")
                            } else {
                                toast.error("Hệ thống lỗi, xin thử lại sau!")
                            }
                        })
                    }

                } else {
                    // updateDonationPostUser(data.id, {...data, idDonor: null}).then(res => {
                    //     if(res?.status === 200) {
                    //         getListDonation();
                    //         toast.success("Xóa bài đăng ủng hộ thành công!")
                    //     } else {
                    //         toast.error("Hệ thống lỗi, xin thử lại sau!")
                    //     }
                    //     })

                    deleteDonationPostUserDonor(data.id).then(res => {
                        if(res?.status === 200) {
                            getListDonation();
                            toast.success("Xóa bài đăng ủng hộ thành công!")
                        } else {
                            toast.error("Hệ thống lỗi, xin thử lại sau!")
                        }
                        })

                }
            }
        });
    };

    return (
        <>
            <div className="idp-item">
                <div className="idp-content">
                    <div>
                        <Image
                            className="idp-image"
                            preview={{ visible: false }}
                            // style={{width:"100%"}}
                            width={"100%"}
                            height={240}
                            // src={data?.images !== "" ? data?.images?.split(", ")[0] : "https://firebasestorage.googleapis.com/v0/b/charityapp-b5d6f.appspot.com/o/avatar%2FnoImage.png?alt=media&token=89c8c1e0-7114-456b-ae67-37a648fc605b"}  
                            src={data?.images?.split(", ")[0]}
                            onClick={() => setVisible(true)}
                            alt="Không có ảnh nào!"
                        />
                        <div style={{ display: 'none' }}>
                            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                                {
                                    data?.images !== "" ? data?.images?.split(", ").map((image, index) => {
                                        return <Image key={index} src={image} />
                                    }) : ""
                                }
                            </Image.PreviewGroup>
                        </div>
                    </div>
                    <div className="idp-info">
                        <p className="idp-name">{data.name}</p>
                        <p className="idp-date">Ngày đăng:  {data.date}</p>
                        <div style={{ display: "flex" }}>
                            <p className="idp-status">Trạng thái: {data.status}</p>
                            {
                                data.status === "Đã nhận" ?
                                    <SmileOutlined
                                        style={{ fontSize: 24, color: "green", marginLeft: 10 }}
                                    /> : data.status === "Từ chối nhận" ?
                                        <FrownOutlined
                                            style={{ fontSize: 24, color: "red", marginLeft: 10 }}
                                        /> : data.status === "Chờ xác nhận" ?
                                            <WhatsAppOutlined style={{ fontSize: 24, color: "#44B3CF", marginLeft: 10 }} /> :

                                            <StarFilled
                                                style={{ fontSize: 20, color: "#F7CC04", marginLeft: 10 }}
                                            />
                            }

                        </div>
                        <p className="idp-organization">{data.status === "Chờ xác nhận" ? "Tổ chức yêu cầu" : data.status === "Chưa nhận" ? "Yêu cầu xác nhận" : data.status === "Từ chối nhận" ? "Tổ chức từ chối" : "Tổ chức đã nhận"}: {data.organizationReceived ? `"${data.organizationReceived}"` : `${data.listRequest?.filter(data => data.status === "Đợi xác nhận").length} tổ chức`}</p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button
                                className="idp-detail"
                                type="primary"
                                onClick={() => {
                                    setDataDetail(data)
                                    setOpenModalDetail(true)
                                }}
                            // size="middle"
                            >
                                Xem chi tiết
                            </Button>

                            <Popover
                                content={
                                    <div style={{ display: "block", width: "55px", margin: 10 }} >
                                        <Button
                                            type="primary"
                                            style={{ margin: "5px 0" }}
                                            disabled={data.status === "Đã nhận" || (data?.status === "Chưa nhận" && data?.listRequest?.length !== 0) ? true : false}
                                            onClick={() => {
                                                handleOpenModal()
                                            }}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            danger
                                            style={{ margin: "5px 0" }}
                                            onClick={() => {
                                                onDeleteDonation(data)
                                            }}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                }
                                trigger="hover"
                                placement="left"
                                zIndex={9}
                            >
                                <MoreOutlined
                                    className="idp-more"
                                />
                            </Popover>
                        </div>

                    </div>
                </div>
            </div>
            {
                openModalDetail && <ModalDetail
                    dataDetail={dataDetail}
                    handleCloseModalDetail={handleCloseModalDetail}
                    getListDonation={getListDonation}
                    handleReload={handleReload}
                    status={true}
                />
            }
        </>

    )
}

export default ItemDonationPost