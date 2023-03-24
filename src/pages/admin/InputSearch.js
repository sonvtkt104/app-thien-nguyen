import classes from "./InputSearch.module.css";

const InputSearch = (props) => {
  return (
    <input
      type="text"
      name="find-user"
      placeholder={props.placeHolder}
      className={classes["find-user"]}
    />
  );
};

export default InputSearch;
