import "./donation.css"
import { Modal, Image, Table, Button } from 'antd'
import { useState } from 'react'
import Confirmation from "../../client/MyAccount/Confirmation"
import { updateDonationPostUser } from "../../client/MyAccount/MyAccountService";
import { updateDonationByID } from "../../app/Donation/listDonation/DonationService";


function ModalDetail({ dataDetail, handleCloseModalDetail, getListDonation }) {
    const [open, setOpen] = useState(true)
    const [dataRow, setDataRow] = useState({})
    console.log(dataDetail)


    const handleConfirmation = (rowData) => {
        Modal.confirm({
            title: `Bạn có chắc chắn, bạn muốn xác nhận cho tổ chức  ${rowData.name}?`,
            cancelText: "Quay lại",
            okText: "Có",
            okType: "danger",
            centered: "true",
            onCancel: () => {
                console.log("quay lai")
                setDataRow({})
            },
            onOk: async () => {
                handleCloseModalDetail()
                setDataRow({})
                console.log(rowData)
                console.log(dataDetail)
                const idUpdateDonationPostUser = dataDetail.id
                const dataUpdateDonationPostUser = { ...dataDetail, idOrganization: rowData.id, organizationReceived: rowData.name, listRequest: [], status: "Đã nhận" }
                console.log(idUpdateDonationPostUser)
                console.log(dataUpdateDonationPostUser)
                // console.log("update bai dang", rowData)
                updateDonationPostUser(idUpdateDonationPostUser, dataUpdateDonationPostUser)
                  .then(res => console.log(res))

                const dataUpdateDonationByID = { ...dataDetail }
                const idUpdateDonationByID = dataDetail.id + "or"
                dataUpdateDonationByID.idPost = dataDetail.id
                dataUpdateDonationByID.status = "private"
                dataUpdateDonationByID.listRequest = dataDetail?.listRequest?.map(data => {
                    return data.id === rowData.id ? { ...data, status: "Đã xác nhận" } : { ...data, status: "Bị hủy" }
                })
                dataUpdateDonationByID.idOrganization = rowData.id
                dataUpdateDonationByID.organizationReceived = rowData.name
                delete dataUpdateDonationByID.id

                console.log(idUpdateDonationByID)
                console.log(dataUpdateDonationByID)

                updateDonationByID(idUpdateDonationByID, dataUpdateDonationByID).then(res => console.log(res))
                getListDonation()
                

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
            dataIndex: "name",
            // render: (rowData) => {
            //     console.log(rowData)
            //     return (
            //         <div
            //             key={rowData.id}
            //             className="cm-border-or"

            //         >
            //             {rowData.name}
            //         </div>
            //     )
            // }
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
            <p><b>Thông tin liên hệ:</b> {dataDetail.phone}, {dataDetail.address} </p>
            <p><b>Thông tin đồ ủng hộ:</b> "{dataDetail.name}", mong muốn ủng hộ cho "{dataDetail.donationObject}", ở "{dataDetail.donationAddress}"</p>
            <p><b>Ngày đăng:</b> {dataDetail.date}</p>
            <p><b>Mô tả:</b> {dataDetail.description}</p>
            <p><b>Ảnh:</b></p>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
                {
                    dataDetail.images?.map((image, index) =>
                        <div key={index} style={{ margin: "2px", border: "1px solid #e7e5e5", display: "flex", alignItems: "center", height: 100, width: 100 }}>
                            <Image
                                className="modal-detail-image"
                                style={{ maxHeight: 100, maxWidth: 100 }}
                                key={index}
                                width={100}
                                src={image}>
                            </Image>
                        </div>
                    )
                }
            </div>
            {
                dataDetail.status !== "public" && dataDetail.status !== "private" &&
                (
                    <div>
                        {
                            dataDetail.status === "Đã nhận" ? 
                                <p><b>Tổ chức đã nhận:</b> {dataDetail.organizationReceived}</p> : dataDetail.status === "Chờ xác nhận" ?
                                    <p><b>Tổ chức yêu cầu:</b> {dataDetail.organizationReceived}</p> : dataDetail.status === "Từ chối nhận" ?
                                        <p><b>Tổ chức đã từ chối:</b> {dataDetail.organizationReceived}</p> : 
                                           <div>
                                                <p><b>Danh sách tổ chức yêu cầu xác nhận:</b> {dataDetail.organizationReceived}</p>
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
                                           </div>
                        }

                        {/* <p><b>{dataDetail.status === "Chưa nhận" ? "Yêu cầu xác nhận" : dataDetail.status === "Đã nhận" ? "Tổ chức đã nhận" : dataDetail.status === "Đã nhận"}</b></p>
                        <div>
                            <Table
                                className="cm-table"
                                bordered
                                rowKey={(rowdata) => rowdata.id}
                                columns={columns}
                                dataSource={dataDetail?.listRequest}
                                pagination={false}
                            />
                        </div> */}
                    </div>
                )
            }
        </Modal>
    )
}

export default ModalDetail