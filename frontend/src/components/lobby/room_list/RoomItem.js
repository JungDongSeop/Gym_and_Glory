import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./RoomItem.scss";

const Wrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  margin-top: 5%;
  width: 100%;
  height: 25%;
  text-align: center;
  flex-wrap: wrap;
`;

const TeamWrapper = styled.div`
  justify-content: center;
  width: 80%;
  height: 15%;
  text-align: center;
  border: 1px solid white;
  border-radius: 25px;
  margin-right: auto;
  margin-left: auto;
`;

const RoomItem = (props) => {
  const navigate = useNavigate();

  const enterRoom = () => {
    // 비밀방의 경우 비밀번호 일치 여부를 확인하는 조건문 필요
    // 게임 중이거나 인원이 다 찼으면 못들어가게 해야함
    if (props.room.peopleNum === 4) {
      alert("방 인원이 다 찼습니다!");
      return;
    }

    navigate("/gameroom", { state: { roomId: props.room.roomId } });
  };

  return (
    <Wrapper onClick={enterRoom} className="card">
      <TitleWrapper>{props.room.title}</TitleWrapper>
      <TeamWrapper></TeamWrapper>
    </Wrapper>
  );
};

export default RoomItem;
