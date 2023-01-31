import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  email: "",
  nickname: "",
  gender: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const initialNickname = localStorage.getItem("nickname");
  const initialGender = localStorage.getItem("gender");

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [nickname, setNickname] = useState(initialNickname);
  const [gender, setGender] = useState(initialGender);

  // 로그인 여부 (토큰 여부)
  const userIsLoggedIn = !!token;

  const loginHandler = (token, email, nickname, gender) => {
    // 로그인 할 때는 토큰을 인자로 받아 저장
    setToken(token);
    setEmail(email);
    setNickname(nickname);

    if (gender === 1) {
      gender = "남자";
    } else {
      gender = "여자";
    }
    setGender(gender);

    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("nickname", nickname);
    localStorage.setItem("gender", gender);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail("");
    setNickname("");
    setGender("");

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    localStorage.removeItem("gender");
  };

  const contextValue = {
    token: token,
    email: email,
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
