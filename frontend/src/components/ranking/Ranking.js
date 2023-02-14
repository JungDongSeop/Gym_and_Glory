import React, {useState, useEffect} from "react";
import axios from "axios";
// import { useContext } from "react";
// import AuthContext from "../../store/auth-context";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import classes from "./Ranking.module.scss";
import RestApi from "../api/RestApi";
import rank1 from "../../assets/ranking1.png";
import rank2 from "../../assets/ranking2.png";
import rank3 from "../../assets/ranking3.png";
import moment from "moment";

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
              {index === 0 ? 
                <img src={rank1} className={classes.rankImg} /> : null
              }

              {index === 1 ? 
                <img src={rank2} className={classes.rankImg} /> : null
              }

              {index === 2 ? 
                <img src={rank3} className={classes.rankImg} /> : null
              }
              <p className={classes.levelText}>
        
              LV. {user.level}
              </p>
              <p className={classes.nickText}>
                {user.nickName}
              </p>
              {/* <br /> */}

            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>단체 랭킹</p>
        <ul>
          {teamRanking && teamRanking.map((team, index) => (
            <li key={index}>

              {index === 0 ? 
                <img src={rank1} className={classes.rankImg} /> : null
              }

              {index === 1 ? 
                <img src={rank2} className={classes.rankImg} /> : null
              }

              {index === 2 ? 
                <img src={rank3} className={classes.rankImg} /> : null
              }

              <p className={classes.levelText}>
                {moment(team.clearTime, "HH:mm:ss").add(9, "hours").format("HH:mm:ss")}
              </p>


              {/* <br /> */}

              <p className={classes.nickText}>
              {team.teamName}
              </p>

              {/* <div className={classes.teamDiv}>{team.users}</div> */}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(Ranking);
