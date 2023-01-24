import React from 'react';

const AuthContext = React.createContext({
  token: '',
  // 토큰이 있는지 여부로 로그인 여부를 판단할 수 있지만 일단 부울값으로 받아오겠음.
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},

})

const AuthcontextProvider = (props) => {
  return <AuthContext.Provider>
    {props.children}
  </AuthContext.Provider>
}