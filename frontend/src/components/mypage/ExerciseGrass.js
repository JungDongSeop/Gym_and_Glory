import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import classes from "./ExerciseGrass.module.css";
import RestApi from "../api/RestApi";

const ExerciseGrass = () => {
  // user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 출석 정보 axsio 요청
  const [attendanceData, setAttendanceData] = useState([]);
  const [fewDaysAgo, setFewDaysAgo] = useState()
  // 잔디 출석 정보 계산
  useEffect(() => {
    axios.get(`${RestApi()}/exerciseLog/grace/${userSequence}`).then((res) => {
      // 1주일 관련한 함수 (주의 시작은 일요일, 최대 1년 전까지 표시, getWeek 함수는 1년 전을 기준으로 구하고자 하는 날이 몇 번째 주인지 판단.)
      const today = new Date();
      const fewDaysAgo = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000);
      // 과거 날짜를 0시0분0초로 지정
      fewDaysAgo.setHours(0,0,0,0)
      setFewDaysAgo(fewDaysAgo)
      // 일주일 관련한 함수
      function getWeek(date) {
        const firstDayOfWeek = getFirstDayOfWeek(fewDaysAgo);
        const week = Math.ceil(
          ((date - firstDayOfWeek) / 86400000 + firstDayOfWeek.getDay()) / 7
        );
        return week;
      }
      function getFirstDayOfWeek(date) {
        const day = date.getDay();
        const diff = date.getDate() - day;
        return new Date(date.setDate(diff));
      }

      const tmp = res.data;
      // 잔디를 채워나가기 (범위 밖은 -1, 운동 안 한 날은 0, 한 날은 1)
      let grass = Array.from({length: 53}, () => Array(7).fill(0))
      // 운동한 날짜는 1로 지정
      for (const d of tmp) { 
        const date = new Date(d)
        grass[getWeek(date)-1][date.getDay()] = 1;        
      }
      // 1년의 범위 밖을 나타내는 상자는 표시하지 않기 위해, -1로 지정
      const startDay = today.getDay();
      for (let i = 0; i < startDay; i++) {
        grass[0][i] = -1
      }
      for (let i = startDay + 1; i < 7; i++) {
        grass[52][i] = -1
      }
      // attendanceData에 저장
      setAttendanceData(grass);
    });
  }, [userSequence]);

  // 잔디에 마우스 호버 시 날짜 출력
  const [showDescription, setShowDescription] = useState(false);
  const showDescriptionElement = document.getElementById(`${showDescription.left}-${showDescription.top}`);
  // 잔디를 표시시킬 함수
  const renderAttendance = () => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    
    // 매달 1일인 날짜 구하기
    const date = new Date();
    date.setDate(date.getDate() - 365);
    // 매달 1일인 날짜 구하는 함수 (1월이면 년도를, 1월이 아니면 달을 return)
    const isFirstDayContain = (j) => {
      const today = new Date();
      const fewDaysAgo = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000);
      for (let i=0; i < 7; i++) {
        const ijDate = (new Date(fewDaysAgo.getTime() + (- fewDaysAgo.getDay() + i + 7 * j + 1)*24*60*60*1000))
        if (ijDate.getDate() === 2) {return ijDate.getMonth() === 0 ? ijDate.getFullYear() : `${ijDate.getMonth() + 1}월`}
      }
      return false;
    }

    return (
      <div className={classes.container}>
        {/* 요일 출력 */}
        <div >          
          <div className={`${classes.cellDays}`}>
            {days[0]}
          </div>
          <div className={`${classes.cellDays}`}>
            {days[1]}
          </div>
          <div className={`${classes.cellDays}`}>
            {days[2]}
          </div>
          <div className={`${classes.cellDays}`}>
            {days[3]}
          </div>
          <div className={`${classes.cellDays}`}>
            {days[4]}
          </div>
          <div className={`${classes.cellDays}`}>
            {days[5]}
          </div>
          <div className={`${classes.cellDays}`}>
            {days[6]}
          </div>
        </div>

        {/* 잔디 표시 */}
        {attendanceData.map((col, j) => (
          // 잔디 출력
          <div key={j} className={classes.col}>
            {col.map((row, i) => (
              <div
                key={`${i}-${j}`}
                id={`${i}-${j}`}
                className={`${row === -1 ? classes.cellNotHover : classes.cell} ${row === 0 ? classes.no : row === 1 ? classes.yes : 'transparent'}`}
                onMouseEnter={() => setShowDescription({left: i, top: j})}
                onMouseLeave={() => setShowDescription(false)}
              >
            </div>
            ))}
            {/* 월 출력 */}
            <div className={classes.xAxisMonth}>{isFirstDayContain(j)}</div>
          </div>
        ))}

        {/* 마우스 호버 시 날짜 표시 */}
        {showDescriptionElement && attendanceData[showDescription.left][showDescription.top] !== -1 ? (
          <div 
            className={classes.descriptionBox}
            style={{
              // 마우스 호버 시, 해당 그림의 우측 하단에 설명창 표시
              left: showDescriptionElement.getBoundingClientRect().right - showDescription.top * 2,
              top: showDescriptionElement.getBoundingClientRect().bottom,              
            }}
          >
            {/* 표시될 날짜 (이걸 위에 const로 정의하면, fewDaysAgo가 undefined일 때 getDay()를 해서 분기처리 해야함) */}
            {(new Date(fewDaysAgo.getTime() + (- fewDaysAgo.getDay() + showDescription.left + 7 * showDescription.top + 1)*24*60*60*1000)).toISOString().split('T')[0]}
          </div>
        ) : null }

      </div>
    );
  };

  // 쓸모없는 코드지만, 혹시나...
  // const grassDates = () => {
  //   const today = new Date();
  //   const fewDaysAgo = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000);
  //   const result = [];
  //   for (let j = 0; j < 53; j++) {
  //     for (let i=0; i < 7; i++) {
  //       const ijDate = (new Date(fewDaysAgo.getTime() + (- fewDaysAgo.getDay() + i + 7 * j + 1)*24*60*60*1000))
  //       // console.log('여기', ijDate)
  //       if (ijDate.getDate() === 2) {
  //         console.log(i, j, ijDate.getDate(), ijDate)
  //         // result.push(<div key={`${i}-${j}-dates`} className={classes.cellDays}>{ijDate.getMonth()}월</div>)
  //         result.push(
  //           <div 
  //             key={`${j}-target`} 
  //             className={classes.cellDays}
  //             style={{
  //               // // 마우스 호버 시, 해당 그림의 우측 하단에 설명창 표시
  //               left: (document.getElementById(`6-${j}`)? document.getElementById(`6-${j}`).getBoundingClientRect().right : null),
  //               top: (document.getElementById(`6-${j}`)? document.getElementById(`6-${j}`).getBoundingClientRect().bottom : null),
  //             }}
  //           >
  //             {ijDate.getMonth()}, {ijDate.getDate()}, {j}
  //           </div>)
  //         break
  //       }
  //     }
  //     // result.push(<div key={`${j}-nontarget`} className={classes.cell}></div>)
  //   } 
  //   return result;
  // }

  return (
    <div>
      {renderAttendance()}
    </div>
  )
};

export default ExerciseGrass;
