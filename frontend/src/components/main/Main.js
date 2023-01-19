import classes from "./Main.module.css";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className={classes.main}>
      <h1>메인 페이지. 제일 처음 보이는 화면입니다.</h1>
      <p><Link to="/login">로그인 이동</Link></p>
      <p><Link to="/signup">회원가입 이동</Link></p>
      <p><Link to="/mypage/dongsum">동섬 마이페이지</Link></p>
      <p><Link to="/board/">게시판</Link></p>
    </div>
  );
};

export default Main;
