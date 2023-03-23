import "./css/DonationPost.css"
import { useState } from 'react'
import { Modal, Image, Button, Checkbox, Form, Input, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

function DonationPostDialog({ dataUpdate, handleCloseModal }) {
    const [open, setOpen] = useState(true)
    const [image, setImage] = useState([])
    console.log("dataUpdate")
    console.log(dataUpdate)
    const onClose = () => {
        setOpen(false); 
        handleCloseModal()
    }
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Modal
            title={dataUpdate?.id ? "Sửa bài đăng" :"Tạo bài đăng"}
            cancelText="Quay lại"
            okText="Tạo"
            centered
            width={700}
            open={open}
            maskClosable={false}
            footer={null}
            // onOk={() => {
                
            //     // onClose() 
            // }}
            onCancel={() => { onClose() }}
            className="dpd-modal"
        >
            <Form
                layout={"vertical"}
                name="basic"
                style={{
                    width: "100%",
                    flexWrap: "wrap"
                }}
                initialValues={{
                    donorName: dataUpdate? dataUpdate.donorName : "",
                    phone: dataUpdate? dataUpdate.phone : "",
                    address: dataUpdate? dataUpdate.address : "",
                    name: dataUpdate? dataUpdate.name : "",
                    donationObject: dataUpdate? dataUpdate.donationObject : "",
                    donationAddress: dataUpdate? dataUpdate.donationAddress : "",
                    description: dataUpdate? dataUpdate.description : "",
                    images: dataUpdate? dataUpdate.images : "",
                }}
                autoComplete="off"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Form.Item
                        style={{ width: "49%", marginBottom: 10 }}
                        label="Họ và tên"
                        name="donorName"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Họ và tên!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ width: "49%", marginBottom: 10 }}
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

                </div>

                <Form.Item
                    style={{ width: "100%", marginBottom: 10 }}
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Địa chỉ của bạn!',
                        },
                    ]}
                >
                    <Input
                    // value={info}
                    // onChange={(e) => { setInfo(e.target.value) }}

                    />
                </Form.Item>

                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <Form.Item
                        style={{ width: "49%", marginBottom: 16 }}
                        label="Tên đồ ủng hộ"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Tên đồ ủng hộ!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        style={{ width: "49%", marginBottom: 16 }}
                        label="Đối tượng muốn ủng hộ"
                        name="donationObject"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập Đối tượng muốn ủng hộ!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </div>
                <Form.Item
                    style={{ width: "100%", marginBottom: 16 }}
                    label="Địa chỉ muốn ủng hộ"
                    name="donationAddress"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập Địa chỉ muốn ủng hộ!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    style={{ width: "100%", marginBottom: 16 }}
                    label="Mô tả"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập phần Mô tả!',
                        },
                    ]}
                >
                    {/* <Input /> */}
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item label="Ảnh" name="images">
                    <Upload
                        listType="picture-card"
                        // customRequest={(e) => {
                        //     // setImage({...image,})
                        //     console.log(e)
                        //     console.log("upload")
                        // }}
                    >
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Ảnh
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span:0,
                        offset: 0,
                        // span: 8,
                    }}
                >
                    <div style={{textAlign:"right"}}>
                        <Button 
                            style={{marginRight: 10}}
                            onClick={onClose}
                        >
                            Quay lại
                        </Button>
                        <Button 
                            type="primary" 
                            htmlType="submit"
                        >
                            {dataUpdate?.id ? "Lưu" :"Tạo"}
                        </Button>
                    </div>
                </Form.Item>


            </Form>
        </Modal>
    )
}

export default DonationPostDialog