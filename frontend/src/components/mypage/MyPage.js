import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import ExerciseGraph from './ExerciseGraph';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import classes from './MyPage.module.css';


const MyPage = () => {
  // redux에서 유저 정보 가져오기
  const user = useSelector((state) => state.user);

  // 통계에서 운동 종류 구별
  const [exerciseType, setExerciseData] = useState(1);
  
  return (
    <main>
      <h1>마이페이지 입니다.</h1>
      {user ? (
        <div>
          <h2>유저 pk : {user.pk}</h2>
          <p>유저 닉네임 : {user.nickname}</p>
          {/* 운동 통계 */}
          <div className={classes.graphWrap}>
            <button onClick={() => setExerciseData(1)}>스쿼트</button>
            <button onClick={() => setExerciseData(2)}>푸쉬업</button>
            <button onClick={() => setExerciseData(3)}>버피</button>
            <ExerciseGraph exerciseKind={exerciseType} xAxisMin="7" xUnit="1"/>
          </div>
        </div>
      ) : (
        <p>존재하지 않는 프로필입니다</p>
      )}
    </main>
  );
};

export default WithNavBarAndSideBar(MyPage, true);
