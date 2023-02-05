import { useRef, useState } from "react";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import classes from "./FindPwd.module.scss";

const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// const API_KEY = process.env.REACT_APP_API_KEY;

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
const FindPwd = () => {
  const navigate = useNavigate();

  // 요청 보낼 때 응답 대기
  const [isLoading, setIsLoading] = useState(false);
  // 비밀번호 재설정할 이메일 입력
  const emailInputRef = useRef();
  const submitHandler = (e) => {
    e.preventDefault();

    // 입력 데이터 값 가져오기
    const enteredEmail = emailInputRef.current.value;
    // const enteredPhone = phoneInputRef.current.value;

    // 유효성 검증 추가

    // 가입한 이메일인지 확인하는 작업

    // 만약 가입안한 이메일이거나 유효성검증에서 탈락했다면 다시 입력
    setIsLoading(true);
    console.log(isLoading);
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-firebase-locale": "ko",
      },
    })
      .then((res) => {
        setIsLoading(false);
        console.log(res.json());
        alert("확인 이메일을 발송하였습니다 확인후 비밀번호를 재설정해주세요");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.whiteBox}>
      <img className={classes.logoSmall} src={Logo} alt="logo-small" />
      <p> 다시 참전하세요!</p>
      <form onSubmit={submitHandler}>
      <br />
        <label>
        <input
          className={classes.inputText}
          type="email"
          required
          placeholder=" "
          ref={emailInputRef}
        />
        
        <p className={classes.labelText}>email</p>
        </label>
        <br />
        <input className={classes.findBtn} type="submit" value="비밀번호 찾기" />
        <br />
        <span></span>
      </form>
      <Button onClick={() => navigate("/login")}>홈으로</Button>
    </div>
  );
};

export default FindPwd;
