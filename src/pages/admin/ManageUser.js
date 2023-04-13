import { useState } from "react";

import InputSearch from "./InputSearch";
import Manage from "./Manage";
import classes from "./ManageUser.module.css";
import TrUser from "./TrUser";
const DUMMY_DATA = [
  {
    id: "1",
    userName: "Lê Mạnh Linh",
    email: "19020346@vnu.edu.vn",
    role: "User",
    status: 1,
  },
  {
    id: "2",
    userName: "Lê Văn Kiên",
    email: "19020341@vnu.edu.vn",
    role: "Organization",
    status: 1,
  },
  {
    id: "3",
    userName: "Nguyễn Bá Tiên",
    email: "19020999@vnu.edu.vn",
    role: "User",
    status: 0,
  },
  {
    id: "4",
    userName: "Nguyễn Xuân Sơn",
    email: "19020333@vnu.edu.vn",
    role: "User",
    status: 1,
  },
  {
    id: "5",
    userName: "Trịnh Hoàng",
    email: "19000000@vnu.edu.vn",
    role: "User",
    status: 0,
  },
  {
    id: "6",
    userName: "Khuất xuân Hải",
    email: "19022222@vnu.edu.vn",
    role: "User",
    status: 0,
  },
  {
    id: "7",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "Organization",
    status: 1,
  },
  {
    id: "8",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "Organization",
    status: 0,
  },
  {
    id: "9",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "User",
    status: 0,
  },
  {
    id: "10",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "Organization",
    status: 1,
  },
  {
    id: "11",
    userName: "Lê Mạnh Linh",
    email: "19020346@vnu.edu.vn",
    role: "User",
    status: 1,
  },
  {
    id: "12",
    userName: "Lê Văn Kiên",
    email: "19020341@vnu.edu.vn",
    role: "Organization",
    status: 1,
  },
  {
    id: "13",
    userName: "Nguyễn Bá Tiên",
    email: "19020999@vnu.edu.vn",
    role: "User",
    status: 0,
  },
  {
    id: "14",
    userName: "Nguyễn Xuân Sơn",
    email: "19020333@vnu.edu.vn",
    role: "User",
    status: 1,
  },
  {
    id: "15",
    userName: "Trịnh Hoàng",
    email: "19000000@vnu.edu.vn",
    role: "User",
    status: 0,
  },
  {
    id: "16",
    userName: "Khuất xuân Hải",
    email: "19022222@vnu.edu.vn",
    role: "User",
    status: 0,
  },
  {
    id: "17",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "Organization",
    status: 1,
  },
  {
    id: "18",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "Organization",
    status: 0,
  },
  {
    id: "19",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "User",
    status: 0,
  },
  {
    id: "20",
    userName: "Lê Mạnh Linh",
    email: "lemanhlinh0808@gmail.com",
    role: "Organization",
    status: 1,
  },
];

const ManageUser = () => {
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [users, setUsers] = useState(DUMMY_DATA);

  const lockUserHandler = (id) => {
    setUsers((prev) => {
      const listItems = prev;
      const item = listItems.find((user) => user.id === id);
      item.status = item.status === 1 ? 0 : 1;

      return listItems;
    });
  };

  const unLockUserHandler = (id) => {
    setUsers((prev) => {
      const listItems = prev;
      const item = listItems.find((user) => user.id === id);
      item.status = item.status === 1 ? 0 : 1;
      console.log(listItems);

      return listItems;
    });
  };

  const prevHandler = () => {
    setNumberOfPages((prev) => {
      if (prev === 0) return prev;

      return prev - 1;
    });
  };

  const nextHandler = () => {
    setNumberOfPages((prev) => {
      const numberOfUsers = users.length;

      if ((numberOfPages + 1) * 6 > numberOfUsers) return prev;

      return prev + 1;
    });
  };

  return (
    <Manage>
      <div className={classes.main}>
        <div className={classes.list}>
          <div className={classes["user-list"]}>
            <p>Danh sách tài khoản</p>
            <InputSearch placeHolder="Tìm kiếm tài khoản" />
          </div>

          <table className={classes["table-user"]}>
            <thead>
              <tr className={classes["first-column"]}>
                <th className={classes.stt}>STT</th>
                <th className={classes.userName}>Tên tài khoản</th>
                <th className={classes.status}>Trạng thái</th>
                <th className={classes.email}>Email</th>
                <th className={classes.role}>Vai trò</th>
                <th className={classes.editHeader}></th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter(
                  (user, index) =>
                    index >= numberOfPages * 6 &&
                    index < (numberOfPages + 1) * 6
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <TrUser
                        userData={user}
                        index={index + numberOfPages * 6}
                        onLock={lockUserHandler}
                        onUnLock={unLockUserHandler}
                      />
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <footer>
            <p>
              <span className={classes["footer-text"]}>
                Số tài khoản trên 1 trang :
              </span>
              <span> 6</span>
            </p>
            <p className={classes["footer-control"]}>
              <span className={classes["footer-text"]}>
                {numberOfPages * 6 + "-" + (numberOfPages + 1) * 6} trong{" "}
                {users.length}
              </span>
              <button className={classes["icon-left"]} onClick={prevHandler}>
                &lt;
              </button>
              <button className={classes["icon-right"]} onClick={nextHandler}>
                &gt;
              </button>
            </p>
          </footer>
        </div>
      </div>
    </Manage>
  );
};

export default ManageUser;
