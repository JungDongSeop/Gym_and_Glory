import CreateRoom from "./CreateRoom";
import FriendList from "./FriendList";
import { Link } from "react-router-dom";


const SideBar = () => {

  // 사이드바 안에는 1. 유저 프로필, 2. 방 생성, 3. 친구 목록, 4. 랭킹  이 표시됨
  return (
    <div>
      <p>
        로비 페이지의 사이드 바입니다.
      </p>

      {/* 유저 프로필 */}
      <p>
        유저의 정보가 표시됩니다.
        <Link to="/mypage/dongsum">LV.25 정동섬</Link>
      </p>

      {/* 방 생성 모달 */}
      <CreateRoom />

      {/* 친구 목록 모달 */}
      <FriendList />

      {/* 실시간 랭킹 */}
      
      


    </div>
  );
};

export default SideBar;
;
