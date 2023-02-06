import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userSequence: 0,
  email: "",
  nickname: "",
  gender: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = sessionStorage.getItem("token");
  const initialEmail = sessionStorage.getItem("email");
  const initialUserSequence = sessionStorage.getItem("userSequence");
  const initialNickname = sessionStorage.getItem("nickname");
  const initialGender = sessionStorage.getItem("gender");

  const [token, setToken] = useState(initialToken);
  const [userSequence, setUserSequence] = useState(initialUserSequence);
  const [email, setEmail] = useState(initialEmail);
  const [nickname, setNickname] = useState(initialNickname);
  const [gender, setGender] = useState(initialGender);

  // 로그인 여부 (토큰 여부)
  const userIsLoggedIn = !!token;

  const loginHandler = (token, userSequence, email, nickname, gender) => {
    // 로그인 할 때는 토큰을 인자로 받아 저장
    setToken(token);
    setUserSequence(userSequence);
    setEmail(email);
    setNickname(nickname);

    if (gender === 1) {
      gender = "남자";
    } else {
      gender = "여자";
    }
    setGender(gender);

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("userSequence", userSequence);
    sessionStorage.setItem("nickname", nickname);
    sessionStorage.setItem("gender", gender);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail("");
    setNickname("");
    setGender("");
    setUserSequence(0);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userSequence");
    sessionStorage.removeItem("nickname");
    sessionStorage.removeItem("gender");
  };

  const contextValue = {
    token: token,
    email: email,
    userSequence: userSequence,
    nickname: nickname,
    gender: gender,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  // 다른 컴포넌트가 위의 내용들을 사용할 수 있도록 감싼다.
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
