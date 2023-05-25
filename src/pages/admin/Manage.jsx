import ManageHeader from "./ManageHeader";
import ManageControl from "./ManageControl";
import classes from "./Manage.module.css";

const Manage = (props) => {
  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <ManageControl className={classes.control} />
        <div style={{ position: "relative" }}>
          <ManageHeader />
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default Manage;
