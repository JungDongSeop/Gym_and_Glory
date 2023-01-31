import React, { useState, useEffect } from "react";
import axios from "axios";

const UserIdToNickname = (props) => {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    axios
      .get(`https://localhost8080/api/user/${props.userId}`)
      .then((res) => {
        setNickname(res.data.nickname);
      });
  }, [props.userId]);

  return <span>{nickname}</span>;
};

export default UserIdToNickname;
