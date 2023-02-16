import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../../store/auth-context";
import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";
import RestApi from "../../api/RestApi";
import classes from "./Update.module.scss";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import FirebaseApi from "../../api/FirebaseApi";
// API_KEY
const API_KEY = `${FirebaseApi()}`;
// 비밀번호 변경 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const Update = () => {
  const navigate = useNavigate();

  const newPasswordInputRef = useRef();
  const newNicknameInputRef = useRef();
  const newTelNumberInputRef = useRef();

  const authCtx = useContext(AuthContext);

  // 비밀번호 유효성 검사 및 제출
  const passwordCheck = (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    // 유효성 검증 추가하기
    const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,25}$/;
    if (!re.test(enteredNewPassword)) {
      toast.error("영어 + 숫자 + 특수문자 8자리 이상 사용해주세요");
      newPasswordInputRef.current.value = "";
    } else {
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
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((err) => {
          });
        }
      });
      Swal.fire({
        title: "Success!",
        text: "비밀번호 변경이 완료되었습니다. 다시 로그인 해주세요",
        icon: "success",
        confirmButtonText: "확인",
      });
      authCtx.logout();
      navigate("/login");
    }
  };

  let nickVal = false;
  // 닉네임 중복 체크
  const nicknameCheck = async (event) => {
    event.preventDefault();

    const enteredNewNickname = newNicknameInputRef.current.value;
    let nickLength = 0;
    let specialCheck = /[`~!@#$%^&*|\\;:?]/gi;
    let nicknameValue = enteredNewNickname;

    for (let i = 0; i < nicknameValue.length; i++) {
      const nick = nicknameValue.charAt(i);
      if (escape(nick).length > 4) {
        // 만약 한글이면
        nickLength += 2;
      } else {
        // 영어면
        nickLength += 1;
      }
    }
    if (
      // 빈칸 포함 불가
      nicknameValue.search(/\s/) !== -1 ||
      // 특수문자 포함 불가
      specialCheck.test(nicknameValue) ||
      nickLength < 3 ||
      nickLength > 15
    ) {
      nickVal = false;
    } else {
      nickVal = true;
    }
    
    // 존재하는 닉네임인지 중복체크 api
    const response = await axios.get(
      `${RestApi()}/check_nickname?nickname=${enteredNewNickname}`
    );

    // 유효하지 않은 닉네임이면 바로 다시입력하세요 반환
    if (!nickVal) {
      toast.error("사용할 수 없는 닉네임입니다.");
      newNicknameInputRef.current.value = "";
    }
    // 유효하지만 중복된 닉네임이면
    else if (nickVal && response.data === "중복O") {
      toast.error("이미 사용중인 닉네임 입니다.");
    } else {
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
        sessionStorage.setItem("nickname", enteredNewNickname);
        window.location.reload();

        toast.success("닉네임 변경이 완료되었습니다.");
      });
    }
  };

  const telNumberChangeHandler = (event) => {
    event.preventDefault();

    const enteredNewTelNumber = newTelNumberInputRef;
    // 유효성 검사
    const re = /^01(?:0|1|[6-9])(?:\d{4})\d{4}$/;
    if (!re.test(enteredNewTelNumber.current.value)) {
      toast.error("전화번호 형식이 맞지 않습니다.");
    } else {
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
        sessionStorage.setItem("telNumber", enteredNewTelNumber);
        window.location.reload();
        toast.success("전화번호 변경이 완료되었습니다.");
      });
    }
  };

  return (
    <main>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
            },
          },
        }}
        position="top-center"
        reverseOrder={false}
      />
      <div className={classes.myDiv}>
        <div className={classes.formDiv}>
          <h1> 회원정보 수정 </h1>
          <form onSubmit={passwordCheck}>
            <div>
              <label htmlFor="new-password">새 비밀번호</label>
              <input
                type="password"
                id="new-password"
                ref={newPasswordInputRef}
                placeholder=" "
              />
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
                placeholder=" "
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
                placeholder=" "
              />
              <input type="submit" value="전화번호 변경" />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(Update, true);
