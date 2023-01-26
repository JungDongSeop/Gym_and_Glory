import React, { useRef, useContext } from "react";

import AuthContext from "../../../store/auth-context";
import WithNavBarAndSideBar from "../../layout/WithNavBarAndSideBar";

// 이후 와이어프레임에 맞춰 수정

// API_KEY
const API_KEY = `AIzaSyAxyqcEP1JpA7fbuUMKBEHeZ2TazbmlvF8`;
// 회원가입 api 주소
const URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

const Update = () => {
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
        idToken: authCtx.idToken,
        password: enteredNewPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {});
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="new-password">새 비밀번호</label>
        <input type="password" id="new-password" ref={newPasswordInputRef} />
      </div>
    </form>
    // <main>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Name:
    //       <input
    //         type="text"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </label>
    //     <br />
    //     <label>
    //       Email:
    //       <input
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </label>
    //     <br />
    //     <button type="submit">Save</button>
    //   </form>
    // </main>
  );
};

export default WithNavBarAndSideBar(Update, true);
