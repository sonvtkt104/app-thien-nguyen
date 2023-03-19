import { Button, Col, Input, Row, Table, Modal, Image   } from 'antd'
import { useState } from 'react'


function ModalDetail({ dataDetail, handleCloseModalDetail}) {
    const [open,setOpen] = useState(true)
    console.log(dataDetail)

    return (
        <Modal
                title="Thông tin chi tiết"
                cancelText = "Quay lại"
                okText = "Liên hệ"
                centered
                width={700}
                open={open}
                footer= {null}
                onOk={()=> { setOpen(false); handleCloseModalDetail()}}
                onCancel={()=> { setOpen(false); handleCloseModalDetail() }}
                style={{fontFamily:"Poppins"}}
            >
                <p><b>Người ủng hộ:</b> {dataDetail.donorName}</p>
                <p><b>Thông tin liên hệ:</b> {dataDetail.contactInfo} </p>
                <p><b>Thông tin ủng hộ:</b> {dataDetail.name}, ủng hộ {dataDetail.donationObject}, ở {dataDetail.donationAddress}</p>
                <p><b>Mô tả:</b> {dataDetail.description}</p>
                <p><b>Ảnh:</b></p>
                <div>
                    {
                        dataDetail.images?.map((image,index) => 
                                <Image 
                                    style={{padding :"2px"}}
                                    key={index}
                                    width={100}
                                    src={image}>
                                </Image>
                            )
                    }
                </div>
            </Modal>
    )
}

export default ModalDetail