import { useRef, useState } from "react";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import classes from "./FindPwd.module.css";

const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;

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

    // 유효성 검증 추가

    // 가입한 이메일인지 확인하는 작업
    // 만약 가입안한 이메일이거나 유효성검증에서 탈락했다면 다시 입력
    setIsLoading(true);
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: enteredEmail,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        console.log(res.json());
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.whiteBox}>
      <form onSubmit={submitHandler}>
        <img className={classes.logoSmall} src={Logo} alt="logo-small" />
        <br />
        <input
          className={classes.inputText}
          type="email"
          required
          placeholder="이메일"
          ref={emailInputRef}
        />
        <br />
        <input type="submit" value="비밀번호 찾기" />
        <br />
      </form>
      <Button onClick={() => navigate("/login")}>홈으로</Button>
    </div>
  );
};

export default FindPwd;
