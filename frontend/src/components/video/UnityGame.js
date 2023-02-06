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

  const [myNum, setMyNum] = useState(undefined);
  const [isconnect, setIsConnect] = useState(0);
  const [nameset, setNameset] = useState(0);

  function sendSignal(signal) {
    if (signal === "connectGamelobby") {
      sendMessage("GameManager", "GameStart");
      console.log("공격 신호 받아서 유니티로 보낸다");
    }
    // sendMessage("Player1(Clone)", "Attack");
  }

  useImperativeHandle(ref, () => ({
    sendSignal,
  }));

  // const handleGameIn = useCallback((isconnect) => {
  //   if (isconnect === 1) {
  //     setIsConnect(isconnect);
  //     let nick = sessionStorage.getItem("nickname");
  //     console.log(nick, "닉 보내냐", typeof nick);
  //     sendMessage("PhotonInit", "setUserInfo", nick);
  //   }
  // }, []);

  const handleNameSet = useCallback((nameset) => {
    console.log(nameset);
    setNameset(nameset);
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
    console.log(num, nick);
    setMyNum(num);
  }, []);

  useEffect(() => {
    addEventListener("UserInfo", handleUserInfo);
    return () => {
      removeEventListener("UserInfo", handleUserInfo);
    };
  }, [addEventListener, removeEventListener, handleUserInfo]);

  return (
    <div>
      <Unity unityProvider={unityProvider} className="unityGame" />
    </div>
  );
});
export default UnityGame;
