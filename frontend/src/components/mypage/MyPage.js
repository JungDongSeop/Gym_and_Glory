import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import ExerciseGrass from './ExerciseGrass';
import ExerciseGraph from './ExerciseGraph';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import classes from './MyPage.module.css';

const MyPage = () => {
  // redux에서 유저 정보 가져오기
  const user = useSelector((state) => state.user);

  // 통계에서 운동 종류 구별
  const [exerciseType, setExerciseData] = useState(1);
  // 통계에서 x축 최소값 구별
  const [xAxisMin, setXAxisMin] = useState(7); 
  // 통계에서 x축 단위 구별
  const [xUnit, setXUnit] = useState(1);

  const authCtx = useContext(AuthContext);

  return (
    <main>
      <h1>마이페이지 입니다.</h1>
      {user ? (
        <div>
          <h2>유저 pk : {authCtx.userSequence}</h2>
          <p>유저 닉네임 : {authCtx.nickname}</p>
          {/* 잔디 */}
          <div className={classes.grassWrap}>
            <ExerciseGrass /> 
          </div>
          {/* 운동 통계 */}
          <div className={classes.graphWrap}>
            <button onClick={() => setExerciseData(1)}>스쿼트</button>
            <button onClick={() => setExerciseData(2)}>푸쉬업</button>
            <button onClick={() => setExerciseData(3)}>버피</button>
            <br/>
            <button onClick={() => setXAxisMin(7)}>1주일</button>
            <button onClick={() => setXAxisMin(30)}>1달</button>
            <button onClick={() => setXAxisMin(365)}>1년</button>
            
            <br/>
            <button onClick={() => setXUnit(1)}>일별</button>
            <button onClick={() => setXUnit(7)}>주별</button>
            <button onClick={() => setXUnit(30)}>월별</button>
            
            <ExerciseGraph exerciseKind={exerciseType} xAxisMin={xAxisMin} xUnit={xUnit}/>
          </div>

        </div>
      ) : (
        <p>존재하지 않는 프로필입니다</p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage, true);
