import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
// import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js/auto';
import classes from './ExerciseGraph.module.css';

Chart.register(...registerables);

const ExerciseGraph = (props) => {
  // redux로 user 정보 가져오기
  const userSequence = useSelector((state) => state.user.pk);

  // 상속받는 변수들
  const exerciseKind = props.exerciseKind;
  const xAxisMin = props.xAxisMin;
  const xUnit = props.xUnit;

  // 운동 정보를 저장할 변수
  const [exerciseData, setExerciseData] = useState([]);
  // 운동 데이터 axios 요청
  useEffect(() => {
    axios.get(`http://localhost:8080/exerciseLog/list/${userSequence}/${exerciseKind}`)
      .then(res => {        
        const data = res.data;
        // 오늘 날짜
        const today = new Date();
        // 일주일 전 날짜
        const fewDaysAgo = new Date(today.getTime() - xAxisMin * 24 * 60 * 60 * 1000);

        // groupeData = axios 받은 데이터를 날짜별로 분류. 이후 acc 에 저장, return
        
        const groupedData = data.reduce((acc, curr) => {
          // console.log(xUnit);
          // const date = (xUnit===1 ? new Date(curr.date) : new Date(curr.week) )
          const date = new Date(curr.date)
          
          if (date >= fewDaysAgo) {
            const key = date.toDateString();
            if (acc[key]) {
              acc[key].count += curr.count;
            } else {
              acc[key] = { date, count: curr.count };
            }
          }

          return acc;
        }, {});

        // 그래프에 줄 데이터
        const dates = [];
        for (let i = fewDaysAgo; i <= today; i.setDate(i.getDate() + 1)) {
          const key = new Date(i).toDateString();
          if (groupedData[key]) {
            dates.push(groupedData[key]);
          } else {
            dates.push({ date: new Date(i), count: 0 });
          }
        }

        setExerciseData(dates);
      });
  }, [userSequence, exerciseKind, xAxisMin, xUnit]);

  // 그래프 출력
  useEffect(() => {
    const ctx = document.getElementById('exercise-chart').getContext('2d');
    // 그래프가 존재할 경우 삭제 (안그러면 에러 남)
    if (window.myChart) {
      window.myChart.destroy();
    }
    // 그래프 출력
    window.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: exerciseData.map(d => d.date.toDateString()),
        datasets: [{
          label: 'Exercise Count',
          data: exerciseData.map(d => d.count),
          fill: true,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        }]
      },
      options: {
        maintainAspectRatio : false,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: '제목입니다.'
          }
        },
        scales: {
          x: {

          },
          y: {
              min: 0,
          }
        },
        animations: {
          y: {
            easing: 'easeInOutElastic',
            from: (ctx) => {
              if (ctx.type === 'data') {
                if (ctx.mode === 'default' && !ctx.dropped) {
                  ctx.dropped = true;
                  return 0;
                }
              }
            }
          }
        }
      }
      
    });
  }, [exerciseData]);

  return (
    <div className={classes.wow}>

      <canvas id="exercise-chart" />
    </div>
  );
};

export default ExerciseGraph;
