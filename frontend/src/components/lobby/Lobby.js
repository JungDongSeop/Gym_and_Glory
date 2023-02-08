import "./Lobby.css";
import RoomList from "./room_list/RoomList";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import swal from "sweetalert";
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
  const [inputText, setInputText] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (location.state === "getOut") {
      swal({
        text: "방장에 의해 강퇴당하셨습니다.",
        button: "확인",
        icon: "error",
      });
    } else if (location.state === "roomExploded") {
      swal({
        text: "방장이 방을 폭파시켜 로비로 이동했습니다.",
        button: "확인",
        icon: "error",
      });
    }
  }, []);

  const handleInputText = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      console.log("바꿈");
      setSearchInput(inputText);
    }
  };

  const handleClick = () => {
    setSearchInput(inputText);
  };

  return (
    <main>
      {/* 방 검색 + 방 목록 */}
      <Wrapper>
        <SearchWrapper>
          <span style={{ fontSize: 27 }}>방 목록</span>
          <div className="searchContainer">
            <input
              type="text"
              className="roomsearch"
              onKeyUp={handleKeyPress}
              onChange={handleInputText}
              value={inputText}
            />
            <SearchOutlined
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={handleClick}
            />
          </div>
        </SearchWrapper>
        <hr />
        <br />
        <RoomList searchText={searchInput} />
      </Wrapper>
    </main>
  );
};

export default WithNavBarAndSideBar(Lobby);
