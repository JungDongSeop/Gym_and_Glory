import { useEffect, useState } from 'react';
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import axios from "axios";

const FriendListModalDetail = (props) => {
  // redux로 user 정보 가져오기
  const { userSequence } = useContext(AuthContext);
  
  // 친구 ID 상속받기
  const friendId = props.friendId;
  const [friendInfo, setFriendInfo] = useState({});

  // 친구 데이터 axios 요청
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`http://localhost:8080/api/user/detail/${friendId}`);
      setFriendInfo(result.data);
    };
    fetchData();
  }, [friendId]);

  // 친구 delete axios 요청 (이후 api 만들어지면 붙이기)
  const handleDelete = async () => {
    alert('친구 요청 삭제')
    await axios.delete(`http://localhost:8080/friend/list/${userSequence}/${friendId}`)

  };

  return (
    
    <span>
      <img src={friendInfo.profile_image_path} alt=""/>
      Lv.{friendInfo.level ? friendInfo.level : '00'}
      {friendInfo.nickname}
      <button onClick={() => {handleDelete(); props.onClick()}}>친구 삭제</button>
    </span>
  )
}

export default FriendListModalDetail;