import classes from "./Main.module.css";

const Main = () => {
  const ButtonToggleHandler = () => {
    console.log("hello");
  };

  return (
    <div className={classes.main}>
      <h1>메인 페이지</h1>
    </div>
  );
};

export default Main;
