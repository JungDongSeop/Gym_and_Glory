import classes from "./Main.module.css";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from "react-router-dom";

const Main = () => {
  // custom react hook
  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      {/* 로그인하지 않은 유저에게 표시되는 화면 */}
      <h1>메인 페이지. 제일 처음 보이는 화면입니다.</h1>
      <button onClick={() => navigate("/login")}>로그인 버튼</button>
      <button onClick={() => navigate("/signup")}>회원가입 버튼</button>
      <button onClick={() => navigate("/find-pwd")}>비밀번호 찾기 버튼</button>

      <hr/>

      {/* 로그인한 유저에게 표시되는 화면  */}
      <button onClick={() => navigate("/lobby")}>로그인 완료. 로비로 이동</button>

      {/* <p><Link to="/mypage/dongsum">동섬 마이페이지</Link></p> */}
      {/* <p><Link to="/board/">게시판</Link></p> */}
    </div>
  );
};

export default Main;
