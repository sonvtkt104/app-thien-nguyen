import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";

import {
  handleSaveOnCookies,
  getTokenFromCookies,
  getUserInfomationFromCookies,
} from "./HandleUserInfomation";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onFinish = (values) => {
    const submitData = {
      userName: values.username,
      password: values.password,
    };

    const submit = async () => {
      const response = await fetch("http://localhost:8080/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!data.isSuccess) {
        setError(data.messages[0]);
        return;
      }

      handleSaveOnCookies(data.data);
      console.log(getTokenFromCookies());
      console.log(getUserInfomationFromCookies());

      const roleId = data.data.user.roleId;
      if (roleId === 1) {
        navigate("../admin");
      } else if (roleId === 3) {
        navigate("../home-page-charity");
      } else {
        navigate("..");
      }
    };

    submit();
  };

  return (
    <div className="login">
      <Row justify='center' style={{ position: 'relative', minHeight: '100vh'}}>
        <span style={{position: 'absolute', cursor: 'pointer', fontSize: 16, top: 30, left: 70, zIndex: 1 }}
          className="text-hover"
          onClick={() => {
            navigate(-1)
          }}
        >
          {"< Quay lại"}
        </span>
        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
          <Row style={{height: '100%'}}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8}
              className="flex-col-center"
            >
              <div className="login-container">
                <Row style={{fontSize: 18, fontWeight: 600, lineHeight: '50px', cursor: 'pointer', marginBottom :20}}
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
                <h2 className="login-title h1-app">Đăng nhập</h2>

                <Form
                  name="basic"
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 32 }}
                  style={{ maxWidth: 600 }}
                  // initialValues={{ remember: true }}
                  layout="vertical"
                  autoComplete="off"
                  className="form-login"
                  onFinish={onFinish}
                  // onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Tài khoản"
                    name="username"
                    rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
                    className="form-item"
                  >
                    <Input placeholder="Nhập tài khoản" 
                       className="input-app"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Mật khẩu"
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                    className="form-item"
                  >
                    <Input.Password placeholder="Nhập mật khẩu" 
                      className="input-app"
                    />
                  </Form.Item>

                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ span: 24 }}
                    className="form-item"
                  >
                    <Checkbox>Ghi nhớ tài khoản</Checkbox>
                  </Form.Item>

                  <p className="error">{error}</p>

                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" className="login-button btn-primary" style={{borderRadius: 4}}>
                      Đăng nhập
                    </Button>
                  </Form.Item>

                  <div className="for-sign">
                    <a href="https://www.w3schools.com" className="forgot text-hover"
                      style={{color:"var(--color-blue)", fontSize :16, marginBottom : 5}}
                    >
                      Quên mật khẩu?
                    </a>
                    <span className="sign-up">
                      Tạo tài khoản mới? ---
                      <Link to="../sign-up" className="text-hover" style={{color:"var(--color-blue)"}}>Đăng ký</Link>---
                    </span>
                  </div>
                </Form>
              </div>
            </Col>
            <Col
              xs={16} sm={16} md={16} lg={16} xl={16}
              className="flex-col-center"
              style={{position: 'relative'}}
            >
              <span style={{display: 'block', margin: 'auto', position: 'relative'}}>
                <img src="https://givenow.vn/wp-content/themes/funlin-progression-child/images/login-default.jpg" alt="banner" 
                  style={{margin: 'auto', height: '100%'}}
                />
                <div style={{position: 'absolute', inset: 0, background: 'black', opacity: 0.5, borderRadius: 25}}>

                </div>
                <Row style={{position: 'absolute', inset: 0, borderRadius: 25, textAlign: 'center'}}>
                  <div className="flex-col-center" style={{width: '100%',}}>
                    <div style={{fontSize: 16, color: 'white', fontWeight: '600', marginBottom: 20}}>Bạn chưa có tài khoản? Tham gia ngay với chúng tôi</div>
                    <div>
                      <button
                        class="btn-primary"
                        style={{
                          fontSize: 16,
                          opacity: 1
                        }}
                        onClick={() => {
                          navigate("/sign-up")
                        }}
                      >
                        Đăng Ký
                      </button>
                    </div>
                  </div>
                </Row>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
