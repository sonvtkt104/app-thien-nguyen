import SideBar from "./SideBar"
import { Button, Checkbox, Form, Input, Table, Select } from 'antd';
import { useEffect, useLayoutEffect, useReducer, useRef, useState } from "react";
import { getCurrentUser, updateUser, getListProvince, getListDistrictByID, getListWardByID, updatePassWord } from "./MyAccountService";
import { getUserInfomationFromCookies, getInfoOfUserFromCookies } from "../../Authentication/HandleUserInfomation";
import { getTokenFromCookies } from "../../Authentication/HandleUserInfomation";
import { toast } from "react-toastify";



function Account() {
    const [form] = Form.useForm();
    const [formPassWord] = Form.useForm();

    const [dataInfo, setDataInfo] = useState()
    const [reload, setReload] = useState()
    const reloadRef = useRef();


    const [listAddress, setListAddress] = useState({
        province: [],
        district: [],
        ward: []
    })

    const [provinceId, setProvinceId] = useState(undefined)
    const [districtId, setDistrictId] = useState(undefined)
    const [wardId, setWardId] = useState(undefined)

    console.log("account haikhuat");

    useEffect(() => {
        console.log("useEffect");
        getCurrentUser().then(res => {
            console.log(res);
            form.setFieldsValue(res.data.data);
            setDataInfo(res.data.data);
        })
    }, [reload])



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



    const onFinish = (values) => {
        values.name = values.name.trim()
        values.email = values.email.trim()
        values.phoneNumber = values.phoneNumber.trim()
        values.address = values.address.trim()
        values.provinceId = provinceId || dataInfo.provinceId
        values.districtId = districtId || dataInfo.districtId
        values.wardId = wardId || dataInfo.wardId

        const compareObjects = (obj1, obj2) => {
            for (let key in obj1) {
                if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                    if (obj1[key] !== obj2[key]) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        }

        // console.log(compareObjects(values, dataInfo))

        if (!compareObjects(values, dataInfo)) {
            updateUser(dataInfo?.id, values).then(res => {
                console.log(res)
                if (res?.status === 200) {
                    form.setFieldsValue(values);
                    setDataInfo(values)
                    setReload({})
                    toast.success("Chỉnh sửa thành công.")
                } else {
                    console.log("loii")
                    toast.error("Hệ thống lỗi, xin thử lại sau!")
                    // form.setFieldsValue(info);
                }
            })
        } else {
            toast.warning("Chưa có thay đổi gì!")

        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const onFinishPassword = (values) => {
        console.log('Success:', values);
        // console.log(values.newPassword === values.confirmNewPassword)
        if (values.newPassword === values.confirmNewPassword) {
            updatePassWord(getInfoOfUserFromCookies().id, values).then(res => {
                console.log(res)
                // reloadRef.current = Math.random().toString(36).slice(-5)
                if (res.status === 200) {
                    formPassWord.resetFields()
                    toast.success("Đổi mật khẩu thành công.")
                } else {
                    toast.error("Hệ thống lỗi, xin thử lại sau!")
                }
            })
                .catch(error => {
                    console.log(error)
                    if (error?.response?.status === 400) {
                        error?.response?.data?.message ? toast.warning("Mật khẩu mới không được trùng với mật khẩu cũ") :
                            toast.error("Mật khẩu hiện tại chưa chính xác!")
                    } else {
                        // toast.error("Hệ thống lỗi, xin thử lại sau!")
                    }

                })
        }
    };

    const onFinishFailedPassword = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
                            flexWrap: "wrap"
                        }}
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
                                name="phoneNumber"
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
                        <Form.Item
                            wrapperCol={{
                                // offset: 8,
                                // span: 8,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Lưu thay đổi thông tin
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div>
                    <h2>Thay đổi mật khẩu</h2>
                    <Form
                        form={formPassWord}
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
                            name="oldPassword"
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
                            hasFeedback
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
                            hasFeedback
                            name="confirmNewPassword"

                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập Xác nhận mật khẩu mới!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("newPassword") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("Mật khẩu xác nhận không xhính xác")
                                        );
                                    },
                                }),
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
                                Lưu thay đổi mật khẩu
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </SideBar>
    )
}


export default Account