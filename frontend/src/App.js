import React, { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import FindPwd from "./components/auth/find_pwd/FindPwd";
import UpdateUser from "./components/auth/update/Update";
import DeleteUser from "./components/auth/delete/Delete";
import Lobby from "./components/lobby/Lobby";
import MyPage from "./components/mypage/MyPage";
import Board from "./components/board/Board";
import Ranking from "./components/ranking/Ranking";
import CreateBoard from "./components/board/CreateBoard";
import DetailBoard from "./components/board/DetailBoard";
import UpdateBoard from "./components/board/UpdateBoard";
import ReportBoard from "./components/board/ReportBoard";
import ReportBoardDetail from "./components/board/ReportBoardDetail";
import ReportBoardCreate from "./components/board/ReportBoardCreate";

import "./App.css";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* 내비게이션 가드 설정 */}
        {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
        {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}
        {!authCtx.isLoggedIn && (
          <Route path="/find_pwd" element={<FindPwd />} />
        )}

        {authCtx.isLoggedIn && (
          <Route path="/update" element={<UpdateUser />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/delete" element={<DeleteUser />} />
        )}
        {authCtx.isLoggedIn && <Route path="/lobby" element={<Lobby />} />}
        {authCtx.isLoggedIn && <Route path="/mypage" element={<MyPage />} />}
        {authCtx.isLoggedIn && <Route path="/ranking" element={<Ranking />} />}
        {authCtx.isLoggedIn && (
          <Route path="/board/report" element={<ReportBoard />} />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/board/report/create" element={<ReportBoardCreate />} />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path="/board/report/:reportSequence"
            element={<ReportBoardDetail />}
          />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/board/:type/create" element={<CreateBoard />} />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path="/board/:type/update/:articleSequence"
            element={<UpdateBoard />}
          />
        )}
        {authCtx.isLoggedIn && (
          <Route
            path="/board/:type/:articleSequence"
            element={<DetailBoard />}
          />
        )}
        {authCtx.isLoggedIn && (
          <Route path="/board/:type" element={<Board />} />
        )}

        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/find-pwd" element={<FindPwd />} />
        <Route path="/update" element={<UpdateUser />} /> */}
        {/* <Route path="/delete" element={<DeleteUser />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/mypage/:username" element={<MyPage />} />
        <Route path="/board/:type" element={<Board />} />
        <Route path="/board/:type/create" element={<CreateBoard />} />
        <Route path="/board/:type/:articleSequence" element={<DetailBoard />} /> */}
      </Routes>
    </div>
  );
}

export default App;
