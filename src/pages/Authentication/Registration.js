import { Link } from "react-router-dom";
import signUp from "./signUp.jpg";
import classes from "./Registration.module.css";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import InputFile from "./InputFile";

const RegistrationPage = () => {
  const [typeOfUser, setTypeOfUser] = useState("organization");
  const [numberOfRegis, setNumberOfRegis] = useState(0);

  const userActiveHandler = () => {
    setTypeOfUser("user");
  };

  const organizationActiveHandler = () => {
    setTypeOfUser("organization");
  };

  const nextHandler = () => {
    setNumberOfRegis(1);
  };

  const previoushandler = () => {
    setNumberOfRegis(0);
  };

  const regisPage1 = (
    <div className={classes["sign-up"]}>
      <div className={classes.container}>
        <div className={classes["sign-form"]}>
          <header>
            <h1 className={classes["form-title"]}>Đăng ký</h1>
          </header>

          <form method="" action="" className={classes["login-form"]}>
            <div className={classes.typeOfRegis}>
              <span
                className={typeOfUser === "user" ? classes.active : null}
                onClick={userActiveHandler}
              >
                Người dùng
              </span>
              <span
                className={
                  typeOfUser === "organization" ? classes.active : null
                }
                onClick={organizationActiveHandler}
              >
                Tổ chức
              </span>
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input type="text" name="username" placeholder="Tên của bạn" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input type="email" name="username" placeholder="Email" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input type="text" name="username" placeholder="Số điện thoại" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="password">
                {/* <i class="zmdi zmdi-l ock"></i> */}
              </label>
              <input type="password" name="password" placeholder="Mật khẩu" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="password">
                {/* <i class="zmdi zmdi-l ock"></i> */}
              </label>
              <input
                type="password"
                name="password"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <div className={classes["form-group-checkbox"]}>
              <input
                type="checkbox"
                name="remember-me"
                className="agree-term"
              />
              <label
                htmlFor="remember-me"
                className={classes["label-agree-term"]}
              >
                Remember me
              </label>
            </div>
            {typeOfUser === "user" ? (
              <button className={classes["button-login"]}>Đăng ký</button>
            ) : (
              <div className={classes["link-next"]} onClick={nextHandler}>
                Tiếp theo
                {/* <span className={classes["link-next-text"]}></span> */}
              </div>
            )}
          </form>
        </div>

        <div className={classes["signup-image"]}>
          <img
            src={signUp}
            alt="Hình ảnh đăng nhập"
            className={classes["image-login"]}
          />
          <Link to="/login" className={classes["switch-regis"]}>
            Bạn đã có tài khoản ?
          </Link>
        </div>
      </div>
    </div>
  );

  const regisPage2 = (
    <div className={classes["sign-up"]}>
      <div className={classes.container}>
        <div className={classes["sign-form"]}>
          <header>
            <h1 className={classes["form-title"]}>Đăng ký</h1>
          </header>

          <form method="" action="" className={classes["login-form"]}>
            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="username"
                placeholder="Nhập tên tổ chức của bạn"
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="username"
                placeholder="Địa chỉ của tổ chức"
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="username"
                placeholder="Số điện thoại của tổ chức"
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="password">
                {/* <i class="zmdi zmdi-l ock"></i> */}
              </label>
              {/* <input type="file" name="password" placeholder="" /> */}
              <InputFile />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>

              <TextArea
                placeholder="Mô tả ngắn về tổ chức"
                style={{ width: "90%" }}
                rows="4"
                cols="36"
              />
              {/* <textarea
                type="text"
                name="username"
                rows="6"
                cols="36"
                placeholder="Mô tả ngắn về tổ chức"
              /> */}
            </div>

            <button className={classes["button-login"]}>Đăng ký</button>
          </form>
        </div>

        <div className={classes["signup-image"]}>
          <img
            src={signUp}
            alt="Hình ảnh đăng nhập"
            className={classes["image-login"]}
          />
          <Link to="/login" className={classes["switch-regis"]}>
            Bạn đã có tài khoản ?
          </Link>
        </div>
      </div>
    </div>
  );

  return <>{numberOfRegis === 0 ? regisPage1 : regisPage2}</>;
};

export default RegistrationPage;
