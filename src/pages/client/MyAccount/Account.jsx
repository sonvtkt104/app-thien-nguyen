import SideBar from "./SideBar"
import { Button, Checkbox, Form, Input, Table, Select } from 'antd';
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { getUserByID, updateUser, getListProvince, getListDistrictByID, getListWardByID } from "./MyAccountService";



function Account() {
    const [form] = Form.useForm();

    const [info, setInfo] = useState({})
    const infoRef = useRef()

    const [listAddress, setListAddress] = useState({
        province: [],
        district: [],
        ward: []
    })
    const [idProvince, setIdProvince] = useState(undefined)
    const [idDistrict, setIdDistrict] = useState(undefined)


    useEffect(() => {
        getUserByID("abcd12345").then(res => {
            const arrAddress = res.data.address?.split(", ")
            const data = {...res.data, address:arrAddress[0], ward: arrAddress[1], district: arrAddress[2], province: arrAddress[3]}
            console.log(data)
            setInfo(data)
            form.setFieldsValue(data);
            infoRef.current = res.data
            delete infoRef.current.id
            // setInfo(res.data)
            // form.setFieldsValue(res.data);
            // infoRef.current = res.data
            // delete infoRef.current.id
        })
    }, [form])

    // console.log(form)
    console.log(info)

    // const info = {
    //     "id": "abcd12345",
    //     "name": "Khuất Văn Hải",
    //     "phone": "0123456789",
    //     "email": "hai@gmail.com",
    //     "address": "144 Xuân Thủy Cầu Giấy Hà Nội",
    // }









    useEffect(() => {
        getListProvince().then(res => {
            setListAddress({ ...listAddress, "province": res.data.data })
        })

    }, [])

    useEffect(() => {
        if (idProvince !== undefined) {
            form.setFieldsValue({ district: null, ward: null })
            getListDistrictByID(idProvince).then(res => {
                setListAddress({ ...listAddress, "district": res.data.data })
            })
        }
    }, [idProvince])

    useEffect(() => {
        if (idDistrict !== undefined) {
            form.setFieldsValue({ ward: null })
            getListWardByID(idDistrict).then(res => {
                setListAddress({ ...listAddress, "ward": res.data.data })
            })
        }
    }, [idDistrict])




    const onFinish = (values) => {
        values.name = values.name.trim()
        values.email = values.email.trim()
        values.phone = values.phone.trim()
        values.address = values.address.trim()
        values.ward = values.ward.trim()
        values.district = values.district.trim()
        values.province = values.province.trim()
        const dataUpdate = {...values, address: `${values.address}, ${values.ward}, ${values.district}, ${values.province}`}
        delete dataUpdate.province
        delete dataUpdate.district
        delete dataUpdate.ward
        const isCheck = JSON.stringify(infoRef.current) === JSON.stringify(dataUpdate)
        console.log('Success:', dataUpdate);
        console.log(infoRef.current);
        console.log(isCheck)
        if (isCheck === false) {
            updateUser("abcd12345", dataUpdate).then(res => {
                console.log(res)
                if (res.status === 200) {
                    form.setFieldsValue(values);
                } else {
                    form.setFieldsValue(info);
                }
                // infoRef.current = {}
            })
        }

    };


    const onFinishPassword = (values) => {
        console.log('Success:', values);
        console.log(values.newPassword === values.confirmNewPassword)
    };

    const onFinishFailedPassword = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
        <SideBar>
            <div style={{ width: "100%" }}>
                <div style={{ marginTop: 10 }}>
                    <h2>Thông tin chung</h2>
                    <Form
                        form={form}
                        layout={"vertical"}
                        name="basic"
                        style={{
                            width: "100%",
                            padding: "10px 0 0 20px",
                            // maxWidth: 850,
                            // display: "flex",
                            flexWrap: "wrap"
                        }}
                        // initialValues={{
                        //     name: info?.name,
                        //     phone: !info ? "" : info.phone,
                        //     email: !info ? "" : info.email,
                        //     address: !info ? "" : info.address,
                        //     // remember: true,
                        // }}
                        setF
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                            <Form.Item
                                style={{ width: "32%", marginBottom: 10 }}
                                label="Họ và tên"
                                name="name"
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
                                style={{ width: "32%", marginBottom: 10 }}
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
                                <Input />
                            </Form.Item>
                        </div>

                        {/* <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
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
                        </div> */}


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
                                        (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    fieldNames={{ label: "name", value: "name", options: "options" }}
                                    options={listAddress.province}
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
                                        (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    fieldNames={{ label: "name", value: "name", options: "options" }}
                                    options={listAddress.district}
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
                                        (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    fieldNames={{ label: "name", value: "name", options: "options" }}
                                    options={listAddress.ward}
                                />
                            </Form.Item>

                        </div>

                        <Form.Item
                            style={{ width: "100%", marginBottom: 16 }}
                            label="Địa chỉ cụ thể"
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


                        {/* <Form.Item
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
                        </Form.Item> */}

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
                <div>
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
                        onFinish={onFinishPassword}
                        onFinishFailed={onFinishFailedPassword}
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
            </div>
        </SideBar>
    )
}


export default Account