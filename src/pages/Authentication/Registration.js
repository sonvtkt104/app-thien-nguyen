import { Link, useNavigate } from "react-router-dom";
import signUp from "./signUp.jpg";
import classes from "./Registration.module.css";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [charity, setCharity] = useState("");
  const [charityAddress, setCharityAddress] = useState("");
  const [charityPhone, setCharityPhone] = useState("");
  const [charityEmail, setCharityEmail] = useState("");
  const [charityMotto, setCharityMotto] = useState("");
  const [charityTarget, setCharityTarget] = useState("");
  const [charityDescription, setCharityDescription] = useState("");
  const [charityFile, setCharityFile] = useState("");

  const [typeOfUser, setTypeOfUser] = useState("organization");
  const [numberOfRegis, setNumberOfRegis] = useState(0);
  const navigate = useNavigate();
  const userActiveHandler = () => {
    setTypeOfUser("user");
  };

  const organizationActiveHandler = () => {
    setTypeOfUser("organization");
  };

  const nextHandler = () => {
    setNumberOfRegis(1);
  };

  // const previoushandler = () => {
  //   setNumberOfRegis(0);
  // };

  const nameHandler = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const emailHandler = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const phoneNumberHandler = (event) => {
    event.preventDefault();
    setPhoneNumber(event.target.value);
  };

  const passwordHandler = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };
  const repeatPasswordHandler = (event) => {
    event.preventDefault();
    setRepeatPassword(event.target.value);
  };

  const charityHandler = (event) => {
    event.preventDefault();
    setCharity(event.target.value);
  };

  const charityAddressHandler = (event) => {
    event.preventDefault();
    setCharityAddress(event.target.value);
  };

  const charityPhoneHandler = (event) => {
    event.preventDefault();
    setCharityPhone(event.target.value);
  };

  const charityEmailHandler = (event) => {
    event.preventDefault();
    setCharityEmail(event.target.value);
  };

  const charityMottoHandler = (event) => {
    event.preventDefault();
    setCharityMotto(event.target.value);
  };

  const charityTargetHandler = (event) => {
    event.preventDefault();
    setCharityTarget(event.target.value);
  };

  const charityDescriptionHandler = (event) => {
    event.preventDefault();
    setCharityDescription(event.target.value);
  };

  const charityFileHandler = (event) => {
    event.preventDefault();
    setCharityFile(event.target.files[0]);
  };

  const handlerUserSubmit = (event) => {
    event.preventDefault();

    const submitData = {
      username: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      confirmPassword: repeatPassword,
      roleId: 1,
    };

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
        return;
      }

      navigate("../login");
    };

    submit();
  };

  const handlerOrganizationSubmit = (event) => {
    event.preventDefault();

    const submitData = {
      username: name,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      confirmPassword: repeatPassword,
      charityName: charity,
      charityAddress: charityAddress,
      charityPhone: charityPhone,
      charityEmail: charityEmail,
      charityMotto: charityMotto,
      charityTarget: charityTarget,
      charityDescription: charityDescription,
      charityFile: "handle file",
      roleId: 2,
    };

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
        return;
      }

      navigate("../login");
    };

    submit();
  };

  const regisPage1 = (
    <div className={classes["sign-up"]}>
      <div className={classes.container}>
        <div className={classes["sign-form"]}>
          <header>
            <h1 className={classes["form-title"]}>Đăng ký</h1>
          </header>

          <form method="post" className={classes["login-form"]}>
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
              <label htmlFor="yourname">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="yourname"
                value={name}
                id="yourname"
                placeholder="Username"
                onChange={nameHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="email">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="email"
                name="email"
                value={email}
                id="email"
                placeholder="Email"
                onChange={emailHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="phoneNumber">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                id="phoneNumber"
                placeholder="Số điện thoại"
                onChange={phoneNumberHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="password">
                {/* <i class="zmdi zmdi-l ock"></i> */}
              </label>
              <input
                type="password"
                name="password"
                value={password}
                id="password"
                placeholder="Mật khẩu"
                onChange={passwordHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="repeatPassword">
                {/* <i class="zmdi zmdi-l ock"></i> */}
              </label>
              <input
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                id="repeatPassword"
                placeholder="Nhập lại mật khẩu"
                onChange={repeatPasswordHandler}
              />
            </div>

            <div className={classes["form-group-checkbox"]}>
              <input type="checkbox" name="" className="agree-term" />
              <label
                htmlFor="remember-me"
                className={classes["label-agree-term"]}
              >
                Ghi nhớ tài khoản
              </label>
            </div>
            {typeOfUser === "user" ? (
              <button
                className={classes["button-login"]}
                onClick={handlerUserSubmit}
              >
                Đăng ký
              </button>
            ) : (
              <div className={classes["link-next"]} onClick={nextHandler}>
                Tiếp theo
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
      <div className={classes["container-2"]}>
        <div className={classes["sign-form"]}>
          <header>
            <h1 className={classes["form-title"]}>Đăng ký</h1>
          </header>

          <form method="" action="" className={classes["login-form-2"]}>
            <div className={classes["form-group"]}>
              <label htmlFor="charity">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="charity"
                value={charity}
                id="charity"
                placeholder="Nhập tên tổ chức của bạn"
                onChange={charityHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="charityAddress">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="charityAddress"
                value={charityAddress}
                id="charityAddress"
                placeholder="Địa chỉ của tổ chức"
                onChange={charityAddressHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="charityPhone">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="charityPhone"
                value={charityPhone}
                id="charityPhone"
                placeholder="Số điện thoại của tổ chức"
                onChange={charityPhoneHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="charityEmail">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="email"
                name="charityEmail"
                value={charityEmail}
                id="charityEmail"
                placeholder="Email của tổ chức"
                onChange={charityEmailHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="charityMotto">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="charityMotto"
                value={charityMotto}
                id="charityMotto"
                placeholder="Phương châm của tổ chức"
                onChange={charityMottoHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="charityTarget">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>
              <input
                type="text"
                name="charityTarget"
                value={charityTarget}
                id="charityTarget"
                placeholder="Mục tiêu của tổ chức"
                onChange={charityTargetHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="charityDescription">
                {/* <i class="zmdi zmdi-account material-icons-name"></i> */}
              </label>

              <TextArea
                name="charityDescription"
                placeholder="Mô tả ngắn về tổ chức"
                style={{ width: "90%" }}
                rows="4"
                cols="36"
                id="charityDescription"
                value={charityDescription}
                onChange={charityDescriptionHandler}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="charityFile"></label>
              {/* <InputFile /> */}
              <input
                type="file"
                name="CharityFile"
                id="charityFile"
                onChange={charityFileHandler}
                className={classes["type-small"]}
              />
            </div>

            <button
              className={classes["button-login"]}
              onClick={handlerOrganizationSubmit}
            >
              Đăng ký
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // return regisPage2;

  return <>{numberOfRegis === 0 ? regisPage1 : regisPage2}</>;
};

export default RegistrationPage;
