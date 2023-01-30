import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  email: "",
  nickname: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialEmail = localStorage.getItem("email");
  const initialNickname = localStorage.getItem("nickname");

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [nickname, setNickname] = useState(initialNickname);

  // 로그인 여부 (토큰 여부)
  const userIsLoggedIn = !!token;

  const loginHandler = (token, email, nickname) => {
    // 로그인 할 때는 토큰을 인자로 받아 저장
    setToken(token);
    setEmail(email);
    setNickname(nickname);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
  };

  const logoutHandler = () => {
    setToken(null);
    setEmail("");
    setNickname("");

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
  };

  const contextValue = {
    token: token,
    email: email,
    nickname: nickname,
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
