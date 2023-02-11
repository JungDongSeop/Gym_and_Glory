import React, {useState, useEffect} from "react";
import axios from "axios";
// import { useContext } from "react";
// import AuthContext from "../../store/auth-context";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import classes from "./Ranking.module.css";
import RestApi from "../api/RestApi";


const Ranking = () => {

  // 개인랭킹 변수
  const [soloRanking, setSoloRanking] = useState();
  const [teamRanking, setTeamRanking] = useState();

  // 랭킹 정보 받아오기
  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `${RestApi()}/ranking`
      ).then((res) => {
        setSoloRanking(res.data.userRankResList)
        setTeamRanking(res.data.teamLogResList)
      })
    };
    fetchData();
  })
  
  return (
    <main className={classes.main}>
      <div>
        <p>개인 랭킹</p>
        <ul>
          {soloRanking && soloRanking.map((user, index) => (
            <li key={index}>
              {user.nickName}
              <br />
              LV. {user.level}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>단체 랭킹</p>
        <ul>
          {teamRanking && teamRanking.map((team, index) => (
            <li key={index}>
              {team.teamName}
              <br />
              {team.clearTime}
              <div>{team.users}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(Ranking);
