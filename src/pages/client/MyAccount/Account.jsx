import SideBar from "./SideBar"
import { Button, Checkbox, Form, Input } from 'antd';
import { useState } from "react";

function Account() {

    // const [info, setInfo] = useState({})

    // console.log(info)

    const info = {
        "id": "abcd12345",
        "name": "Khuất Văn Hải",
        "avatar": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        "phone": "0123456789",
        "email": "hai@gmail.com",
        "address": "144 Xuân Thủy Cầu Giấy Hà Nội",
    }
    // const onFinish = (values) => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo) => {
    //     console.log('Failed:', errorInfo);
    // };

    return (
        <SideBar>
            <div style={{width:"100%"}}>
                <div style={{marginTop:10}}>
                    <h2>Thông tin chung</h2>
                    <Form
                        layout={"vertical"}
                        name="basic"
                        // labelCol={{
                        //     span: 8,
                        // }}
                        // wrapperCol={{
                        //     span: 16,
                        // }}
                        style={{
                            width: "100%",
                            padding: "10px 0 10px 20px",
                            // maxWidth: 850,
                            // display: "flex",
                            flexWrap: "wrap"
                        }}
                        initialValues={{
                            name: info ? info.name : "",
                            phone: info ? info.phone : "",
                            email: info ? info.email : "",
                            address: info ? info.address : "",
                            // remember: true,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            style={{ width: "100%", marginBottom: 10 }}
                            label="Họ và tên"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Họ và tên!',
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

                            <Form.Item
                                style={{ width: "49%", marginBottom: 10 }}
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

                        <Form.Item
                            style={{ width: "100%", marginBottom: 16 }}
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Địa chỉ của bạn!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                // offset: 8,
                                // span: 8,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                {/* <div>
                    <h2>Thay đổi mật khẩu</h2>
                    <Form
                        layout={"vertical"}
                        name="basic"
                        style={{
                            width: "100%",
                            padding: "10px 0 10px 20px",
                            flexWrap: "wrap"
                        }}
                        initialValues={{
                            // remember: true,
                        }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >

                        <Form.Item
                            style={{ width: "100%", marginBottom: 10 }}
                            label="Mật khẩu hiện tại"
                            name="pass"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Mật khẩu hiện tại!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            style={{ width: "100%", marginBottom: 10 }}
                            label="Mật khẩu mới"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Mật khẩu mới!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>



                        <Form.Item
                            style={{ width: "100%", marginBottom: 16 }}
                            label="Xác nhận mật khẩu mới"
                            name="address"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Xác nhận mật khẩu mới!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Lưu thay đổi
                            </Button>
                        </Form.Item>
                    </Form>
                </div> */}
            </div>
        </SideBar>
    )
}


export default Account