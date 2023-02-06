// import axios from "axios";
import React, { useRef, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";
import RestApi from "../../api/RestApi";

// 이후 와이어프레임에 맞춰 수정

// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// 비밀번호 변경 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const Update = () => {
  const navigate = useNavigate();

  const newPasswordInputRef = useRef();
  const newNicknameInputRef = useRef();
  const newTelNumberInputRef = useRef();

  const authCtx = useContext(AuthContext);

  // const [nickname, setNickname] = useState(authCtx.nickname);
  // const [isLoading, setIsLoading] = useState(false);

  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isValidPhone, setIsValidPhone] = useState(false);

  // 비밀번호 유효성 검사 및 제출

  const passwordCheck = (event) => {
    event.preventDefault();
    console.log(isValidPassword);
    const enteredNewPassword = newPasswordInputRef.current.value;
    // 유효성 검증 추가하기
    const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,25}$/;
    if (!re.test(enteredNewPassword)) {
      setIsValidPassword(false);
      alert("비밀번호 유효성 검사에 어긋남");
    } else {
      setIsValidPassword(true);
      // api 요청
      fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((err) => {
            let errorMessage = "실패";
            console.log(errorMessage);
          });
        }
      });
      alert("비밀번호 변경이 완료되었습니다. 다시 로그인 해주세요");
      authCtx.logout();
      navigate("/login");
    }
  };

  // 닉네임 중복 체크
  const nicknameCheck = (event) => {
    event.preventDefault();
    // console.log(authCtx.userSequence);
    //유효성 검사 추가

    const enteredNewNickname = newNicknameInputRef.current.value;
    // 존재하는 닉네임인지 중복체크 api
    // const response = await axios.get(`${RestApi()}api/check_nickname?nickname=${enteredNewNickname}`)

    fetch(`${RestApi()}/user/modify/nickname`, {
      method: "PUT",
      body: JSON.stringify({
        userSequence: authCtx.userSequence,
        nickName: enteredNewNickname,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      sessionStorage.setItem("nickname", enteredNewNickname);
      window.location.reload();

      alert("닉네임 변경이 완료되었습니다.");
    });
  };

  const telNumberChangeHandler = (event) => {
    event.preventDefault();

    const enteredNewTelNumber = newTelNumberInputRef;

    fetch(`${RestApi()}/user/modify/telNumber`, {
      method: "PUT",
      body: JSON.stringify({
        userSequence: authCtx.userSequence,
        telNumber: enteredNewTelNumber,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      sessionStorage.setItem("telNumber", enteredNewTelNumber);
      window.location.reload();
      alert("전화번호 변경이 완료되었습니다.");
    });
  };
  return (
    <main>
      <form onSubmit={passwordCheck}>
        <div>
          <label htmlFor="new-password">새 비밀번호</label>
          <input type="password" id="new-password" ref={newPasswordInputRef} />
          <input type="submit" value="비밀번호 변경" />
        </div>
      </form>
      <form onSubmit={nicknameCheck}>
        <div>
          <label htmlFor="new-nickname">새 닉네임</label>
          <input
            type="text"
            id="new-nickname"
            defaultValue={sessionStorage.getItem("nickname")}
            ref={newNicknameInputRef}
          />
          <input type="submit" value="닉네임 변경" />
        </div>
      </form>
      <form onSubmit={telNumberChangeHandler}>
        <div>
          <label htmlFor="new-tel-number">새 전화번호</label>
          <input
            type="text"
            id="new-tel-number"
            defaultValue={sessionStorage.getItem("telNumber")}
            ref={newTelNumberInputRef}
          />
          <input type="submit" value="전화번호 변경" />
        </div>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(Update, true);
