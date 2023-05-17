import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { useState } from "react";

const ForgotYourPassword = () => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onHanleForgotPassword = (values) => {
    const submitData = {
      email: values.email,
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
    };

    submit();
  };

  return (
    <div className="forgot">
      <Row
        justify="center"
        style={{ position: "relative", minHeight: "100vh" }}
      >
        <span
          style={{
            position: "absolute",
            cursor: "pointer",
            fontSize: 16,
            top: 30,
            left: 70,
            zIndex: 1,
          }}
          className="text-hover"
          onClick={() => {
            navigate(-1);
          }}
        >
          {"< Quay lại"}
        </span>

        <Col span={6} offset={0} className="forgot-content">
          <Row
            style={{
              fontSize: 18,
              fontWeight: 600,
              lineHeight: "50px",
              cursor: "pointer",
              marginBottom: 20,
              marginTop: 60,
            }}
            justify="center"
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="/images/logo-app.png"
              alt="logo app"
              style={{ width: 50, marginRight: 4 }}
            />
            Thiện Nguyện
          </Row>
          <h2 className="login-title h1-app">Quên mật khẩu</h2>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 32 }}
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            layout="vertical"
            autoComplete="off"
            className="form-login"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email của bạn"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email của bạn" },
              ]}
              className="form-item"
            >
              <Input placeholder="vui lòng nhập email" className="input-app" />
            </Form.Item>

            <p>
              Tài khoản email của bạn sẽ có những hướng dẫn để lấy lại mật khẩu
            </p>

            <p className="error">{error}</p>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button btn-primary"
                style={{ borderRadius: 4 }}
              >
                Lấy lại mật khẩu
              </Button>
            </Form.Item>

            <div className="for-sign">
              <span className="sign-up">
                Bạn đã có tài khoản? ---
                <Link
                  to="../login"
                  className="text-hover"
                  style={{ color: "var(--color-blue)" }}
                >
                  Đăng nhập
                </Link>
                ---
              </span>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotYourPassword;
