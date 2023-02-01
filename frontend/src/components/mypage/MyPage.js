import { useSelector } from "react-redux";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";

const MyPage = () => {
  const user = useSelector((state) => state.user);

  const authCtx = useContext(AuthContext);

  return (
    <main>
      <h1>마이페이지 입니다.</h1>
      {user ? (
        <div>
          <h2>유저 pk : {authCtx.userSequence}</h2>
          <p>유저 닉네임 : {authCtx.nickname}</p>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다</p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage, true);
