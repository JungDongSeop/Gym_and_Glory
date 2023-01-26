import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import classes from "./Signup.module.css";
import Button from "../../UI/Button";

// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// 회원가입 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const Signup = () => {
  const navigate = useNavigate();

  // 입력한 아이디 비밀번호값 확인
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  // const passwordCheckInputRef = useRef();
  // const nicknameInputRef = useRef();

  // api요청 보낼 때 응답 대기
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    // useRef 이용하여 입력 데이터 가져오기
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // 유효성 검증 추가 할 수 있음

    // 회원가입 api요청 보내기
    setIsLoading(true);

    fetch(URL, {
      method: "POST",
      // json 형태로 넘겨줘야하고 email과 아이디를 넘겨준다. 추후 닉네임, 성별도 추가 예정
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      // 응답이 성공적이라면
      .then((res) => {
        // 로딩상태 제거
        setIsLoading(false);
        if (res.ok) {
          // ...
          // console.log("회원가입 성공");
          return res.json();
        } else {
          return res.json().then((data) => {
            // 오류 모달 띄워야 한다.
            let errorMessage = "형식 오류입니다. 다시 작성하세요";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        alert("성공적으로 회원가입이 완료되었습니다.");
        navigate("/login");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.whiteBox}>
      <img className={classes.logoSmall} src={Logo} />
      <h1>회원가입</h1>
      <form onSubmit={submitHandler}>
        {/* 아이디 입력 */}
        <div className={classes.control}>
          <label htmlFor="email">아이디(email)</label>
          <input
            type="email"
            id="email"
            required
            placeholder="example@example.com"
            ref={emailInputRef}
          />
        </div>
        {/* 1차 비밀번호 입력 */}
        <div className={classes.control}>
          <label htmlFor="password">비밀번호(Password)</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {/* 2차 비밀번호 입력 */}
        {/* <div className={classes.control}>
          <label htmlFor="passwordcheck">비밀번호 확인</label>
          <input
            type="password"
            id="passwordcheck"
            required
            ref={passwordCheckInputRef}
          />
        </div> */}

        {/* 닉네임 */}
        {/* <div>
          <div className={classes.control}>
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" required ref={nicknameInputRef} />
          </div>
        </div> */}
        {/* 성별 확인 */}
        {/* <div className={classes.gender}>
          <div>
            <label for="male">남</label>
            <input type="radio" id="male" name="gender" value="male" />
          </div>
          <div>
            <label for="female">여</label>
            <input type="radio" id="female" name="gender" value="female" />
          </div>
        </div> */}
        {/* 회원가입 버튼 */}
        <div className={classes.actions}>
          {!isLoading && <button className={classes.toggle}>회원가입</button>}
          {isLoading && <p>잠시만 기다려 주세요...</p>}
        </div>
      </form>
    </section>
    // <div className={classes.whiteBox}>
    //   <img className={classes.logoSmall} src={Logo} alt="logo-small" />
    //   <br />
    //   <input
    //     className={classes.inputText}
    //     type="text"
    //     placeholder="아이디(e-mail)"
    //   />
    //   <br />
    //   <input
    //     className={classes.inputText}
    //     type="password"
    //     placeholder="비밀번호"
    //   />
    //   <br />
    //   <input
    //     className={classes.inputText}
    //     type="password"
    //     placeholder="비밀번호 확인"
    //   />
    //   <br />
    //   <input className={classes.inputText} type="text" placeholder="닉네임" />
    //   <br />
    //   <div class="gender-checkbox">
    //     <input type="radio" id="male" name="gender" value="male" />
    //     <label for="male">남</label>

    //     <input type="radio" id="female" name="gender" value="female" />
    //     <label for="female">여</label>
    //   </div>
    //   <Button onClick={() => navigate("/login")}>회원가입</Button>
    // </div>
  );
};

export default Signup;
