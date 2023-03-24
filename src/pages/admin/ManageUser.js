import { useState } from "react";

import InputSearch from "./InputSearch";
import Manage from "./Manage";
import classes from "./ManageUser.module.css";
import { Button } from "../../components/Button";
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
  const [numberShowUsers, setNumberShowUsers] = useState(0);
  const [usersIsRemove, setUsersIsRemove] = useState(false);
  const [users, setUsers] = useState(
    DUMMY_DATA.filter((user) => user.status === (usersIsRemove ? 0 : 1))
  );

  const [usersDelete, setDeleteUsers] = useState(
    DUMMY_DATA.filter((user) => user.status === (!usersIsRemove ? 0 : 1))
  );

  const buttonToUsersHandler = () => {
    setUsersIsRemove(false);
    setNumberShowUsers(0);
  };

  const buttonToUsersRemoveHandler = () => {
    setUsersIsRemove(true);
    setNumberShowUsers(0);
  };

  const deleteUserHandler = (id) => {
    const item = users.find((user) => user.id === id);

    setUsers((prev) => {
      return prev.filter((user) => user.id !== id);
    });

    setDeleteUsers((prev) => {
      return [...prev, item];
    });
  };

  const restoreUserHandler = (id) => {
    const item = usersDelete.find((user) => user.id === id);

    setDeleteUsers((prev) => {
      return prev.filter((user) => user.id !== id);
    });

    setUsers((prev) => {
      return [...prev, item];
    });
  };

  const prevHandler = () => {
    setNumberShowUsers((prev) => {
      if (prev === 0) return prev;

      return prev - 1;
    });
  };

  const nextHandler = () => {
    setNumberShowUsers((prev) => {
      const numberOfUsers = usersIsRemove ? usersDelete.length : users.length;

      if ((numberShowUsers + 1) * 6 > numberOfUsers) return prev;

      return prev + 1;
    });
  };

  return (
    <Manage>
      <div className={classes.main}>
        <header className={classes["header-table"]}>
          <div className={classes.switch}>
            <Button
              color={usersIsRemove ? "#d0ebff" : "#1971c2"}
              onClick={buttonToUsersHandler}
            >
              Tài khoản
            </Button>
            <Button
              color={!usersIsRemove ? "#ffc9c9" : "#e8590c"}
              onClick={buttonToUsersRemoveHandler}
            >
              Tài khoản bị khóa
            </Button>
          </div>
        </header>

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
              {(usersIsRemove ? usersDelete : users)
                .filter(
                  (user, index) =>
                    index >= numberShowUsers * 6 &&
                    index < (numberShowUsers + 1) * 6
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <TrUser
                        userData={user}
                        index={index + numberShowUsers * 6}
                        usersIsRemove={usersIsRemove}
                        onDelete={deleteUserHandler}
                        onRestore={restoreUserHandler}
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
                {numberShowUsers * 6 + "-" + (numberShowUsers + 1) * 6} trong{" "}
                {usersIsRemove ? usersDelete.length : users.length}
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
