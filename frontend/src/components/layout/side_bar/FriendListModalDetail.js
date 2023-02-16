import { useEffect, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import axios from "axios";
import RestApi from "../../api/RestApi";
import classes from './FriendListModalDetail.module.css'

const FriendListModalDetail = (props) => {
  // redux로 user 정보 가져오기
  const { userSequence } = useContext(AuthContext);

  // 친구 ID 상속받기
  const friendId = props.friendId;
  const [friendInfo, setFriendInfo] = useState({});

  // 친구 데이터 axios 요청
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`${RestApi()}/user/detail/${friendId}`);
      setFriendInfo(result.data);
    };
    fetchData();
  }, [friendId]);

  // 친구 delete axios 요청 (이후 api 만들어지면 붙이기)
  const handleDelete = async () => {
    await axios.post(`${RestApi()}/friend`, {
      sendFrd: userSequence,
      recvFrd: friendId
    });
  };

  // 삭제 버튼 누르면 그냥 null로 만들어서 없애기
  const [isShow, setIsShow] = useState(true);

  return !isShow ? null : (

    <div className={classes.detailWrap}>
      <div>
        <span className={classes.userLevel}>Lv.{parseInt(friendInfo.exp/10000+1)}</span>
        <span className={classes.userNick}>{friendInfo.nickname}</span>
      </div> 

      <button className={classes.friendDelBtn}
        onClick={() => {
          handleDelete();
          setIsShow(false);
        }}
      >
      삭제
      </button>
    </div>
  );
};

export default FriendListModalDetail;
