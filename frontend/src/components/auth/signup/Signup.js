import { useState, useRef } from "react";
import axios from "axios";

// import { createslice, createAsyncThunk} from "@reduxjs/toolkit";

// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import classes from "./Signup.module.css";
// import Button from "../../UI/Button";
// import { ValidatorForm, TextValidator} from "react-material-ui-form-validator";

// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;

// 회원가입 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const Signup = () => {
  const navigate = useNavigate();
  const [genderValue, setGenderValue] = useState("");

  // 중복검사해서 중복되지 않으면 true로 바꾸어 준다.
  // const [emailvalidator, setEmailvalidator] = useState(false);
  // const [nicknamevalidator, setNicknamevalidator] = useState(false);

  // 입력한 내용 확인
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordCheckInputRef = useRef();
  const nicknameInputRef = useRef();
  const phoneNumberInputRef = useRef();

  // api요청 보낼 때 응답 대기
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (e) => {
    setGenderValue(e.target.value);
    console.log(genderValue);
  };

  // 이메일 유효성 검사를 통과해야하고 중복검사를 반드시 실행해야 한다.
  // const checkEmailHandler = async () => {
  //   const checkEmail = emailInputRef.current.value;
  //   const response = await axios.get(
  //     `http://localhost:8080/api/check_email?email=${checkEmail}`
  //   );
  //   console.log(response);
  //   if (response.data === "중복X") {
  //     alert("사용 가능한 이메일입니다.");
  //     setEmailvalidator(true);
  //   } else {
  //     alert("이미 사용중인 이메일입니다.");
  //     emailInputRef.current.value = "";
  //   }
  // };
  const submitHandler = (event) => {
    event.preventDefault();

    // useRef 이용하여 입력 데이터 가져오기
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredNickname = nicknameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;

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
          // console.log(res)
          return res.json();
        } else {
          return res.json().then((data) => {
            // 오류 모달 띄워야 한다.
            let errorMessage = "다시 확인후 회원가입을 진행해주세요.";
            throw new Error(errorMessage);
          });
        }
      })
      .then(async (data) => {
        console.log(data, "hjjkkj");
        try {
          await axios.post(
            "http://localhost:8080/api/signup",
            {
              email: data.email,
              nickname: enteredNickname,
              gender: genderValue,
              phoneNumber: enteredPhoneNumber,
            },
            {
              headers: {
                Authorization: `Bearer ${data.idToken}`,
              },
            }
          );
          alert("성공적으로 회원가입이 완료되었습니다.");
          navigate("/login");
        } catch (err) {
          console.log(err);
        }
      })

      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <section className={classes.whiteBox}>
      <img className={classes.logoSmall} src={Logo} alt="small logo" />
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
          {/* <button onClick={checkEmailHandler}>중복확인</button> */}
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
        <div className={classes.control}>
          <label htmlFor="passwordcheck">비밀번호 확인</label>
          <input
            type="password"
            id="passwordcheck"
            required
            ref={passwordCheckInputRef}
          />
        </div>
        {/* 전화번호 */}
        <div className={classes.contorl}>
          <label htmlFor="phone">전화번호</label>
          <input type="tel" id="phone" ref={phoneNumberInputRef} />
        </div>
        {/* 닉네임 */}
        <div>
          <div className={classes.control}>
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" required ref={nicknameInputRef} />
          </div>
        </div>

        {/* 성별 확인 */}
        <div className={classes.gender}>
          <div>
            <label>
              <input
                type="radio"
                name="male"
                value="1"
                checked={genderValue === "1"}
                onChange={changeHandler}
              />
              남자
            </label>
          </div>
          <br />
          <div>
            <label>
              <input
                type="radio"
                name="female"
                value="0"
                checked={genderValue === "0"}
                onChange={changeHandler}
              />
              여자
            </label>
          </div>
        </div>
        {/* 회원가입 버튼 */}
        <div className={classes.actions}>
          {!isLoading && <button className={classes.toggle}>회원가입</button>}
          {isLoading && <p>잠시만 기다려 주세요...</p>}
        </div>
      </form>
    </section>
  );
};

export default Signup;
