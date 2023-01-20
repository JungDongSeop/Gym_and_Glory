import SideBar from '../layout/side_bar/SideBar'
import classes from './Lobby.module.css'
import RoomList from "./room_list/RoomList";

const Lobby = () => {
  return (
    <div className={classes.lobby}>

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
