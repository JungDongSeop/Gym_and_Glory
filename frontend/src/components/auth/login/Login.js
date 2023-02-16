import { useState, useRef, useContext } from "react";
import axios from "axios";

import AuthContext from "../../../store/auth-context";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import classes from "./Login.module.scss";
import RestApi from "../../api/RestApi";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import toast, { Toaster } from "react-hot-toast";
// import { toast } from "react-toastify";
import FirebaseApi from "../../api/FirebaseApi";
// API_KEY
const API_KEY = `${FirebaseApi()}`;
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
    console.log(`${RestApi()}api/login`);

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
            let errorMessage = "아이디 혹은 비밀번호가 일치하지 않습니다.";
            // alert(errorMessage);
            // toast(errorMessage, {
            //   duration: 3000,
            //   position: "top-right",
            // });
            toast.error(errorMessage);
            console.log(data);
          });
        }
      })
      // 요청이 성공적으로 응답하면 (firebase에 정상적으로 로그인)
      .then(async (data) => {
        // console.log("데이터", data.idToken);
        try {
          const response = await axios.post(
            `${RestApi()}/login`,
            {
              email: data.email,
            },
            {
              headers: {
                Authorization: `Bearer ${data.idToken}`,
              },
            }
          );
          // console.log("리스폰스 객체", response);
          // console.log(response.data.email);
          authCtx.login(
            data.idToken,
            response.data.userSequence,
            response.data.email,
            response.data.nickname,
            response.data.telNumber,
            // response.data.level,
            response.data.imagePath,
            response.data.gender,
            response.data.role,
            response.data.exp
          );
          navigate("/");
          // console.log(authCtx);
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
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      {/* <h1 >{<<}</h1> */}
      <ArrowBackIosNewIcon
        className={classes.backbutton}
        onClick={() => navigate("/")}
        sx={{ fontSize: 50 }}
      />
      <img
        className={classes.logoSmall}
        src={Logo}
        alt="logo-small"
        onClick={() => {
          navigate("/");
        }}
      />
      <br />
      {/* 로그인 폼 */}
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              placeholder=" "
            />
            <p className={classes.labelText}>아이디 입력</p>
          </label>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
              placeholder=" "
            />
            <p className={classes.labelText}>비밀번호 입력</p>
          </label>
        </div>
        <div className={classes.loginBtnDiv}>
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
