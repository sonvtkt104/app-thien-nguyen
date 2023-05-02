import { Link, useNavigate } from "react-router-dom";
import "./Registration.scss";
import { useState } from "react";
import { Col, Row, Button, Form, Input } from "antd";

const RegistrationPage = () => {
  const [isCreateUser, setIsCreateUser] = useState(true);
  const [error, setError] = useState("");
  const { TextArea } = Input;
  const navigate = useNavigate();

  const toggleUserToCharity = () => {
    setIsCreateUser((prev) => !prev);
  };

  const userSubmit = (values) => {
    const submitData = {
      Username: values.username,
      Email: values.email,
      PhoneNumber: values.phoneNumber,
      Password: values.password,
      Address:
        values.fullOfAddress.length === 0
          ? `${values.ward}, ${values.district}, ${values.province}`
          : values.fullOfAddress,
      RoleId: 1,
    };

    console.log(submitData);

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
      Username: values.username,
      Email: values.email,
      PhoneNumber: values.phoneNumber,
      Password: values.charityPassword,
      Address: values.fullOfAddress,
      CharityName: values.charityName,
      CharityAddress: `${values.charityWard}, ${values.charityDistrict}, ${values.charityProvince}`,
      CharityPhone: values.charityPhone,
      CharityEmail: values.charityEmail,
      CharityMotto: values.charityMotto,
      CharityTarget: values.charityTarget,
      CharityDescription: values.charityDescription,
      CharityFacebook: values.charityFacebook,
      CharityInstagram: values.charityInstagram,
      CharityTwitter: values.charityTwitter,
      CharityLinkedIn: values.charityLinkedIn,
      CharityIntroVideo: values.charityIntroVideo,
      CharityAccountNumber: values.charityAccountNumber,
      roleId: 2,
    };

    // {
    //   Username: "lemanhlinh", // của người đăng ký
    //   Email: "lemanhlinh0808@gmail.com", // của người đăng ký
    //   PhoneNumber: "0347373222", // của người đăng ký
    //   Password: "12345678", // của người đăng ký
    //   Address: "Số 55, Thạch Xá, Thạch Thất, Hà Nội", // của người đăng ký
    //   CharityName: "Áo ấm cho em",
    //   CharityAddress: "Xuân Thủy, Cầu Giấy, Hà Nội",
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
    //   roleId: 2,
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

  return (
    <div className="user-regis">
      <div className="user-container">
        <h2 className="user-title">Đăng ký</h2>
        <div className="options">
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
        </div>

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
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Vui lòng nhập username!" },
                  ]}
                  className="form-item"
                >
                  <Input placeholder="Nhập username" />
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
                  <Input placeholder="Nhập số điện thoại của bạn" />
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
                  <Input placeholder="Nhập email của bạn" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8}>
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
                >
                  <Input placeholder="Nhập Tỉnh/Thành phố của bạn" />
                </Form.Item>
              </Col>

              <Col span={8}>
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
                  <Input placeholder="Nhập Quận/Huyện của bạn" />
                </Form.Item>
              </Col>
              <Col span={8}>
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
                  <Input placeholder="Nhập Phường/Xã của bạn" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Địa chỉ cụ thể"
              name="fullOfAddress"
              rules={[
                {
                  // required: true,
                  message: "Vui lòng nhập địa chỉ cụ thể",
                },
              ]}
              className="form-item"
            >
              <Input placeholder="Ví dụ: 144, Xuân Thủy, Cầu Giấy, Hà Nội" />
            </Form.Item>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu của bạn!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Mật khẩu của bạn" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="comfirmPassword"
                  label="Confirm Password"
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
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>

            <p className="error">{error}</p>

            <div className="regis-footer">
              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="regis-button"
                >
                  Đăng ký
                </Button>
              </Form.Item>

              <span className="sign-up">
                Bạn đã có tài khoản? ---
                <Link to="../login">Đăng nhập</Link>---
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
              <p>Nhập thông tin người đăng ký tổ chức</p>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={8}>
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                      { required: true, message: "Vui lòng nhập username!" },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập username" />
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
                    <Input placeholder="Nhập số điện thoại của bạn" />
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
                    <Input placeholder="Nhập email của bạn" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <Form.Item
                    label="Địa chỉ cụ thể"
                    name="fullOfAddress"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ cụ thể",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Ví dụ: 144, Xuân Thủy, Cầu Giấy, Hà Nội" />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    name="charityPassword"
                    label="Password"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu của bạn!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="Mật khẩu của bạn" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="confirmCharityPassword"
                    label="Confirm Password"
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
                    <Input.Password />
                  </Form.Item>
                </Col>
              </Row>

              <p>Nhập thông tin về tổ chức</p>

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
                    <Input placeholder="Nhập tên tổ chức" />
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
                    <Input placeholder="Nhập số điện thoại của tổ chức" />
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
                    <Input placeholder="Nhập email của tổ chức" />
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
                    <Input placeholder="Nhập phương châm của tổ chức" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={8}>
                  <Form.Item
                    label="Tỉnh/Thành phố"
                    name="charityProvince"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Tỉnh/Thành phố của tổ chức",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập Tỉnh/Thành phố của tổ chức" />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item
                    label="Quận/Huyện"
                    name="charityDistrict"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Quận/Huyện của tổ chức",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập Quận/Huyện của tổ chức" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Phường/Xã"
                    name="charityWard"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Phường/Xã của tổ chức!",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập Phường/Xã của tổ chức" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Địa chỉ cụ thể"
                name="fullOfCharityAddress"
                rules={[
                  {
                    // required: true,
                    message: "Vui lòng nhập địa chỉ cụ thể",
                  },
                ]}
                className="form-item"
              >
                <Input placeholder="Ví dụ: 144, Xuân Thủy, Cầu Giấy, Hà Nội" />
              </Form.Item>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={6}>
                  <Form.Item
                    label="Facebook của tổ chức"
                    name="charityFacebook"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Facebook của tổ chức!",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập Facebook tổ chức" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Instagram của tổ chức"
                    name="charityInstagram"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Instagram của tổ chức",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập Instagram của tổ chức" />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Twitter của tổ chức"
                    name="charityTwitter"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Twitter của tổ chức",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập Twitter của tổ chức" />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label="LinkedIn của tổ chức"
                    name="charityLinkedIn"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập LinkedIn của tổ chức",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập LinkedIn của tổ chức" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={6}>
                  <Form.Item
                    label="Video của tổ chức"
                    name="charityIntroVideo"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập Video của tổ chức!",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập Video tổ chức" />
                  </Form.Item>
                </Col>
                <Col span={18}>
                  <Form.Item
                    label="Số tài khoản của tổ chức"
                    name="charityAccountNumber"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số tài khoản của tổ chức",
                      },
                    ]}
                    className="form-item"
                  >
                    <Input placeholder="0123456789 - Nguyen Van A - MB Bank - Ngân hàng Quân đội" />
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
                    <TextArea />
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
                    <TextArea />
                  </Form.Item>
                </Col>
              </Row>

              <p className="error">{error}</p>

              <div className="regis-footer">
                <Form.Item wrapperCol={{ span: 24 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="regis-button"
                  >
                    Đăng ký
                  </Button>
                </Form.Item>

                <span className="sign-up">
                  Bạn đã có tài khoản? ---
                  <Link to="../login">Đăng nhập</Link>---
                </span>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
