import { Link, useNavigate } from "react-router-dom";
import "./Registration.scss";
import { useEffect, useState } from "react";
import { Col, Row, Button, Form, Input, Select, Upload } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import {
  getListProvince,
  getListWardByID,
  getListDistrictByID,
} from "../client/MyAccount/MyAccountService";

const RegistrationPage = () => {
  const [isCreateUser, setIsCreateUser] = useState(true);
  const [error, setError] = useState("");
  const { TextArea } = Input;
  const navigate = useNavigate();
  const [provinceId, setProvinceId] = useState(undefined);
  const [listProvince, setListProvince] = useState([]);
  const [districtId, setDistrictId] = useState(undefined);
  const [listDistrict, setListDistrict] = useState([]);
  const [wardId, setWardId] = useState(undefined);
  const [listWard, setListWard] = useState([]);

  useEffect(() => {
    async function getProvinces() {
      const req = await getListProvince();
      const data = req.data;
      setListProvince(
        data.map((item, index) => ({
          value: item.id,
          label: item.fullName,
        }))
      );
    }
    getProvinces();
    return () => {};
  }, []);

  useEffect(() => {
    async function getDistricts() {
      const req = await getListDistrictByID(provinceId);
      const data = req.data;

      setListDistrict(
        data.map((item, index) => ({
          value: item.id,
          label: item.fullName,
        }))
      );
    }

    getDistricts();

    return () => {};
  }, [provinceId]);

  useEffect(() => {
    async function getWards() {
      const req = await getListWardByID(districtId);
      const data = req.data;
      setListWard(
        data.map((item, index) => ({
          value: item.id,
          label: item.fullName,
        }))
      );
    }

    getWards();

    return () => {};
  }, [districtId]);

  const toggleUserToCharity = () => {
    setIsCreateUser((prev) => !prev);
  };

  const userSubmit = (values) => {
    const submitData = {
      username: values.username,
      name: values.fullName,
      email: values.email,
      roleId: 2,
      address: values.detailAddress,
      phoneNumber: values.phoneNumber,
      provinceId: values.province,
      province: listProvince.find((item) => item.value === values.province)
        .label,
      districtId: values.district,
      district: listDistrict.find((item) => item.value === values.district)
        .label,
      wardId: values.ward,
      ward: listWard.find((item) => item.value === values.ward).label,
      password: values.password,
      confirmPassword: values.password,
    };

    // console.log(submitData);

    // {
    //   Username: "lemanhlinh",
    //   Email: "lemanhlinh0808@gmail.com",
    //   PhoneNumber: "03333333333",
    //   Password: "1234567890",
    //   DetailOfAddress: "số 55, Thạch Xá, Thạch Thât, Hà Nội",
    //   Ward: "Thạch xá",
    //   District: "Thạch Thất",
    //   Province: "Hà Nội"
    //   RoleId: 1, // RoleId = 1 là tài khoản người dùng
    //   // các trường mặc định và không truyền theo khi đăng ký
    //   isLocked: false, // mặc định là tài khoản không bị khóa
    //   star: false, // mặc định đây không phải là tài khoản nổi bật
    // }

    const submit = async () => {
      const response = await fetch("http://localhost:8080/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      console.log(data);

      if (!data.isSuccess) {
        setError(data.messages[0]);
        return;
      }

      navigate("../login");
    };

    submit();
  };

  const charitySubmit = (values) => {
    const submitData = {
      username: values.username,
      name: values.charityName,
      email: values.charityEmail,
      roleId: 3,
      address: values.detailAddress,
      phoneNumber: values.charityPhone,
      provinceId: values.province,
      province: listProvince.find((item) => item.value === values.province)
        .label,
      districtId: values.district,
      district: listDistrict.find((item) => item.value === values.district)
        .label,
      wardId: values.ward,
      ward: listWard.find((item) => item.value === values.ward).label,
      password: values.charityPassword,
      confirmPassword: values.charityPassword,
      infoCharity: {
        charityMotto: values.charityMotto,
        charityTarget: values.charityTarget,
        charityDescription: values.charityDescription,
        charityFile: "handle file",
      },
    };
    console.log(submitData);

    // {
    //   // của người đăng ký cho tổ chức
    //   Username: "lemanhlinh", // của người đăng ký
    //   Email: "lemanhlinh0808@gmail.com", // của người đăng ký
    //   PhoneNumber: "0347373222", // của người đăng ký
    //   Password: "12345678", // của người đăng ký
    //   DetailOfAddress: "số 55, Thạch Xá, Thạch Thât, Hà Nội",
    //   Ward: "Thạch xá",
    //   District: "Thạch Thất",
    //   Province: "Hà Nội" // của người đăng ký
    //   roleId: 2, // roleId = 2 là của tổ chức

    //   // của tổ chức
    //   CharityName: "Áo ấm cho em",
    //   CharityDetailAddress: "144, Xuân Thủy, Cầu Giấy, Hà Nội",
    //   CharityWard: "Thạch xá",
    //   CharityDistrict: "Thạch Thất",
    //   CharityProvince: "Hà Nội",
    //   CharityPhone: "0347373222",
    //   CharityEmail: "aoamchoem@gmail.com",
    //   CharityMotto: "Vì Mọi người",      // slogan của tổ chức/ châm ngôn
    //   CharityTarget: "Giúp nhiều người càng tốt", // mục tiêu của tổ chức
    //   CharityDescription: "description", // Mô tả về tổ chức
    //   CharityFacebook: "facebook",
    //   CharityInstagram: "instagram",
    //   CharityTwitter: "twitter",
    //   CharityLinkedIn: "linkedIn",
    //   CharityIntroVideo: "Video", // video giới thiệu
    //   CharityAccountNumber: "Số tài khoản", // số tài khoản của tổ chức
    //   //Các trường mặc định và không có trong api đăng ký của tổ chức
    //   isLocked: false, // mặc định là tài khoản không bị khóa
    //   star: false, // mặc định đây không phải là tài khoản nổi bật

    //   // các trường sau sẽ không có trong api đăng ký của tổ chức
    //   // nhung sẽ phải có và cập nhật sau
    //   id: "abc123", // id tổ chức
    //   avatar: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",// avatar của tổ chức
    //   images: ["https://images2.thanhnien.vn/uploaded/datdt/2020_10_19/20201019_092450_KEIY.jpg?width=500",
    //   "https://cdnimg.vietnamplus.vn/uploaded/fsmsy/2018_03_01/thuc_an_tet.jpg",], // list ảnh
    //   googlemap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8610660551603!2d105.78048991492963!3d21.038244392830343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab354920c233%3A0x5d0313a3bfdc4f37!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4csIMSQ4bqhaSBo4buNYyBRdeG7kWMgZ2lhIEjDoCBO4buZaQ!5e0!3m2!1svi!2s!4v1679246091627!5m2!1svi!2s", // google map
    //   isVerification: true, // xác minh(tích xanh)
    //   followers: 157422, // lượt theo dõi
    //   numberCampaigns: 29,
    //   reach: [3034, 1355, 5432, 4000, 7342, 3245, 8543, 5234, 6543, 12423, 8403, 13024]
    // };

    const submit = async () => {
      const response = await fetch("http://localhost:8080/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      console.log(data);

      if (!data.isSuccess) {
        setError(data.messages[0]);
        return;
      }

      navigate("../login");
    };

    submit();
  };

  const handleProvinceChange = (provinceId) => {
    setProvinceId(provinceId);
  };

  const handleDistrictChange = (districtId) => {
    setDistrictId(districtId);
  };

  const handleWardChange = (wardId) => {
    setWardId(wardId);
  };

  const handleFile = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <div className="user-regis">
      <Row justify='center' style={{ position: 'relative', minHeight: '100vh'}}>
        <span style={{position: 'absolute', cursor: 'pointer', fontSize: 16, top: 30, left: 70, zIndex: 1 }}
          className="text-hover"
          onClick={() => {
            navigate(-1)
          }}
        >
          {"< Quay lại"}
        </span>
        <Col xs={21} sm={21} md={21} lg={21} xl={21}>
          <Row style={{height: '100%'}} justify='center'>
            <div className="user-container">
              <Row style={{fontSize: 18, fontWeight: 600, lineHeight: '50px', cursor: 'pointer', marginBottom :10}}
                justify='center'
                  onClick={() => {
                      navigate("/")
                  }}
              >
                  <img src="/images/logo-app.png" alt="logo app"
                      style={{width: 50, marginRight: 4}}
                  />
                  Thiện Nguyện
              </Row>
              <h2 className="user-title h1-app"
                style={{textAlign: "center"}}
              >
                Đăng ký
              </h2>
              <Row className="options" justify='center'>
                <button
                  onClick={toggleUserToCharity}
                  className={isCreateUser ? "active" : ""}
                >
                  Người dùng
                </button>
                <button
                  onClick={toggleUserToCharity}
                  className={isCreateUser ? "" : "active"}
                >
                  Tổ chức
                </button>
              </Row>

              {isCreateUser ? (
                <Form
                  name="basic"
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  // initialValues={{ remember: true }}
                  layout="vertical"
                  autoComplete="off"
                  className="form-regis"
                  onFinish={userSubmit}
                  // onFinishFailed={onFinishFailed}
                >

                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                      <Form.Item
                        label="Tài khoản"
                        name="username"
                        rules={[
                          { required: true, message: "Vui lòng nhập username!" },
                        ]}
                        className="form-item"
                      >
                        <Input placeholder="Nhập tài khoản" className="input-app" />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        name="password"
                        label="Mật khẩu"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập mật khẩu của bạn!",
                          },
                        ]}
                        hasFeedback
                      >
                        <Input.Password placeholder="Mật khẩu của bạn" className="input-app" />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        name="comfirmPassword"
                        label="Nhập lại mật khẩu"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập lại mật khẩu của bạn!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue("password") === value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("Hai mật khẩu bạn nhập không trùng nhau")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password placeholder="Nhập lại mật khẩu của bạn"  className="input-app" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                      <Form.Item
                        label="Tên đầy đủ của bạn"
                        name="fullName"
                        rules={[
                          { required: true, message: "Vui lòng nhập tên của bạn!" },
                        ]}
                        className="form-item"
                      >
                        <Input placeholder="Nhập tên của bạn" className="input-app" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập số điện thoại của bạn",
                          },
                        ]}
                        className="form-item"
                      >
                        <Input placeholder="Nhập số điện thoại của bạn" className="input-app" />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                          {
                            required: true,
                            type: "email",
                            message: "Trường này không phải là email!",
                          },
                        ]}
                        className="form-item"
                      >
                        <Input placeholder="Nhập email của bạn" className="input-app" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={6}>
                      <Form.Item
                        label="Tỉnh/Thành phố"
                        name="province"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập Tỉnh/Thành phố của bạn",
                          },
                        ]}
                        className="form-item"
                        itialvalue={
                          listProvince && listProvince[0] && listProvince[0].value
                        }
                      >
                        {/* <Input placeholder="Nhập Tỉnh/Thành phố của bạn" /> */}

                        <Select
                          placeholder="Chọn Tỉnh/Thành phố của bạn"
                          onChange={handleProvinceChange}
                          options={listProvince}
                          className="select-app"
                          style={{width: 220}}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Quận/Huyện"
                        name="district"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập Quận/Huyện của bạn",
                          },
                        ]}
                        className="form-item"
                      >
                        <Select
                          placeholder="Chọn quận/huyện của bạn"
                          onChange={handleDistrictChange}
                          options={listDistrict}
                          className="select-app"
                          style={{width: 220}}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        label="Phường/Xã"
                        name="ward"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập Phường/Xã của bạn!",
                          },
                        ]}
                        className="form-item"
                      >
                        <Select
                          placeholder="Chọn Phường/Xã của bạn"
                          onChange={handleWardChange}
                          options={listWard}
                          className="select-app"
                          style={{width: 220}}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={6}>
                      <Form.Item
                        label="Địa chỉ cụ thể"
                        name="detailAddress"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập địa chỉ cụ thể",
                          },
                        ]}
                        className="form-item"
                      >
                        <Input placeholder="144, Xuân Thủy, Cầu Giấy, Hà Nội" className="input-app" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <p className="error">{error}</p>

                  <div className="regis-footer">
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="regis-button btn-primary"
                        style={{margin: 'auto'}}
                      >
                        Đăng ký
                      </Button>
                    </Form.Item>

                    <span className="sign-up">
                      Bạn đã có tài khoản? ---
                      <Link to="../login" className="text-hover" style={{color:"var(--color-blue)"}}>Đăng nhập</Link>---
                    </span>
                  </div>
                </Form>
              ) : (
                <div className="charity-form">
                  <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    // initialValues={{ remember: true }}
                    layout="vertical"
                    autoComplete="off"
                    className="form-regis"
                    onFinish={charitySubmit}
                    // onFinishFailed={onFinishFailed}
                  >
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={8}>
                        <Form.Item
                          label="Tài khoản"
                          name="username"
                          rules={[
                            { required: true, message: "Vui lòng nhập username!" },
                          ]}
                          className="form-item"
                        >
                          <Input placeholder="Nhập tài khoản" className="input-app" />
                        </Form.Item>
                      </Col>

                      <Col span={8}>
                        <Form.Item
                          name="charityPassword"
                          label="Mật khẩu"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập mật khẩu của bạn!",
                            },
                          ]}
                          hasFeedback
                        >
                          <Input.Password placeholder="Mật khẩu của bạn" className="input-app" />
                        </Form.Item>
                      </Col>

                      <Col span={8}>
                        <Form.Item
                          name="confirmCharityPassword"
                          label="Nhập lại mật khẩu"
                          dependencies={["charityPassword"]}
                          hasFeedback
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập lại mật khẩu của bạn!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("charityPassword") === value
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error("Hai mật khẩu bạn nhập không trùng nhau")
                                );
                              },
                            }),
                          ]}
                        >
                          <Input.Password placeholder="Nhập lại mật khẩu của bạn" className="input-app" />
                        </Form.Item>
                      </Col>
                    </Row>


                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={6}>
                        <Form.Item
                          label="Tên của tổ chức"
                          name="charityName"
                          rules={[
                            { required: true, message: "Vui lòng nhập tên tổ chức!" },
                          ]}
                          className="form-item"
                        >
                          <Input placeholder="Nhập tên tổ chức" className="input-app"  />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Số điện thoại của tổ chức"
                          name="charityPhone"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập số điện thoại của tổ chức",
                            },
                          ]}
                          className="form-item"
                        >
                          <Input placeholder="Nhập số điện thoại của tổ chức" className="input-app"  />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Email của tổ chức"
                          name="charityEmail"
                          rules={[
                            {
                              required: true,
                              type: "email",
                              message: "Trường này không phải là email!",
                            },
                          ]}
                          className="form-item"
                        >
                          <Input placeholder="Nhập email của tổ chức" className="input-app"  />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          label="Phương châm của tổ chức"
                          name="charityMotto"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập phương châm của tổ chức",
                            },
                          ]}
                          className="form-item"
                        >
                          <Input placeholder="Nhập phương châm của tổ chức" className="input-app"  />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={6}>
                        <Form.Item
                          label="Tỉnh/Thành phố"
                          name="province"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập Tỉnh/Thành phố của bạn",
                            },
                          ]}
                          className="form-item"
                          itialvalue={
                            listProvince && listProvince[0] && listProvince[0].value
                          }
                        >
                          {/* <Input placeholder="Nhập Tỉnh/Thành phố của bạn" /> */}

                          <Select
                            placeholder="Chọn Tỉnh/Thành phố của bạn"
                            onChange={handleProvinceChange}
                            options={listProvince}
                            className="select-app"
                            style={{width: 220}}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          label="Quận/Huyện"
                          name="district"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập Quận/Huyện của bạn",
                            },
                          ]}
                          className="form-item"
                        >
                          <Select
                            placeholder="Chọn quận/huyện của bạn"
                            onChange={handleDistrictChange}
                            options={listDistrict}
                            className="select-app"
                            style={{width: 220}}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Phường/Xã"
                          name="ward"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập Phường/Xã của bạn!",
                            },
                          ]}
                          className="form-item"
                        >
                          <Select
                            placeholder="Chọn Phường/Xã của bạn"
                            onChange={handleWardChange}
                            options={listWard}
                            className="select-app"
                            style={{width: 220}}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={6}>
                        <Form.Item
                          label="Địa chỉ cụ thể"
                          name="detailAddress"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập địa chỉ cụ thể",
                            },
                          ]}
                          className="form-item"
                        >
                          <Input placeholder="144, Xuân Thủy, Cầu Giấy, Hà Nội" className="input-app" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={12}>
                        <Form.Item
                          label="Mục tiêu của tổ chức"
                          name="charityTarget"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập Mục tiêu của tổ chức!",
                            },
                          ]}
                          className="form-item"
                        >
                          <TextArea className="textarea-app" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Mô tả về tổ chức"
                          name="charityDescription"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng mô tả về tổ chức",
                            },
                          ]}
                          className="form-item"
                        >
                          <TextArea className="textarea-app" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={12}>
                        <Form.Item
                          label="Nhập file để xác minh tổ chức"
                          name="charityFile"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập file của tổ chức!",
                            },
                          ]}
                          className="form-item"
                        >
                          <Input type="file" onChange={handleFile} className="input-app" />
                          {/* <Upload>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                      </Upload> */}
                        </Form.Item>
                      </Col>
                    </Row>

                    <p className="error">{error}</p>

                    <div className="regis-footer">
                      <Form.Item wrapperCol={{ span: 24 }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="regis-button btn-primary"
                          style={{margin: 'auto'}}
                        >
                          Đăng ký
                        </Button>
                      </Form.Item>

                      <span className="sign-up">
                        Bạn đã có tài khoản? ---
                        <Link to="../login" className="text-hover" style={{color:"var(--color-blue)"}}>Đăng nhập</Link>---
                      </span>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationPage;