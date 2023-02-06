import axios from "axios";
import React, { Component } from "react";
import RoomItem from "./RoomItem";
import { Grid } from "@mui/material";
import styled from "styled-components";
import RestApi from "../../api/RestApi";

const RoomContainer = styled.div`
  align-items: center;
`;

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    // 현재는 오픈비두 서버에 직접 요청을 보내 열려있는 방 정보를 들고 오지만
    // 추후 백에 요청을 보내어 현재 열려있는 방의 정보를 받아오기
    // 오픈비두에 직접 요청을 보내니 내가 커스텀한 방제와 팀명이 오지 않음
    // axios.get("https://i8e107.p.ssafy.io:8443/openvidu/api/sessions",)
    axios
      .get(`${RestApi()}/lobby`, {
        headers: {
          Authorization: `Basic ${btoa(`OPENVIDUAPP:MY_SECRET`)}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        const info = response.data.content.map((room) => {
          const title = room.title;
          const teamName = room.teamName;
          const peopleNum = room.count;
          const isopened = room.privateStatus;
          const roomPassword = room.password;
          const roomId = room.sessionKey;
          const roomStatus = room.roomStatus;

          return {
            title,
            teamName,
            peopleNum,
            isopened,
            roomPassword,
            roomId,
            roomStatus,
          };
        });
        console.log(info);
        this.setState({ rooms: info });
      });
  }

  render() {
    return (
      <RoomContainer>
        <Grid container spacing={6}>
          {this.state.rooms.map((room, i) => {
            return (
              <Grid
                item
                xs={3}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 40,
                  paddingLeft: 20,
                  paddingBottom: 20,
                  paddingRight: 20,
                }}
                key={i}
              >
                <RoomItem room={room}></RoomItem>
              </Grid>
            );
          })}
        </Grid>
      </RoomContainer>
    );
  }
}

export default RoomList;
