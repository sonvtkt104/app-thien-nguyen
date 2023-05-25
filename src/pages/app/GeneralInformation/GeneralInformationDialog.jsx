import "./GeneralInformation.css"
import { memo, useState, useEffect } from 'react'
import { Modal, Image, Button, Checkbox, Form, Input, Upload, Select } from 'antd'
import { PlusOutlined, CloseOutlined, UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import { updateCharity } from "../HomePageCharity/HomePageCharityService";
import { getListProvince, getListDistrictByID, getListWardByID } from "../../client/MyAccount/MyAccountService";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";
import axios from "axios";
import { uploadImage } from "../HomePageCharity/HomePageCharityService";
import { useRef } from "react";
import { toast } from "react-toastify";

function GeneralInformationDialog({ dataUpdate, handleCloseModal, handleReloadData }) {
    const [form] = Form.useForm();
    console.log(dataUpdate)
    
    const valueImages = dataUpdate?.charityImages && dataUpdate?.charityImages !== "" ? dataUpdate?.charityImages?.split(",").reduce((a, b) => {
        return [...a, { url: b }]
    }, []) : []

    const [loading, setLoading] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false);
    const [loadingBanner, setLoadingBanner] = useState(false);

    const [open, setOpen] = useState(true)
    const [fileImage, setFileImage] = useState(dataUpdate?.avatar)
    const [fileImageBase, setFileImageBase] = useState(dataUpdate?.avatar)

    const [imageBanner, setImageBanner] = useState(dataUpdate?.charityBanner)
    const [imageBannerBase, setImageBannerBase] = useState(dataUpdate?.charityBanner)

    const [images, setImages] = useState(valueImages)
    const [imagesBase, setImagesBase] = useState(valueImages)

    const [files, setFiles] = useState([]) 

    const [previewImage, setPreviewImage] = useState()
    const [previewOpen, setPreviewOpen] = useState(false);


    const [listAddress, setListAddress] = useState({
        province: [],
        district: [],
        ward: []
    })

    const [provinceId, setProvinceId] = useState(undefined)
    const [districtId, setDistrictId] = useState(undefined)
    const [wardId, setWardId] = useState(undefined)


    useEffect(() => {
        form.setFieldsValue(dataUpdate);
    }, [])

    useEffect(() => {
        getListProvince().then(res => {
            setListAddress({ ...listAddress, "province": res.data })
        })

    }, [])

    useEffect(() => {
        if (provinceId !== undefined) {
            form.setFieldsValue({ district: null, ward: null })
            getListDistrictByID(provinceId).then(res => {
                setListAddress({ ...listAddress, "district": res.data })
            })
        }
    }, [provinceId])

    useEffect(() => {
        if (districtId !== undefined) {
            form.setFieldsValue({ ward: null })
            getListWardByID(districtId).then(res => {
                setListAddress({ ...listAddress, "ward": res.data })
            })
        }
    }, [districtId])


    const onChangeProvince = (value, value1) => {
        setProvinceId(value1.id)
    };

    const onSearchProvince = (value, value1) => {
        console.log("search province")
    };

    const onChangeDistrict = (value, value1) => {
        setDistrictId(value1.id)
    };

    const onSearchDistrict = (value, value1) => {
    };

    const onChangeWard = (value, value1) => {
        setWardId(value1.id)
    };

    const onSearchWard = (value, value1) => {
    };


    const onClose = () => {
        setOpen(false);
        handleCloseModal()
    }
    const onFinish = (values) => {
        values.avatar = fileImage
        values.charityBanner = imageBanner
        values.charityImages = images?.reduce((a, b) => {
            return [...a, b.url]
        }, []).join(",")
        values.googleMap = values?.googleMap?.includes("iframe") ? values.googleMap?.split('"')[1] : values.googleMap
        values.provinceId = provinceId || dataUpdate?.provinceId
        values.districtId = districtId || dataUpdate?.districtId
        values.wardId = wardId || dataUpdate?.wardId

        // console.log('Success:', values);

        const formData = new FormData();
        formData.append('name', values?.name)
        formData.append('email', values?.email)
        formData.append('address', values?.address)
        formData.append('phoneNumber', values?.phoneNumber)
        formData.append('provinceId', values?.provinceId)
        formData.append('province', values?.province)
        formData.append('districtId', values?.districtId)
        formData.append('district', values?.district)
        formData.append('wardId', values?.wardId)
        formData.append('ward', values?.ward)
        formData.append('charityId', dataUpdate?.charityId)
        formData.append('charityInfo.avatar', values?.avatar || "")
        formData.append('charityInfo.charityMotto', values?.charityMotto || "")
        formData.append('charityInfo.charityTarget', values?.charityTarget || "")
        formData.append('charityInfo.charityDescription', values?.charityDescription || "")
        formData.append('charityInfo.charityWebsite', values?.charityWebsite || "")
        formData.append('charityInfo.charityBanner', values?.charityBanner || "")
        formData.append('charityInfo.charityFacebook', values?.charityFacebook || "")
        formData.append('charityInfo.charityInstagram', values?.charityInstagram || "")
        formData.append('charityInfo.charityTwitter', values?.charityTwitter || "")
        formData.append('charityInfo.charityLinkedIn', values?.charityLinkedIn || "")
        formData.append('charityInfo.charityIntroVideo', values?.charityIntroVideo || "")
        formData.append('charityInfo.charityAccountNumber', values?.charityAccountNumber || "")
        formData.append('charityInfo.charityImages', values?.charityImages || "")
        formData.append('charityInfo.googleMap', values?.googleMap || "")
        
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        // console.log(files)

        updateCharity(dataUpdate?.id, formData).then(res => {
            if(res?.status === 200) {
                onClose()
                toast.success("Chỉnh sửa thành công")
                handleReloadData({})
            } else {
                toast.error("Hệ thống lỗi, xin thử lại sau!")
            }
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    console.log(images);
    console.log(files);
    console.log(imagesBase);


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleChange = async ({ file }) => {
        
        console.log(file.originFileObj)
        const formData = new FormData();
        formData.append('file', file.originFileObj);
        uploadImage(formData).then(res => {
            console.log(res)
            setLoadingAvatar(false)
            setFileImage(res.data.data)
        })
        const fileUrl = await getBase64(file.originFileObj);
        setFileImageBase(fileUrl)
    };

    const handleChangeBanner = async ({ file }) => {
        console.log(file.originFileObj)
        const formData = new FormData();
        formData.append('file', file.originFileObj);
        uploadImage(formData).then(res => {
            console.log(res)
            setLoadingBanner(false)
            setImageBanner(res.data.data)
        })
        const fileUrl = await getBase64(file.originFileObj);
        setImageBannerBase(fileUrl)
    };




    const handleChangeImage = (event) => {

    };
    const handleChangeListImages = async ({ file }) => {
        const fileBase = await getBase64(file.originFileObj);
        setImagesBase((imagesBase) => imagesBase ? [...imagesBase, { url: fileBase, name: file.name }] : [{ url: fileBase, name: file.name }])
        setFiles((files) => [...files, file.originFileObj])
    };
    const onRemoveImage = (value) => {
        setFiles((files) => files.filter((file, index) => file.name !== value.name))
        setImages((images) => images.filter((image) => image.url !== value.url))
        setImagesBase((images) => images.filter((image) => image.url !== value.url))
        return false
    }



    return (
        <div>
            <Modal
                title={<h2 className="h2-app">Sửa thông tin</h2>}
                cancelText="Quay lại"
                okText="Tạo"
                centered
                width={1200}
                open={open}
                maskClosable={false}
                footer={null}
                onCancel={onClose}
                className="gid-modal"
            >
                <Form
                    form={form}
                    layout={"vertical"}
                    name="basic"
                    style={{
                        width: "100%",
                        flexWrap: "wrap",
                    }}
                    initialValues={{
                        // avatar: dataUpdate?.avatar,
                        name: dataUpdate?.name,
                        phoneNumber: dataUpdate?.phoneNumber,
                        email: dataUpdate?.email,
                        charityAccountNumber: dataUpdate?.charityAccountNumber,
                        address: dataUpdate?.address,
                        charityTarget: dataUpdate?.charityTarget,
                        charityMotto: dataUpdate?.charityMotto,
                        charityDescription: dataUpdate?.charityDescription,
                        charityFacebook: dataUpdate?.charityFacebook,
                        charityInstagram: dataUpdate?.charityInstagram,
                        charityTwitter: dataUpdate?.charityTwitter,
                        charityLinkedIn: dataUpdate?.charityLinkedIn,
                        charityIntroVideo: dataUpdate?.charityIntroVideo,
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}

                >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Form.Item
                            style={{ width: "20%", marginBottom: 10 }}
                            name="avatar"
                        >
                            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", height: 260, marginTop: 10 }}>
                                <div>
                                    <div className="avatar" style={{ width: 200, height: 200, border: "1px solid #E5E5E5", borderRadius: '50%', display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Image
                                                    src={fileImageBase?.toString() || 'error'}
                                                    fallback="data:image/png;base64,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"
                                                    className="gid-image"
                                                    width={200}
                                                    height={200}
                                                    onChange={handleChangeImage}

                                                />
                                        {/*   */}
                                    </div>
                                </div>
                                <div >
                                    <Form.Item name="avatar">
                                        <Upload
                                            showUploadList={false}
                                            name="avatar"
                                            onChange={handleChange}
                                            customRequest={() => false}

                                            beforeUpload={() => {
                                                setLoadingAvatar(true)
                                            }}
                                            onSuccess={() => {
                                                setLoadingAvatar(false)
                                            }}
                                        >
                                            <Button className="btn" >
                                                Chọn ảnh đại diện
                                            </Button>
                                        </Upload>
                                    </Form.Item>
                                </div>
                            </div>
                        </Form.Item>
                        <div style={{ width: "80%", height: 500, overflowY: "scroll", paddingRight: 8, marginBottom: 15 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 10 }}
                                    label="Tên tổ chức"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Tên tổ chức!',
                                        },
                                    ]}
                                >
                                    <Input className="input-app" />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 10 }}
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Số điện thoại!',
                                        },
                                    ]}
                                >
                                    <Input className="input-app"/>
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 10 }}
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
                                    <Input className="input-app"/>
                                </Form.Item>

                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 10 }}
                                    label="Tỉnh/Thành Phố"
                                    name="province"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn Tỉnh/Thành Phố!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Chọn Tỉnh/Thành Phố"
                                        optionFilterProp="children"
                                        onChange={onChangeProvince}
                                        onSearch={onSearchProvince}
                                        onSelect={(value) => console.log(value)}
                                        filterOption={(input, option) =>
                                            (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        fieldNames={{ label: "fullName", value: "fullName", options: "options" }}
                                        options={listAddress.province}
                                        className="select-app"
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 10 }}
                                    label="Huyện/Quận"
                                    name="district"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn Huyện/Quận!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Chọn Huyện/Quận"
                                        optionFilterProp="children"
                                        onChange={onChangeDistrict}
                                        onSearch={onSearchDistrict}
                                        onSelect={(value) => console.log(value)}
                                        filterOption={(input, option) =>
                                            (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        fieldNames={{ label: "fullName", value: "fullName", options: "options" }}
                                        options={listAddress.district}
                                        className="select-app"
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 10 }}
                                    label="Phường/Xã"
                                    name="ward"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn Phường/Xã!',
                                        },
                                    ]}
                                >
                                    <Select
                                        showSearch
                                        placeholder="Chọn Phường/Xã"
                                        optionFilterProp="children"
                                        onChange={onChangeWard}
                                        onSearch={onSearchWard}
                                        onSelect={(value) => console.log(value)}
                                        filterOption={(input, option) =>
                                            (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        fieldNames={{ label: "fullName", value: "fullName", options: "options" }}
                                        options={listAddress.ward}
                                        className="select-app"
                                    />
                                </Form.Item>

                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Form.Item
                                    style={{ width: "100%", marginBottom: 16 }}
                                    label="Địa chỉ cụ thể"
                                    name="address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Địa chỉ!',
                                        },
                                    ]}
                                >
                                    <Input className="input-app"/>
                                </Form.Item>

                            </div>
                            <Form.Item
                                style={{ width: "100%", marginBottom: 16 }}
                                label="Giới thiệu"
                                name="charityDescription"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập phần Giới thiệu!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} className="textarea-app" />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%", marginBottom: 16 }}
                                label="Video Giới thiệu"
                                name="charityIntroVideo"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Video Giới thiệu!',
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập link video Youtube" className="input-app" />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%", marginBottom: 16 }}
                                label="Mục tiêu"
                                name="charityTarget"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Mục tiêu!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} className="textarea-app" />
                            </Form.Item>

                            <Form.Item
                                style={{ width: "100%", marginBottom: 16 }}
                                label="Phương châm"
                                name="charityMotto"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Phương châm!',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} className="textarea-app"/>
                            </Form.Item>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 16 }}
                                    label="Tài khoản ngân hàng"
                                    name="charityAccountNumber"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Vui lòng nhập Thông tin Tài khoản ngân hàng!',
                                //     },
                                // ]}
                                >
                                    <Input placeholder="Nhập thông tin Tài khoản ngân hàng" className="input-app" />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "32%", marginBottom: 16 }}
                                    label="WebSite"
                                    name="charityWebsite"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Vui lòng nhập WebSite!',
                                //     },
                                // ]}
                                >
                                    <Input placeholder="Nhập link website" className="input-app"  />
                                </Form.Item>

                                <Form.Item
                                    style={{ width: "32%", marginBottom: 16 }}
                                    label="GoogleMap"
                                    name="googleMap"
                                // rules={[
                                //     {
                                //         required: true,
                                //         message: 'Vui lòng nhập GoogleMap!',
                                //     },
                                // ]}
                                >
                                    <Input placeholder="Nhập iframe nhúng bản đồ"  className="input-app" />
                                </Form.Item>
                            </div>
                            <p style={{ marginBottom: 10 }}>Mạng xã hội khác</p>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap" }}>
                                <Form.Item
                                    style={{ width: "48%", marginBottom: 16, marginLeft: 10 }}
                                    label="Facebook"
                                    name="charityFacebook"
                                >
                                    <Input placeholder="Nhập link Facebook" className="input-app" />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "49%", marginBottom: 16 }}
                                    label="Instagram"
                                    name="charityInstagram"
                                >
                                    <Input placeholder="Nhập link Instagram" className="input-app"  />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "48%", marginBottom: 16, marginLeft: 10 }}
                                    label="Twitter"
                                    name="charityTwitter"
                                >
                                    <Input placeholder="Nhập link Twitter" className="input-app" />
                                </Form.Item>
                                <Form.Item
                                    style={{ width: "49%", marginBottom: 16 }}
                                    label="LinkedIn"
                                    name="charityLinkedIn"
                                >
                                    <Input placeholder="Nhập link LinkedIn" className="input-app" />
                                </Form.Item>
                            </div>
                            <Form.Item label="Ảnh Banner" name="charityBanner">
                                <Upload
                                    name="charityBanner"
                                    listType="picture-card"
                                    showUploadList={false}
                                    customRequest={() => false}
                                    onChange={handleChangeBanner}
                                    beforeUpload={() => {
                                        setLoadingBanner(true)
                                    }}
                                    onSuccess={() => {
                                        setLoadingBanner(false)
                                    }}
                                >
                                    {imageBannerBase ? <img src={imageBannerBase} alt="avatar" style={{ width: '100%' }} /> :
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Tải ảnh Banner</div>
                                        </div>
                                    }
                                </Upload>
                            </Form.Item>
                            <Form.Item label="Ảnh" name="charityImages">
                                <Upload
                                    multiple
                                    listType="picture-card"
                                    name="charityImages"
                                    onChange={handleChangeListImages}
                                    fileList={imagesBase || []}
                                    onRemove={onRemoveImage}
                                    onPreview={(file) => { setPreviewOpen(true); setPreviewImage(file.url) }}
                                    customRequest={() => false}

                                    beforeUpload={() => {
                                        setLoading(true)
                                    }}
                                    onSuccess={() => {
                                        setLoading(false)
                                    }}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                    </div>
                                </Upload>
                            </Form.Item>


                        </div>
                    </div>
                    <Form.Item
                        wrapperCol={{
                            span: 0,
                            offset: 0,
                        }}
                    >
                        <div style={{ textAlign: "right" }}>
                            <Button
                                style={{ marginRight: 10 }}
                                onClick={onClose}
                                className="btn"
                            >
                                Quay lại
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="btn-primary"
                            >
                                Lưu
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
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
        </div>
    )
}

export default memo(GeneralInformationDialog)