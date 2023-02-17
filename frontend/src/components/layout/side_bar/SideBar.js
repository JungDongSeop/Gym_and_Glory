import BadgeModal from "./BadgeModal";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import SideWebcam from "./SideWebcam";
import CreateRoomModal from "./CreateRoomModal";
import FriendListModal from "./FriendListModal";
import Ranking from "./Ranking";
import Button from "../../UI/LobbyButton";
import classes from "./SideBar.module.css";
import { Link, useNavigate } from "react-router-dom";

// 사이드바는 로비, 게시판에 있을 경우 (유저프로필, 방 생성, 친구 목록, 랭킹) 이 표시되고,
//            마이페이지에 있을 경우 (유저 프로필 + 경험치 바, 뱃지 목록, 친구 목록, 회원정보 수정, 회원 탈퇴)가 표시된다.
const SideBar = (props) => {
  const navigate = useNavigate();

  const isMyPage = props.isMyPage;
  const authCtx = useContext(AuthContext);

  // 경험치바 만들기
  const expBarStyle = {
    width: `${(Number(authCtx.exp) % 10000) / 100}%`,
    height: "20px",
    backgroundColor: "yellow",
  };
  const expBarContainerStyle = {
    backgroundColor: "white",
    height: "20px",
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <aside>
      {/* 웹캠 */}
      <SideWebcam />
      {/* 유저 프로필 */}
      <div className={classes.userNickDiv}>
        <Link to="/mypage">
          <p>
            LV. {parseInt(authCtx.exp / 10000) + 1} {authCtx.nickname}
          </p>
        </Link>
        {/* 경험치 바 */}
      </div>
      <div style={expBarContainerStyle}>
        <div style={expBarStyle}></div>
        <div className={classes.exp}>
          <p style={{ margin: 0, marginRight: "5px" }}>
            {Number(authCtx.exp) % 10000} / 10000
          </p>
        </div>
      </div>

      {isMyPage ? (
        <div className={classes.container}>
          {/* 뱃지 모달 */}
          <BadgeModal />

          {/* 친구 목록 모달 */}
          <FriendListModal />

          {/* 회원정보 페이지로 이동 */}
          <Button onClick={() => navigate("/update")}>회원정보 수정</Button>

          {/* 회원 탈퇴 페이지로 이동 */}
          <Button onClick={() => navigate("/delete")}>회원 탈퇴</Button>
        </div>
      ) : (
        <div className={classes.container}>
          {/* 방 생성 모달 */}
          <CreateRoomModal />

          {/* 친구 목록 모달 */}
          <FriendListModal />

          {/* 실시간 랭킹 */}
          <Ranking />
        </div>
      )}
    </aside>
  );
};

export default SideBar;
