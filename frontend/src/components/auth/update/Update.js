// import axios from "axios";
import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import AuthContext from "../../../store/auth-context";
import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";

// 이후 와이어프레임에 맞춰 수정

// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// 비밀번호 변경 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const Update = () => {
  const navigate = useNavigate();

  const newPasswordInputRef = useRef();
  const newNicknameInputRef = useRef();

  const authCtx = useContext(AuthContext);

  // const [nickname, setNickname] = useState(authCtx.nickname);
  // const [isLoading, setIsLoading] = useState(false);

  // 비밀번호 유효성 검사 및 제출
  const passwordCheck = (event) => {
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

  // 닉네임 중복 체크
  const nicknameCheck = (event) => {
    event.preventDefault();
    console.log(authCtx.userSequence);
    //유효성 검사 추가

    const enteredNewNickname = newNicknameInputRef.current.value;

    fetch("http://localhost:8080/api/user/modify/nickname", {
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
      localStorage.setItem("nickname", enteredNewNickname);

      alert("닉네임 변경이 완료되었습니다.");
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
            defaultValue={localStorage.getItem("nickname")}
            ref={newNicknameInputRef}
          />
          <input type="submit" value="닉네임 변경" />
        </div>
      </form>
    </main>
  );
};

export default WithNavBarAndSideBar(Update, true);
