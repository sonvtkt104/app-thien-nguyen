import ManageHeader from "./ManageHeader";
import ManageControl from "./ManageControl";
import classes from "./Manage.module.css";

const Manage = (props) => {
  return (
    <div className={classes.container}>
      <ManageHeader />
      <main className={classes.main}>
        <ManageControl />
        {props.children}
      </main>
    </div>
  );
};

export default Manage;
