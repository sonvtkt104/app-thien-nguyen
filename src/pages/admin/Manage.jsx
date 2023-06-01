import ManageHeader from "./ManageHeader";
import ManageControl from "./ManageControl";
import classes from "./Manage.module.css";

const Manage = (props) => {
  return (
    <div className={classes.container}>
      <main className={classes.main} style={{ paddingLeft: "calc(100% / 6)" }}>
        <ManageControl className={classes.control} />
        <div style={{ width: "100%" }}>
          <ManageHeader />
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default Manage;
