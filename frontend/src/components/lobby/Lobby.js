import classes from "./Lobby.module.css";
import RoomList from "./room_list/RoomList";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";

const Lobby = () => {
  return (
    <main className={classes.lobby}>
      {/* 방 검색 + 방 목록 */}
      <div>
        <form>
          <input type="text" placeholder="검색" />
          <button type="submit">검색</button>
        </form>

        <RoomList />
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(Lobby);
