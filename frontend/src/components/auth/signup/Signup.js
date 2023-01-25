import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/logo.svg";
import classes from "./Signup.module.css";
import Button from "../../UI/Button";

const Signup = () => {
  const navigate = useNavigate();

  // 입력한 아이디 비밀번호값 확인
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const passwordCheckInputRef = useRef();
  const nicknameInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();

    // useRef 이용하여 입력 데이터 가져오기
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // 유효성 검증 추가 할 수 있음

    setIsLoading(true);
    // let url;
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
        <div className={classes.control}>
          <label htmlFor="passwordcheck">비밀번호 확인</label>
          <input
            type="password"
            id="passwordcheck"
            required
            ref={passwordCheckInputRef}
          />
        </div>
        {/* 닉네임 */}
        <div>
          <div className={classes.control}>
            <label htmlFor="nickname">닉네임</label>
            <input type="text" id="nickname" required ref={nicknameInputRef} />
          </div>
          {/* 중복확인 */}
          <div>
            <button>중복확인</button>
          </div>
        </div>
        {/* 성별 확인 */}
        <div className={classes.gender}>
          <div>
            <label for="male">남</label>
            <input type="radio" id="male" name="gender" value="male" />
          </div>
          <div>
            <label for="female">여</label>
            <input type="radio" id="female" name="gender" value="female" />
          </div>
        </div>
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
