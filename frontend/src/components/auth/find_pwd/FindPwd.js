import { useRef, useState } from "react";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import classes from "./FindPwd.module.scss";
import axios from "axios";
import RestApi from "../../api/RestApi";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import FirebaseApi from "../../api/FirebaseApi";
// API_KEY
const API_KEY = `${FirebaseApi()}`;
// const API_KEY = process.env.REACT_APP_API_KEY;

const URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;
const FindPwd = () => {
  const navigate = useNavigate();

  // 요청 보낼 때 응답 대기
  const [isLoading, setIsLoading] = useState(false);
  const [ischecked, setIsChecked] = useState(false);

  // 비밀번호 재설정할 이메일 입력
  const emailInputRef = useRef();
  const phoneInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    // 입력 데이터 값 가져오기
    const enteredEmail = emailInputRef.current.value;
    const enteredPhone = phoneInputRef.current.value;
    // const enteredPhone = phoneInputRef.current.value;

    // 유효성 검증 추가

    // 가입한 이메일인지 확인하는 작업
    setIsLoading(true);
    // const response = await axios.post(`${RestApi()}/reset_pwd`);
    // console.log(response.data);
    fetch(`${RestApi()}/reset_pwd`, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        telNumber: enteredPhone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(async (data) => {
        console.log(data);

        if (data === true) {
          // 만약 가입안한 이메일이거나 유효성검증에서 탈락했다면 다시 입력
          console.log(isLoading);

          fetch(URL, {
            method: "POST",
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",
              email: enteredEmail,
            }),
            headers: {
              "Content-Type": "application/json",
              "x-firebase-locale": "ko",
            },
          })
            .then((res) => {
              setIsLoading(false);
              console.log(res.json());
              // alert(
              //   "확인 이메일을 발송하였습니다 확인후 비밀번호를 재설정해주세요"
              // );
              Swal.fire({
                title: "Success!",
                text: "확인 이메일을 발송하였습니다 확인 후 비밀번호를 재설정해주세요",
                icon: "success",
                confirmButtonText: "확인",
              });
              navigate("/login");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          // alert(
          //   "가입하지 않은 회원이거나 아이디 혹은 전화번호가 잘못되었습니다."
          // );
          toast.error(
            "가입하지 않은 회원이거나 아이디 혹은 전화번호가 잘못되었습니다."
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.whiteBox}>
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
      <img className={classes.logoSmall} src={Logo} alt="logo-small" />
      <p> 다시 참전하세요!</p>
      <form onSubmit={submitHandler}>
        <br />

        <label>
          <input
            className={classes.inputText}
            type="email"
            required
            placeholder=" "
            ref={emailInputRef}
          />

          <p className={classes.labelText}>email</p>
        </label>
        <br />
        <br />

        <label>
          <input
            className={classes.inputText}
            type="text"
            title="'-' 제외하고 입력해주세요"
            placeholder=" "
            required
            // placeholder=" "
            ref={phoneInputRef}
          />
          <p className={classes.labelText}>phone</p>
        </label>

        <br />
        <input
          className={classes.findBtn}
          type="submit"
          value="비밀번호 찾기"
        />
        <br />
        <span></span>
      </form>
      <Button onClick={() => navigate("/login")}>홈으로</Button>
    </div>
  );
};

export default FindPwd;
