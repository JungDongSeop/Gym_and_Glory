import "./Lobby.css";
import RoomList from "./room_list/RoomList";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import styled from "styled-components";
import { Search, SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
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
  const [searchInput, setSearchInput] = useState("");

  return (
    <main>
      {/* 방 검색 + 방 목록 */}
      <Wrapper>
        <SearchWrapper>
          <span style={{ fontSize: 27 }}>방 목록</span>
          <div className="searchContainer">
            <input type="text" className="roomsearch" />
            <SearchOutlined fontSize="large" style={{ cursor: "pointer" }} />
          </div>
        </SearchWrapper>
        <hr />
        <br />
        <RoomList />
      </Wrapper>
    </main>
  );
};

export default WithNavBarAndSideBar(Lobby);
