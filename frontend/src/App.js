import { Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import FindPwd from "./components/auth/find_pwd/FindPwd";
import Lobby from "./components/lobby/Lobby";
import MyPage from "./components/mypage/MyPage";
import NoticeBoard from "./components/board/NoticeBoard";

import "./App.css";

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/find-pwd" element={<FindPwd />} />
      <Route path="/lobby" element={<Lobby />} />
      <Route path="/mypage/:username" element={<MyPage />} />
      <Route path="/board/notice" element={<NoticeBoard />} />
    </Routes>
  );
}

export default App;
