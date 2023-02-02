import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
// import { useSelector } from 'react-redux';
import axios from "axios";
import classes from './ExerciseGrass.module.css';

const ExerciseGrass = () => {
  // redux로 user 정보 가져오기
  // const userSequence = useSelector((state) => state.user.pk);
  const {userSequence} = useContext(AuthContext)

  // 출석 정보 axsio 요청
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/exerciseLog/list/${userSequence}/1`)
    .then(res => {
        console.log(res.data)
      setAttendanceData(res.data);
    });
  }, [userSequence]);

  const renderAttendance = () => {
    const date = new Date();
    date.setDate(date.getDate() - 365);

    return (
      <div className={classes.container}>
        {Array(52)
          .fill(0)
          .map((_, i) => {
            const week = Array(7)
              .fill(0)
              .map((_, j) => {
                const currentDate = new Date(date);
                currentDate.setDate(currentDate.getDate() + i * 7 + j);

                const attendanceForDay = attendanceData.find(
                    attendance =>
                      new Date(attendance.date).toDateString() ===
                      currentDate.toDateString()
                  );
  
                  const hasAttendance =
                    attendanceForDay && attendanceForDay.count > 0;

                return (
                  <div
                    key={j}
                    className={classes.cell}
                    style={{
                      backgroundColor: hasAttendance ? "green" : "gray"
                    }}
                  />
                );
              });

            return (
              <div key={i} className={classes.row}>
                {week}
              </div>
            );
          })}
      </div>
    );
  };

  return <div>{renderAttendance()}</div>;
};

export default ExerciseGrass;
