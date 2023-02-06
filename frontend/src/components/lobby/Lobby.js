import classes from "./Lobby.module.css";
import RoomList from "./room_list/RoomList";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import styled from "styled-components";
// import RestApi from "../api/RestApi";

const Wrapper = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Lobby = () => {
  return (
    <main className={classes.lobby}>
      {/* 방 검색 + 방 목록 */}
      <Wrapper>
        <SearchWrapper>
          <span>로비</span>
          <form>
            <input
              className={classes.searchBarArea}
              type="text"
              placeholder="검색"
            />
            <button type="submit">검색</button>
          </form>
        </SearchWrapper>
        <hr />
        <br />
        <RoomList />
      </Wrapper>
    </main>
  );
};

export default WithNavBarAndSideBar(Lobby);
