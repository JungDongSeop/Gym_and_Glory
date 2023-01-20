import { Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import FindPwd from "./components/auth/find_pwd/FindPwd";
import Lobby from "./components/lobby/Lobby";
import MyPage from "./components/mypage/MyPage";
import Board from "./components/board/Board";
import CreateBoard from "./components/board/CreateBoard";
import DetailBoard from "./components/board/DetailBoard";



import "./App.css";

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-pwd" element={<FindPwd />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/mypage/:username" element={<MyPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/board/create" element={<CreateBoard />} />
        <Route path="/board/:id" element={<DetailBoard />} />
      </Routes>
    </div>
  );
}

export default App;
