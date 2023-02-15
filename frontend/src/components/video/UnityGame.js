import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./UnityGame.css";
import RestApi from "../api/RestApi";
import axios from "axios";

const UnityGame = forwardRef((props, ref) => {
  const { unityProvider, sendMessage, addEventListener, removeEventListener } =
    useUnityContext({
      loaderUrl: "unitybuild/build.loader.js",
      dataUrl: "unitybuild/build.data",
      frameworkUrl: "unitybuild/build.framework.js",
      codeUrl: "unitybuild/build.wasm",

      symbolsUrl: "unitybuild/build.symbols.json",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "DefaultCompany",
      productName: "3D_test",
      productVersion: "0.1",
    });

  const APPLICATION_SERVER_URL = `${RestApi()}/`;

  const teamRecord = {
    teamName: props.team,
    nickname: props.nicknames,
    time: 0,
  };
  const myRecord = {
    nickname: sessionStorage.getItem("nickname"),
    exercise: [],
    damage: 0,
  };
  let myDamage;
  // let clearTime;
  let myExercise = [];
  const [myNum, setMyNum] = useState(0);
  const [isconnect, setIsConnect] = useState(0);
  const [nameset, setNameset] = useState(0);
  // const [myExercise, setMyExercise] = useState([]);
  // const [clearTime, setClearTime] = useState(0);
  // const [myDamage, setMyDamage] = useState(0);

  function sendSignal(signal, num) {
    if (signal === "connectGamelobby") {
      sendMessage("GameManager", "GameStart");
    } else if (signal === "GameStart") {
      sendMessage("PhotonInit", "GameStart");
    } else if (signal === "attack") {
      console.log("공격 신호 받아서 유니티로 보낸다");
      console.log(myNum, num);
      sendMessage("Player" + myNum + "(Clone)", "Attack", num);
    } else if (signal === "sendReady") {
      console.log(num, "레디 신호", myNum);
      sendMessage("PhotonInit", "Ready", myNum);
    } else if (signal === "Heal") {
      console.log("힐");
      sendMessage("Player" + myNum + "(Clone)", "Heal");
    }
  }

  useImperativeHandle(ref, () => ({
    sendSignal,
  }));

  const handleNameSet = useCallback((name) => {
    setNameset(name);
  }, []);

  useEffect(() => {
    addEventListener("GameIn", setIsConnect);
    return () => {
      removeEventListener("GameIn", setIsConnect);
    };
  }, [addEventListener, removeEventListener, setIsConnect]);

  useEffect(() => {
    if (isconnect === 1) {
      let nick = sessionStorage.getItem("nickname");
      sendMessage("PhotonInit", "setUserInfo", nick);
    }
  }, [isconnect]);

  useEffect(() => {
    addEventListener("NameSet", handleNameSet);
    return () => {
      removeEventListener("NameSet", handleNameSet);
    };
  }, [addEventListener, removeEventListener, handleNameSet]);

  useEffect(() => {
    if (nameset === 1) {
      sendMessage("PhotonInit", "JoinOrCreateRoom", props.sessionId);
    }
  }, [nameset]);

  const handleUserInfo = useCallback((num, nick) => {
    setMyNum(num);
    props.handleEnterDelay();
  }, []);

  useEffect(() => {
    addEventListener("UserInfo", handleUserInfo);
    return () => {
      removeEventListener("UserInfo", handleUserInfo);
    };
  }, [addEventListener, removeEventListener, handleUserInfo]);

  const handleNextStage = useCallback(() => {
    props.handleMiddleState();
    setTimeout(() => {
      sendMessage("Player1(Clone)", "nextStage");
      props.handleMiddleState();
    }, 10000);
  });

  useEffect(() => {
    addEventListener("stageClear", handleNextStage);
    return () => {
      removeEventListener("stageClear", handleNextStage);
    };
  }, [addEventListener, removeEventListener, handleNextStage]);

  const handleClearTime = useCallback(
    (response) => {
      console.log(typeof response, response);
      teamRecord.time = response;
    },
    [teamRecord]
  );

  useEffect(() => {
    addEventListener("clearTime", handleClearTime);
    return () => {
      removeEventListener("clearTime", handleClearTime);
    };
  }, [addEventListener, removeEventListener, handleClearTime]);

  const handleUserExercise = useCallback(
    (num, type, cnt, damage) => {
      if (num === myNum) {
        // setMyExercise(myExercise.push(cnt));
        // setMyDamage(damage);
        myExercise.push(cnt);
        myDamage = damage;
      }
      myRecord.exercise = myExercise;
      myRecord.damage = myDamage;
      // console.log(myExercise);
      // console.log(cleartime);
    },
    [myNum, myRecord]
  );

  const handleGameEnd = useCallback(() => {
    setTimeout(() => {
      const mySession = props.session;
      mySession.signal({
        data: "게임이 종료되어 로비로 이동합니다.",
        to: [],
        type: "gameEnd",
      });
    }, 15000);

    if (myNum === 1 && teamRecord.time !== 0) {
      axios
        .post(APPLICATION_SERVER_URL + "game/teamlog", teamRecord)
        .then(() => {
          console.log("팀 로그 보내기");
        });
    }
    axios.post(APPLICATION_SERVER_URL + "game/userlog", myRecord).then(() => {
      console.log("개인 기록 보내기");
    });
  }, [myNum, myRecord, teamRecord]);

  useEffect(() => {
    addEventListener("GameEnd", handleGameEnd);
    return () => {
      removeEventListener("GameEnd", handleGameEnd);
    };
  }, [addEventListener, removeEventListener, handleGameEnd]);

  useEffect(() => {
    addEventListener("userHealthInfo", handleUserExercise);
    return () => {
      removeEventListener("userHealthInfo", handleUserExercise);
    };
  }, [addEventListener, removeEventListener, handleUserExercise]);

  return (
    <div>
      <Unity unityProvider={unityProvider} className="unityGame" />
    </div>
  );
});
export default UnityGame;
