import React, { useState, useEffect } from "react";
// import { useSelector } from 'react-redux';
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";
import ExerciseGrass from "./ExerciseGrass";
import ExerciseGraph from "./ExerciseGraph";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import defaultProfile from "../../assets/defaultProfile.png";
import classes from "./MyPage.module.css";
import RestApi from "../api/RestApi";

const MyPage = () => {
  // 유저 정보 가져오기
  // const user = useSelector((state) => state.user);
  const authCtx = useContext(AuthContext);

  // 유저 정보 axios 요청
  const [user, setUser] = useState();
  useEffect(() => {
    axios
      .get(`${RestApi()}/user/detail/${authCtx.userSequence}`)
      .then((res) => {
        console.log("res", res.data);
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

  return (
    <main>
      {user ? (
        <div className={classes.container}>
          {/* 유저 프로필 사진 */}
          <img
            className={classes.profile}
            src={user.imagePath || defaultProfile}
            alt="프로필"
          />
          {/* <h2>유저 pk : {authCtx.userSequence}</h2> */}
          <p>
            Lv.{authCtx.level ? authCtx.level : 1}
            {authCtx.nickname}
          </p>
          {/* 잔디 */}
          <div className={classes.grassWrap}>
            <ExerciseGrass />
          </div>
          {/* 운동 통계 */}
          <div className={classes.graphWrap}>
            <div>
              <button onClick={() => setExerciseData(1)}>스쿼트</button>
              <button onClick={() => setExerciseData(2)}>푸쉬업</button>
              <button onClick={() => setExerciseData(3)}>버피</button>
            </div>
            <div>
              <button onClick={() => setXAxisMin(7)}>1주일</button>
              <button onClick={() => setXAxisMin(30)}>1달</button>
              <button onClick={() => setXAxisMin(364)}>1년</button>
            </div>

            <div>
              <button onClick={() => setXUnit(1)}>일별</button>
              <button onClick={() => setXUnit(7)}>주별</button>
              <button onClick={() => setXUnit(30)}>월별</button>
            </div>

            <ExerciseGraph
              exerciseKind={exerciseType}
              xAxisMin={xAxisMin}
              xUnit={xUnit}
            />
          </div>

          <ExerciseGraph
            exerciseKind={exerciseType}
            xAxisMin={xAxisMin}
            xUnit={xUnit}
          />
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다</p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage, true);
