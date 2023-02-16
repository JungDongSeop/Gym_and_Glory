import React, { useContext, lazy, Suspense } from "react";
import AuthContext from "./store/auth-context";
import { Routes, Route } from "react-router-dom";
import Main from "./components/main/Main";
import "./App.css";

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
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Suspense fallback={<div></div>}>
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
          <Route path="*" element={<Main />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
