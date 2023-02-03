import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "./UnityGame.css";

const UnityGame = forwardRef((props, ref) => {
  const { unityProvider, sendMessage, unload } = useUnityContext({
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

  function sendAttack() {
    console.log("공격 신호 받아서 유니티로 보낸다");
    sendMessage("Player1(Clone)", "Attack");
  }

  useImperativeHandle(ref, () => ({
    sendAttack,
  }));

  // const handleUnload = async () => {
  //   try {
  //     await unload();
  //     console.log("게임 종료");
  //   } catch (error) {
  //     console.log("에러났다");
  //   }
  // };

  return (
    <div>
      <Unity unityProvider={unityProvider} className="unityGame" />
    </div>
  );
});
export default UnityGame;
