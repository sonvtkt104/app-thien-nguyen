import SideBar from "./SideBar"
import { Button, Checkbox, Form, Input } from 'antd';

function PassWord() {

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(values.newPassword === values.confirmNewPassword)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <SideBar>
            <div>
                <h2>Thay đổi mật khẩu</h2>
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
                        // remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        style={{ width: "100%", marginBottom: 10 }}
                        label="Mật khẩu hiện tại"
                        name="currentPassword"
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
                        name="newPassword"
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
                        name="confirmNewPassword"
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
                            // offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </SideBar>
    )

}

export default PassWord