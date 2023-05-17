import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

export const handleSaveOnCookies = (data) => {
  try {
    const cookies = new Cookies();
    var decoded = jwt_decode(data.token);
    cookies.set("token", data.token, {
      path: "/",
      maxAge: decoded.exp,
    });
    cookies.set("user", data.user, { path: "/" });
  } catch (error) {
    console.log(error);
  }
};
// get token
export const getTokenFromCookies = () => {
  try {
    const cookies = new Cookies();
    return cookies.get("token");
  } catch (error) {
    console.log(error);
  }
};

// get user information
export const getUserInfomationFromCookies = () => {
  try {
    const cookies = new Cookies();
    return cookies.get("user");
  } catch (error) {
    console.log(error);
  }
};

//logout user
export const handleLogout = () => {
  try {
    const cookies = new Cookies();
    cookies.remove("token");
    cookies.remove("user");
  } catch (error) {
    console.log(error);
  }
};

// export const handleSaveOnLocalStorage = (data) => {
//   try {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getTokenFromLocalStorage = (data) => {
//   try {
//     return localStorage.getItem("token");
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getUserInfomationFromLocalStorage = (data) => {
//   try {
//     return JSON.parse(localStorage.getItem("user"));
//   } catch (error) {
//     console.log(error);
//   }
// };
