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
  const { unityProvider, sendMessage } = useUnityContext({
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

  const [isconnect, setIsConnect] = useState(false);

  function sendSignal(signal) {
    if (signal === "connectGamelobby") {
      sendMessage("GameManager", "GameStart");
    }
    console.log("공격 신호 받아서 유니티로 보낸다");
    // sendMessage("Player1(Clone)", "Attack");
  }

  useImperativeHandle(ref, () => ({
    sendSignal,
  }));

  // const handleGameIn = useCallback((isconnect) => {
  //   setIsConnect(isconnect);
  // }, []);

  // useEffect(() => {
  //   addEventListener("GameIn", handleGameIn);
  //   return () => {
  //     let nick = sessionStorage.getItem("nickname");
  //     sendMessage("PhotonInit", "setUserInfo", nick);
  //     removeEventListener("GameIn", handleGameIn);
  //   };
  // }, [addEventListener, removeEventListener, handleGameIn]);

  return (
    <div>
      <Unity unityProvider={unityProvider} className="unityGame" />
    </div>
  );
});
export default UnityGame;
