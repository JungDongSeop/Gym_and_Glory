import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";

const ExerciseGrass = () => {
    const userSequence = useSelector((state) => state.user.pk);

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
    date.setDate(date.getDate() - 10);

    return (
      <div style={{ display: "flex" }}>
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
                    style={{
                      width: "10px",
                      height: "10px",
                      margin: "2px",
                      backgroundColor: hasAttendance ? "green" : "gray"
                    }}
                  />
                );
              });

            return (
              <div key={i} style={{ display: "flex" }}>
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
