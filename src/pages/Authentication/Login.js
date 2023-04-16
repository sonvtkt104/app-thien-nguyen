import { Link, useNavigate } from "react-router-dom";
import signIn from "./signIn.jpg";
import classes from "./Login.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUsername as setUsernameAction,
} from "../../redux/appSlice";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const usernameBlurHandler = (event) => {
    if (event.target.value.length === 0) {
      setUsernameIsValid(false);
    } else {
      setUsernameIsValid(true);
    }
  };

  const passwordBlurHandler = (event) => {
    if (event.target.value.length === 0) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const submit = async () => {
      if (usernameIsValid && passwordIsValid) {
        const submitData = {
          username: username,
          password: password,
        };

        const response = await fetch("http://localhost:8080/Login", {
          // mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Sec-Fetch-Mode": "cors",
            // "Sec-Fetch-Site": "same-origin",
            // Origin: "http://localhost:8080",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(submitData),
        });

        const data = await response.json();

        // console.log(data.data.token);

        if (!data.isSuccess) {
          console.log("Không đăng nhập được");
          return;
        }

        dispatch(setToken(data.data.token));
        dispatch(setUsernameAction(data.data.user.username));

        const roleId = data.data.user.roleId;

        if (roleId === 1) {
          navigate("..");
        } else if (roleId === 2) {
          navigate("../home-page-charity");
        } else {
          navigate("../admin");
        }
      }
    };

    submit();
  };

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

          <form
            onSubmit={submitHandler}
            method="post"
            className={classes["login-form"]}
          >
            <div className={classes["form-group"]}>
              <label htmlFor="username">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={usernameChangeHandler}
                onBlur={usernameBlurHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="password">
                {/* <i class="zmdi zmdi-l ock"></i> */}
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Mật khẩu"
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
              />
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
                Ghi nhớ tài khoản
              </label>
            </div>

            <button className={classes["button-login"]}>Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// export async function action({ param, request }) {
//   const data = await request.formData();

//   const submitData = {
//     username: data.username,
//     password: data.password,
//   };

//   const response = await fetch("http://localhost:8080/Login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(submitData),
//   });

//   if (!response.ok) {
//     throw json({ message: "something went wrong" }, { status: 500 });
//   }

//   return redirect("/");
// }

export default LoginPage;
