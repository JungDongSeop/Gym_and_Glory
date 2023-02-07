import React, { useState, useEffect, useContext } from "react";
// import { useSelector } from 'react-redux';
import AuthContext from "../../store/auth-context";
import axios from "axios";
import { Chart, registerables } from "chart.js/auto";
import classes from "./ExerciseGraph.module.css";
import RestApi from "../api/RestApi";

Chart.register(...registerables);

const ExerciseGraph = (props) => {
  // redux로 user 정보 가져오기
  // const userSequence = useSelector((state) => state.user.pk);
  const { userSequence } = useContext(AuthContext);

  // 상속받는 변수들
  const exerciseKind = props.exerciseKind;
  const xAxisMin = props.xAxisMin;
  const xUnit = props.xUnit;

  // 운동 정보를 저장할 변수
  const [exerciseData, setExerciseData] = useState([]);
  // 운동 데이터 axios 요청
  useEffect(() => {
    axios
      .get(`${RestApi()}/exerciseLog/list/${userSequence}/${exerciseKind}`)
      .then((res) => {
        const exerciseDatas = res.data;
        // 오늘 날짜
        const today = new Date();
        // 옛날 날짜
        const fewDaysAgo = new Date(
          today.getTime() - xAxisMin * 24 * 60 * 60 * 1000
        );

        // 1주일 관련한 함수 (date가 포함된 주의 첫 번째 날 출력)
        function getWeek(date) {
          // 이건 안쓰지만, 혹시나 해서 (fewDaysAgo 로부터 몇 번째 주인지 판단하는 함수)
          // const firstDayOfWeek = getFirstDayOfWeek(fewDaysAgo);
          // const week = Math.ceil(((date - firstDayOfWeek) / 86400000 + firstDayOfWeek.getDay() + 1) / 7);
          const targetDate = getFirstDayOfWeek(date)
          return `${targetDate.toDateString().slice(4, 10)}`;
        }
        function getFirstDayOfWeek(date) {
          const day = date.getDay();
          const diff = date.getDate() - day;
          return new Date(date.setDate(diff));
        }

        // groupeData = axios 받은 데이터를 날짜별로 분류. 이후 acc 에 저장, acc를 return
        const groupedData = exerciseDatas.reduce((acc, exerciseData) => {
          // 운동 데이터 1개
          const exerciseDay = new Date(exerciseData.date);

          // 하루 단위
          if (xUnit === 1) {
            // 날짜 별로 분류해서 acc에 추가
            const key = exerciseDay.toDateString().slice(4, 10);
            if (exerciseDay >= fewDaysAgo) {
              if (acc[key]) {
                acc[key] += exerciseData.count;
              } else {
                acc[key] = exerciseData.count;
              }
            }
          } else if (xUnit === 7) {
            // 일주일 단위로 분류해서 acc에 추가
            if (exerciseDay >= fewDaysAgo) {
              const week = getWeek(exerciseDay);
              if (acc[week]) {
                acc[week] += exerciseData.count;
              } else {
                acc[week] = exerciseData.count;
              }
            }
          } else if (xUnit === 30) {
            // 한달 단위로 분류해서 acc에 추가
            const key =
              exerciseDay.getFullYear() + "-" + (exerciseDay.getMonth() + 1);
            if (exerciseDay >= fewDaysAgo) {
              if (acc[key]) {
                acc[key] += exerciseData.count;
              } else {
                acc[key] = exerciseData.count;
              }
            }
          }

          return acc;
        }, {});

        // 그래프에 줄 데이터
        const dates = [];
        for ( let i = new Date(fewDaysAgo); i <= today; i.setDate(i.getDate() + xUnit)) {
          const key = 
            xUnit === 1 ? 
            new Date(i).toDateString().slice(4, 10) 
            : (xUnit === 7 ? getWeek(new Date(i)) : new Date(i).getFullYear() + "-" + (new Date(i).getMonth() + 1));
          dates.push({
            date: key,
            count: groupedData[key] ? groupedData[key] : 0,
          });
        }
        setExerciseData(dates);
      });
  }, [userSequence, exerciseKind, xAxisMin, xUnit]);

  // 그래프 출력
  useEffect(() => {
    const ctx = document.getElementById("exercise-chart").getContext("2d");
    // 그래프가 이미 존재할 경우 삭제 (안그러면 에러 남)
    if (window.myChart) {
      window.myChart.destroy();
    }

    // 그래프 출력
    window.myChart = new Chart(ctx, {
      type: "line",
      data: {
        // labels: exerciseData.map(d => d.date.toDateString()),
        labels: exerciseData.map((d) => d["date"]),
        datasets: [
          {
            label: "Exercise Count",
            data: exerciseData.map((d) => d.count),
            fill: true,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "top",
          },
          title: {
            display: false,
            text: `${[0, '스쿼트', '푸쉬업', '버피'][exerciseKind]}`
          }
        },
        scales: {
          x: {
            ticks: {
              maxRotation: 0,
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
                callback: function(val, index) {
                // x축 값이 너무 많으면 2 혹은 4개씩 건너뛰기
                if (xAxisMin / xUnit < 30) {
                  return this.getLabelForValue(val)
                } else if (xAxisMin / xUnit < 54) {
                  return index % 3 === 0 ? this.getLabelForValue(val) : '';
                } else {
                  return index % 10 === 0 ? this.getLabelForValue(val) : '';
                }
              },  
            },
            grid: {
              display: false,
              offset: true,
            },
          },
          y: {
            min: 0,
            ticks: {
              // precision: 0
              // stepSize: Math.max(5, ),
            }
          },
        },
        animations: {
          y: {
            easing: "easeInOutElastic",
            from: (ctx) => {
              if (ctx.type === "data") {
                if (ctx.mode === "default" && !ctx.dropped) {
                  ctx.dropped = true;
                  return 0;
                }
              }
            },
          },
        },
      },
    });
  }, [exerciseData, xUnit, exerciseKind, xAxisMin]);

  return (
    <div className={classes.container}>
      <canvas id="exercise-chart" />
    </div>
  );
};

export default ExerciseGraph;
