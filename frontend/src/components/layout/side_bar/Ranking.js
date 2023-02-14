import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestApi from '../../api/RestApi';
import classes from './Ranking.module.scss';
import moment from "moment";

const Ranking = () => {
  const [soloRanking, setSoloRanking] = useState([]);
  const [teamRanking, setTeamRanking] = useState([]);

  // 10초 단위로 랭킹 갱신
  useEffect(() => {
    const fetchData = async () => {
      await axios(`${RestApi()}/ranking`).then(res => {
        setSoloRanking(res.data.userRankResList);
        setTeamRanking(res.data.teamLogResList);
        console.log(res.data)
      });
    };
    fetchData();

    const intervalId = setInterval(fetchData, 10 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classes.container}>
      {/* 개인 랭킹 */}
      <div>
        <p>개인 랭킹</p>
        <ul>
          {soloRanking.slice(0, 4).map((user, index) => (
            <li key={index}>LV {user.level} - {user.nickName}</li>
            ))}
        </ul>
      </div>
      {/* 팀 랭킹 */}
      <div>
        <p>팀 랭킹</p>
        <ul>
          {teamRanking.slice(0,4).map((team, index) => (
            <li key={index}>{team.teamName} -  {moment(team.clearTime, "HH:mm:ss").add(9, "hours").format("HH:mm:ss")}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Ranking;
