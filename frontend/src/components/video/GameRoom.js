/* eslint-disable */
import React, { Component, createRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import UserVideoComponent from "./UserVideoComponent";
import UnityGame from "./UnityGame";
import Chats from "../chat/Chats";
import "./GameRoom.css";
import styled from "styled-components";
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
import toast, { Toaster } from "react-hot-toast";

const APPLICATION_SERVER_URL = `${RestApi()}/`;
const OPENVIDU_URL = "https://i8e107.p.ssafy.io:8443";
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const Wrapper = styled.div`
  padding: 0px 0px 0px 0px;
  min-height: 100vh;
  height: auto;
  width: 100%;
  background-color: #1e1d23;
  overflow-y: hidden;
`;

const NavWrapper = styled.div`
  height: 55px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  background: linear-gradient(#030719, #3a3a4e);
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

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 45px;
  position: absolute;
  bottom: 0;
  align-items: center;
  background: linear-gradient(#3a3a4e, #030719);
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
      readyCount: 0,
      readyStatus: false,
      gameStatus: false,
      middleState: false,
      nicknames: [sessionStorage.getItem("nickname")],
      exerciseNum: undefined,
      enterDelay: true,
      healLeft: 0,
      healRight: 0,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.handleChatMessageChange = this.handleChatMessageChange.bind(this);
    this.sendChatByClick = this.sendChatByClick.bind(this);
    this.sendChatByEnter = this.sendChatByEnter.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.loop = this.loop.bind(this);
    this.start = this.start.bind(this);
    this.init = this.init.bind(this);
    this.squatPredict = this.squatPredict.bind(this);
    this.burpeePredict = this.burpeePredict.bind(this);
    this.pushupPredict = this.pushupPredict.bind(this);
    this.jumpingjackPredict = this.jumpingjackPredict.bind(this);
    this.chattoggle = this.chattoggle.bind(this);
    this.handleAudioStatus = this.handleAudioStatus.bind(this);
    this.handleVideoStatus = this.handleVideoStatus.bind(this);
    this.handleSelectedExercise = this.handleSelectedExercise.bind(this);
    this.chatContainer = createRef(null);
    this.sendReady = this.sendReady.bind(this);
    this.sendGameStart = this.sendGameStart.bind(this);
    this.handleMiddleState = this.handleMiddleState.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
    this.handleEnterDelay = this.handleEnterDelay.bind(this);
    this.sendHeal = this.sendHeal.bind(this);
  }

  componentDidMount() {
    window.addEventListener("beforeunload", () => {
      this.componentWillUnmount();
    });
    const { location } = this.props;
    const { roomId, roomTitle, teamTitle, isHost } = location.state;
    const info = { roomId, roomTitle, teamTitle, isHost };
    if (location.state === null) {
      const { navigate } = this.props;
      console.log("로비로 이동");
      navigate("/lobby");
    }
    history.pushState(info, "", location.href);
    window.addEventListener("popstate", this.handleEvent);
    setTimeout(() => {
      const { roomId, roomTitle, teamTitle, isHost } = location.state;
      this.setState({
        mySessionId: roomId,
        myUserNick: sessionStorage.getItem("nickname"),
        mySessionTitle: roomTitle,
        myTeamTitle: teamTitle,
        ishost: isHost,
      });

      this.joinSession();
    }, 500);
    setTimeout(() => {
      this.state.myRef.current.sendSignal("connectGamelobby");
    }, 5000);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.handleEvent);
    window.location.reload();
    const mySession = this.state.session;
    if (this.state.ishost) {
      mySession.signal({
        data: "",
        to: [],
        type: "room-exploded",
      });
    }
    mySession.disconnect();
  }

  handleEvent() {
    const { location } = this.props;
    const { roomId, roomTitle, teamTitle, isHost } = location.state;
    const info = { roomId, roomTitle, teamTitle, isHost };
    history.pushState(info, "", location.href);
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
      data: `${this.state.myUserNick},${this.state.chat}`,
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
        data: `${this.state.myUserNick},${this.state.chat}`,
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
          const { navigate } = this.props;
          if (mySession) {
            mySession.disconnect();
          }
          axios
            .delete(
              APPLICATION_SERVER_URL + "room/" + this.state.mySessionId,
              {}
            )
            .then(() => {
              this.OV = null;
              this.setState({
                session: "",
                subscribers: [],
                mySessionId: "",
                mainStreamManager: undefined,
                publisher: undefined,
                ishost: false,
              });
            })
            .then(() => {
              navigate("/lobby", { state: "getOut" });
            });
        });
        mySession.on("signal:Ready", (event) => {
          let readydata = event.data.split(",");
          console.log(readydata[0], readydata[1]);
          if (this.state.ishost) {
            if (readydata[0] === "true") {
              console.log("닉네임 추가");
              let pushnick = [...this.state.nicknames, readydata[1]];
              this.setState(
                {
                  readyCount: this.state.readyCount + 1,
                  nicknames: pushnick,
                },
                () => {
                  console.log(this.state.readyCount, this.state.nicknames);
                }
              );
            } else {
              console.log("닉네임 제거");
              const filternicknames = this.state.nicknames.filter((nick) => {
                console.log(nick);
                if (nick === readydata[1]) {
                  console.log(nick);
                } else {
                  return nick;
                }
              });
              this.setState(
                {
                  readyCount: this.state.readyCount - 1,
                  nicknames: filternicknames,
                },
                () => {
                  console.log(this.state.readyCount, this.state.nicknames);
                }
              );
            }
          }
        });
        mySession.on("streamDestroyed", (event) => {
          this.deleteSubscriber(event.stream.streamManager);
        });
        mySession.on("signal:gameEnd", (event) => {
          const mySession = this.state.session;
          const { navigate } = this.props;
          if (mySession) {
            mySession.disconnect();
          }
          axios
            .delete(
              APPLICATION_SERVER_URL + "room/" + this.state.mySessionId,
              {}
            )
            .then(() => {
              this.OV = null;
              this.setState({
                session: "",
                subscribers: [],
                mySessionId: "",
                mainStreamManager: undefined,
                publisher: undefined,
                ishost: false,
              });
            })
            .then(() => {
              navigate("/lobby", { state: "gameEnd" });
            });
        });
        mySession.on("signal:room-exploded", (event) => {
          if (!this.state.ishost) {
            const mySession = this.state.session;
            const { navigate } = this.props;
            if (mySession) {
              mySession.disconnect();
            }
            axios
              .delete(
                APPLICATION_SERVER_URL + "room/" + this.state.mySessionId,
                {}
              )
              .then(() => {
                this.OV = null;
                this.setState({
                  session: "",
                  subscribers: [],
                  mySessionId: "",
                  mainStreamManager: undefined,
                  publisher: undefined,
                  ishost: false,
                });
              })
              .then(() => {
                navigate("/lobby", { state: "roomExploded" });
              });
          }
        });
        mySession.on("signal:readyCountDown", (e) => {
          if (this.state.ishost) {
            const filternicknames = this.state.nicknames.filter((nick) => {
              if (nick !== e.data) {
                return nick;
              }
            });
            this.setState(
              {
                readyCount: this.state.readyCount - 1,
                nicknames: filternicknames,
              },
              () => {
                console.log(this.state.readyCount, this.state.nicknames);
              }
            );
          }
        });
        mySession.on("signal:gameStart", (e) => {
          this.setState({ gameStatus: true, middleState: true }, () =>
            console.log(this.state.gameStatus)
          );
        });
        mySession.on("signal:middleState", (e) => {
          this.setState({ middleState: !this.state.middleState }, () =>
            console.log(this.state.middleState)
          );
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
    // teachable machine 작동 시작
    console.log(this.state.model);

    this.setState(
      {
        count: 0,
        status: "stand",
      },
      () => {
        this.init();
      }
    );
  }

  chattoggle() {
    this.setState({ chaton: !this.state.chaton });
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
    if (this.state.readyStatus) {
      mySession.signal({
        data: `${this.state.myUserNick}`,
        to: [],
        type: "readyCountDown",
      });
    }
    if (mySession) {
      mySession.disconnect();
    }
    const { navigate } = this.props;
    axios
      .delete(APPLICATION_SERVER_URL + "room/" + this.state.mySessionId, {})
      .then(() => {
        this.OV = null;
        this.setState(
          {
            session: "",
            subscribers: [],
            mySessionId: "",
            mainStreamManager: undefined,
            publisher: undefined,
            ishost: false,
            selectedExercise: undefined,
            readyStatus: false,
          },
          () => {
            navigate("/lobby");
          }
        );
      });
  }

  async handleSelectedExercise(exercise) {
    if (this.state.enterDelay) {
      toast.error("게임에 접속 중입니다");
      return;
    }
    if (this.state.loadingStatus === true) {
      return;
    }
    if (this.state.middleState) {
      toast.error("라운드 진행 중에는 선택한 운동을 바꿀 수 없습니다!");
      return;
    }
    if (!this.state.ishost && this.state.readyStatus) {
      if (!this.state.gameStatus) {
        toast.error(
          "준비 완료일때는\n선택한 운동을 바꿀 수 없습니다.\n준비 완료를 해제하고 다시 시도해주세요."
        );
        return;
      }
    }
    if (this.state.selectedExercise === exercise) {
      this.setState({ selectedExercise: undefined, exerciseNum: undefined });
    } else {
      this.setState({ selectedExercise: exercise, loadingStatus: true });
      if (exercise === "squat") {
        const URL = "https://teachablemachine.withgoogle.com/models/IUow9UHH-/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        this.setState(
          {
            model: await tmPose.load(modelURL, metadataURL),
            loadingStatus: false,
            exerciseNum: 1,
          },
          () => this.start()
        );
      } else if (exercise === "burpee") {
        const URL = "https://teachablemachine.withgoogle.com/models/8Nyxek_Pd/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        this.setState(
          {
            model: await tmPose.load(modelURL, metadataURL),
            loadingStatus: false,
            exerciseNum: 2,
          },
          () => this.start()
        );
      } else if (exercise === "pushup") {
        const URL = "https://teachablemachine.withgoogle.com/models/zEAN1WbX7/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        this.setState(
          {
            model: await tmPose.load(modelURL, metadataURL),
            loadingStatus: false,
            exerciseNum: 3,
          },
          () => this.start()
        );
      } else {
        // 점핑잭 모델    -> 수정될 수도 있음
        const URL = "https://teachablemachine.withgoogle.com/models/1BsYfE1Eo/";
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        this.setState(
          {
            model: await tmPose.load(modelURL, metadataURL),
            loadingStatus: false,
            exerciseNum: 4,
          },
          () => this.start()
        );
      }
    }
  }

  async init() {
    await this.state.webcam.setup();
    this.state.webcam.play();
    window.requestAnimationFrame(this.loop);
  }

  async loop() {
    this.state.webcam.update();
    if (this.state.exerciseNum === 1) {
      await this.squatPredict();
    } else if (this.state.exerciseNum === 2) {
      await this.burpeePredict();
    } else if (this.state.exerciseNum === 3) {
      await this.pushupPredict();
    } else if (this.state.exerciseNum === 4) {
      await this.jumpingjackPredict();
    }
    window.requestAnimationFrame(this.loop);
  }

  // prediction
  // 0 : stand, 1: squat, 2: heal_right, 3: heal_left, 4: heal_stand
  async squatPredict() {
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );

    const prediction = await this.state.model.predict(posenetOutput);
    console.log(prediction);
    if (prediction[0].probability.toFixed(2) >= 0.99) {
      if (this.state.status === "squat") {
        this.setState({ count: 1 });
      }
      this.setState({ status: "stand" });
    } else if (prediction[1].probability.toFixed(2) >= 0.99) {
      this.setState({ status: "squat" });
    } else if (prediction[2].probability.toFixed(2) >= 0.99) {
      this.setState({ healRight: 1 });
    } else if (prediction[3].probability.toFixed(2) >= 0.99) {
      this.setState({ healLeft: 1 });
    }

    if (this.state.count === 1) {
      await this.sendKey();
      this.setState({ count: 0 });
    }

    if (this.state.healLeft === 1 && this.state.healRight === 1) {
      await this.sendHeal();
      this.setState({ healLeft: 0, healRight: 0 });
    }
  }

  // 0: stand, 1: pushup, 2: heal_left, 3: heal_right
  async burpeePredict() {
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );

    const prediction = await this.state.model.predict(posenetOutput);
    console.log(prediction);
    if (prediction[0].probability.toFixed(2) >= 0.99) {
      if (this.state.status === "burpee") {
        this.setState({ count: 1 });
      }
      this.setState({ status: "stand" });
    } else if (prediction[1].probability.toFixed(2) >= 0.99) {
      this.setState({ status: "burpee" });
    } else if (prediction[2].probability.toFixed(2) >= 0.99) {
      this.setState({ healLeft: 1 });
    } else if (prediction[3].probability.toFixed(2) >= 0.99) {
      this.setState({ healRight: 1 });
    }

    if (this.state.count === 1) {
      await this.sendKey();
      this.setState({ count: 0 });
    }

    if (this.state.healLeft === 1 && this.state.healRight === 1) {
      await this.sendHeal();
      this.setState({ healLeft: 0, healRight: 0 });
    }
  }

  // 0: pushup, 1: pushdown, 3: heal_left, 4: heal_right
  async pushupPredict() {
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );

    const prediction = await this.state.model.predict(posenetOutput);
    console.log(prediction);
    if (prediction[0].probability.toFixed(2) >= 0.99) {
      if (this.state.status === "pushdown") {
        this.setState({ count: 1 });
      }
      this.setState({ status: "pushup" });
    } else if (prediction[1].probability.toFixed(2) >= 0.99) {
      this.setState({ status: "pushdown" });
    } else if (prediction[3].probability.toFixed(2) >= 0.99) {
      this.setState({ healLeft: 1 });
    } else if (prediction[4].probability.toFixed(2) >= 0.99) {
      this.setState({ healRight: 1 });
    }

    if (this.state.count === 1) {
      await this.sendKey();
      this.setState({ count: 0 });
    }

    if (this.state.healLeft === 1 && this.state.healRight === 1) {
      await this.sendHeal();
      this.setState({ healLeft: 0, healRight: 0 });
    }
  }

  // 0: jumpingjack_0, 1: jumpingjack_1, 2: jumpingjack_2, 4: heal_left, 5: heal_right
  async jumpingjackPredict() {
    const { pose, posenetOutput } = await this.state.model.estimatePose(
      this.state.webcam.canvas
    );

    const prediction = await this.state.model.predict(posenetOutput);
    console.log(prediction);
    if (prediction[0].probability.toFixed(2) >= 0.99) {
      if (this.state.status === "jumpingjack") {
        this.setState({ count: 1 });
      }
      this.setState({ status: "stand" });
    } else if (prediction[2].probability.toFixed(2) >= 0.99) {
      this.setState({ status: "jumpingjack" });
    } else if (prediction[4].probability.toFixed(2) >= 0.99) {
      this.setState({ healLeft: 1 });
    } else if (prediction[5].probability.toFixed(2) >= 0.99) {
      this.setState({ healRight: 1 });
    }

    if (this.state.count === 1) {
      await this.sendKey();
      this.setState({ count: 0 });
    }

    if (this.state.healLeft === 1 && this.state.healRight === 1) {
      await this.sendHeal();
      this.setState({ healLeft: 0, healRight: 0 });
    }
  }

  async sendHeal() {
    console.log("힐 신호 보내기");
    this.state.myRef.current.sendSignal("Heal");
  }

  async sendKey() {
    console.log("공격 신호 보낸다");
    this.state.myRef.current.sendSignal("attack", this.state.exerciseNum);
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

  sendReady() {
    if (!this.state.selectedExercise) {
      toast.error("어떤 운동을 할 지 선택해주세요!");
      return;
    }
    if (this.state.loadingStatus) {
      toast.error("운동 모델을 받아오는 도중에는 준비 완료를 할 수 없습니다.");
      return;
    }
    const mySession = this.state.session;
    this.state.myRef.current.sendSignal("sendReady");
    this.setState({ readyStatus: !this.state.readyStatus }, () => {
      mySession.signal({
        data: `${this.state.readyStatus},${this.state.myUserNick}`,
        to: [],
        type: "Ready",
      });
      if (this.state.readyStatus === true) {
        this.start();
      }
    });
  }

  sendGameStart() {
    if (!this.state.selectedExercise) {
      toast.error("어떤 운동을 할 지 선택해주세요!");
      return;
    }
    if (this.state.loadingStatus) {
      toast.error("운동 모델을 받아오는 도중에는 게임을 시작할 수 업습니다.");
      return;
    }
    axios
      .put(APPLICATION_SERVER_URL + "game", {
        sessionKey: this.state.mySessionId,
      })
      .then(() => {
        const mySession = this.state.session;
        mySession.signal({
          data: "",
          to: [],
          type: "gameStart",
        });
        this.start();
        this.state.myRef.current.sendSignal("GameStart");
      })
      .catch((error) => console.log(error));
  }

  handleMiddleState() {
    const mySession = this.state.session;
    mySession.signal({
      data: "",
      to: [],
      type: "middleState",
    });
    console.log("전부에게 중간 타임이라고 신호 보냄");
  }

  handleEnterDelay() {
    this.setState({ enterDelay: false });
  }

  render() {
    const chats = this.state.chats;

    return (
      <Wrapper>
        <Toaster />
        <NavWrapper>
          <HeadWrapper>
            <div className="titleBox">
              <p style={{ marginTop: 9 }}>{this.state.mySessionTitle}</p>
            </div>
            <div className="titleBox">
              <p style={{ marginTop: 9 }}>팀명 : {this.state.myTeamTitle}</p>
            </div>
            <div
              style={{ width: 270, justifyContent: "right", display: "flex" }}
            >
              <button className="leaveButton" onClick={this.leaveSession}>
                나가기
              </button>
            </div>
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
                    onClick={() => this.handleSelectedExercise("burpee")}
                    className={
                      this.state.selectedExercise === "burpee"
                        ? "button-active"
                        : "exercise-button"
                    }
                  >
                    <p className="exercise-text">
                      버피
                      {this.state.loadingStatus &&
                      this.state.selectedExercise === "burpee" ? (
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
                  nicknames={this.state.nicknames}
                  team={this.state.myTeamTitle}
                  handleMiddleState={this.handleMiddleState}
                  session={this.state.session}
                  handleEnterDelay={this.handleEnterDelay}
                />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {this.state.ishost &&
                    !this.state.gameStatus &&
                    this.state.readyCount === this.state.subscribers.length && (
                      <button
                        onClick={this.sendGameStart}
                        className="activeGameStart"
                        style={{ width: 210, height: 50 }}
                      >
                        GAME START
                      </button>
                    )}
                  {this.state.ishost &&
                    !this.state.gameStatus &&
                    this.state.readyCount !== this.state.subscribers.length && (
                      <button
                        className="inactiveGameStart"
                        style={{ width: 210, height: 50 }}
                      >
                        GAME START
                      </button>
                    )}
                  {!this.state.ishost &&
                    !this.state.readyStatus &&
                    !this.state.gameStatus && (
                      <button
                        onClick={this.sendReady}
                        className="Ready"
                        style={{ width: 210, height: 50 }}
                      >
                        준비 완료
                      </button>
                    )}
                  {!this.state.ishost &&
                    this.state.readyStatus &&
                    !this.state.gameStatus && (
                      <button
                        onClick={this.sendReady}
                        className="Ready"
                        style={{ width: 210, height: 50 }}
                      >
                        준비 취소
                      </button>
                    )}
                </div>
                {this.state.chaton ? (
                  <div className="chatbox">
                    {/* <div className="chatbox-header" /> */}
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
                sx={{ color: "#b1b8b0" }}
              />
            ) : (
              <VideocamOffOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.handleVideoStatus}
                className="hover-pointer"
                sx={{ color: "#b1b8b0" }}
              />
            )}
            {this.state.audiostate ? (
              <MicOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.handleAudioStatus}
                className="hover-pointer"
                sx={{ color: "#b1b8b0" }}
              />
            ) : (
              <MicOffOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.handleAudioStatus}
                className="hover-pointer"
                sx={{ color: "#b1b8b0" }}
              />
            )}
            {this.state.chaton ? (
              <ChatOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.chattoggle}
                className="hover-pointer"
                sx={{ color: "#b1b8b0" }}
              />
            ) : (
              <SpeakerNotesOffOutlined
                id="icon-margin"
                fontSize="large"
                onClick={this.chattoggle}
                className="hover-pointer"
                sx={{ color: "#b1b8b0" }}
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
