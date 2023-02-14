import React, { useContext, lazy, Suspense } from "react";
import AuthContext from "./store/auth-context";
import { Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import "./App.css";
// import Login from "./components/auth/login/Login";
// import Signup from "./components/auth/signup/Signup";
// import FindPwd from "./components/auth/find_pwd/FindPwd";
// import UpdateUser from "./components/auth/update/Update";
// import DeleteUser from "./components/auth/delete/Delete";
// import Lobby from "./components/lobby/Lobby";
// import MyPage from "./components/mypage/MyPage";
// import Board from "./components/board/Board";
// import Ranking from "./components/ranking/Ranking";
// import CreateBoard from "./components/board/CreateBoard";
// import DetailBoard from "./components/board/DetailBoard";
// import UpdateBoard from "./components/board/UpdateBoard";
// import ReportBoard from "./components/board/ReportBoard";
// import ReportBoardDetail from "./components/board/ReportBoardDetail";
// import ReportBoardCreate from "./components/board/ReportBoardCreate";
// import GameRoom from "./components/video/GameRoom";

const Login = lazy(() => import("./components/auth/login/Login"));
const Signup = lazy(() => import("./components/auth/signup/Signup"));
const FindPwd = lazy(() => import("./components/auth/find_pwd/FindPwd"));
const UpdateUser = lazy(() => import("./components/auth/update/Update"));
const DeleteUser = lazy(() => import("./components/auth/delete/Delete"));
const Lobby = lazy(() => import("./components/lobby/Lobby"));
const MyPage = lazy(() => import("./components/mypage/MyPage"));
const Board = lazy(() => import("./components/board/Board"));
const Ranking = lazy(() => import("./components/ranking/Ranking"));
const CreateBoard = lazy(() => import("./components/board/CreateBoard"));
const DetailBoard = lazy(() => import("./components/board/DetailBoard"));
const UpdateBoard = lazy(() => import("./components/board/UpdateBoard"));
const ReportBoard = lazy(() => import("./components/board/ReportBoard"));
const ReportBoardDetail = lazy(() =>
  import("./components/board/ReportBoardDetail")
);
const ReportBoardCreate = lazy(() =>
  import("./components/board/ReportBoardCreate")
);
const GameRoom = lazy(() => import("./components/video/GameRoom"));
const ChatRoom = lazy(() => import("./components/socket/ChatRoom"))

function App() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  return (
    <div>
      <Suspense fallback={<div>로딩 중... 이후 이곳에 컴포넌트 추가 가능</div>}>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* 내비게이션 가드 설정 */}
          {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
          {!authCtx.isLoggedIn && <Route path="/signup" element={<Signup />} />}
          {!authCtx.isLoggedIn && (
            <Route path="/find-pwd" element={<FindPwd />} />
          )}

          {authCtx.isLoggedIn && (
            <Route path="/update" element={<UpdateUser />} />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/delete" element={<DeleteUser />} />
          )}
          {authCtx.isLoggedIn && <Route path="/lobby" element={<Lobby />} />}
          {authCtx.isLoggedIn && <Route path="/mypage" element={<MyPage />} />}
          {authCtx.isLoggedIn && (
            <Route path="/ranking" element={<Ranking />} />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/gameroom" element={<GameRoom />} />
          )}
          {authCtx.isLoggedIn && (
            <Route path="/board/report" element={<ReportBoard />} />
          )}
          {authCtx.isLoggedIn && (
            <Route
              path="/board/report/create"
              element={<ReportBoardCreate />}
            />
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
          {authCtx.isLoggedIn && (
            <Route path="/chatroom" element={<ChatRoom />} />
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
      </Suspense>
    </div>
  );
}

export default App;
