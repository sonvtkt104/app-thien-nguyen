import "./css/DonationPost.css"
import { useEffect, useRef, useState } from 'react'
import { Modal, Image, Button, Checkbox, Form, Input, Upload, Select } from 'antd'
import { PlusOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { createDonationPostUser, getCurrentUser, getListDistrictByID, getListProvince, getListWardByID, updateDonationPostUser, getAllCharity } from "./MyAccountService";
import { uploadImage } from "../../app/HomePageCharity/HomePageCharityService";
import { toast } from "react-toastify";

function DonationPostDialog({ dataUpdate, handleCloseModal, getListDonation }) {
    const [form] = Form.useForm();
    // const dataInfo = useRef()
    const [listCharity, setListCharity] = useState([]);
    const [dataInfo, setDataInfo] = useState();

    useEffect(()=> {
        getCurrentUser().then(res => {
            setDataInfo(res?.data?.data)
            form.setFieldsValue(dataUpdate)
            // dataInfo.current = res.data.data
            // console.log(typeof res?.data?.data.id)
            // const data = res?.data?.data
            // if(Object.keys(dataUpdate).length === 0) {
            //     form.setFieldsValue({
            //         donorName: data?.name,
            //         phone: data?.phoneNumber,
            //         province: data?.province,
            //         district: data?.district,
            //         ward: data?.ward,
            //         address: data?.address,
            //     });
            // } else {
            //     form.setFieldsValue(dataUpdate)
            // }
        })
    },[])
    console.log(listCharity)

    useEffect(() => {
        getAllCharity().then(res => {
            console.log(res)
            setListCharity([{charityId: "Tất cả", charityName: "Tất cả"}, ...res?.data?.data])
            // let data = [{id: "Tất cả", name: "Tất cả"}, ...res?.data?.data]
            // let data = [{id: "Tất cả", name: "Tất cả"}, ...res?.data?.data]
            // setListCharity(() => {
            //     let data = res?.data?.data?.map(item => {
            //         return {...item, id: parseInt(item.id)}
            //     })
            //     data = [{charityId: "Tất cả", charityName: "Tất cả"},...data]
            //     return data
            // })
        })
    },[])

    // console.log(dataInfo.current)

    console.log(dataUpdate)
    const valueImages = dataUpdate?.images !== "" ? dataUpdate?.images?.split(", ").reduce((a, b) => {
        return [...a, { url: b }]
    }, []) : []

    const [open, setOpen] = useState(true)
    const [images, setImages] = useState(valueImages)
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
            form.setFieldsValue({district: null, ward: null})
            getListDistrictByID(idProvince).then(res => {
                setListAddress({ ...listAddress, "district": res.data })
            })
        }
    }, [idProvince])

    useEffect(() => {
        if (idDistrict !== undefined) {
            form.setFieldsValue({ward: null})
            getListWardByID(idDistrict).then(res => {
                setListAddress({ ...listAddress, "ward": res.data})
            })
        }
    }, [idDistrict])


    // console.log(dataUpdate)
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
            
            console.log(dataUpdateDonationPostUser);

            updateDonationPostUser(dataUpdateDonationPostUser).then(res => {
                console.log(res)
                if(res?.status === 200) {
                    getListDonation();
                    onClose()
                    toast.success("Chỉnh sửa bài đăng ủng hộ thành công!")
                } else {
                    toast.error("Hệ thống lỗi, xin thử lại sau!")
                }
            })
            .catch(error => {
                toast.error("Hệ thống lỗi, xin thử lại sau!")
            })

        } else {
            console.log(images)
            values.images = images?.reduce((a, b) => {
                return [...a, b.url]
            }, []).join(", ")
            values.idDonor = dataInfo.id
            values.organizationReceived = organizationReceived === "Tất cả" ? null : organizationReceived
            values.idOrganization = idOrganization === "Tất cả" ? null : idOrganization
            values.status = idOrganization === "Tất cả" ? "Chưa nhận" : "Chờ xác nhận"
            values.listRequest = idOrganization === "Tất cả" ? [] : [{ status: "Yêu cầu xác nhận", id: idOrganization, name: organizationReceived }]
            delete values.organizationReceived
            console.log("tao data", values)
            createDonationPostUser(values).then(res => {
                if(res?.status === 200) {
                    getListDonation();
                    onClose()
                    console.log(res)
                    toast.success("Tạo bài đăng ủng hộ thành công!")
                } else {
                    toast.error("Hệ thống lỗi, xin thử lại sau!")
                }
            })
            .catch(error => {
                toast.error("Hệ thống lỗi, xin thử lại sau!")
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
        // const fileUrl = await getBase64(file.originFileObj);
        // // console.log(fileUrl)
        // setImages((images) => images.includes(fileUrl) ? images : [...images, { url: fileUrl }])
        const fileUrl = file.originFileObj;
        const formData = new FormData();
        formData.append('file', fileUrl);
        uploadImage(formData).then(res => {
            console.log(res)
            setLoading(false)
            if (res.data.statusCode === 200) {
                setImages((images) => images ? [...images, { url: res.data.data }] : [{ url: res.data.data }])

            }
        })
    };

    const onRemoveImage = (value) => {
        setImages((images) => images.filter((image) => image.url !== value.url))
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
                                    // options={[
                                    //     {
                                    //         value: "Tất cả",
                                    //         label: "Tất cả",
                                    //         organization: "hai"
                                    //     },
                                    //     {
                                    //         value: "abc123",
                                    //         label: "Áo ấm cho em",
                                    //         organization: "hai1"
                                    //     },
                                    //     {
                                    //         value: "abc123456789",
                                    //         label: "tu thien ha noi",
                                    //         organization: "hai2"
                                    //     },
                                    //     {
                                    //         value: "abc12345678910",
                                    //         label: "toi yeu nam dinh",
                                    //         organization: "hai3"
                                    //     },
                                    //     {
                                    //         value: "hai123",
                                    //         label: "to chuc hai khuat",
                                    //         organization: "hai4"
                                    //     },

                                    // ]}
                                />
                            </Form.Item>
                            {/* <Form.Item
                                style={{ width: "49%", marginBottom: 10 }}
                                label="Mã bài đăng"
                                name="id"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Code bài đăng!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item> */}
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
                                <Input />
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
                                listType="picture-card"
                                name="images"
                                onChange={handleChange}
                                fileList={images}
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
                                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
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




// <h3 style={{ marginBottom: 6 }}>Thông tin liên hệ</h3>
//                         <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
//                             <Form.Item
//                                 style={{ width: "66%", marginBottom: 10 }}
//                                 label="Họ và tên"
//                                 name="donorName"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Vui lòng nhập Họ và tên!',
//                                     },
//                                 ]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             <Form.Item
//                                 style={{ width: "32%", marginBottom: 10 }}
//                                 label="Số điện thoại"
//                                 name="phone"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Vui lòng nhập Số điện thoại!',
//                                     },
//                                 ]}
//                             >
//                                 <Input />
//                             </Form.Item>
//                             {/* <Form.Item
//                                 style={{ width: "32%", marginBottom: 10 }}
//                                 label="Email"
//                                 name="email"
//                                 rules={[
//                                     {
//                                         type: 'email',
//                                         message: 'Email không hợp lệ!',
//                                     },
//                                     {
//                                         required: true,
//                                         message: 'Vui lòng nhập Email!',
//                                     },
//                                 ]}
//                             >
//                                 <Input />
//                             </Form.Item> */}

//                         </div>
//                         <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
//                             <Form.Item
//                                 style={{ width: "32%", marginBottom: 10 }}
//                                 label="Tỉnh/Thành Phố"
//                                 name="province"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Vui lòng chọn Tỉnh/Thành Phố!',
//                                     },
//                                 ]}
//                             >
//                                 <Select
//                                     showSearch
//                                     placeholder="Chọn Tỉnh/Thành Phố"
//                                     optionFilterProp="children"
//                                     onChange={onChangeProvince}
//                                     onSearch={onSearchProvince}
//                                     onSelect={(value) => console.log(value)}
//                                     filterOption={(input, option) =>
//                                         (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
//                                     }
//                                     fieldNames={{ label: "fullName", value: "fullName", options: "options" }}
//                                     options={listAddress.province}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 style={{ width: "32%", marginBottom: 10 }}
//                                 label="Huyện/Quận"
//                                 name="district"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Vui lòng chọn Huyện/Quận!',
//                                     },
//                                 ]}
//                             >
//                                 <Select
//                                     showSearch
//                                     placeholder="Chọn Huyện/Quận"
//                                     optionFilterProp="children"
//                                     onChange={onChangeDistrict}
//                                     onSearch={onSearchDistrict}
//                                     onSelect={(value) => console.log(value)}
//                                     filterOption={(input, option) =>
//                                         (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
//                                     }
//                                     fieldNames={{ label: "fullName", value: "fullName", options: "options" }}
//                                     options={listAddress.district}
//                                 />
//                             </Form.Item>
//                             <Form.Item
//                                 style={{ width: "32%", marginBottom: 10 }}
//                                 label="Phường/Xã"
//                                 name="ward"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Vui lòng chọn Phường/Xã!',
//                                     },
//                                 ]}
//                             >
//                                 <Select
//                                     showSearch
//                                     placeholder="Chọn Phường/Xã"
//                                     optionFilterProp="children"
//                                     onChange={onChangeWard}
//                                     onSearch={onSearchWard}
//                                     onSelect={(value) => console.log(value)}
//                                     filterOption={(input, option) =>
//                                         (option?.fullName ?? '').toLowerCase().includes(input.toLowerCase())
//                                     }
//                                     fieldNames={{ label: "fullName", value: "fullName", options: "options" }}
//                                     options={listAddress.ward}
//                                 />
//                             </Form.Item>

//                         </div>
//                         <Form.Item
//                             style={{ width: "100%", marginBottom: 10 }}
//                             label="Địa chỉ cụ thể"
//                             name="address"
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Vui lòng nhập Địa chỉ của bạn!',
//                                 },
//                             ]}
//                         >
//                             <Input/>
//                         </Form.Item>

//                         <h3 style={{ marginBottom: 6 }}>Thông tin ủng hộ</h3>