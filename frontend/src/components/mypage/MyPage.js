import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import ExerciseGrass from "./ExerciseGrass";
import ExerciseGraph from "./ExerciseGraph";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import defaultProfile from "../../assets/defaultProfile.png";
import classes from "./MyPage.module.css";
import RestApi from "../api/RestApi";
import toast, { Toaster } from "react-hot-toast";

const MyPage = () => {
  // 유저 정보 가져오기
  const authCtx = useContext(AuthContext);

  // 유저 정보 axios 요청
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`${RestApi()}/user/detail/${authCtx.userSequence}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [authCtx]);

  // 통계에서 운동 종류 구별
  const [exerciseType, setExerciseData] = useState(1);
  // 통계에서 x축 최소값 구별
  const [xAxisMin, setXAxisMin] = useState(7);
  // 통계에서 x축 단위 구별
  const [xUnit, setXUnit] = useState(1);

  // 프로필 사진 업로드 기능
  const [profileImage, setProfileImage] = useState(null);
  // 사진 선택 후 저장, 이후 새로고침
  const handleFileSelect = async (e) => {
    setProfileImage(e.target.files[0]);
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    console.log(formData);
    try {
      await axios
        .post(`${RestApi()}/file/user/${authCtx.userSequence}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          window.location.reload();
        });
    } catch (error) {
      // console.log(error.response.status, "sdfdf");
      if (error.response.status === 413) {
        // console.log("413");
        toast.error(
          "이미지 용량이 매우 커서 프로필 사진으로 등록할 수 없습니다."
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <main>
      <Toaster position="top-center" reverseOrder={false} />
      {user ? (
        <div className={classes.container}>
          <div className={classes.profileWrap}>
            {/* 유저 프로필 사진 */}
            <form>
              {profileImage ? (
                <img
                  className={classes.profile}
                  src={user.imagePath || defaultProfile}
                  alt="프로필"
                />
              ) : (
                <img
                  className={classes.profile}
                  src={user.imagePath || defaultProfile}
                  alt="프로필"
                />
              )}
              <div className={classes.filebox}>
                <label htmlFor="ex-file">프로필 변경</label>
                <input type="file" id="ex-file" onChange={handleFileSelect} />
              </div>
            </form>
            {/* 유저 레벨, 닉네임 */}
            <div className={classes.userInfo}>
              <div>
                <h3>Lv.{authCtx.exp ? parseInt(authCtx.exp / 10000) + 1 : 1}</h3>
              </div>
              <div className={classes.nicknameTag}>
                <h2>{authCtx.nickname}</h2>
              </div>
            </div>
          </div>

          {/* 잔디 */}
          <div className={classes.grassWrap}>
            <ExerciseGrass />
          </div>
          <br />

          {/* 운동 통계 */}
          <div className={classes.graphWrap}>
            <div className={classes.graphButtonWrap}>
              {/* 운동 종류 */}
              <div>
                <button
                  className={`${classes.graphButton} ${
                    exerciseType === 1 ? classes.checked : ""
                  }`}
                  onClick={() => setExerciseData(1)}
                >
                  스쿼트
                </button>
                <button
                  className={`${classes.graphButton} ${
                    exerciseType === 2 ? classes.checked : ""
                  }`}
                  onClick={() => setExerciseData(2)}
                >
                  버피
                </button>
                <button
                  className={`${classes.graphButton} ${
                    exerciseType === 3 ? classes.checked : ""
                  }`}
                  onClick={() => setExerciseData(3)}
                >
                  푸쉬업
                </button>
                <button
                  className={`${classes.graphButton} ${
                    exerciseType === 4 ? classes.checked : ""
                  }`}
                  onClick={() => setExerciseData(4)}
                >
                  점핑잭
                </button>
              </div>
              {/* 총 기간 */}
              <div>
                <button
                  className={`${classes.graphButton} ${
                    xAxisMin === 7 ? classes.checked : ""
                  }`}
                  onClick={() => {
                    if (xUnit !== 1) {
                      setXUnit(1);
                    }
                    setXAxisMin(7);
                  }}
                >
                  1주일
                </button>
                <button
                  className={`${classes.graphButton} ${
                    xAxisMin === 30 ? classes.checked : ""
                  }`}
                  onClick={() => {
                    if (xUnit === 30) {
                      setXUnit(7);
                    }
                    setXAxisMin(30);
                  }}
                >
                  1달
                </button>
                <button
                  className={`${classes.graphButton} ${
                    xAxisMin === 364 ? classes.checked : ""
                  }`}
                  onClick={() => setXAxisMin(364)}
                >
                  1년
                </button>
              </div>
            </div>
            {/* 운동 그래프 */}
            <ExerciseGraph
              exerciseKind={exerciseType}
              xAxisMin={xAxisMin}
              xUnit={xUnit}
            />
            {/* 단위 기간 */}
            <div className={classes.graphXAxisWrap}>
              <button
                className={`${classes.graphButton} ${
                  xUnit === 1 ? classes.checked : ""
                }`}
                onClick={() => setXUnit(1)}
              >
                일별
              </button>
              <button
                className={`${classes.graphButton} ${
                  xUnit === 7 ? classes.checked : ""
                }`}
                onClick={() => {
                  if (xAxisMin === 7) {
                    setXAxisMin(30);
                  }
                  setXUnit(7);
                }}
              >
                주별
              </button>
              <button
                className={`${classes.graphButton} ${
                  xUnit === 30 ? classes.checked : ""
                }`}
                onClick={() => {
                  setXAxisMin(364);
                  setXUnit(30);
                }}
              >
                월별
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage, true);
