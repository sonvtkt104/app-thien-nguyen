import classes from "./TrUser.module.css";

const TrUser = (props) => {
  const { userData: user, index, onLock, onUnLock } = props;

  const onUnLockHandler = () => {
    onUnLock(user.id);
  };

  const onLockHandler = () => {
    onLock(user.id);
  };

  return (
    <>
      <td>{index + 1}</td>
      <td>{user.userName}</td>
      <td>{user.status === 0 ? "Đang khóa" : "Hoạt động"}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td className={classes["table-button"]}>
        <button
          className={user.status === 0 ? classes.restore : classes.delete}
          onClick={user.status === 0 ? onUnLockHandler : onLockHandler}
        >
          {user.status === 1 ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={classes["icon-delete"]}
              >
                <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>Khóa tài khoản</span>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className={classes["icon-restore"]}
              >
                <path d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span>Khôi phục</span>
            </>
          )}
        </button>
      </td>
    </>
  );
};

export default TrUser;
