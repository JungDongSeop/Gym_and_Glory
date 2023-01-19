import SideBar from "../UI/side_bar/SideBar";
import RoomList from "./room_list/RoomList";

const Lobby = () => {
  return (
    <div>
      <h1>
        로비 페이지. 게임방이 나타나는 화면입니다.
      </h1>
      {/* 사이드바 */}
      <SideBar/>

      {/* 방 검색 + 방 목록 */}
      <div>
        <form>
          <input type="text" placeholder="검색" />
          <button type="submit">검색</button>
        </form>
        
        <RoomList/>
      </div>



    </div>
  );
};

export default Lobby;
