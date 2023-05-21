import "../index.css"
import { memo, useEffect, useRef, useState } from "react"
import { Card } from "../../../../components"
import { InboxOutlined, LoadingOutlined, PlusOutlined, CloseOutlined, MinusOutlined } from '@ant-design/icons';
import { message, Row, Upload, Form, Image, Input, Button, Modal } from 'antd';
import { uploadImage } from "../../HomePageCharity/HomePageCharityService";
import { getVerificationRequest, verificationRequest } from "../SettingsService";
import { getInfoOfUserFromCookies } from "../../../Authentication/HandleUserInfomation";
import { toast } from "react-toastify";

function SettingVerification() {
    const [form] = Form.useForm();

    const [imagesBase, setImagesBase] = useState([])
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState()
    const [files, setFiles] = useState([])
    const [dataRequest, setDataRequest] = useState()
    const [reload, setReload] = useState()

    useEffect(() => {
        getVerificationRequest(getInfoOfUserFromCookies().charityId).then(res => {
            setDataRequest(res?.data?.data)
        })
    }, [reload])

    console.log(dataRequest);

    const onFinish = (values) => {
        const formData = new FormData();
        formData.append('message', values.message);

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        verificationRequest(getInfoOfUserFromCookies().charityId, formData).then(res => {
            console.log(res)
            if(res?.status === 200) {
                toast.success("Đăng ký xác minh thành công")
                setReload({})
            } else {
                toast.error("Hệ thống lỗi, xin thử lại sau!")
            }

        })

    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    // console.log(images);
    // console.log(imagesBase);
    // console.log("files", files)

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleChange = async ({ file }) => {
        const fileBase = await getBase64(file.originFileObj);
        setImagesBase((imagesBase) => imagesBase.includes(fileBase) ? imagesBase : [...imagesBase, { url: fileBase, name: file.name }])
        setFiles((files) => [...files, file.originFileObj])
    };

    const onRemoveImage = (value) => {
        console.log("Đã xóa tệp o onRemoveImage", value);
        setFiles((files) => files.filter((file, index) => file.name !== value.name))
        setImagesBase((images) => images.filter((image) => image.url !== value.url))
        return false
    }
    const cardTitle = (
        <div style={{ display: "flex", gap: 8 }}>
            <p>Đăng ký xác thực</p>
            <p style={{ fontSize: 16, fontWeight: 500, display: "flex", alignItems: "center" }}>-</p>
            <p style={{ fontSize: 16, fontWeight: 500, display: "flex", alignItems: "center" }}>{!dataRequest ? "Chưa đăng ký" : dataRequest?.isVerified === 1 ? " Đang chờ xác thực" : "Xác thực thành công"}</p>

        </div>
    )

    return (
        <>
            <Card title={cardTitle}>
                <div style={{ padding: '20px 40px' }}>
                    {
                        !dataRequest ? (
                            <Form
                                form={form}
                                layout={"vertical"}
                                name="basic"
                                style={{
                                    width: "100%",
                                    flexWrap: "wrap",
                                }}
                                initialValues={{
                                    verificationPhoto: "",
                                    message: ""

                                }}
                                autoComplete="off"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}

                            >

                                <div>
                                    <Form.Item name="verificationPhoto" >
                                        <Upload
                                            multiple
                                            className="upload-image-sv"
                                            style={{ width: '500px' }}
                                            listType="picture-card"
                                            name="verificationPhoto"
                                            onChange={handleChange}
                                            fileList={imagesBase || []}
                                            onRemove={onRemoveImage}
                                            onPreview={(file) => { setPreviewOpen(true); setPreviewImage(file.url) }}
                                            customRequest={() => false}
                                        >
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                            </div>
                                        </Upload>
                                    </Form.Item>
                                </div>
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
                                    <Input.TextArea placeholder="Nhập..." rows={6} />
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
                        )
                            :
                            (
                                <div>
                                    <p style={{fontSize: 16}}><b>Ảnh xác minh:</b></p>
                                    <div style={{ display: "flex", flexWrap: "wrap", margin:"12px 0" }}>
                                        {
                                            dataRequest?.charityFile?.split(", ")?.map((image, index) =>
                                                <div key={index} style={{ margin: "2px", border: "1px solid #e7e5e5", display: "flex", alignItems: "center", height: 164, width: "32%" }}>
                                                    <Image
                                                        style={{ maxHeight: 164, maxWidth: 164 }}
                                                        key={index}
                                                        src={image}
                                                        onRemove={onRemoveImage}
                                                    />
                                                </div>
                                            )
                                        }
                                    </div>
                                    <p><b>Lời nhắn:</b> {dataRequest.messageToAdmin}</p>
                                </div>
                            )
                    }

                </div>
            </Card>
            <Modal
                className="modal-preview-image-app"
                open={previewOpen}
                footer={null}
                closeIcon={<CloseOutlined style={{ fontSize: 24, color: '#ffffff' }} />}
                width={800}
                onCancel={() => {
                    setPreviewOpen(false);
                }}
            >
                <img src={previewImage} alt="charity_image"
                    style={{ width: '100%', height: '100%' }}
                />
            </Modal>
        </>
    )
}

export default SettingVerification

