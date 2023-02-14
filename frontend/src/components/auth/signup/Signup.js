import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import classes from "./Signup.module.scss";
import RestApi from "../../api/RestApi";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// const commonhttp = RestApi();
// 회원가입 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

const Signup = () => {
  const navigate = useNavigate();

  // 성별 디폴트 남자
  const [genderValue, setGenderValue] = useState("1");

  // 오류 메세지 저장
  // const [emailError, setEmailError] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  // const [confirmPasswordError, setConfirmPasswordError] = useState("");
  // const [nickNameError, setNickNameError] = useState("");
  // const [phoneError, setPhoneError] = useState("");

  // 이메일 중복 검사
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  // 닉네임 중복 검사
  const [isCheckedNickname, setIsCheckedNickname] = useState(false);

  // 닉네임 유효성 검사
  const [isValidNickname, setIsValidNickname] = useState(false);

  const nicknameChangeHandler = () => {
    setIsCheckedNickname(false);
    let nickLength = 0;
    let specialCheck = /[`~!@#$%^&*|\\;:?]/gi;
    // let nicknameValue = document.getElementById("nickname").value;
    let nicknameValue = nicknameInputRef.current.value;

    for (let i = 0; i < nicknameValue.length; i++) {
      const nick = nicknameValue.charAt(i);
      if (escape(nick).length > 4) {
        nickLength += 2;
      } else {
        nickLength += 1;
      }
    }
    if (
      nicknameValue.search(/\s/) !== -1 ||
      specialCheck.test(nicknameValue) ||
      // nicknameValue.length < 3 ||
      // nicknameValue.length > 15
      nickLength < 3 ||
      nickLength > 15
    ) {
      setIsValidNickname(false);
      // nicknameInputRef.current.style.borderBottom = "2px solid #8f1010";
    } else {
      setIsValidNickname(true);
      // nicknameInputRef.current.style.borderBottom = "2px solid #00bd10";
    }
  };
  // 이메일 유효성 검사
  const [isValidEmail, setIsValidEmail] = useState(false);

  const emailChangeHandler = (email) => {
    setIsCheckedEmail(false);
    const re =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{3}$/;

    if (!re.test(emailInputRef.current.value)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  // 비밀번호 유효성 검사
  const [isValidPassword, setIsValidPassword] = useState(false);

  const passwordChangeHandler = (event) => {
    event.preventDefault();
    const password = passwordInputRef.current.value;
    // let isVal = false;

    const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,25}$/;

    if (!re.test(password)) {
      // isVal = false;
      // setPasswordError(
      //   "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      // );
      setIsValidPassword(false);
      passwordInputRef.current.style.borderBottom = "2px solid #8f1010";
    } else {
      // isVal = true;
      // setPasswordError("");
      setIsValidPassword(true);
      passwordInputRef.current.style.borderBottom = "2px solid #00bd10";
    }

    // console.log(passwordInputRef.current.value);
    // console.log(event.target.value);

    // console.log(isValidPassword);
    // console.log(isVal);
  };

  // 비밀번호확인 일치 검사
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(false);

  const passwordConfirmCheckHandler = (event) => {
    event.preventDefault();
    const firstPassword = passwordInputRef.current.value;
    const secondPassword = passwordCheckInputRef.current.value;

    if (firstPassword !== secondPassword) {
      setIsValidConfirmPassword(false);
      // setConfirmPasswordError("비밀번호가 다릅니다!");
      passwordCheckInputRef.current.style.borderBottom = "2px solid #8f1010";
    } else {
      setIsValidConfirmPassword(true);
      passwordCheckInputRef.current.style.borderBottom = "2px solid #00bd10";

      // setConfirmPasswordError("");
    }

    // console.log(firstPassword);
    // console.log(isValidConfirmPassword);
  };

  // 전화번호 유효성검사
  const [isValidPhone, setIsValidPhone] = useState(false);

  const phoneCheckHandler = (event) => {
    const re = /^01(?:0|1|[6-9])(?:\d{4})\d{4}$/;
    console.log(re.test(phoneInputRef.current.value));
    if (re.test(phoneInputRef.current.value)) {
      setIsValidPhone(true);
      phoneInputRef.current.style.borderBottom = "2px solid #00bd10";
    } else {
      setIsValidPhone(false);
      phoneInputRef.current.style.borderBottom = "2px solid #8f1010";
    }
  };

  // 입력한 내용 확인
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordCheckInputRef = useRef();
  const nicknameInputRef = useRef();
  const phoneInputRef = useRef();

  // api요청 보낼 때 응답 대기
  const [isLoading, setIsLoading] = useState(false);

  // 성별 선택
  const genderChangeHandler = (e) => {
    setGenderValue(e.target.value);
    console.log(genderValue);
  };

  // 이메일 중복 검사
  const checkEmailHandler = async (e) => {
    e.preventDefault();
    // console.log(RestApi());
    const checkEmail = emailInputRef.current.value;
    const response = await axios.get(
      `${RestApi()}/check_email?email=${checkEmail}`
    );
    // console.log(response);

    if (emailInputRef.current.value === "") {
      toast.error("이메일을 입력해주세요");
    } else if (response.data === "중복X" && isValidEmail === true) {
      toast.success("사용 가능한 이메일입니다.");
      setIsCheckedEmail(true);
      emailInputRef.current.style.borderBottom = "2px solid #00bd10";
    } else {
      if (response.data === "중복O") {
        // alert("이미 사용중인 이메일입니다.");
        toast.error("이미 사용중인 이메일 입니다.");
      } else if (isValidEmail === false) {
        if (checkEmail.length === 0) {
          // alert("이메일을 입력해주세요!");
          toast.error("이메일을 입력해주세요");
        } else {
          // alert("이메일 형식이 올바르지 않습니다. 다시 확인후 입력해주세요.");
          toast.error(
            "이메일 형식이 올바르지 않습니다. \n 다시 확인후 입력해주세요."
          );
        }
      }
      setIsCheckedEmail(false);
      emailInputRef.current.value = "";
      emailInputRef.current.style.borderBottom = "2px solid #8f1010";
    }
  };

  // 닉네임 중복 검사
  const checkNicknameHandler = async (event) => {
    event.preventDefault();
    const nickname = nicknameInputRef.current.value;
    // console.log(nickname.type);
    const response = await axios.get(
      `${RestApi()}/check_nickname?nickname=${nickname}`
    );
    console.log(response);

    if (response.data === "중복X" && isValidNickname) {
      // alert("사용 가능한 닉네임입니다.");
      toast.success("사용 가능한 닉네임 입니다.");
      setIsCheckedNickname(true);
      nicknameInputRef.current.style.borderBottom = "2px solid #00bd10";
    } else if (response.data === "중복X" && !isValidNickname) {
      // console.log(isValidNickname, "2번째");
      console.log(response.data);
      // alert("사용할 수 없는 닉네임 입니다.");
      toast.error("사용할 수 없는 닉네임 입니다.");
      setIsCheckedNickname(false);
      nicknameInputRef.current.value = "";
      nicknameInputRef.current.style.borderBottom = "2px solid #8f1010";
    } else if (response.data === "중복O") {
      // alert("이미 사용중인 닉네임입니다.");
      toast.error("이미 사용중인 닉네임입니다.");
      setIsCheckedNickname(false);
      nicknameInputRef.current.value = "";
      nicknameInputRef.current.style.borderBottom = "2px solid #8f1010";
    }
  };

  const submitHandler = (event) => {
    if (!isCheckedEmail) {
      // alert("이메일 중복검사를 해주세요");
      toast.error("이메일 중복검사를 해주세요");
    } else if (!isCheckedNickname) {
      // alert("닉네임 중복검사를 해주세요");
      toast.error("닉네임 중복검사를 해주세요");
    } else if (!isValidPhone) {
      // alert("전화번호를 다시 확인해주세요");
      toast.error("전화번호를 다시 확인해주세요");
    } else {
      event.preventDefault();

      // useRef 이용하여 입력 데이터 가져오기
      const enteredEmail = emailInputRef.current.value;
      const enteredPassword = passwordInputRef.current.value;
      // const enteredPasswordCheck = passwordCheckInputRef.current.value;
      const enteredNickname = nicknameInputRef.current.value;
      const enteredPhone = phoneInputRef.current.value;

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
          // console.log(data, "hjjkkj");
          try {
            await axios.post(
              `${RestApi()}/signup`,
              {
                email: data.email,
                nickname: enteredNickname,
                gender: genderValue,
                telNumber: enteredPhone,
              },
              {
                headers: {
                  Authorization: `Bearer ${data.idToken}`,
                },
              }
            );
            // alert("성공적으로 회원가입이 완료되었습니다.");
            // toast.success("성공적으로 회원가입이 완료되었습니다");
            Swal.fire({
              title: "Success!",
              text: "성공적으로 회원가입이 완료되었습니다!",
              icon: "success",
              confirmButtonText: "확인",
            });
            navigate("/login");
          } catch (err) {
            console.log(err);
          }
        });

      // .catch((err) => {
      //   alert(err.message);
      // });
      // console.log(enteredPhone);
      // console.log(isCheckedNickname);
      // console.log(isCheckedEmail);
    }
  };
  return (
    <section className={classes.whiteBox}>
      <div>
        <Toaster
          toastOptions={{
            success: {
              style: {
                // background: "green",
                // color: "white",
              },
            },
            error: {
              style: {
                // background: "red",
              },
            },
          }}
          position="top-center"
          reverseOrder={false}
        />
      </div>
      <img
        className={classes.logoSmall}
        src={Logo}
        alt="small logo"
        onClick={() => navigate("/")}
      />
      <h1>회원가입</h1>
      <form onSubmit={submitHandler}>
        {/* 아이디 입력 */}
        <div className={classes.control}>
          <label htmlFor="email">아이디(email)</label>

          <input
            onChange={() => {
              setIsCheckedEmail(false);
              emailChangeHandler(emailInputRef.current.value);
              emailInputRef.current.style.borderBottom = "2px solid #8f1010";
            }}
            type="email"
            id="email"
            // required
            placeholder="example@example.com"
            ref={emailInputRef}
            autoComplete="off"
          />
          <button
            className={classes.authsmallbutton}
            onClick={checkEmailHandler}
          >
            중복확인
          </button>
        </div>
        {/* 1차 비밀번호 입력 */}
        {isCheckedEmail && (
          <div className={classes.control}>
            <label htmlFor="password">비밀번호(Password)</label>
            <input
              onChange={passwordChangeHandler}
              type="password"
              id="password"
              // required
              placeholder="영어+숫자+특수문자 8자리 이상"
              ref={passwordInputRef}
              autoComplete="off"
            />
          </div>
        )}
        {/* 2차 비밀번호 입력 */}
        {isValidPassword && (
          <div className={classes.control}>
            <label htmlFor="passwordcheck">비밀번호 확인</label>
            <input
              onChange={passwordConfirmCheckHandler}
              type="password"
              id="passwordcheck"
              // required
              ref={passwordCheckInputRef}
              autoComplete="off"
            />
          </div>
        )}

        {/* 닉네임 */}
        {isValidConfirmPassword && (
          <div>
            <div className={classes.control}>
              <label htmlFor="nickname">닉네임(Nickname)</label>

              <input
                onChange={() => {
                  setIsCheckedNickname(false);
                  nicknameChangeHandler(nicknameInputRef.current.value);
                  nicknameInputRef.current.style.borderBottom =
                    "2px solid #8f1010";
                }}
                type="text"
                // required
                ref={nicknameInputRef}
                autoComplete="off"
                id="nickname"
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     checkNicknameHandler();
                //   }
                // }}
              />
              <button
                className={classes.authsmallbutton}
                onClick={checkNicknameHandler}
                id="nickname"
              >
                중복확인
              </button>
            </div>
          </div>
        )}
        {/* 전화번호 */}
        {isCheckedNickname && (
          <div>
            <div className={classes.control}>
              <label htmlFor="phone">전화번호(Phone)</label>
              <input
                onChange={phoneCheckHandler}
                type="tel"
                id="phone"
                // required
                ref={phoneInputRef}
                autoComplete="off"
                placeholder="- 빼고 입력해주세요"
              />
            </div>
          </div>
        )}

        {/* 성별 확인 */}
        {isValidPhone && (
          <div className={classes.gender}>
            <div>
              <label className={classes.genderRadio}>
                <input
                  type="radio"
                  name="male"
                  value="1"
                  checked={genderValue === "1"}
                  onChange={genderChangeHandler}
                />
                남자
              </label>
              {/* </div>
          <br />
        <div> */}
              <label className={classes.genderRadio}>
                <input
                  type="radio"
                  name="female"
                  value="0"
                  checked={genderValue === "0"}
                  onChange={genderChangeHandler}
                />
                여자
              </label>
            </div>
          </div>
        )}
        {/* 회원가입 버튼 */}
        {isValidEmail &&
          isValidPassword &&
          isValidConfirmPassword &&
          isValidNickname &&
          isValidPhone && (
            <div className={classes.actions}>
              {!isLoading && (
                <button className={classes.toggle}>회원가입</button>
              )}
              {isLoading && <p>회원가입중....</p>}
            </div>
          )}
      </form>

      <span></span>
      <div className={classes.actions} onClick={() => navigate("/login")}>
        <button className={classes.toggle}>홈으로</button>
      </div>
    </section>
  );
};

export default Signup;
