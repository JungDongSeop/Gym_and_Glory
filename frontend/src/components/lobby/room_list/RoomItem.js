import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./RoomItem.scss";
import RestApi from "../../api/RestApi";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";

const APPLICATION_SERVER_URL = `${RestApi()}/`;

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

  const [open, setOpen] = useState(false);
  const [inputPassword, setInputPassword] = useState(undefined);
  const [visibility, setVisibility] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const enterRoom = () => {
    if (!props.room.isopened) {
      setOpen(true);
      return;
    }

    if (props.room.roomStatus !== "READY") {
      alert("게임 중인 방에는 들어갈 수 없습니다.");
      return;
    }

    axios
      .put(APPLICATION_SERVER_URL + "room/" + props.room.roomId)
      .then((response) => {
        navigate("/gameroom", {
          state: {
            roomId: props.room.roomId,
            roomTitle: props.room.title,
            teamTitle: props.room.teamName,
          },
        });
      })
      .catch((error) => {
        alert(error.response.data);
        // 일단은 새로고침으로 처리했는데 다시 axios 보낼지 어쩔지 고민해보기
        window.location.reload();
      });
  };

  const handleInputPasswordChange = (event) => {
    setInputPassword(event.target.value);
    console.log(inputPassword);
  };

  const handleVisibility = () => {
    setVisibility(!visibility);
  };

  const enterPrivate = () => {
    if (props.room.roomStatus !== "READY") {
      alert("게임 중인 방에는 들어갈 수 없습니다.");
      return;
    }

    if (inputPassword === props.room.roomPassword) {
      axios
        .put(APPLICATION_SERVER_URL + "room/" + props.room.roomId)
        .then((response) => {
          navigate("/gameroom", {
            state: {
              roomId: props.room.roomId,
              roomTitle: props.room.title,
              teamTitle: props.room.teamName,
              isHost: false,
            },
          });
        })
        .catch((error) => {
          alert(error.response.data);
          // 일단은 새로고침으로 처리했는데 다시 axios 보낼지 어쩔지 고민해보기
          window.location.reload();
        });
    } else {
      alert("비밀번호가 틀렸습니다!");
    }
    setOpen(false);
  };

  return (
    <div>
      <Wrapper onClick={enterRoom} className="card">
        <TitleWrapper>
          {props.room.isopened ? null : <LockOutlined />}
          {props.room.title}
        </TitleWrapper>
        <TeamWrapper>팀명 : {props.room.teamName}</TeamWrapper>
        <div>{props.room.peopleNum}/4</div>
        <div>{props.room.roomStatus}</div>
      </Wrapper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle
          style={{
            paddingTop: 16,
            paddingBottom: 16,
            paddingLeft: 60,
            paddingRight: 60,
          }}
        >
          비밀번호를 입력하세요
        </DialogTitle>
        <DialogContent>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={visibility ? "text" : "password"}
              required
              onChange={handleInputPasswordChange}
              style={{ marginLeft: 35, marginRight: 5 }}
            />

            {visibility ? (
              <VisibilityOff
                onClick={handleVisibility}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <Visibility
                onClick={handleVisibility}
                style={{ cursor: "pointer" }}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={enterPrivate}>제출</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomItem;
