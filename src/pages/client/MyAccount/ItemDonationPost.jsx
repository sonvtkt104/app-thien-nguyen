import "./css/ItemDonationPost.css"
import { Button, Image, Popover } from "antd"
import React, { useState } from 'react';
import ModalDetail from "../../app/Donation/ModalDetail";
import { MoreOutlined } from '@ant-design/icons';
function ItemDonationPost({ data, handleOpenModal }) {
    // console.log(data)
    const [visible, setVisible] = useState(false);
    const [openModalDetail, setOpenModalDetail] = useState(false)
    const [dataDetail, setDataDetail] = useState({})
    // console.log(dataDetail)
    const [openPopover, setOpenPopover] = useState(true);

    const handleCloseModalDetail = () => {
        setOpenModalDetail(false)
        // setDataDetail({})
    }
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
                        <p className="idp-status">Trạng thái: {data.status}</p>
                        <p className="idp-organization">Tổ chức đã nhận: {data.organizationReceived ? data.organizationReceived : "..."}</p>
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
                                            disabled={data.organizationReceived ? true : false}
                                            onClick={() => {
                                                handleOpenModal()
                                            }}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            danger
                                            style={{ margin: "5px 0" }}
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
                />
            }
        </>

    )
}

export default ItemDonationPost