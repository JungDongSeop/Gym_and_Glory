/* eslint-disable */
import React, { Component, createRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import UserVideoComponent from "./UserVideoComponent";
import UnityGame from "./UnityGame";
import Chats from "../chat/Chats";
import "./GameRoom.css";
import $ from "jquery";
import styled from "styled-components";
import swal from "sweetalert";
import {
  ChatOutlined,
  SpeakerNotesOffOutlined,
  MicOffOutlined,
  MicOutlined,
  VideocamOffOutlined,
  VideocamOutlined,
  PersonOff,
} from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import RestApi from "../api/RestApi";

const APPLICATION_SERVER_URL = `${RestApi()}/`;
const OPENVIDU_URL = "https://i8e107.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const Wrapper = styled.div`
  padding: 0px 0px 0px 0px;
  min-height: 100vh;
  height: auto;
  width: 100%;
  background-color: black;
  overflow-y: hidden;
`;

const NavWrapper = styled.div`
  height: 55px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  background-color: grey;
`;

const HeadWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  align-items: center;
  margin: 0 2em 0 2em;
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const TitleWrapper = styled.div`
  display: flex;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 45px;
  position: absolute;
  bottom: 0;
  align-items: center;
  background-color: grey;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  align-items: center;
`;

class GameRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mySessionId: undefined,
      myUserNick: undefined,
      mySessionTitle: undefined,
      myTeamTitle: undefined,
      session: undefined,
      mainStreamManager: undefined,
      publisher: undefined,
      subscribers: [],
      status: "stand",
      count: 0,
      webcam: new tmPose.Webcam(600, 600, true),
      model: undefined,
      chats: [],
      chat: "",
      token: undefined,
      videostate: true,
      audiostate: false,
      ishost: false,
      chaton: false,
      myRef: createRef({}),
      selectedExercise: undefined,
      loadingStatus: false,
      roomLeave: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.sendChatByClick = this.sendChatByClick.bind(this);
    this.sendChatByEnter = this.sendChatByEnter.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.startButton = this.startButton.bind(this);
    this.loop = this.loop.bind(this);
    this.start = this.start.bind(this);
    this.init = this.init.bind(this);
    this.predict = this.predict.bind(this);
    this.chattoggle = this.chattoggle.bind(this);
    this.changemodel = this.changemodel.bind(this);
    this.handleAudioStatus = this.handleAudioStatus.bind(this);
    this.handleVideoStatus = this.handleVideoStatus.bind(this);
    this.handleSelectedExercise = this.handleSelectedExercise.bind(this);
    this.chatContainer = createRef(null);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      this.componentWillUnmount();
    });
    setTimeout(() => {
      const { location } = this.props;
      if (location.state === null) {
        const { navigate } = this.props;
        navigate("/lobby");
      }
      const { roomId, roomTitle, teamTitle, isHost } = location.state;
      this.setState({
        mySessionId: roomId,
        myUserNick: sessionStorage.getItem("nickname"),
        mySessionTitle: roomTitle,
        myTeamTitle: teamTitle,
        ishost: isHost,
      });

      this.setmodel();
      this.joinSession();
    }, 500);
    setTimeout(() => {
      this.state.myRef.current.sendSignal("connectGamelobby");
    }, 5000);
  }

  componentWillUnmount() {
    window.location.reload();
    if (!this.state.roomLeave) {
      this.leaveSession();
    }
  }

  componentDidUpdate(previousProps, previousState) {
    if (this.refs.chatoutput != null) {
      this.refs.chatoutput.scrollTop = this.refs.chatoutput.scrollHeight;
    }
  }

  handleChatMessageChange(e) {
    this.setState({
      chat: e.target.value,
    });
  }

  sendChatByClick() {
    if (this.state.chat === "") {
      return;
    }
    this.setState({
      chats: [
        ...this.state.chats,
        {
          userNick: this.state.myUserNick,
          text: this.state.chat,
          chatClass: "my-chat",
        },
      ],
    });
    const mySession = this.state.session;

    mySession.signal({
      data: `${this.state.myUserNick}, ${this.state.chat}`,
      to: [],
      type: "chat",
    });

    this.setState({
      chat: "",
    });
  }

  sendChatByEnter(e) {
    if (this.state.chat === "") {
      return;
    }
    if (e.key === "Enter") {
      this.setState({
        chats: [
          ...this.state.chats,
          {
            userNick: this.state.myUserNick,
            text: this.state.chat,
            chatClass: "my-chat",
          },
        ],
      });
      const mySession = this.state.session;

      mySession.signal({
        data: `${this.state.myUserNick}, ${this.state.chat}`,
        to: [],
        type: "chat",
      });

      this.setState({
        chat: "",
      });
    }
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({ subscribers });
    }
  }

  handleAudioStatus() {
    const changeAudioStatus = !this.state.audiostate;
    this.state.publisher.publishAudio(changeAudioStatus);
    this.setState({ audiostate: changeAudioStatus });
  }

  handleVideoStatus() {
    const changeVideoStatus = !this.state.videostate;
    this.state.publisher.publishVideo(changeVideoStatus);
    this.setState({ videostate: changeVideoStatus });
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        let mySession = this.state.session;
        mySession.on("streamCreated", (event) => {
          let subscriber = mySession.subscribe(event.stream, undefined);
          let subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          this.setState({
            subscribers: subscribers,
          });
        });
        mySession.on("signal:start", (event) => {
          this.start();
        });
        mySession.on("signal:chat", (event) => {
          let chatdata = event.data.split(",");
          if (chatdata[0] !== this.state.myUserNick) {
            this.setState({
              chats: [
                ...this.state.chats,
                {
                  userNick: chatdata[0],
                  text: chatdata[1],
                  chatClass: "your-chat",
                },
              ],
            });
            console.log("채팅 추가 됨?");
          }
        });
        mySession.on("signal:get-out", (event) => {
          const mySession = this.state.session;
          swal({
            text: "방장에 의해 강퇴당하셨습니다.\n확인 클릭 또는 5초 후에 로비로 이동합니다.",
            button: "확인",
            icon: "error",
          }).then(() => {
            this.leaveSession();
          });
        });
        mySession.on("streamDestroyed", (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on("signal:room-exploded", (event) => {
          const mySession = this.state.session;
          swal({
            text: "방장이 방을 나가 방이 폭파되었습니다.\n확인 클릭 시 로비로 이동합니다.",
            button: "확인",
            icon: "error",
          }).then(() => {
            this.leaveSession();
          });
        });
        mySession.on("exception", (exception) => {});

        this.getToken().then((token) => {
          mySession
            .connect(token, { clientData: this.state.myUserNick })
            .then(async () => {
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: false,
                publishVideo: true,
                resolution: "640x480",
                frameRate: 30,
                insertMode: "APPEND",
                mirror: false,
              });
              mySession.publish(publisher);
              this.setState({
                mainStreamManager: publisher,
                publisher,
              });
            });
        });
      }
    );
  }

  start() {
    console.log(this.state.model);
    setTimeout(() => {
      this.setState({
        count: 0,
        status: "stand",
      });
      this.init();
    }, 3000);
  }

  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
  }

  startButton() {
    let mySession = this.state.session;
    // axios 요청을 back으로 보낼지 말지
    // 참고용 자료에서는 back으로 게임 중이라는 상태를 보냈음
  }

  leaveSession() {
    const mySession = this.state.session;
    if (this.state.ishost) {
      mySession.signal({
        data: "",
        to: [],
        type: "room-exploded",
      });
    }
    if (mySession) {
      mySession.disconnect();
    }
    axios
      .delete(APPLICATION_SERVER_URL + "room/" + this.state.mySessionId, {})
      .then(() => {
        this.OV = null;
        this.setState({
          session: "",
          subscribers: [],
          mySessionId: "",
          mainStreamManager: undefined,
          publisher: undefined,
          roomLeave: true,
          ishost: false,
        });
      });

    const { navigate } = this.props;
    navigate("/lobby");
  }

  async setmodel() {
    // const URL = "https://teachablemachine.withgoogle.com/models/UQcyvhIye/";
    // 내가 학습시킨 간단한 스쿼트 모델
    // const modelURL =
    //   "https://teachablemachine.withgoogle.com/models/UQcyvhIye/model.json";
    // const metadataURL =
    //   "https://teachablemachine.withgoogle.com/models/UQcyvhIye/metadata.json";

    // 동섭이 학습데이터 바탕으로 제작한 모델
    const modelURL =
      "https://teachablemachine.withgoogle.com/models/M7lirMMFj/model.json";
    const metadataURL =
      "https://teachablemachine.withgoogle.com/models/M7lirMMFj/metadata.json";

    this.setState({
      model: await tmPose.load(modelURL, metadataURL),
    });

    // const a = await tmPose.load(metadataURL, modelURL);
    // console.log(a);
  }

  async changemodel() {
    const modelURL =
      "https://teachablemachine.withgoogle.com/models/UQcyvhIye/model.json";
    const metadataURL =
      "https://teachablemachine.withgoogle.com/models/UQcyvhIye/metadata.json";

    this.setState({
      model: await tmPose.load(modelURL, metadataURL),
    });
    console.log("바꼇다");
  }

  async handleSelectedExercise(exercise) {
    if (this.state.loadingStatus === true) {
      return;
    }
    if (this.state.selectedExercise === exercise) {
      this.setState({ selectedExercise: undefined });
    } else {
      this.setState({ selectedExercise: exercise, loadingStatus: true });
      if (exercise === "squat") {
        const modelURL =
          "https://teachablemachine.withgoogle.com/models/UQcyvhIye/model.json";
        const metadataURL =
          "https://teachablemachine.withgoogle.com/models/UQcyvhIye/metadata.json";
        this.setState({
          model: await tmPose.load(modelURL, metadataURL),
          loadingStatus: false,
        });
      } else if (exercise === "lunge") {
        setTimeout(() => this.setState({ loadingStatus: false }), 3000);
      } else if (exercise === "pushup") {
        setTimeout(() => this.setState({ loadingStatus: false }), 3000);
      } else {
        setTimeout(() => this.setState({ loadingStatus: false }), 3000);
      }
    }
  }

  async init() {
    // this.setState({ webcam: new tmPose.Webcam(size, size, flip) });
    await this.state.webcam.setup();
    console.log(this.state.webcam);
    this.state.webcam.play();
    window.requestAnimationFrame(this.loop);
  }

  async loop() {
    this.state.webcam.update();
    await this.predict();
    window.requestAnimationFrame(this.loop);
  }

  // prediction[0] is squat, prediction[1] is stand
  async predict() {
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );

    const prediction = await this.state.model.predict(posenetOutput);
    if (prediction[0].probability.toFixed(2) >= 0.9) {
      this.setState({ status: "stand" });
      if (this.state.status === "squat") {
        this.setState({ count: 1 });
        this.setState({ status: "stand" });
      }
    } else if (prediction[1].probability.toFixed(2) >= 0.9) {
      this.setState({ status: "squat" });
    }

    if (this.state.count === 1) {
      await this.sendKey();
      this.setState({ count: 0 });
    }
  }

  async sendKey() {
    console.log("공격 신호 보낸다");
    this.state.myRef.current.sendSignal();
  }

  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    return new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(`${OPENVIDU_URL}/openvidu/api/sessions`, data, {
          headers: {
            Authorization: `Basic ${btoa(
              `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
            )}`,
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "GET,POST",
          },
        })
        .then((response) => {
          resolve(response.data.id);
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 409) {
            resolve(sessionId);
          }
        });
    });
  }

  async createToken(sessionId) {
    console.log(sessionId);
    const response = await axios.post(
      `${OPENVIDU_URL}/openvidu/api/sessions/${sessionId}/connection`,
      {},
      {
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
        },
      }
    );
    return response.data.token;
  }

  render() {
    const chats = this.state.chats;
    // const myRef = useRef({})

    return (
      <Wrapper>
        <NavWrapper>
          <HeadWrapper>
            <TitleWrapper>
              <p className="p-margin">방제 : {this.state.mySessionTitle}</p>
              <p className="p-margin">팀명 : {this.state.myTeamTitle}</p>
              <p className="p-margin">방 ID : {this.state.mySessionId}</p>
            </TitleWrapper>
            <button onClick={this.leaveSession}>나가기</button>
          </HeadWrapper>
        </NavWrapper>
        <BodyWrapper>
          {this.state.session !== undefined ? (
            <div id="session">
              <div id="video-container1" className="video-container">
                {this.state.publisher !== undefined ? (
                  <div
                    className="stream-container"
                    onClick={() =>
                      this.handleMainVideoStream(this.state.publisher)
                    }
                  >
                    <UserVideoComponent
                      streamManager={this.state.publisher}
                      isHost={this.state.ishost}
                      currentSession={this.state.session}
                    />
                  </div>
                ) : (
                  <div className="none-container"></div>
                )}
                {this.state.subscribers[0] !== undefined ? (
                  <div
                    className="stream-container"
                    onClick={() =>
                      this.handleMainVideoStream(this.state.subscribers[0])
                    }
                  >
                    <UserVideoComponent
                      streamManager={this.state.subscribers[0]}
                      isHost={this.state.ishost}
                      currentSession={this.state.session}
                    />
                  </div>
                ) : (
                  <div className="none-container">
                    <PersonOff style={{ width: 280, height: 280 }} />
                  </div>
                )}
              </div>
              <div id="game-container">
                <div className="exercise-container">
                  <div
                    onClick={() => this.handleSelectedExercise("squat")}
                    className={
                      this.state.selectedExercise === "squat"
                        ? "button-active"
                        : "exercise-button"
                    }
                  >
                    <p className="exercise-text">
                      스쿼트
                      {this.state.loadingStatus &&
                      this.state.selectedExercise === "squat" ? (
                        <CircularProgress size={15} color="grey" />
                      ) : null}
                    </p>
                  </div>
                  <div
                    onClick={() => this.handleSelectedExercise("lunge")}
                    className={
                      this.state.selectedExercise === "lunge"
                        ? "button-active"
                        : "exercise-button"
                    }
                  >
                    <p className="exercise-text">
                      런지
                      {this.state.loadingStatus &&
                      this.state.selectedExercise === "lunge" ? (
                        <CircularProgress size={15} color="grey" />
                      ) : null}
                    </p>
                  </div>
                  <div
                    onClick={() => this.handleSelectedExercise("pushup")}
                    className={
                      this.state.selectedExercise === "pushup"
                        ? "button-active"
                        : "exercise-button"
                    }
                  >
                    <p className="exercise-text">
                      팔굽혀펴기
                      {this.state.loadingStatus &&
                      this.state.selectedExercise === "pushup" ? (
                        <CircularProgress size={15} color="grey" />
                      ) : null}
                    </p>
                  </div>
                  <div
                    onClick={() => this.handleSelectedExercise("jumpingjack")}
                    className={
                      this.state.selectedExercise === "jumpingjack"
                        ? "button-active"
                        : "exercise-button"
                    }
                  >
                    <p className="exercise-text">
                      점핑잭
                      {this.state.loadingStatus &&
                      this.state.selectedExercise === "jumpingjack" ? (
                        <CircularProgress size={15} color="grey" />
                      ) : null}
                    </p>
                  </div>
                </div>
                <UnityGame
                  ref={this.state.myRef}
                  sessionId={this.state.mySessionId}
                />
                {this.state.ishost ? (
                  <button>GAME START</button>
                ) : (
                  <button>READY</button>
                )}
                {this.state.chaton ? (
                  <div className="chatbox">
                    <div className="chatbox-header" />
                    <div className="chatbox-chats" ref="chatoutput">
                      <Chats chats={chats} />
                    </div>
                    <div className="chatbox-footer">
                      <input
                        type="text"
                        placeholder="채팅을 입력하세요"
                        onChange={this.handleChatMessageChange}
                        onKeyPress={this.sendChatByEnter}
                        value={this.state.chat}
                      />
                      <p
                        className="chatbox-button"
                        onClick={this.sendChatByClick}
                      >
                        Send
                      </p>
                    </div>
                  </div>
                ) : null}
              </div>
              <div id="video-container2" className="video-container">
                {this.state.subscribers[1] !== undefined ? (
                  <div
                    className="stream-container"
                    onClick={() =>
                      this.handleMainVideoStream(this.state.subscribers[1])
                    }
                  >
                    <UserVideoComponent
                      streamManager={this.state.subscribers[1]}
                      isHost={this.state.ishost}
                      currentSession={this.state.session}
                    />
                  </div>
                ) : (
                  <div className="none-container">
                    <PersonOff style={{ width: 280, height: 280 }} />
                  </div>
                )}
                {this.state.subscribers[2] !== undefined ? (
                  <div
                    className="stream-container"
                    onClick={() =>
                      this.handleMainVideoStream(this.state.subscribers[2])
                    }
                  >
                    <UserVideoComponent
                      streamManager={this.state.subscribers[2]}
                      isHost={this.state.ishost}
                      currentSession={this.state.session}
                    />
                  </div>
                ) : (
                  <div className="none-container">
                    <PersonOff style={{ width: 280, height: 280 }} />
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </BodyWrapper>
        <FooterWrapper>
          <Footer>
            {this.state.videostate ? (
              <VideocamOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.handleVideoStatus}
                className="hover-pointer"
              />
            ) : (
              <VideocamOffOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.handleVideoStatus}
                className="hover-pointer"
              />
            )}
            {this.state.audiostate ? (
              <MicOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.handleAudioStatus}
                className="hover-pointer"
              />
            ) : (
              <MicOffOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.handleAudioStatus}
                className="hover-pointer"
              />
            )}
            {this.state.chaton ? (
              <ChatOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.chattoggle}
                className="hover-pointer"
              />
            ) : (
              <SpeakerNotesOffOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.chattoggle}
                className="hover-pointer"
              />
            )}
          </Footer>
        </FooterWrapper>
      </Wrapper>
    );
  }
}

// export default GameRoom;

export default function (props) {
  const navigate = useNavigate();
  const location = useLocation();

  return <GameRoom {...props} navigate={navigate} location={location} />;
}
