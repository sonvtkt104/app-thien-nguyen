import classes from "./ManageHeader.module.css";
import { useSelector } from "react-redux";

const ManageHeader = () => {
  const username = useSelector((state) => state.app.username);

  return (
    <header className={classes.header}>
      {/* <h2 className={classes["header-title"]}>Admin</h2> */}
      <div className={classes["user-information"]}>
        <p className={classes["user-name"]}>{username}</p>
        <img
          className={classes["img-header"]}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/640px-Facebook_Logo_%282019%29.png"
          alt="image user"
        />
      </div>
    </header>
  );
};

export default ManageHeader;
