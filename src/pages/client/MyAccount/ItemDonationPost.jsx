import "./css/ItemDonationPost.css"
import { Button, Image, Popover, Modal } from "antd"
import React, { useState } from 'react';
import ModalDetail from "../../app/Donation/ModalDetail";
import { MoreOutlined, FrownOutlined, SmileOutlined, MehOutlined } from '@ant-design/icons';
import { deleteDonationPostUser } from "./MyAccountService";
import { deleteDonationByID, updateDonationByID } from "../../app/Donation/listDonation/DonationService";


function ItemDonationPost({ data, handleOpenModal, getListDonation }) {
    // console.log(getListDonation)
    const [visible, setVisible] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    // console.log(dataDetail)
    const [openPopover, setOpenPopover] = useState(true);

    const handleCloseModalDetail = (reload) => {
        console.log(reload)
        // if(reload) {
        // }
        // getListDonation(reload)
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
                console.log(data)
                console.log("xoa xoa")
                const idUpdateDonationByID = data.id + "or"
                const dataUpdateDonationByID = { ...data, idOrganization: null, organizationReceived: null, status: "private" }
                dataUpdateDonationByID.idPost = data.id
                delete dataUpdateDonationByID.id
                if (data.status === "Chờ xác nhận") {
                    dataUpdateDonationByID.listRequest = data.listRequest.filter(data => data.status !== "Yêu cầu xác nhận")
                    updateDonationByID(idUpdateDonationByID, dataUpdateDonationByID).then(res => console.log(res))
                    deleteDonationPostUser(data.id).then(res => {
                        getListDonation()
                        console.log(res)
                    })
                } else if (data.status === "Chưa nhận") {
                    if (data.listRequest.length === 0) {
                        deleteDonationPostUser(data.id).then(res => {
                            getListDonation()
                            console.log(res)
                        })
                        deleteDonationByID(idUpdateDonationByID).then(res => console.log(res))
                    } else {
                        dataUpdateDonationByID.listRequest = data.listRequest.map(data => {
                            return { ...data, status: "Bị hủy" }
                        })
                        updateDonationByID(idUpdateDonationByID, dataUpdateDonationByID).then(res => console.log(res))
                        deleteDonationPostUser(data.id).then(res => {
                            getListDonation()
                            console.log(res)
                        })
                    }

                } else {
                    deleteDonationPostUser(data.id).then(res => {
                        getListDonation()
                        console.log(res)
                    })

                }
                // else {
                //     deleteDonationPostUser(data.id).then(res => {
                //         getListDonation()
                //         console.log(res)
                //     })

                // }


                console.log(dataUpdateDonationByID)



                // updateDonationByID(idUpdateDonationByID, dataUpdateDonationByID).then(res => console.log(res))
                // deleteDonationPostUser(data.id).then(res => {
                //     getListDonation()
                //     console.log(res)
                // })
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
                            height={200}
                            src={data.images[0]}
                            onClick={() => setVisible(true)}
                        />
                        <div style={{ display: 'none' }}>
                            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                                {
                                    data.images.map((image, index) => {
                                        return <Image key={index} src={image} />
                                    })
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
                                        /> : <MehOutlined
                                            style={{ fontSize: 24, color: "#FFCC00", marginLeft: 10 }}
                                        />
                            }
                            {/* <FrownOutlined
                                style={{ fontSize: 24, color: "red", marginLeft: 10 }}
                            />
                            <SmileOutlined
                                style={{ fontSize: 24, color: "green", marginLeft: 10 }}
                            />
                            <MehOutlined
                                style={{ fontSize: 24, color: "yellow", marginLeft: 10 }}
                            /> */}

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
                                            disabled={data.status === "Đã nhận" ? true : false}
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
                                // title="Title"
                                trigger="hover"
                                placement="left"
                                zIndex={9}
                            >
                                {/* <Button type="primary">Hover me</Button> */}
                                <MoreOutlined
                                    className="idp-more"
                                />
                            </Popover>
                        </div>

                        {/* <Button
                            className="idp-detail"
                            type="primary"
                            onClick={() => {
                                handleOpenModal()
                            }}
                        // size="middle"
                        >
                            Sua
                        </Button> */}
                    </div>
                </div>
            </div>
            {
                openModalDetail && <ModalDetail
                    dataDetail={dataDetail}
                    handleCloseModalDetail={handleCloseModalDetail}
                    getListDonation={getListDonation}
                />
            }
        </>

    )
}

export default ItemDonationPost