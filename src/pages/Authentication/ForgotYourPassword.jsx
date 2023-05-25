import { Link, useNavigate } from "react-router-dom";
import "./ForgotYourPassword.scss";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import { useState } from "react";

const ForgotYourPassword = (values) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [idUser, setIdUser] = useState(null);
  const [message, setMessage] = useState("");

  const onHanleForgotPassword = (values) => {
    const submit = async () => {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8080/forget-password?userName=${values.username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      setIsLoading(false);
      const data = await response.json();

      if (!data.isSuccess) {
        setError(data.messages[0]);
        return;
      }

      setIdUser(data.data.id);
      setMessage(data.messages[0] ? data.messages[0] : "");
      setPage(2);
    };

    submit();
  };

  const hanleCheckCode = (values) => {
    const submitData = {
      code: values.code,
      id: +idUser,
    };

    const submit = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/reset-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(submitData),
      });
      setIsLoading(false);

      const data = await response.json();

      if (!data.isSuccess) {
        setError(data.messages[0]);
        return;
      }
      setPage(3);
    };

    submit();
  };

  const resetPassword = (values) => {
    const submitData = {
      id: +idUser,
      password: values.password,
      confirmPassword: values.repeatPassword,
    };

    const submit = async () => {
      setIsLoading(true);
      const response = await fetch("http://localhost:8080/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(submitData),
      });

      setIsLoading(false);
      const data = await response.json();

      if (!data.isSuccess) {
        setError(data.messages[0]);
        return;
      }
      navigate("../login");
    };

    submit();
  };

  const changePassword = (
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
            onFinish={resetPassword}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Nhập mật khẩu mới"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu mới của bạn",
                },
              ]}
              className="form-item"
              labelCol={{ style: { width: "100%" } }}
            >
              <Input
                placeholder="vui lòng nhập mật khẩu mới của bạn"
                className="input-app"
                type="password"
                onChange={() => setError("")}
              />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="repeatPassword"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu của bạn" },
              ]}
              className="form-item"
              labelCol={{ style: { width: "100%" } }}
            >
              <Input
                placeholder="Vui lòng nhập mật khẩu của bạn"
                type="password"
                className="input-app"
                onChange={() => setError("")}
              />
            </Form.Item>

            <p className="error">{error}</p>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button btn-primary"
                style={{ borderRadius: 4 }}
                loading={isLoading}
                disabled={isLoading}
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

  const getCode = (
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
            onFinish={onHanleForgotPassword}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[
                { required: true, message: "Vui lòng nhập UserName của bạn" },
              ]}
              className="form-item"
              labelCol={{ style: { width: "100%" } }}
            >
              <Input
                placeholder="vui lòng nhập user name"
                className="input-app"
                onChange={() => setError("")}
              />
            </Form.Item>

            <p className="error">{error}</p>

            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button btn-primary"
                style={{ borderRadius: 4 }}
                disabled={isLoading}
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

  const CheckCode = (
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
          <h2 className="login-title h1-app">Kiểm tra code nhập từ Email</h2>

          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 32 }}
            style={{ maxWidth: 600 }}
            // initialValues={{ remember: true }}
            layout="vertical"
            autoComplete="off"
            className="form-login"
            onFinish={hanleCheckCode}
            // onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Code gửi qua email"
              name="code"
              rules={[
                { required: true, message: "Vui lòng nhập code gửi qua email" },
              ]}
              className="form-item"
              labelCol={{ style: { width: "100%" } }}
            >
              <Input
                placeholder="Nhập Code gửi qua email"
                className="input-app"
                onChange={() => setError("")}
              />
            </Form.Item>
            <p>{message}</p>
            <p className="error">{error}</p>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button btn-primary"
                style={{ borderRadius: 4 }}
                loading={isLoading}
                disabled={isLoading}
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

  return page === 1 ? getCode : page === 2 ? CheckCode : changePassword;
};

export default ForgotYourPassword;
