import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { Button, Checkbox, Form, Input } from "antd";

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
      UserName: values.username,
      Password: values.password,
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
        navigate("..");
      } else if (roleId === 2) {
        navigate("../home-page-charity");
      } else {
        navigate("../admin");
      }
    };

    submit();
  };

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-title">Đăng nhập</h2>

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
            <Input placeholder="Nhập tài khoản" />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            className="form-item"
          >
            <Input.Password placeholder="Nhập mật khẩu" />
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
            <Button type="primary" htmlType="submit" className="login-button">
              Đăng nhập
            </Button>
          </Form.Item>

          <div className="for-sign">
            <a href="https://www.w3schools.com" className="forgot">
              Quên mật khẩu
            </a>
            <span className="sign-up">
              Tạo tài khoản mới? ---
              <Link to="../sign-up">Đăng ký</Link>---
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
