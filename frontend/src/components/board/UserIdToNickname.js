import React, { useState, useEffect } from "react";
import axios from "axios";
import RestApi from "../api/RestApi";

const UserIdToNickname = (props) => {
  const [nickname, setNickname] = useState("");
  const userId = props.userId;

  useEffect(() => {
    axios
      .get(`${RestApi()}/user/detail/${userId}`)
      .then((res) => {
        setNickname(res.data.nickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return <span>{nickname ? nickname : "탈퇴한 회원"}</span>;
};

export default UserIdToNickname;
