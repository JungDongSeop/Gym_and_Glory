/* eslint-disable */
import classes from "./Lobby.module.scss";
import RoomList from "./room_list/RoomList";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import Swal from "sweetalert";
// import RestApi from "../api/RestApi";

const Wrapper = styled.div`
  width: 100%;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
`;

const Lobby = () => {
  const location = useLocation();

  const handleEvent = () => {
    history.pushState(null, "", location.href);
  };

  useEffect(() => {
    if (location.state === "getOut") {
      alert("방장에 의해 강퇴당하셨습니다.");
    } else if (location.state === "roomExploded") {
      alert("방장이 방을 폭파시켜 로비로 이동했습니다");
    } else if (location.state === "gameEnd") {
      alert("게임이 종료되어 로비로 이동합니다.");
    }
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", handleEvent);
    return () => {
      window.removeEventListener("popstate", handleEvent);
    };
  }, []);

  return (
    <main>
      {/* 방 검색 + 방 목록 */}
      <Wrapper>
        <SearchWrapper>
          {/* <div className={classes.roomListText}> */}
          <span className={classes.roomListText}>방 목록</span>
          {/* </div> */}
        </SearchWrapper>
        <hr />
        <br />
        <div className={classes.roomListDiv}>
          <RoomList />
        </div>
      </Wrapper>
    </main>
  );
};

export default WithNavBarAndSideBar(Lobby);
