import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import styled from "styled-components";
import "./UserVideoComponent.css";
import AlarmImage from "../../assets/alarm.png";
import axios from "axios";
import RestApi from "../api/RestApi";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  DialogTitle,
} from "@mui/material";

const StreamComponent = styled.div`
  position: relative;
`;

const NickTag = styled.div`
  background-color: #080923;
  position: absolute;
  top: -10px;
  left: 5px;
  padding: 8px;
  margin-left: 5px;
  border-radius: 10px;
  color: white;
  box-shadow: inset 0px 2px 9px 0px rgb(91 91 175);
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
      dialogOpen: false,
      reportKind: "1",
      reportContent: "",
    };

    this.handleIsActive = this.handleIsActive.bind(this);
    this.handleForceDisconnect = this.handleForceDisconnect.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleKindChange = this.handleKindChange.bind(this);
    this.handleReportContent = this.handleReportContent.bind(this);
    this.sendReport = this.sendReport.bind(this);
  }

  getNicknameTag() {
    return JSON.parse(this.props.streamManager.stream.connection.data)
      .clientData;
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
    currentSession.signal({
      to: [connection],
      type: "get-out",
    });
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  handleKindChange(event) {
    this.setState({ reportKind: event.target.value }, () =>
      console.log(this.state.reportKind)
    );
  }

  handleReportContent(event) {
    this.setState({ reportContent: event.target.value }, () => {
      console.log(this.state.reportContent);
    });
  }

  sendReport() {
    const mysequence = sessionStorage.getItem("userSequence");
    const getNick = JSON.parse(
      this.props.streamManager.stream.connection.data
    ).clientData;

    axios.get(`${RestApi()}/user/getInfo/${getNick}`).then((res) => {
      // console.log(res.data.userSequence);
      axios
        .post(`${RestApi()}/report`, {
          sendSequence: mysequence,
          getSequence: res.data.userSequence,
          contents: this.state.reportContent,
          kind: this.state.reportKind,
        })
        .then(() => {
          toast.success("신고가 정상적으로 접수되었습니다.");
        })
        .catch(() => {
          toast.error("신고를 접수하지 못했습니다");
        });
    });
    this.handleDialogClose();
  }

  render() {
    const myNick = sessionStorage.getItem("nickname");
    const getNick = JSON.parse(
      this.props.streamManager.stream.connection.data
    ).clientData;

    return (
      <div className="video">
        <Toaster />
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
                <li onClick={this.handleDialogOpen}>신고하기</li>
                <li onClick={this.handleForceDisconnect}>강퇴</li>
              </ul>
            </Warning>
            <Dialog
              open={this.state.dialogOpen}
              onClose={this.handleDialogClose}
              maxWidth="xs"
              fullWidth="true"
            >
              <DialogTitle>신고하기</DialogTitle>
              <DialogContent style={{ paddingBottom: 0 }}>
                <label>
                  신고 종류 :
                  <select
                    value={this.state.reportKind}
                    onChange={this.handleKindChange}
                    style={{ marginLeft: 5 }}
                  >
                    <option value="1">욕설</option>
                    <option value="2">게임 불참</option>
                    <option value="3">성희롱</option>
                  </select>
                </label>
                <p>신고할 유저 : {this.getNicknameTag()}</p>
                <p>
                  신고 내용 :
                  <input
                    type="text"
                    value={this.state.reportContent}
                    onChange={this.handleReportContent}
                    placeholder="신고 내용을 입력하세요"
                    style={{ marginLeft: 5 }}
                  />
                </p>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.sendReport}>제출</Button>
              </DialogActions>
            </Dialog>
          </StreamComponent>
        ) : null}
      </div>
    );
  }
}

export default UserVideoComponent;
