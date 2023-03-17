import Manage from "./Manage";
import classes from "./ManageCVD.module.css";

const CVD_DATA = [
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
  {
    name: "Cuộc vận động 1",
    status: "0",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
    personInCharge: "Tổ chức 1",
    createdDate: "2023-03-16",
  },
];

const ManageCVD = () => {
  return (
    <Manage>
      <div className={classes.main}>
        <header className={classes["header-table"]}>
          <p className={classes["header-title"]}>Quản lý cuộc vận động</p>
          {/* <button>Thêm tài khoản</button> */}
        </header>

        <div className={classes.list}>
          <div className={classes["user-list"]}>
            <p>Danh sách cuộc vận động</p>
            <input
              type="text"
              name="find-user"
              placeholder="Tìm kiếm cuộc vận động"
              className={classes["find-user"]}
            />
          </div>

          <table className={classes["table-user"]}>
            <thead>
              <tr className={classes["first-column"]}>
                <th className={classes.stt}>STT</th>
                <th className={classes.name}>Tên cuộc vận động</th>
                <th className={classes.status}>Trạng thái</th>
                <th className={classes["person-in-charge"]}>Người tạo</th>
                <th className={classes["created-date"]}>Ngày tạo</th>
                <th className={classes.description}>Mô tả ngắn</th>
                <th className={classes.editHeader}></th>
              </tr>
            </thead>
            <tbody>
              {CVD_DATA.filter((user, index) => index >= 0 && index < 6).map(
                (user, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.status}</td>
                      <td>{user.personInCharge}</td>
                      <td>{user.createdDate}</td>
                      <td className={classes["no-wrap"]}>{user.description}</td>
                      <td className={classes["table-button"]}>
                        <button className={classes.edit}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            // stroke-width="1.5"
                            stroke="currentColor"
                            className={classes["icon-edit"]}
                          >
                            <path
                              // stroke-linecap="round"
                              // stroke-linejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                          <span>Chỉnh sủa</span>
                        </button>
                        <button className={classes.delete}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            // stroke-width="1.5"
                            stroke="currentColor"
                            className={classes["icon-delete"]}
                          >
                            <path
                              // stroke-linecap="round"
                              // stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                          <span>Xóa</span>
                        </button>
                      </td>
                    </tr>
                  );
                }
              )}
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
              <span className={classes["footer-text"]}>1-6 trong 50</span>
              <button className={classes["icon-left"]}>&lt;</button>
              <button className={classes["icon-right"]}>&gt;</button>
            </p>
          </footer>
        </div>
      </div>
    </Manage>
  );
};

export default ManageCVD;
