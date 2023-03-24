import { Link } from "react-router-dom";
import signIn from "./signIn.jpg";

import classes from "./Login.module.css";

const LoginPage = () => {
  return (
    <div className={classes["sign-in"]}>
      <div className={classes.container}>
        <div className={"signin-image"}>
          <img
            src={signIn}
            alt="Hình ảnh đăng nhập"
            className={classes["image-login"]}
          />
          <Link to="/sign-up" className={classes["switch-regis"]}>
            Bạn chưa có tài khoản ?
          </Link>
        </div>

        <div className={classes["sign-form"]}>
          <header>
            <h1 className={classes["form-title"]}>Đăng nhập</h1>
          </header>

          <form method="" action="" className={classes["login-form"]}>
            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input type="text" name="username" placeholder="Username" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="password">
                {/* <i class="zmdi zmdi-l ock"></i> */}
              </label>
              <input type="password" name="password" placeholder="Password" />
            </div>

            <div className={classes["form-group-checkbox"]}>
              <input
                type="checkbox"
                name="remember-me"
                className={classes["agree-term"]}
              />
              <label
                htmlFor="remember-me"
                className={classes["label-agree-term"]}
              >
                Remember me
              </label>
            </div>

            <button className={classes["button-login"]}>Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
