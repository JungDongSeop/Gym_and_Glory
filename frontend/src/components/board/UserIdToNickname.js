import React, { useState, useEffect } from "react";
import axios from "axios";

const UserIdToNickname = (props) => {
  const [nickname, setNickname] = useState("");
  const userId = props.userId

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/user/detail/${userId}`)
      .then((res) => {
        console.log(res.data);

        setNickname(res.data.nickname);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [userId]);

  return <span>{nickname}</span>;
};

export default UserIdToNickname;
