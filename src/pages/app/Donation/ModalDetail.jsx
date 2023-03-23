import "./donation.css"
import {Modal, Image } from 'antd'
import { useState } from 'react'


function ModalDetail({ dataDetail, handleCloseModalDetail }) {
    const [open, setOpen] = useState(true)
    console.log(dataDetail)

    return (
        <Modal
            title="Thông tin chi tiết"
            cancelText="Quay lại"
            okText="Liên hệ"
            centered
            width={700}
            open={open}
            footer={null}
            onOk={() => { setOpen(false); handleCloseModalDetail() }}
            onCancel={() => { setOpen(false); handleCloseModalDetail() }}
            style={{ fontFamily: "Poppins" }}
        >
            <p><b>Người ủng hộ:</b> {dataDetail.donorName}</p>
            <p><b>Thông tin liên hệ:</b> {dataDetail.phone}, {dataDetail.address} </p>
            <p><b>Thông tin ủng hộ:</b> {dataDetail.name}, ủng hộ {dataDetail.donationObject}, ở {dataDetail.donationAddress}</p>
            <p><b>Ngày đăng:</b> {dataDetail.date}</p>
            <p><b>Mô tả:</b> {dataDetail.description}</p>
            <p><b>Ảnh:</b></p>
            <div style={{ display:"flex", flexWrap:"wrap" }}>
                {
                    dataDetail.images?.map((image, index) =>
                        <div style={{margin: "2px", border: "1px solid #e7e5e5", display:"flex", alignItems: "center", height:100, width:100 }}>
                            <Image
                                className="modal-detail-image"
                                style={{maxHeight:100, maxWidth:100}}
                                key={index}
                                width={100}
                                src={image}>
                            </Image>
                        </div>
                    )
                }
            </div>
        </Modal>
    )
}

export default ModalDetail