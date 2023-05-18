import classes from "./ManageControl.module.css";
import { NavLink } from "react-router-dom";

const ManageControl = () => {
  return (
    <aside className={classes.manage}>
      <div className={classes["logo-app"]}>
        <img src="/images/logo-app.png" alt="logo app" />
        <p>Thiện nguyện</p>
      </div>

      <ul className={classes["manage-list"]}>
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className={classes["icon-user"]}
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <span>Người dùng</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/cuocvandong"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={classes["icon-camp"]}
            >
              <path d="M160.8 96.5c14 17 31 30.9 49.5 42.2c25.9 15.8 53.7 25.9 77.7 31.6V138.8C265.8 108.5 250 71.5 248.6 28c-.4-11.3-7.5-21.5-18.4-24.4c-7.6-2-15.8-.2-21 5.8c-13.3 15.4-32.7 44.6-48.4 87.2zM320 144v30.6l0 0v1.3l0 0 0 32.1c-60.8-5.1-185-43.8-219.3-157.2C97.4 40 87.9 32 76.6 32c-7.9 0-15.3 3.9-18.8 11C46.8 65.9 32 112.1 32 176c0 116.9 80.1 180.5 118.4 202.8L11.8 416.6C6.7 418 2.6 421.8 .9 426.8s-.8 10.6 2.3 14.8C21.7 466.2 77.3 512 160 512c3.6 0 7.2-1.2 10-3.5L245.6 448H320c88.4 0 160-71.6 160-160V128l29.9-44.9c1.3-2 2.1-4.4 2.1-6.8c0-6.8-5.5-12.3-12.3-12.3H400c-44.2 0-80 35.8-80 80zm80-16a16 16 0 1 1 0 32 16 16 0 1 1 0-32z" />
            </svg>
            <span>Tổ chức</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/admin/cuocvandongnoibat"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            end
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              className={classes["icon-camp"]}
            >
              <path d="M64 32C64 14.3 49.7 0 32 0S0 14.3 0 32V64 368 480c0 17.7 14.3 32 32 32s32-14.3 32-32V352l64.3-16.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30V66.1c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L64 48V32z" />
            </svg>
            <span>Xử lý report</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default ManageControl;
