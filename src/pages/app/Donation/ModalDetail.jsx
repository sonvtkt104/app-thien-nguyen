import "./donation.css"
import { Modal, Image, Table, Button } from 'antd'
import { useState } from 'react'
import { updateDonationPostUser } from "../../client/MyAccount/MyAccountService";
import { toast } from "react-toastify";

function ModalDetail({ dataDetail, handleCloseModalDetail, getListDonation,handleReload, status }) {
    const [open, setOpen] = useState(true)
    const [dataRow, setDataRow] = useState({})
    console.log(dataDetail)
    console.log(handleReload)


    const handleConfirmation = (rowData) => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn xác nhận cho tổ chức  ${rowData.name}?`,
            cancelText: "Quay lại",
            okText: "Có",
            okType: "danger",
            centered: "true",
            onCancel: () => {
                console.log("quay lai")
                // setDataRow({})
            },
            onOk: async () => {
                // setDataRow({})
                console.log(rowData)
                console.log(dataDetail)
                const idUpdateDonationPostUser = dataDetail.id
                const dataUpdateDonationPostUser = { ...dataDetail, idOrganization: rowData.id, organizationReceived: rowData.name, status: "Đã nhận" }
                dataUpdateDonationPostUser.listRequest = dataDetail?.listRequest?.map(data => {
                    return data.id === rowData.id ? { ...data, status: "Đã xác nhận" } : { ...data, status: "Bị hủy" }
                })
                delete dataUpdateDonationPostUser.organizationReceived
                delete dataUpdateDonationPostUser.donorName
                delete dataUpdateDonationPostUser.phone
                delete dataUpdateDonationPostUser.province
                delete dataUpdateDonationPostUser.ward
                delete dataUpdateDonationPostUser.district
                delete dataUpdateDonationPostUser.address
                console.log(dataUpdateDonationPostUser)
                // console.log("update bai dang", rowData)
                updateDonationPostUser(dataUpdateDonationPostUser)
                .then(res => {
                    if(res?.status === 200) {
                        // getListDonation();
                        // onClose()
                        handleCloseModalDetail()
                        handleReload({})
                        toast.success("Xác nhận thành công!")
                    } else {
                        toast.error("Hệ thống lỗi, xin thử lại sau!")
                    }
                })
                // handleCloseModalDetail()

                // getListDonation()
                

            }
        });

    }

    const columns = [
        // {
        //     key: "1",
        //     title: "Tên",
        //     // dataIndex: "name",
        //     render: (rowData) => {
        //         return <div className="cm-name" key={rowData.id}>{rowData.name}</div>
        //     },
        //     align: 'center',
        // },
        {
            key: "1",
            title: "Tổ chức muốn Xác nhận",
            align: 'center',
            // dataIndex: "name",
            render: (rowData) => {
                console.log(rowData)
                return (
                    <a
                        key={rowData.id}
                        className="cm-border-or"
                        href= {`http://localhost:3000/profile-charity1/${rowData.id}`}
                        // href="http://localhost:3000/profile-charity"
                        target="_blank"
                    >
                        {rowData.name}
                    </a>
                )
            }
        },
        {
            key: "2",
            title: "Hành động",
            align: 'center',
            render: (rowData) => {
                // console.log(rowData)
                return (
                    <div className="cm-border-action" key={rowData.id}>
                        <Button
                            key={rowData.id}
                            type="primary"
                            size="middle"
                            onClick={() => {
                                console.log(rowData)
                                handleConfirmation(rowData)
                                // setDataRow(row)
                            }}
                        // key={index}
                        >
                            Xác nhận
                        </Button>
                    </div>
                )
            }
        },
    ]
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
            <p><b>Thông tin liên hệ:</b> {`${dataDetail.phone}, ${dataDetail.ward}, ${dataDetail.district}, ${dataDetail.province}`} </p>
            <p><b>Thông tin đồ ủng hộ:</b> "{dataDetail.name}", mong muốn ủng hộ cho "{dataDetail.donationObject}", ở "{dataDetail.donationAddress}"</p>
            <p><b>Ngày đăng:</b> {dataDetail.date}</p>
            <p><b>Mô tả:</b> {dataDetail.description}</p>
            <p><b>Ảnh:</b>{ dataDetail.images === "" ? " Không có ảnh nào!" : ""}</p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    dataDetail.images !== "" ? dataDetail.images?.split(", ").map((image, index) =>
                        <div key={index} style={{ margin: "2px", border: "1px solid #e7e5e5", display: "flex", alignItems: "center", height: 100, width: 100 }}>
                            <Image
                                className="modal-detail-image"
                                style={{ maxHeight: 100, maxWidth: 100 }}
                                key={index}
                                width={100}
                                src={image}>
                            </Image>
                        </div>
                    ) : ""
                }
            </div>
            {
                status &&
                (
                    <div>
                        {
                            dataDetail.status === "Đã nhận" ? 
                                <p><b>Tổ chức đã nhận:</b> {dataDetail.organizationReceived}</p> : dataDetail.status === "Chờ xác nhận" ?
                                    <p><b>Tổ chức yêu cầu:</b> {dataDetail.organizationReceived}</p> : dataDetail.status === "Từ chối nhận" ?
                                        <p><b>Tổ chức đã từ chối:</b> {dataDetail.organizationReceived}</p> : 
                                           <div>
                                                <p><b>Danh sách tổ chức yêu cầu xác nhận:</b> {dataDetail?.listRequest.length === 0 ? "Chưa có tổ chức nào" : ""}</p>
                                                {
                                                    dataDetail?.listRequest.length !== 0 ? (
                                                        <div>
                                                            <Table
                                                                className="cm-table"
                                                                bordered
                                                                rowKey={(rowdata) =>  rowdata.id}
                                                                columns={columns}
                                                                dataSource={dataDetail?.listRequest.filter(data => data.status === "Đợi xác nhận")}
                                                                pagination={false}
                                                                width={200}
                                                            />
                                                        </div>
                                                    ) : ""
                                                }
                                           </div>
                        }

                    </div>
                )
            }
        </Modal>
    )
}

export default ModalDetail