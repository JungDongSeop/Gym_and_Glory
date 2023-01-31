import { useEffect, useState } from 'react';
import axios from "axios";

const FriendListModalDetail = (props) => {
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
  const handleDelete = () => {
    // axios
    //   .delete(`/api/friends/${friendId}`)
    //   .then(response => {
    //     console.log(response.data);
    //     props.onFriendDeleted(friendId);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //     setError("Failed to delete friend. Please try again later.");
    //   });
  };

  return (
    <span>
      {friendInfo.nickname}
      <button onClick={handleDelete}>친구 삭제</button>
    </span>
  )
}

export default FriendListModalDetail;