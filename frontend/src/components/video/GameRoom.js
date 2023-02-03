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
} from "@mui/icons-material";

const APPLICATION_SERVER_URL = "http://localhost:5000/";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const Wrapper = styled.div`
  padding: 0px 0px 0px 0px;
  min-height: 100vh;
  height: auto;
  width: 100%;
  background-color: black;
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
  width: 1535px;
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
  }

  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      const mySession = this.state.session;
      if (mySession) {
        mySession.disconnect();
      }
    });
    setTimeout(() => {
      const { location } = this.props;
      if (location.state === null) {
        const { navigate } = this.props;
        navigate("/lobby");
      }
      const { roomId, roomTitle, teamTitle } = location.state;
      this.setState({
        mySessionId: roomId,
        myUserNick: localStorage.getItem("nickname"),
        mySessionTitle: roomTitle,
        myTeamTitle: teamTitle,
      });

      this.setmodel();
      this.joinSession();
    }, 500);
  }

  componentWillUnmount() {
    window.location.reload();
    this.leaveSession();
    // const mySession = this.state.session;
    // if (mySession) {
    //   mySession.disconnect();
    // }
    // // back으로 axios요청을 보내 방 정보 갱신
    // // back에서는 현재 방 인원수가 1명일때 방 관리하는 곳에서 방을 삭제하고
    // // 1명보다 많을 때는 방의 인원수를 한명 줄인다.
    // this.OV = null;
    // this.setState({
    //   session: "",
    //   subscribers: [],
    //   mySessionId: "",
    //   mainStreamManager: undefined,
    //   publisher: undefined,
    // });
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
          }
        });
        mySession.on("signal:get-out", (event) => {
          const mySession = this.state.session;
          swal({
            text: "방장에 의해 강퇴당하셨습니다.\n확인 클릭 또는 5초 후에 로비로 이동합니다.",
            button: "확인",
            icon: "error",
          }).then(() => {
            if (mySession) {
              mySession.disconnect();
            }
            this.OV = null;
            this.setState({
              session: "",
              subscribers: [],
              mySessionId: "",
              mainStreamManager: undefined,
              publisher: undefined,
            });
            window.location.replace("/lobby");
          });
          setTimeout(() => {
            if (mySession) {
              mySession.disconnect();
            }
            this.OV = null;
            this.setState({
              session: "",
              subscribers: [],
              mySessionId: "",
              mainStreamManager: undefined,
              publisher: undefined,
            });
            window.location.replace("/lobby");
          }, 5000);
        });
        mySession.on("streamDestroyed", (event) => {
          this.updateHost().then((clientData) => {
            const host = JSON.parse(clientData).clientData;

            mySession
              .signal({
                data: host,
                to: [],
                type: "update-host",
              })
              .then(() => {});
          });
          console.log(event.stream.streamManager);
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on("signal:update-host", (event) => {
          if (this.state.myUserNick === event.data) {
            this.setState({ ishost: true });
          }
        });
        mySession.on("exception", (exception) => {});

        this.getToken().then((token) => {
          mySession
            .connect(token, { clientData: this.state.myUserNick })
            .then(async () => {
              this.updateHost().then((firstUser) => {
                const host = JSON.parse(firstUser).clientData;
                console.log(host, this.state.myUserNick);
                if (this.state.myUserNick === host) {
                  this.setState({ ishost: true });
                  console.log(this.state.ishost);
                }
              });
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
            })
            .then(() => console.log(this.state.ishost));
        });
      }
    );
  }

  updateHost() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: `${"https://i8e107.p.ssafy.io:8443/openvidu/api/sessions/"}${
          this.state.mySessionId
        }/connection`,
        headers: {
          Authorization: `Basic ${btoa(
            `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
          )}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
        },
        success: (response) => {
          let content = response.content;
          content.sort((a, b) => a.createAt - b.createdAt);
          console.log(content[0].clientData);

          resolve(content[0].clientData);
        },
        error: (error) => reject(error),
      });
    });
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
    if (mySession) {
      mySession.disconnect();
    }
    // back으로 axios요청을 보내 방 정보 갱신
    // back에서는 현재 방 인원수가 1명일때 방 관리하는 곳에서 방을 삭제하고
    // 1명보다 많을 때는 방의 인원수를 한명 줄인다.
    this.OV = null;
    this.setState({
      session: "",
      subscribers: [],
      mySessionId: "",
      mainStreamManager: undefined,
      publisher: undefined,
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
    this.state.myRef.current.sendAttack();
  }

  async getToken() {
    console.log(this.state.mySessionId);
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
        },
      }
    );
    console.log(response.data);
    return response.data;
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST",
        },
      }
    );
    return response.data;
  }

  render() {
    const chats = this.state.chats;
    // const myRef = useRef({})

    return (
      <Wrapper>
        <NavWrapper>
          <HeadWrapper>
            <img alt="로고 이미지" />
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
                  <div className="none-container"></div>
                )}
              </div>
              <div id="game-container">
                <button onClick={this.start}>start</button>
                <button onClick={this.changemodel}>모델 바꾸기</button>

                <UnityGame ref={this.state.myRef} />
                <div>
                  <Chats chats={chats} />
                </div>
                <input type="text" />
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
                  <div className="none-container"></div>
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
                  <div className="none-container"></div>
                )}
              </div>
            </div>
          ) : null}
        </BodyWrapper>
        <FooterWrapper>
          <Footer>
            {this.state.videostate ? (
              <VideocamOutlined id="icon-margin" />
            ) : (
              <VideocamOffOutlined id="icon-margin" />
            )}
            {this.state.audiostate ? (
              <MicOutlined id="icon-margin" />
            ) : (
              <MicOffOutlined id="icon-margin" />
            )}
            {this.state.chaton ? (
              <ChatOutlined id="icon-margin" />
            ) : (
              <SpeakerNotesOffOutlined id="icon-margin" />
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
