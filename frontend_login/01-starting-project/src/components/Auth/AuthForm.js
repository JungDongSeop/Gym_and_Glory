import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  // 요청을 보내기 시작할 때 로딩 상태가 참이 되도록 설정
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    // 로그인버튼인지 유무를 바꾸는 스위치
    setIsLogin((prevState) => !prevState);
  };
  const API_KEY = `
  AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
  const submitHandler = (event) => {
    // 요청을 직접 보낼것이기 때문에 preventDefault 설정
    event.preventDefault();

    // 입력 데이터 가져오기 위해 (useRef)훅 추가하여 email과 password 연결
    // 입력 데이터 가져오기
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // 유효성 검증 추가하기

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    }
    // 로그인 모드가 아닐때는 회원가입으로 POST 요청 보내기
    // fetch() 함수로 http 요청 보내기
    fetch(url, {
      method: "POST",
      // JSON 형식으로 보내야 하며 공식문서에 따르면 email과 password
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      // 응답이 끝나면 로딩중 false로 변경
      setIsLoading(false);
      if (res.ok) {
        // ...
      } else {
        return res.json().then((data) => {
          // show an error modal
          let errorMessage = "Authentication failed";
          // 만약 각각의 오류에 대한 errormessage를 다르게 표현하고 싶다면... 아래 코드
          // if (data && data.error && data.error.message) {
          //   errorMessage = data.error.messaga;
          // }
          throw new Error(errorMessage);
        });
      }
    })
    // 오류가 없을 시 then
    .then(data => {
      console.log(data);
    })
    // 오류 시 catch
    .catch(err => {
      alert(err.message + 'ㄹㄴㅇㄹㄴㅇ');
    })
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {/* Ref 연결하여 이메일과 패스워드 입력값 가져오기 */}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {/* 만약 로그인 모드라면 회원가입으로 가는 버튼이고 회원가입일때는 로그인으로 돌아가는 버튼 */}
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
