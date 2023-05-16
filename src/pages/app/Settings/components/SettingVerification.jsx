import { memo, useState } from "react"
import { Card } from "../../../../components"
import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Row, Upload, Form, Image, Input, Button } from 'antd';
import { uploadImage } from "../../HomePageCharity/HomePageCharityService";


function SettingVerification() {
    const [form] = Form.useForm();
    const [image, setImage] = useState()
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        values.verificationPhoto = image
        console.log('Success:', values);

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleChange = ({ file }) => {
        console.log(file.originFileObj)
        const formData = new FormData();
        formData.append('file', file.originFileObj);
        uploadImage(formData).then(res => {
            console.log(res)
            setLoading(false)
            setImage(res?.data?.data)
        })
    };

    return (
        <Card title='Đăng ký xác thực'>
            <div style={{ padding: '20px 40px' }}>
                <Form
                    form={form}
                    layout={"vertical"}
                    name="basic"
                    style={{
                        width: "100%",
                        flexWrap: "wrap",
                        // height: 500,
                    }}
                    initialValues={{
                        verificationPhoto: "",
                        message: ""

                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <div style={{ width:300, height: 300, border: "1px solid #E5E5E5", display: "flex", justifyContent: "center", alignItems: "center"}}>

                        {
                            loading ? <div>
                                <LoadingOutlined style={{ fontSize: 24 }} />
                            </div> :
                                <Image
                                    src={image?.toString()}
                                    // src={image?.toString() || 'error'}
                                    // fallback="data:image/png;base64,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"
                                    // className="gid-image"
                                    // width={200}
                                    // height={200}
                                    alt="Không có ảnh!"
                                // onChange={handleChangeImage}

                                />
                        }
                    </div>
                    <Form.Item name="verificationPhoto">
                        <Upload
                            showUploadList={false}
                            name="verificationPhoto"
                            onChange={handleChange}
                            customRequest={() => false}

                            beforeUpload={() => {
                                setLoading(true)
                            }}
                            onSuccess={() => {
                                setLoading(false)
                            }}
                        >
                            <Button style={{marginTop:16}} type="primary">
                                Chọn ảnh xác minh
                            </Button>
                        </Upload>
                    </Form.Item>
                    <p style={{ fontSize: 20, fontWeight: '600', margin: '20px 0 10px' }}>Thêm lời nhắn</p>
                    <Form.Item
                        style={{ width: "100%", marginBottom: 16 }}
                        // label="Thêm lời nhắn"
                        label=""
                        name="message"
                    // rules={[
                    //     {
                    //         required: true,
                    //         message: 'Vui lòng nhập phần Giới thiệu!',
                    //     },
                    // ]}
                    >
                        <Input.TextArea placeholder="Nhập..." rows={4} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            span: 0,
                            offset: 0,

                        }}
                        style={{ marginBottom: 0 }}
                    >
                        <div style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Gửi
                            </Button>
                        </div>
                    </Form.Item>

                </Form>
            </div>
        </Card>
    )
}

export default SettingVerification

