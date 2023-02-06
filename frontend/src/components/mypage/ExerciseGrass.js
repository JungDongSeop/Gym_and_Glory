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
  // 잔디 출석 정보 계산
  useEffect(() => {
    axios.get(`${RestApi()}/exerciseLog/grace/${userSequence}`).then((res) => {
      // 1주일 관련한 함수 (주의 시작은 일요일, 최대 1년 전까지 표시, getWeek 함수는 1년 전을 기준으로 구하고자 하는 날이 몇 번째 주인지 판단.)
      const today = new Date();
      const fewDaysAgo = new Date(today.getTime() - 364 * 24 * 60 * 60 * 1000);
      // 과거 날짜를 0시0분0초로 지정
      fewDaysAgo.setHours(0, 0, 0, 0);
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
      let grass = Array.from({ length: 7 }, () => Array(53).fill(0));
      // 운동한 날짜는 1로 지정
      for (const d of tmp) {
        const date = new Date(d);
        grass[date.getDay()][getWeek(date) - 1] = 1;
      }
      // 1년의 범위 밖을 나타내는 상자는 표시하지 않기 위해, -1로 지정
      const startDay = today.getDay();
      for (let i = 0; i < startDay; i++) {
        grass[i][0] = -1;
      }
      for (let i = startDay + 1; i < 7; i++) {
        grass[i][52] = -1;
      }
      // attendanceData에 저장
      setAttendanceData(grass);
    });
  }, [userSequence]);

  // 잔디에 마우스 호버 시 날짜 출력
  // const [showDescription, setShowDescription] = useState(false);

  // 출력할 것들 표시
  const renderAttendance = () => {
    const date = new Date();
    date.setDate(date.getDate() - 365);
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return (
      <div>
        {attendanceData.map((row, i) => (
          <div key={i} className={classes.row} style={{ display: "flex" }}>
            <div className={`${classes.cell}  ${classes.days}`}>{days[i]}</div>
            {row.map((col, j) => (
              <div
                key={`${i}-${j}`}
                className={`${classes.cell} ${
                  col === 0
                    ? classes.no
                    : col === 1
                    ? classes.yes
                    : "transparent"
                }`}
                // onMouseEnter={() => setShowDescription([i, j])}
                // onMouseLeave={() => setShowDescription(false)}
              />
              // {showDescription === [i, j] && (
              //   <div
              //   className={classes.descriptionBox}
              //   style={{
              //     // 마우스 호버 시, 해당 그림의 우측 하단에 설명창 표시
              //     left: document.getElementById(`${i}-${j}`).getBoundingClientRect().right - 7,
              //     top: document.getElementById(`${i}-${j}`).getBoundingClientRect().bottom - 7,
              //   }}
              //   >
              //     설명
              //   </div>
              // )}
            ))}
          </div>
        ))}
      </div>
    );
  };

  return <div>{renderAttendance()}</div>;
};

export default ExerciseGrass;
