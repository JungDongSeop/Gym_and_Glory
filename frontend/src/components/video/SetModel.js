import { useEffect } from "react";

const Setmodel = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js";

    const script2 = document.createElement("script");
    script2.src =
      "https://cdn.jsdelivr.net/npm/@teachablemachine/pose@0.8/dist/teachablemachine-pose.min.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  async function setmodel() {
    const modelURL = "../../squatModel/model.json";
    const metadataURL = "../../squatModel/metadata.json";
    const model = await tmPose.load(modelURL, metadataURL);

    console.log(model);
  }
  return (
    <div>
      <button onClick={setmodel}>click</button>
    </div>
  );
};

export default Setmodel;
