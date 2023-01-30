import React from "react";
import WithNavBarAndSideBar from "../layout/WithNavBarAndSideBar";
import classes from "./Ranking.module.css";

const Ranking = () => {
  const soloranking = [
    {
      nickname: "정동섬1",
      level: 2,
    },
    {
      nickname: "정동섬2",
      level: 7,
    },
    {
      nickname: "정동섬3",
      level: 8,
    },
    {
      nickname: "정동섬4",
      level: 1,
    },
  ];

  const teamranking = [
    {
      teamname: "밥알1",
      cleartime: "12:42:12s",
      users: {
        user1: "정동섬1",
        user2: "정동섬2",
        user3: "정동섬3",
        user4: "정동섬4",
      },
    },
    {
      teamname: "밥알2",
      cleartime: "12:42:12s",
      users: {
        user1: "정동섬1",
        user2: "정동섬2",
        user3: "정동섬3",
        user4: "정동섬4",
      },
    },
    {
      teamname: "밥알3",
      cleartime: "12:42:12s",
      users: {
        user1: "정동섬1",
        user2: "정동섬2",
        user3: "정동섬3",
        user4: "정동섬4",
      },
    },
    {
      teamname: "밥알4",
      cleartime: "12:42:12s",
      users: {
        user1: "정동섬1",
        user2: "정동섬2",
        user3: "정동섬3",
        user4: "정동섬4",
      },
    },
  ];
  return (
    <main className={classes.main}>
      <div>
        <p>개인 랭킹</p>
        <ul>
          {soloranking.map((user, index) => (
            <li key={index}>
              {user.nickname}
              <br />
              {user.level}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>단체 랭킹</p>
        <ul>
          {teamranking.map((team, index) => (
            <li key={index}>
              {team.teamname}
              <div>{team.users.user1}</div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default WithNavBarAndSideBar(Ranking);
