import { useState, useRef, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import classes from "./Login.module.css";

// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// 회원가입 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const Login = () => {
  // Link 쓰기 위한 네비게이터
  const navigate = useNavigate();

  // 사용자 입력
  const emailInputRef = useRef(); //아이디 입력
  const passwordInputRef = useRef(); //비밀번호 입력

  // 토큰 저장 컨텍스트 불러오기
  const authCtx = useContext(AuthContext);

  // api요청 보낼 때 응답 대기
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    //입력 데이터 값 가져오기
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // 유효성 검사 (추가작업)

    // 로그인 api요청 보내기
    setIsLoading(true);
    fetch(URL, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // 응답이 왔다.
      .then((res) => {
        // 로그인 응답 로딩 false
        setIsLoading(false);
        if (res.ok) {
          // ...
          // console.log("로그인성공");
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "로그인 실패";
            alert(errorMessage);
          });
        }
      })
      // 요청이 성공적으로 응답하면 (firebase에 정상적으로 로그인)
      .then(async (data) => {
        console.log("데이터", data);
        try {
          const response = await axios.post(
            "http://localhost:8080/api/login",
            {
              email: data.email,
            },
            {
              headers: {
                Authorization: `Bearer ${data.idToken}`,
              },
            }
          );
          console.log("리스폰스 객체", response);
          authCtx.login(
            data.idToken,
            response.email,
            response.nickname,
            response.gender
          );
          navigate("/");
        } catch (err) {
          console.log(err);
        }

        // authCtx.login(data.idToken, data.email, data.displayName);
        // navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={classes.whiteBox}>
      <img className={classes.logoSmall} src={Logo} alt="logo-small" />
      <br />
      {/* 로그인 폼 */}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">아이디 입력</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">비밀번호 입력</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div>
          {!isLoading && (
            // <Button onClick={() => navigate("/lobby")}>로그인</Button>
            <Button>로그인</Button>
          )}
          {isLoading && <p>로그인중...</p>}
        </div>
      </form>
      <hr />
      <br />
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
      <br />
      <Button onClick={() => navigate("/find-pwd")}>비밀번호 찾기</Button>
    </div>
  );
};

export default Login;
