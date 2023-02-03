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
      // 여기가 이상하게 작동한다.
      console.log('res.data', res.data)
      const tmp = res.data

      const aaa = tmp.reduce((acc, d) => { 
        console.log('acc', acc)
        acc[d.date] = d.count;
        return acc;
        
      });
      console.log('aaa', aaa);
      setAttendanceData(aaa);      
    });
  }, [userSequence]);

  const renderAttendance = () => {
    const date = new Date();
    date.setDate(date.getDate() - 365);
    // console.log('attendanceData', attendanceData);

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
                // console.log('currentDate', currentDate);

                const attendanceForDay = attendanceData[currentDate]
                

                // console.log('attendanceForDay', attendanceForDay)
                // console.log('attendanceData', attendanceData)

                return (
                  <div
                    key={j}
                    className={classes.cell}
                    style={{
                      backgroundColor: attendanceForDay ? "green" : "gray"
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
