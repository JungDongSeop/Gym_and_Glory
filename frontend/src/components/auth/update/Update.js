// import axios from "axios";
import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../../store/auth-context";
import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";

// 이후 와이어프레임에 맞춰 수정

// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// 회원가입 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const Update = () => {
  const navigate = useNavigate();
  // const user = {
  //   name: "홍길동",
  //   age: 20,
  //   email: "nnheo@example.com",
  // };
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  // const [name, setName] = useState(user.name);
  // const [email, setEmail] = useState(user.email);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    // 유효성 검증 추가하기

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
  };

  return (
    <main>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="new-password">새 비밀번호</label>
          <input type="password" id="new-password" ref={newPasswordInputRef} />
          <input type="submit" />
        </div>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(Update, true);
