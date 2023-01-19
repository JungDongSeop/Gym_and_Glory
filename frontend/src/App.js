import { Route, Routes } from "react-router-dom";
import Main from "./components/main/Main";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import MyPage from "./components/mypage/MyPage";
import Board from "./components/board/Board";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/mypage/:username" element={<MyPage />} />
      <Route path="/board" element={<Board />} />
    </Routes>
  );
}

export default App;
