import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  useCallback,
} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./UnityGame.css";

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

  const teamRecord = {
    title: props.team,
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

  function sendSignal(signal) {
    if (signal === "connectGamelobby") {
      sendMessage("GameManager", "GameStart");
    } else if (signal === "GameStart") {
      sendMessage("PhotonInit", "GameStart");
    } else if (signal === "attack") {
      console.log("공격 신호 받아서 유니티로 보낸다");
      sendMessage("Player" + myNum + "(Clone)", "Attack", 1);
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
      console.log("왜그러는데" + myNum);
      if (num === myNum) {
        // setMyExercise(myExercise.push(cnt));
        // setMyDamage(damage);
        myExercise.push(cnt);
        myDamage = damage;
      }
      console.log(num, type, cnt, myDamage);
      console.log(myNum, myExercise, teamRecord.time, myDamage);
      myRecord.exercise = myExercise;
      myRecord.damage = myDamage;
      // console.log(myExercise);
      // console.log(cleartime);
    },
    [myNum, myRecord]
  );

  const handleGameEnd = useCallback(() => {
    console.log(myNum);
    console.log(myRecord);
    console.log(teamRecord);
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
