import "./css/DonationPost.css"
import { useEffect, useRef, useState } from 'react'
import { Modal, Image, Button, Checkbox, Form, Input, Upload, Select } from 'antd'
import { PlusOutlined, CloseOutlined, LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { createDonationPostUser, getCurrentUser, getListDistrictByID, getListProvince, getListWardByID, updateDonationPostUser, getAllCharity } from "./MyAccountService";
import { uploadImage } from "../../app/HomePageCharity/HomePageCharityService";
import { toast } from "react-toastify";

function DonationPostDialog({ dataUpdate, handleCloseModal, getListDonation }) {
    const [form] = Form.useForm();
    // const dataInfo = useRef()
    const [listCharity, setListCharity] = useState([]);
    const [dataInfo, setDataInfo] = useState();

    let options = [
        {
            label: 'Tất cả mọi người',
            value: 'Tất cả mọi người'
        },
        {
            label: 'Trẻ em',
            value: 'Trẻ em'
        },
        {
            label: 'Trẻ em mồ côi',
            value: 'Trẻ em mồ côi'
        },
        {
            label: 'Người già',
            value: 'Người già'
        },
        {
            label: 'Người khuyết tật',
            value: 'Người khuyết tật'
        },
        {
            label: 'Thương binh liệt sỹ',
            value: 'Thương binh liệt sỹ'
        },
        {
            label: 'Người vô gia cư',
            value: 'Người vô gia cư'
        },
    ]

    useEffect(() => {
        getCurrentUser().then(res => {
            setDataInfo(res?.data?.data)
            form.setFieldsValue(dataUpdate)
        })
    }, [])
    // console.log(listCharity)

    useEffect(() => {
        getAllCharity().then(res => {
            // console.log(res)
            setListCharity([{ charityId: "Tất cả", charityName: "Tất cả" }, ...res?.data?.data])
        })
    }, [])

    // console.log(dataInfo.current)

    // console.log(dataUpdate)
    const valueImages = dataUpdate?.images !== "" ? dataUpdate?.images?.split(", ").reduce((a, b) => {
        return [...a, { url: b }]
    }, []) : []

    const [open, setOpen] = useState(true)
    const [images, setImages] = useState(valueImages)
    const [imagesBase, setImagesBase] = useState(valueImages)
    const [previewImage, setPreviewImage] = useState()
    const [previewOpen, setPreviewOpen] = useState(false);
    const [idOrganization, setIdOrganization] = useState(dataUpdate ? dataUpdate.idOrganization : null)
    const [organizationReceived, setOrganizationReceived] = useState(dataUpdate ? dataUpdate.organizationReceived : null)
    const time = new Date()
    const [loading, setLoading] = useState(false);
    const [listAddress, setListAddress] = useState({
        province: [],
        district: [],
        ward: []
    })
    const [idProvince, setIdProvince] = useState(undefined)
    const [idDistrict, setIdDistrict] = useState(undefined)


    useEffect(() => {
        getListProvince().then(res => {
            setListAddress({ ...listAddress, "province": res.data })
        })

    }, [])

    useEffect(() => {
        if (idProvince !== undefined) {
            form.setFieldsValue({ district: null, ward: null })
            getListDistrictByID(idProvince).then(res => {
                setListAddress({ ...listAddress, "district": res.data })
            })
        }
    }, [idProvince])

    useEffect(() => {
        if (idDistrict !== undefined) {
            form.setFieldsValue({ ward: null })
            getListWardByID(idDistrict).then(res => {
                setListAddress({ ...listAddress, "ward": res.data })
            })
        }
    }, [idDistrict])


    const onClose = () => {
        setOpen(false);
        handleCloseModal()
    }
    const onFinish = (values) => {
        values.images = images?.reduce((a, b) => {
            return [...a, b.url]
        }, []).join(", ")
        values.date = time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear()
        // values.address = `${values.address}, ${values.ward}, ${values.district}, ${values.province}` 
        // delete values.province
        // delete values.district
        // delete values.ward
        if (dataUpdate?.id) {
            console.log(idOrganization)
            const dataUpdateDonationPostUser = { ...dataUpdate, ...values }
            dataUpdateDonationPostUser.organizationReceived = organizationReceived === "Tất cả" ? null : organizationReceived
            dataUpdateDonationPostUser.idOrganization = idOrganization === "Tất cả" || idOrganization === null ? null : idOrganization
            dataUpdateDonationPostUser.status = idOrganization === "Tất cả" || idOrganization === null ? "Chưa nhận" : "Chờ xác nhận"

            if (dataUpdate.status === "Chưa nhận") {
                if (dataUpdate.listRequest.length === 0) {
                    console.log("chua nhan bang 0")
                    if (idOrganization !== "Tất cả" && idOrganization !== null) {
                        dataUpdateDonationPostUser.listRequest.push({ status: "Yêu cầu xác nhận", id: idOrganization, name: organizationReceived })

                    }
                } else {
                    console.log("chua nhan khac 0")
                    if (idOrganization !== "Tất cả" && idOrganization !== null) {
                        let isTrue = false
                        dataUpdateDonationPostUser.listRequest = dataUpdateDonationPostUser.listRequest.map(data => {
                            if (data.id === dataUpdateDonationPostUser.idOrganization) {
                                isTrue = true
                                return { ...data, status: "Yêu cầu xác nhận" }
                            } else {
                                return { ...data, status: "Bị hủy" }

                            }
                        })
                        console.log(isTrue)
                        if (isTrue === false) {
                            dataUpdateDonationPostUser.listRequest.push({ status: "Yêu cầu xác nhận", id: idOrganization, name: organizationReceived })
                        }
                    }
                    console.log(dataUpdateDonationPostUser)
                }

            } else if (dataUpdate.status === "Chờ xác nhận") {
                console.log(idOrganization)
                if (idOrganization !== "Tất cả" && idOrganization !== null && idOrganization !== dataUpdate.idOrganization) {
                    console.log("cai khac")
                    let isTrue = false
                    dataUpdateDonationPostUser.listRequest = dataUpdateDonationPostUser.listRequest.map(data => {
                        if (data.id === idOrganization) {
                            isTrue = true
                        }

                        return data.status === "Yêu cầu xác nhận" ? { status: "Yêu cầu xác nhận", id: idOrganization, name: organizationReceived } : { ...data }

                    })

                    if (isTrue) {
                        dataUpdateDonationPostUser.listRequest = dataUpdateDonationPostUser.listRequest.filter(data => data.id !== idOrganization || data.status !== "Bị hủy")
                    }

                } else if (idOrganization !== "Tất cả" && idOrganization !== null && idOrganization === dataUpdate.idOrganization) {
                    console.log("ko thay doi")
                    dataUpdateDonationPostUser.listRequest = dataUpdateDonationPostUser.listRequest
                }
                else {
                    console.log("all")
                    dataUpdateDonationPostUser.listRequest = dataUpdateDonationPostUser.listRequest.filter(data => data.id !== dataUpdate.idOrganization)
                    dataUpdateDonationPostUser.idOrganization = null
                }
            } else if (dataUpdate.status === "Từ chối nhận") {
                if (idOrganization !== "Tất cả" && idOrganization !== null) {
                    let isTrue = false
                    dataUpdateDonationPostUser.listRequest = dataUpdateDonationPostUser.listRequest.map(data => {
                        if (data.id === idOrganization) {
                            isTrue = true
                            return { ...data, status: "Yêu cầu xác nhận" }
                        } else {
                            return { ...data }

                        }
                    })
                    console.log(isTrue)
                    if (isTrue === false) {
                        dataUpdateDonationPostUser.listRequest.push({ status: "Yêu cầu xác nhận", id: idOrganization, name: organizationReceived })
                    }
                }


            }
            delete dataUpdateDonationPostUser.organizationReceived
            delete dataUpdateDonationPostUser.donorName
            delete dataUpdateDonationPostUser.phone
            delete dataUpdateDonationPostUser.province
            delete dataUpdateDonationPostUser.ward
            delete dataUpdateDonationPostUser.district
            delete dataUpdateDonationPostUser.address
            if (dataUpdateDonationPostUser.idOrganization === null) {
                delete dataUpdateDonationPostUser.idOrganization
            }

            console.log(dataUpdateDonationPostUser);

            updateDonationPostUser(dataUpdateDonationPostUser).then(res => {
                console.log(res)
                if (res?.status === 200) {
                    getListDonation();
                    onClose()
                    // toast.success("Chỉnh sửa bài đăng ủng hộ thành công!")
                    Modal.success({
                        title: 'Thành công',
                        content: 'Chỉnh sửa bài đăng ủng hộ thành công!',
                        okText: "Đóng",
                        duration: 3
                    });
                } else {
                    // toast.error("Hệ thống lỗi, xin thử lại sau!")
                    Modal.error({
                        title: 'Thất bại',
                        content: 'Hệ thống lỗi, xin thử lại sau!',
                        okText: "Đóng",
                        duration: 3
                    });
                }
            })
                .catch(error => {
                    // toast.error("Hệ thống lỗi, xin thử lại sau!")
                    Modal.error({
                        title: 'Thất bại',
                        content: 'Hệ thống lỗi, xin thử lại sau!',
                        okText: "Đóng",
                        duration: 3
                    });
                })

        } else {
            console.log(images)
            values.images = images ? images?.reduce((a, b) => {
                return [...a, b.url]
            }, []).join(", ") : ""
            values.idDonor = dataInfo.id
            values.organizationReceived = organizationReceived === "Tất cả" ? null : organizationReceived
            values.idOrganization = idOrganization === "Tất cả" ? null : idOrganization
            values.status = idOrganization === "Tất cả" ? "Chưa nhận" : "Chờ xác nhận"
            values.listRequest = idOrganization === "Tất cả" ? [] : [{ status: "Yêu cầu xác nhận", id: idOrganization, name: organizationReceived }]
            delete values.organizationReceived
            if (values.idOrganization === null) {
                delete values.idOrganization
            }
            console.log("tao data", values)
            createDonationPostUser(values).then(res => {
                if (res?.status === 200) {
                    getListDonation();
                    onClose()
                    console.log(res)
                    // toast.success("Tạo bài đăng ủng hộ thành công!")
                    Modal.success({
                        title: 'Thành công',
                        content: 'Tạo bài đăng ủng hộ thành công!',
                        okText: "Đóng",
                        duration: 3
                    });
                } else {
                    // toast.error("Hệ thống lỗi, xin thử lại sau!")
                    Modal.error({
                        title: 'Thất bại',
                        content: 'Hệ thống lỗi, xin thử lại sau!',
                        okText: "Đóng",
                        duration: 3
                    });
                }
            })
                .catch(error => {
                    // toast.error("Hệ thống lỗi, xin thử lại sau!")
                    Modal.error({
                        title: 'Thất bại',
                        content: 'Hệ thống lỗi, xin thử lại sau!',
                        okText: "Đóng",
                        duration: 3
                    });
                })

        }
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
        const fileBase = await getBase64(file.originFileObj);
        setImagesBase((images) => images ? [...images, { url: fileBase }] : [{ url: fileBase }])

        const fileUrl = file.originFileObj;
        const formData = new FormData();
        formData.append('file', fileUrl);
        uploadImage(formData).then(res => {
            console.log(res)
            setLoading(false)
            if (res.data.statusCode === 200) {
                setImages((images) => images ? [...images, { url: res.data.data, urlBase: fileBase }] : [{ url: res.data.data, urlBase: fileBase }])

            }
        })
    };

    const onRemoveImage = (value) => {
        console.log(value);
        setImages((images) => images.filter((image) => value.url.includes("firebasestorage") ? image.url !== value.url : image.urlBase !== value.url))
        setImagesBase((images) => images.filter((image) => image.url !== value.url))
        return false
    }



    const onChange = (value, value1) => {
        // console.log(`selected ${value}`);
        console.log(value);
        // console.log(typeof parseInt);
        console.log(value1);
        setIdOrganization(value)
        setOrganizationReceived(value1.charityName)
    };
    const onSearch = (value, value1) => {
        console.log('search:', value);
        console.log(value1);
        setOrganizationReceived(value)
    };
    const onChangeDonationObject = (value, value1) => {
        // console.log(value);
        // console.log(value1);
        // setIdOrganization(value)
        // setOrganizationReceived(value1.charityName)
    };
    const onSearchDonationObject = (value, value1) => {
        // console.log('search:', value);
        // console.log(value1);
        // setOrganizationReceived(value)
    };

    const onChangeProvince = (value, value1) => {
        setIdProvince(value1.id)
    };

    const onSearchProvince = (value, value1) => {
        console.log("search province")
    };

    const onChangeDistrict = (value, value1) => {
        setIdDistrict(value1.id)
    };

    const onSearchDistrict = (value, value1) => {
    };

    const onChangeWard = (value, value1) => {

    };

    const onSearchWard = (value, value1) => {
    };


    return (
        <div>
            <Modal
                title={dataUpdate?.id ? "Sửa bài đăng" : "Tạo bài đăng"}
                cancelText="Quay lại"
                okText="Tạo"
                centered
                width={850}
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
                    form={form}
                    layout={"vertical"}
                    name="basic"
                    style={{
                        width: "100%",
                        flexWrap: "wrap",
                        // height: 600,
                        // overflowY: "scroll",
                        // paddingRight: 16
                    }}
                    initialValues={{}}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <div style={{ height: 500, overflowY: "scroll", paddingRight: 8, marginBottom: 15 }}>

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
                                label="Tổ chức muốn ủng hộ"
                                name="organizationReceived"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Tổ chức muốn ủng hộ!',
                                    },
                                ]}
                            >

                                <Select
                                    showSearch
                                    placeholder="Chọn tổ chức"
                                    optionFilterProp="children"
                                    onChange={onChange}
                                    onSearch={onSearch}
                                    onSelect={(value) => console.log(value)}
                                    // disabled={dataUpdate.listRequest.length > 1 ? true : false}
                                    // defaultValue={dataUpdate.organizationReceived === null ? "Tất cả" : "hai"}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    fieldNames={{ label: "charityName", value: "charityId", options: "options" }}
                                    options={listCharity}
                                />
                            </Form.Item>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
                                {/* <Input /> */}
                                <Select
                                    showSearch
                                    placeholder="Chọn đối tượng"
                                    optionFilterProp="children"
                                    onChange={onChangeDonationObject}
                                    onSearch={onSearchDonationObject}
                                    onSelect={(value) => console.log(value)}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    fieldNames={{ label: "label", value: "value", options: "options" }}
                                    options={options}
                                />
                            </Form.Item>

                            <Form.Item
                                style={{ width: "49%", marginBottom: 16 }}
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
                        </div>

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
                                multiple
                                listType="picture-card"
                                name="images"
                                onChange={handleChange}
                                // fileList={images || []}
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

                                {/* <div>
                                    {loading ? <LoadingOutlined /> : (
                                        <>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                        </>
                                    )}
                                </div> */}
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                </div>
                            </Upload>
                        </Form.Item>
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
                            >
                                {dataUpdate?.id ? "Lưu" : "Tạo"}
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

export default DonationPostDialog


