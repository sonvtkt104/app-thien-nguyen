import { useState } from "react";
import { Button } from "../../components/Button";
import InputSearch from "./InputSearch";
import Manage from "./Manage";
import classes from "./ManageCVD.module.css";
import TrCvd from "./TrCvd";

const CVD_DATA = [
  {
    id: "1",
    name: "Cuộc vận động 1",
    status: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "2",
    name: "Cuộc vận động 2",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "3",
    name: "Cuộc vận động 3",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "4",
    name: "Cuộc vận động 4",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "5",
    name: "Cuộc vận động 5",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "6",
    name: "Cuộc vận động 6",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "7",
    name: "Cuộc vận động 7",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "8",
    name: "Cuộc vận động 8",
    status: 1,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "9",
    name: "Cuộc vận động 9",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    id: "10",
    name: "Cuộc vận động 10",
    status: 0,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
];

const ManageCVD = () => {
  const [numberShowCvds, setNumberShowCvds] = useState(0);
  const [showCvds, setShowCvds] = useState(true);
  const [cvdsActive, setCvdsActive] = useState(
    CVD_DATA.filter((cvd) => cvd.status === (showCvds ? 1 : 0))
  );
  const [cvdsActiveDelete, setCvdsActiveDelete] = useState(
    CVD_DATA.filter((cvd) => cvd.status === (!showCvds ? 1 : 0))
  );

  const buttonToCvdHandler = () => {
    setShowCvds(true);
    setNumberShowCvds(0);
  };

  const buttonToCvdRemoveHandler = () => {
    setShowCvds(false);
    setNumberShowCvds(0);
  };

  const deleteCvdHandler = (id) => {
    const item = cvdsActive.find((user) => user.id === id);

    setCvdsActive((prev) => {
      return prev.filter((user) => user.id !== id);
    });

    setCvdsActiveDelete((prev) => {
      return [...prev, item];
    });
  };

  const restoreCvdHandler = (id) => {
    const item = cvdsActiveDelete.find((user) => user.id === id);

    setCvdsActiveDelete((prev) => {
      return prev.filter((user) => user.id !== id);
    });

    setCvdsActive((prev) => {
      return [...prev, item];
    });
  };

  const prevHandler = () => {
    setNumberShowCvds((prev) => {
      if (prev === 0) return prev;

      return prev - 1;
    });
  };

  const nextHandler = () => {
    setNumberShowCvds((prev) => {
      const numberOfCvds = showCvds
        ? cvdsActive.length
        : cvdsActiveDelete.length;

      if ((numberShowCvds + 1) * 6 > numberOfCvds) return prev;

      return prev + 1;
    });
  };

  return (
    <Manage>
      <div className={classes.main}>
        <header className={classes["header-table"]}>
          {/* <p className={classes["header-title"]}>Quản lý cuộc vận động</p> */}
          {/* <button>Thêm tài khoản</button> */}
          <div className={classes.switch}>
            <Button
              color={!showCvds ? "#d0ebff" : "#1971c2"}
              onClick={buttonToCvdHandler}
            >
              Cuộc vận động
            </Button>
            <Button
              color={showCvds ? "#ffc9c9" : "#e8590c"}
              onClick={buttonToCvdRemoveHandler}
            >
              Cuộc vận động bị xóa
            </Button>
          </div>
        </header>

        <div className={classes.list}>
          <div className={classes["user-list"]}>
            <p>Danh sách cuộc vận động</p>
            <InputSearch placeHolder="Tìm kiếm cuộc vận động" />
          </div>

          <table className={classes["table-user"]}>
            <thead>
              <tr className={classes["first-column"]}>
                <th className={classes.stt}>STT</th>
                <th className={classes.name}>Tên cuộc vận động</th>
                <th className={classes.status}>Trạng thái</th>
                <th className={classes["person-in-charge"]}>Người tạo</th>
                <th className={classes["created-date"]}>Ngày tạo</th>
                {/* <th className={classes.description}>Mô tả ngắn</th> */}
                <th className={classes.editHeader}></th>
              </tr>
            </thead>
            <tbody>
              {(showCvds ? cvdsActive : cvdsActiveDelete)
                .filter(
                  (user, index) =>
                    index >= numberShowCvds * 6 &&
                    index < (numberShowCvds + 1) * 6
                )
                .map((user, index) => {
                  return (
                    <tr key={index}>
                      <TrCvd
                        cvdData={user}
                        showCvds={showCvds}
                        index={index}
                        onDelete={deleteCvdHandler}
                        onRestore={restoreCvdHandler}
                      />
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <footer>
            <p>
              <span className={classes["footer-text"]}>
                Số cuộc vận động trên 1 trang :
              </span>
              <span> 6</span>
            </p>
            <p className={classes["footer-control"]}>
              <span className={classes["footer-text"]}>
                {}
                1-6 trong{" "}
                {showCvds ? cvdsActive.length : cvdsActiveDelete.length}
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

export default ManageCVD;
