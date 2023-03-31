import ManageHeader from "./ManageHeader";
import ManageControl from "./ManageControl";
import classes from "./Manage.module.css";

const Manage = (props) => {
  return (
    <div className={classes.container}>
      <main className={classes.main}>
        <ManageControl />
        <div>
          <ManageHeader />
          {props.children}
        </div>
      </main>
    </div>
  );
};

export default Manage;
