import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  // 토큰 유무로 로그인 판단할 수 있지만 일단 만들어 놓음
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  // 로컬스토리지에 토큰이 있는지 판단
  // const initialToken = localStorage.getItem("token");

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token");
  };
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
