import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import styled from "styled-components";
import "./UserVideoComponent.css";
import AlarmImage from "../../assets/alarm.png";

const StreamComponent = styled.div`
  position: relative;
`;

const NickTag = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px;
  margin-left: 5px;
  border-radius: 10px;
`;

const Warning = styled.div`
  position: absolute;
  top: 25px;
  right: -80px;
  width: 100px;
  background-color: rgba(128, 128, 128, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const Img = styled.img`
  width: 20px;
  position: absolute;
  right: 0;

  &:hover {
    cursor: pointer;
  }
`;

class UserVideoComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      ishost: this.props.isHost,
      imgActive: true,
    };

    this.handleIsActive = this.handleIsActive.bind(this);
    this.handleForceDisconnect = this.handleForceDisconnect.bind(this);
  }

  getNicknameTag() {
    return JSON.parse(
      this.props.streamManager.stream.connection.data
    ).clientData;
    
  }

  handleIsActive() {
    this.setState({ isActive: !this.state.isActive });
  }

  handleForceDisconnect() {
    if (!this.state.ishost) {
      alert("방장만 강퇴시킬수 있습니다.");
      return;
    }
    const connection = this.props.streamManager.stream.connection;
    const currentSession = this.props.currentSession;
    // currentSession.forceDisconnect(stream);
    // console.log("밑에꺼 실행되나");
    currentSession.signal({
      to: [connection],
      type: "get-out",
    });
  }

  render() {
    const myNick = localStorage.getItem("nickname");
    const getNick = JSON.parse(
      this.props.streamManager.stream.connection.data
    ).clientData;

    return (
      <div className="video">
        {this.props.streamManager !== undefined ? (
          <StreamComponent>
            <OpenViduVideoComponent streamManager={this.props.streamManager} />
            <NickTag>{this.getNicknameTag()}</NickTag>
            <Img
              src={AlarmImage}
              className={myNick !== getNick ? "active" : "notActive"}
              alt="신고/강퇴 버튼"
              onClick={this.handleIsActive}
            />
            <Warning className={this.state.isActive ? "active" : "notActive"}>
              <ul>
                <li>신고하기</li>
                <li onClick={this.handleForceDisconnect}>강퇴</li>
              </ul>
            </Warning>
          </StreamComponent>
        ) : null}
      </div>
    );
  }
}

export default UserVideoComponent;
