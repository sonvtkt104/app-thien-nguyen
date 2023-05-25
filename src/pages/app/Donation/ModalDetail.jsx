import "./donation.css"
import { Modal, Image, Table, Button } from 'antd'
import { useState } from 'react'
import { updateDonationPostUser, getUserIdCharity, sendNotification } from "../../client/MyAccount/MyAccountService";
import { toast } from "react-toastify";


function ModalDetail({ dataDetail, handleCloseModalDetail, getListDonation,handleReload, status }) {
    const [open, setOpen] = useState(true)
    const [dataRow, setDataRow] = useState({})
    console.log(dataDetail)
    // console.log(handleReload)


    const handleConfirmation = (rowData) => {
        console.log(rowData);
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn xác nhận cho tổ chức  ${rowData.name}?`,
            cancelText: "Quay lại",
            okText: "Có",
            okType: "danger",
            centered: "true",
            onCancel: () => {
                // console.log("quay lai")
                // setDataRow({})
            },
            onOk: async () => {
                // setDataRow({})
                // console.log(rowData)
                // console.log(dataDetail)
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
                // handleReload({})
                
                updateDonationPostUser(dataUpdateDonationPostUser)
                .then(res => {
                    if(res?.status === 200) {
                        // getListDonation();
                        // onClose()
                        handleCloseModalDetail()
                        toast.success("Xác nhận thành công!")
                        // handleReload({})
                        getUserIdCharity(rowData?.id).then(res => {
                            console.log(res);
                            const data = {
                                "receive_user_id": res?.data?.message,
                                "created_user_id": dataDetail?.idDonor,
                                "message": `${dataDetail?.donorName} đã xác nhận đồ ủng hộ "${dataDetail?.name}" cho tổ chức của bạn`
                            }
                            sendNotification(data).then(res => console.log(res))
                        })
                    } else {
                        toast.error("Hệ thống lỗi, xin thử lại sau!")
                    }
                })
                // handleCloseModalDetail()
                getListDonation()

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
                // console.log(rowData)
                return (
                    <a
                        key={rowData.id}
                        className="cm-border-or text-hover"
                        href={`http://localhost:3000/profile-charity/${rowData.id}`}
                        // href="http://localhost:3000/profile-charity"
                        target="_blank"
                        style={{color: 'var(--color-blue)'}}
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
                                // console.log(rowData)
                                handleConfirmation(rowData)
                                // setDataRow(row)
                            }}
                            className="btn-primary"
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
            title={<span className="h2-app">Thông tin chi tiết</span>}
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
            <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Người ủng hộ:</b> {dataDetail.donorName}</p>
            <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Thông tin liên hệ:</b> {`${dataDetail.phone}, ${dataDetail.address}, ${dataDetail.ward}, ${dataDetail.district}, ${dataDetail.province}`} </p>
            <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Thông tin đồ ủng hộ:</b> "{dataDetail.name}", mong muốn ủng hộ cho "{dataDetail.donationObject}", ở "{dataDetail.donationAddress}"</p>
            <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Ngày đăng:</b> {dataDetail.date}</p>
            <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Mô tả:</b> {dataDetail.description}</p>
            <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Ảnh:</b>{ dataDetail.images === "" ? " Không có ảnh nào!" : ""}</p>
            <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 10 }}>
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
                    <div style={{marginBottom: 10}}>
                        {
                            dataDetail.status === "Đã nhận" ? 
                                <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Tổ chức đã nhận:</b> {dataDetail.organizationReceived}</p> : dataDetail.status === "Chờ xác nhận" ?
                                    <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Tổ chức yêu cầu:</b> {dataDetail.organizationReceived}</p> : dataDetail.status === "Từ chối nhận" ?
                                        <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Tổ chức đã từ chối:</b> {dataDetail.organizationReceived}</p> : 
                                           <div>
                                                <p style={{marginBottom: 10}}><b style={{fontWeight: '600'}}>Danh sách tổ chức yêu cầu xác nhận:</b> {dataDetail?.listRequest.length === 0 ? "Chưa có tổ chức nào" : ""}</p>
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