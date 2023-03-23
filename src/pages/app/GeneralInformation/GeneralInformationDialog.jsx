import "./GeneralInformation.css"
import { memo, useState } from 'react'
import { Modal, Image, Button, Checkbox, Form, Input, Upload } from 'antd'

function GeneralInformationDialog({ dataUpdate, handleCloseModal }) {
    const [open, setOpen] = useState(true)
    const [fileImage, setFileImage] = useState(dataUpdate.avatar)
    // console.log(fileImage)
    // console.log(dataUpdate)

    const onClose = () => {
        setOpen(false);
        handleCloseModal()
    }
    const onFinish = (values) => {
        values.avatar = fileImage
        // delete values.photoUrl
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

    const handleChange = async ({ file }) => {
        const fileUrl = await getBase64(file.originFileObj);
        setFileImage(fileUrl)
    };

    // ảnh

    const handleButtonClick = () => {
        // inputRef.current.click();
    };

    const handleChangeImage = (event) => {
        const selectedImage = event.target.files[0];
        const imageUrl = URL.createObjectURL(selectedImage);
        // setFileImage(selectedImage);
        setFileImage(imageUrl);
    };



    return (
        <Modal
            title={"Sửa thông tin"}
            cancelText="Quay lại"
            okText="Tạo"
            centered
            width={1200}
            open={open}
            maskClosable={false}
            footer={null}
            // onOk={() => {

            //     // onClose() 
            // }}
            onCancel={() => { onClose() }}
            className="gid-modal"
        >
            <Form
                layout={"vertical"}
                name="basic"
                style={{
                    width: "100%",
                    flexWrap: "wrap"
                }}
                initialValues={{
                    // avatar: dataUpdate?.avatar,
                    name: dataUpdate?.name,
                    phone: dataUpdate?.phone,
                    email: dataUpdate?.email,
                    accountNumber: dataUpdate?.accountNumber,
                    address: dataUpdate?.address,
                    targetOfOrganization: dataUpdate?.targetOfOrganization,
                    mottoOfOrganization: dataUpdate?.mottoOfOrganization,
                    introduction: dataUpdate?.introduction,
                    socialNetwork: dataUpdate?.socialNetwork.join(" ; "),
                    // name: dataUpdate.name,
                }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}

            >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <Form.Item
                        style={{ width: "20%", marginBottom: 10 }}
                        // label="Tên tổ chức"
                        name="avatar"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Vui lòng nhập Tên tổ chức!',
                    //     },
                    // ]}
                    >
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", height: 260, marginTop: 10 }}>
                            {/* <div style={{ width: "100%" }}>
                                <Image
                                    width={"90%"}
                                    src={dataUpdate?.avatar}
                                    className="gid-image"
                                />
                            </div>
                            <Button
                                style={{ marginRight: 25 }}
                            >
                                Chọn ảnh đại diện
                            </Button> */}



                            <div>
                                <div className="avatar" >
                                    {/* {fileImage ? <img src={fileImage} alt="" /> : <div>a</div>} */}
                                    <Image
                                        src={fileImage?.toString()}
                                        className="gid-image"
                                        width={200}
                                        height={200}
                                        onChange={handleChangeImage}
                                    />
                                </div>
                            </div>
                            <div >
                                <Form.Item name="photoUrl">
                                    <Upload
                                        showUploadList={false}
                                        name="photoUrl"
                                        onChange={handleChange}
                                        action="http://localhost:8888/data"
                                    >
                                        <Button >
                                            Chọn ảnh đại diện
                                        </Button>
                                    </Upload>
                                </Form.Item>
                            </div>




                        </div>
                    </Form.Item>
                    {/* <div style={{width: "30%"}}>
                        <Image
                            width={300}
                            src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}
                        />
                        <Button>Chọn ảnh đại diện</Button>
                    </div> */}
                    <div style={{ width: "80%" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Form.Item
                                style={{ width: "49%", marginBottom: 10 }}
                                label="Tên tổ chức"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Tên tổ chức!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "23.5%", marginBottom: 10 }}
                                label="Số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Số điện thoại!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "23.5%", marginBottom: 10 }}
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ!',
                                    },
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Form.Item
                                style={{ width: "49%", marginBottom: 16 }}
                                label="Thông tin Tài khoản ngân hàng"
                                name="accountNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Thông tin Tài khoản ngân hàng!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "49%", marginBottom: 16 }}
                                label="Địa chỉ"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Địa chỉ!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Form.Item
                                style={{ width: "49%", marginBottom: 16 }}
                                label="Mục tiêu"
                                name="targetOfOrganization"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Mục tiêu!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                style={{ width: "49%", marginBottom: 16 }}
                                label="Phương châm"
                                name="mottoOfOrganization"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Phương châm!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </div>

                        <Form.Item
                            style={{ width: "100%", marginBottom: 16 }}
                            label="Giới thiệu"
                            name="introduction"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập phần Giới thiệu!',
                                },
                            ]}
                        >
                            {/* <Input /> */}
                            <Input.TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            style={{ width: "100%", marginBottom: 16 }}
                            label="Link Mạng xã hội khác"
                            name="socialNetwork"
                        // rules={[
                        //     {
                        //         required: true,
                        //         message: 'Vui lòng nhập Link Mạng xã hội khác!',
                        //     },
                        // ]}
                        >
                            <Input />
                        </Form.Item>


                    </div>
                </div>



                <Form.Item
                    wrapperCol={{
                        span: 0,
                        offset: 0,
                        // span: 8,
                    }}
                >
                    <div style={{ textAlign: "right" }}>
                        <Button
                            style={{ marginRight: 10 }}
                            onClick={onClose}
                        >
                            Quay lại
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                console.log("haikhuat")
                            }}
                        >
                            Lưu
                        </Button>
                    </div>
                </Form.Item>



            </Form>
        </Modal>
    )
}

export default memo(GeneralInformationDialog)